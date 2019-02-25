<template>
  <div class="page">
    <h1 class="page-title">{{auctionInfo.name}}</h1>
    <div class="fields">
      <div class="merchandise">
        <carousel class="carousel">
          <slide v-for="image in linkImages" :key="image.id">
            <img class="carousel__image" :src="image.source" alt>
          </slide>
        </carousel>
        <div class="merchandise-description">
          <div class="merchandise-description__title">Categorias</div>
          <p class="merchandise-description__info">
            <span
              v-for="(category, index) in auctionInfo.categories"
              :key="category.id"
            >{{auctionInfo.categories.length > index + 1 ? `${category.name} - ` : `${category.name}` }}</span>
          </p>
          <div class="merchandise-description__title">Descrição</div>
          <p class="merchandise-description__info">{{auctionInfo.description}}</p>
          <div class="merchandise-description__title">Dimensões</div>
          <div class="merchandise-description__table">
            <div class="merchandise-description__table__line">
              <p class="merchandise-description__table__title">Altura</p>
              <p class="merchandise-description__table__value">10 cm</p>
            </div>
            <div class="merchandise-description__table__line">
              <p class="merchandise-description__table__title">Largura</p>
              <p class="merchandise-description__table__value">7 cm</p>
            </div>
            <div class="merchandise-description__table__line">
              <p class="merchandise-description__table__title">Profundidade</p>
              <p class="merchandise-description__table__value">3 cm</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bids">
        <div class="bids__wallet-info">Seu saldo disponível é de R$ 150,00!</div>

        <div class="bids__chat">
          <div
            class="bids__chat__message"
            v-for="bid in bids"
            :key="bid.id"
            :class="[bid.id == 5 ? 'bids__chat__message--mine' : '']"
          >
            <p class="bids__chat__message__user">{{bid.username}}</p>
            <p class="bids__chat__message__price">{{bid.price}}</p>
          </div>
        </div>

        <div class="bids__actions">
          <input type="text" class="bids__actions__input" placeholder="250,00">
          <button class="button button-principal">DAR LANCE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Auction',
  data() {
    return {
      linkImages: [
        {
          id: 1,
          source:
            'https://images-submarino.b2w.io/produtos/01/00/offers/01/00/item/134186/8/134186808_1GG.jpg',
        },
        {
          id: 2,
          source:
            'https://images-submarino.b2w.io/produtos/01/00/offers/01/00/item/134186/8/134186808_2GG.jpg',
        },
        {
          id: 3,
          source:
            'https://images-submarino.b2w.io/produtos/01/00/offers/01/00/item/134186/8/134186808_3GG.jpg',
        },
        {
          id: 4,
          source:
            'https://images-submarino.b2w.io/produtos/01/00/offers/01/00/item/134186/8/134186808_4GG.jpg',
        },
      ],

      auctionInfo: {
        name: 'Smartphone Galaxy J8',
        categories: [
          { id: '1', name: 'Smartphone' },
          { id: '2', name: 'Samsung' },
          { id: '3', name: 'Tecnologia' },
        ],
        description:
          'Esse celular é realmente muito boom, esta na caixa, não aberto. ESTE PRODUTO NÃO É REEMBALADO, É NOVO. Minha filha tem um igual e ela gosta muito, nunca qiebrou e da pra ficar no whatsApp o dia inteiro. Ela gosta de whatsApp.',
      },

      bids: [
        { id: 1, username: '@mariazinha', price: 'R$ 150,00' },
        { id: 2, username: '@manoBrownnie', price: 'R$ 180,00' },
        { id: 4, username: '@mariazinha', price: 'R$ 200,00' },
        { id: 5, username: '@paulinha', price: 'R$ 220,00' },
        // { id: 1, username: '@mariazinha', price: 'R$ 150,00' },
        // { id: 2, username: '@manoBrownnie', price: 'R$ 180,00' },
        // { id: 3, username: '@mariazinha', price: 'R$ 200,00' },
      ],
    }
  },
  components: {
    Carousel,
    Slide,
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
  text-align: center;
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
    max-width: 30rem;
    padding-top: 1.5rem;
    margin: auto;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 8px 8px 0 0;

    &__message {
      text-align: left;
      width: 15rem;
      margin: 1rem 2rem;
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
        margin-bottom: 1rem;
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
  .button {
    height: 49px;
    border-radius: 0 0 8px 0;
    margin-top: -1px;
    width: 8rem;
  }
  &__actions {
    display: flex;
    max-width: 30rem;
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
