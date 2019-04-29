<template>
	<div class="page">
		<h1 class="page-title">{{auction.title}}</h1>
		<div class="fields">
			<div class="merchandise">
				<carousel class="carousel">
					<slide v-for="(image, index) in auction.images" :key="index">
						<img class="carousel__image" :src="image" alt>
					</slide>
				</carousel>
				<div class="merchandise-description">
					<div class="merchandise-description__title">Categorias</div>
					<p class="merchandise-description__info">
						<span
							v-for="(category, index) in auction.categories"
							:key="category.id"
						>{{auction.categories.length > index + 1 ? `${category.name} - ` : `${category.name}` }}</span>
					</p>
					<div class="merchandise-description__title">Descrição</div>
					<p class="merchandise-description__info">{{auction.description}}</p>
					<div class="merchandise-description__title">Dimensões</div>
					<div class="merchandise-description__table">
						<div class="merchandise-description__table__line">
							<p class="merchandise-description__table__title">Altura</p>
							<p class="merchandise-description__table__value">{{auction.height}} cm</p>
						</div>
						<div class="merchandise-description__table__line">
							<p class="merchandise-description__table__title">Largura</p>
							<p class="merchandise-description__table__value">{{auction.width}} cm</p>
						</div>
						<div class="merchandise-description__table__line">
							<p class="merchandise-description__table__title">Profundidade</p>
							<p class="merchandise-description__table__value">{{auction.depth}} cm</p>
						</div>
					</div>
				</div>
			</div>

			<div class="bids">
				<div class="bids__wallet-info">O lance atual é de é de R$ {{auction.actualPrice | number}}</div>
				<div class="bids__wallet-info">Seu saldo atual é de R$ {{creditsUser | number}}</div>
				<div v-if="auction.status === 'approved'" class="closed-auction bids__chat">
					<span class="closed-auction__message">Esse leilão ainda não esta aberto</span>
					<span class="closed-auction__message">Início do leilão: {{auction.initialDate | formatDate}}</span>
				</div>
				<div v-else-if="auction.status !== 'active'" class="closed-auction bids__chat">
					<span class="closed-auction__message">Esse leilão já esta encerrado</span>
				</div>
				<div class="bids__chat" v-else-if="auction.status === 'active'">
					<div
						class="bids__chat__message"
						v-for="bid in bids"
						:key="bid.id"
						:class="[bid.usernameId == profile.id ? 'bids__chat__message--mine' : '']"
					>
						<p class="bids__chat__message__user">@{{bid.username}}</p>
						<p class="bids__chat__message__price">{{bid.price}}</p>
					</div>
				</div>

				<div class="bids__actions" v-if="auction.status === 'active'">
					<money
						class="input-money"
						required
						v-model="bidValue"
						v-validate="'required|min_value:1'"
						v-bind="money"
						style="outline:0"
					></money>
					<button class="button button-principal" @click="validateBid">DAR LANCE</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'

import { Money } from 'v-money'
import SweetAlert from '../../components/SweetAlert'

import AuctionAPI from '@/api/Auction'
import WalletAPI from '@/api/Wallet'

export default {
	name: 'Auction',
	components: {
		Carousel,
		Slide,
		PulseLoader,
		Money,
	},
	data() {
		return {
			auction: {},
			creditsUser: '',
			profile: '',
			bidValue: '',
			price: 0,
			money: {
				decimal: ',',
				thousands: '.',
				prefix: 'R$ ',
				precision: 2,
				masked: false,
			},
			bids: [
				// { id: 1, username: '@mariazinha', price: 'R$ 150,00' },
				// { id: 2, username: '@manoBrownnie', price: 'R$ 180,00' },
				// { id: 5, username: '@paulinha', price: 'R$ 220,00' },
			],
		}
	},
	async mounted() {
		this.getAuction()
		await this.getInfo()
		this.loadCredits()
	},
	methods: {
		async getAuction() {
			this.auction = await AuctionAPI.getAuction(this.$route.params.id)
			this.getBids()
		},
		getInfo() {
			// this.user = JSON.parse(localStorage.getItem('user'))
			this.profile = JSON.parse(localStorage.getItem('profile'))
		},
		async getBids() {
			this.bids = await AuctionAPI.getBids(this.auction.id)
		},
		async loadCredits() {
			const response = await WalletAPI.getCredits(this.profile.id)
			this.creditsUser = response.credits
		},
		validateBid() {
			if (!this.bidValue || this.auction.actualPrice > this.bidValue) {
				SweetAlert.showFailModal('Faça um lance válido')
			} else if (this.bidValue > this.creditsUser) {
				SweetAlert.showFailModal('Você não possui essa quantidade de créditos')
			} else {
				this.toBid()
			}
		},
		async toBid() {
			let response = await AuctionAPI.toBid({
				value: this.bidValue,
				profileId: this.profile.id,
				auctionId: this.auction.id,
			})
			this.getAuction()
			this.loadCredits()
		},
	},
}
</script>



<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/modal.scss';

.fields {
	box-shadow: 2px 5px 15px #ccc;
	display: flex;
}

.carousel__image {
	max-height: 300px;
}

.VueCarousel-slide {
	position: relative;
	height: 300px;
}

.VueCarousel {
	width: 50rem;
}
.merchandise-description {
	width: 45rem;
	text-align: left;
	color: $text-color;

	&__title {
		font-size: 1.5rem;
		margin: 1.5rem 0;
	}

	&__info {
		line-height: 1.3rem;
	}

	&__table {
		&__line {
			display: flex;
			background-color: #fafafa;
			border-bottom: 1px solid rgba(#ccc, 0.5);

			&:nth-child(even) {
				background: #fff;
			}
		}

		&__title {
			padding: 1rem 2rem 1rem 0.5rem;
			width: 7rem;
			height: 100%;
			border-right: 1px solid rgba(#ccc, 0.5);
		}

		&__value {
			padding: 1rem 0 0 1rem;
		}
	}
}

.bids {
	width: 100%;
	text-align: left;
	// justify-items: center;
	// justify-content: center;
	// justify-self: center;

	&__wallet-info {
		font-size: 1.5rem;
		margin: 1rem;
	}

	&__chat {
		background-color: #fafafa;
		// background: linear-gradient(
		//   to bottom,
		//   rgba(255, 185, 20, 0.8) 0%,
		//   rgba(221, 195, 135, 0.1) 95%
		// );
		// overflow-y: scroll;
		// width: 80%;
		border-bottom: 1px solid #ccc;
		max-width: 25rem;
		padding-top: 1.5rem;
		margin: auto;
		height: 25rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-radius: 8px 8px 0 0;

		&__message {
			text-align: left;
			width: 10rem;
			margin: 0.7rem 2rem;
			// background-color: white;
			background: linear-gradient(
				90deg,
				rgba(240, 70, 45, 1) 0%,
				rgba(255, 185, 20, 1) 100%
			);
			border-radius: 10px 10px 10px 0;
			padding: 0.5rem;

			&__user {
				// color: #ffb914;
				color: white;
				// align-self: flex-end;
				margin-bottom: 0.5rem;
			}

			&__price {
				font-size: 1.2rem;
				// color: #ffb914;
				color: white;
			}

			&--mine {
				border-radius: 10px 10px 0px 10px;
				align-self: flex-end;
			}
		}
	}

	.closed-auction {
		border-bottom: none;
		padding: 30px 20px;
		height: auto;

		&__message {
			font-size: 18px;
			margin-bottom: 15px;
		}
	}
	.button {
		height: 49px;
		border-radius: 0 0 8px 0;
		margin-top: -1px;
		width: 8rem;
	}
	&__actions {
		display: flex;
		max-width: 25rem;
		justify-content: space-between;
		margin: auto;
		&__button {
			height: 25rem !important;
		}
		&__input {
			// max-width: 21.5rem;
			padding-left: 1rem;
			height: 45px;
			border-top: none;
			border-bottom: 1px solid #ccc;
			border-left: 1px solid #ccc;
			background-color: #fafafa;
			border-radius: 0 0 0px 8px;
			font-size: 1rem;
		}
	}
	.input-money {
		padding-left: 1rem;
		height: 45px;
		border-top: none;
		border-bottom: 1px solid #ccc;
		border-left: 1px solid #ccc;
		background-color: #fafafa;
		border-radius: 0 0 0px 8px;
		font-size: 1rem;
		width: 100%;
	}
}
</style>



<style lang="scss">
.VueCarousel-dot--active {
	background: linear-gradient(
		90deg,
		rgba(240, 70, 45, 1) 0%,
		rgba(255, 185, 20, 1) 100%
	) !important;

	outline: 0px !important;
	border: none !important;
	padding: 0px !important;
}

.VueCarousel-dot {
	outline: 0px !important;
}
</style>
