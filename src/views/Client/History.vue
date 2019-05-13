<template>
	<div class="page">
		<div class="title-new">
			<h1 class="page-title">Meu Histórico</h1>
		</div>
		<div class="tabs">
			<div class="tabs__button" @click="tab = 'AUCTIONED'">
				<div class="tabs__button__icon">
					<i class="fas fa-money-bill-wave"></i>
				</div>
				<p class="tabs__button__text">Arrematados</p>
			</div>
			<div class="tabs__button" @click="tab = 'CREATED'">
				<div class="tabs__button__icon">
					<i class="fas fa-gavel"></i>
				</div>
				<p class="tabs__button__text">Criados</p>
			</div>
		</div>
		<div class="table" v-if="tab === 'AUCTIONED'">
			<span class="table-complete-first-line">
				<div class="table-line">
					<div class="table-line-title" v-for="title in titlesAuctioned" :key="title">{{ title }}</div>
					<div class="table-line-title action">Ações</div>
				</div>
			</span>

			<div v-for="auction in auctioned" :key="auction.id">
				<div class="table-line table-line--no-pointer">
					<div class="item item--clickable" @click="clickAuction(auction.id)">{{ auction.title }}</div>
					<div class="item">R$ {{ auction.actualPrice | number }}</div>
					<div class="item">{{ dictionaryStatus[auction.status] }}</div>
					<div class="item">
						<div class="actions">
							<i
								class="icon sad far fa-frown"
								v-if="auction.status == 'received'"
								@click="complain(auction)"
							></i>
							<i
								class="icon delete far fa-times-circle"
								v-if="auction.status == 'finalized'"
								@click="cancel(auction)"
							></i>
							<i
								class="icon check fas fa-check"
								v-if="auction.status == 'delivering'"
								@click="setReceived(auction)"
							></i>
							<i
								class="icon edit fas fa-home"
								v-if="auction.status == 'finalized'"
								@click="showModalAddressFunction(auction)"
							></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="table" v-if="tab === 'CREATED'">
			<span class="table-complete-first-line">
				<div class="table-line">
					<div class="table-line-title" v-for="title in titlesCreated" :key="title">{{ title }}</div>
					<div class="table-line-title action">Ações</div>
				</div>
			</span>

			<div v-for="auction in created" :key="auction.id">
				<div class="table-line table-line--no-pointer">
					<div class="item item--clickable" @click="clickAuction(auction.id)">{{ auction.title }}</div>
					<div class="item">R$ {{ auction.actualPrice | number }}</div>
					<div class="item">{{ dictionaryStatus[auction.status]}}</div>
					<div class="item">
						<div class="actions">
							<i
								v-if="auction.status == 'finalized'"
								class="icon edit fas fa-check"
								@click="setDelivering(auction)"
							></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div :class="{ show: showModal }" class="modal">
			<!-- Modal content -->
			<div class="modal-content modal-content--small w3-animate-zoom">
				<div class="fields fields--no-shadow">
					<h2 class="title-form">Motivo para a devolução da mercadoria</h2>
					<div class="line-inputs">
						<label class="label-input">
							<textarea placeholder="Digite o motivo" v-model="reasonComplain"></textarea>
						</label>
					</div>
					<div class="form__actions">
						<button class="button button-cancel" @click="showModal = false">CANCELAR</button>
						<button class="button button-principal" @click="sendComplain">CONFIRMAR</button>
					</div>
				</div>
			</div>
		</div>

		<div :class="{ show: showModalAddress }" class="modal">
			<!-- Modal content -->
			<div class="modal-content modal-content--small w3-animate-zoom">
				<div class="fields fields--no-shadow">
					<h2 class="title-form">Escolha um endereço</h2>
					<div class="line-inputs">
						<div class="select">
							<Multiselect
								v-model="address"
								label="name"
								:options="addresses"
								:multiple="false"
								:close-on-select="true"
								selectedLabel="Selecionado"
								placeholder="Selecione"
								selectLabel
								deselectLabel
							></Multiselect>
						</div>
					</div>
					<div class="form__actions">
						<button class="button button-cancel" @click="showModalAddress = false">CANCELAR</button>
						<button class="button button-principal" @click="chooseAddress">CONFIRMAR</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProfileAPI from '@/api/Profile'
import CategoryAPI from '@/api/Category'
import AddressAPI from '@/api/Address'
import AuctionAPI from '@/api/Auction'
import Multiselect from 'vue-multiselect'

import SweetAlert from '../../components/SweetAlert'

export default {
	name: 'History',
	components: { Multiselect },
	data() {
		return {
			profile: {},
			options: [],
			addresses: [],
			tab: 'AUCTIONED',
			titlesAuctioned: ['Nome', 'Valor de arremate', 'Status'],
			titlesCreated: ['Nome', 'Valor de arremate', 'Status'],
			auctioned: [],
			created: [],
			dictionaryStatus: {
				finalized: 'Finalizado',
				delivering: 'Em tranporte',
				received: 'Recebido',
				cancelled: 'Cancelado',
				annuledRequest: 'Anulação pendente',
				annuled: 'Anulado',
				annulmentRejected: 'Anulação rejeitada',
			},
			showModal: false,
			showModalAddress: false,
			address: '',
			reasonComplain: '',
			auctionIdToComplain: '',
			auctionIdToChooseAddress: '',
		}
	},
	mounted() {
		this.loadInfo()
	},
	methods: {
		clickAuction(id) {
			console.log('redirect', id)
		},
		async loadInfo() {
			await this.getUserInfo()
			this.getHistory()
			this.getHistoryCreate()
			this.getCategories()
			this.getAddress()
		},
		async getUserInfo() {
			this.profile = JSON.parse(await localStorage.getItem('profile'))
		},
		async getHistory() {
			this.auctioned = await ProfileAPI.getHistory(this.profile.id)
		},
		async getHistoryCreate() {
			this.created = await ProfileAPI.getHistoryCreate(this.profile.id)
		},
		async getCategories() {
			this.options = await CategoryAPI.getAll()
		},
		async getAddress() {
			this.addresses = (await AddressAPI.getAddress(this.profile.id)).entities
		},
		async complain(auction) {
			let resp = await SweetAlert.showConfirmationModal(
				'Deseja efetivar uma reclamação e devolver a mercadoria?'
			)
			if (resp.value) {
				this.showModal = true
				this.auctionIdToComplain = auction.id
			}
		},
		async sendComplain() {
			if (this.reasonComplain.length < 5) {
				SweetAlert.showFailModal('Digite um motivo válido')
			} else {
				this.showModal = false
				let resp = await AuctionAPI.requestAnnulment({
					reason: this.reasonComplain,
					auctionId: this.auctionIdToComplain,
				})
				if (resp) {
					this.getHistory()
					SweetAlert.showSuccessModal(
						'Sua requisição foi enviada e será analisada em breve!'
					)
				}
			}
		},
		async cancel(auction) {
			let resp = await SweetAlert.showConfirmationModal(
				`Deseja cancelar o leilão? Uma taxa de R$ ${auction.actualPrice *
					0.2} será cobrada!`
			)
			if (resp.value) {
				let resp = await AuctionAPI.cancelAuction(auction.id)
				SweetAlert.showSuccessModal(
					`Esse leilão foi cancelado e voce recebeu uma cobrança de R$ ${auction.actualPrice *
						0.2}`
				)
				this.getHistory()
			}
		},
		async remove(auction) {
			let resp = await SweetAlert.showConfirmationModal(
				'Deseja excluir esse leilão do histórico?'
			)
			if (resp.value) {
				const response = await ProfileAPI.delete(auction.id)
				if (response) {
					SweetAlert.showSuccessModal()
					this.getHistory()
				}
			}
		},

		async setDelivering(auction) {
			let resp = await SweetAlert.showConfirmationModal(
				'Deseja confirmar o envio da sua mercadoria?',
				'Quase lá!'
			)
			if (resp.value) {
				const response = await AuctionAPI.setDelivering(auction.id)
				if (response) {
					SweetAlert.showSuccessModal()
					this.getHistory()
				} else {
					SweetAlert.showFailModal()
				}
			}
		},

		async setReceived(auction) {
			let resp = await SweetAlert.showConfirmationModal(
				'Deseja confirmar o recebimento da sua mercadoria?',
				'Quase lá!'
			)
			if (resp.value) {
				const response = await AuctionAPI.setReceived(auction.id)
				if (response) {
					SweetAlert.showSuccessModal()
					this.getHistory()
				}
			}
		},
		showModalAddressFunction(auction) {
			this.showModalAddress = true
			this.auctionIdToChooseAddress = auction.id
		},

		async chooseAddress(auction) {
			if (!this.address) {
				SweetAlert.showFailModal('Selecione um endereço válido!')
				return
			}
			this.showModalAddress = false
			const response = await AuctionAPI.chooseAddress({
				auctionId: this.auctionIdToChooseAddress,
				addressId: this.address.id,
			})
			if (response) {
				SweetAlert.showSuccessModal('Endereço escolhido com sucesso!')
			}
		},
	},
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/modal.scss';

.page {
	& .page-title {
		margin-left: 0;
	}
}
.table-line {
	grid-template-columns: 35% 20% 20% 12% 10%;
	.item:first-child {
		padding-left: 1rem;
	}

	&--no-pointer {
		cursor: auto;
	}

	&--other {
		grid-template-columns: 35% 20% 20% 12% 10%;
	}
}

.item--clickable {
	cursor: pointer;
}

.tabs {
	display: flex;
	justify-content: center;
	margin-bottom: 20px;

	&__button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 10px;
		height: 90px;
		width: 90px;
		border-radius: 14px;
		background-color: rgba(255, 185, 20, 0.7);
		box-shadow: 5px 5px 15px #ccc;
		cursor: pointer;
		transition: all 0.2s;

		&:hover {
			transform: translateY(-10px);
		}

		&__icon {
			color: $text-color;
			font-size: 28px;
			margin-bottom: 10px;
		}

		&__text {
			color: $text-color;
			font-size: 14px;
		}
	}
}

.title-form {
	font-size: 1.8rem;
	color: $text-color;
	margin-bottom: 1.5rem;
	text-align: left;
}

.form__actions {
	display: flex;
	justify-content: flex-end;

	& button:not(:last-child) {
		margin-right: 10px;
	}
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
