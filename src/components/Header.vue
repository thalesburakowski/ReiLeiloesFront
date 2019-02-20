<template>
  <div class="topbar">
    <div class="topbar-title">Rei Leilões</div>
    <div class="topbar-search">
      <input type="text" class="topbar-search-input">
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.topbar {
  display: grid;
  position: fixed;
  top: 0;
  grid-template-columns: 20% 60% 20%;
  height: $topbar-height;
  width: 100%;
  background: rgb(65, 30, 90);
  background: linear-gradient(
    250deg,
    rgba(65, 30, 90, 1) 0%,
    rgba(40, 10, 60, 1) 100%
  );
  .topbar-title {
    margin-left: 2vw;
    padding-left: 1em;
    font-size: 1.5rem;
    font-family: "Roboto-Regular";
    align-self: center;
    text-transform: uppercase;
    color: white;
  }
  .topbar-search {
    display: flex;
    justify-content: center;
    align-items: center;
    .topbar-search-input {
      width: 95%;
      background-color: white;
      border-radius: 8px;
    }
  }
  .icon {
    display: flex;
    justify-content: center;
    align-self: center;
    color: white;
  }
  .user {
    display: flex;
    justify-content: center;
    align-self: center;
    height: 1.5em;
    border-right: 1px solid white;
    .name {
      display: flex;
      align-self: center;
      color: white;
    }
  }
  .logout {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    font-size: 1.2rem;
    cursor: pointer;
  }
}

.router {
  display: flex;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 3rem;
  top: 3rem;
  left: $sidebar-width;
  padding-left: 2rem;
  -webkit-box-shadow: 0px 3px 40px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 3px 40px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 40px 0px rgba(0, 0, 0, 0.1);
  .routes {
    display: flex;
    position: relative;
    align-items: center;
    height: 100%;
    color: $purple-light;
    .name {
      text-transform: capitalize;
      cursor: pointer;
      font-family: "Roboto-Regular";
    }
    .next {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    .actual {
      position: absolute;
      bottom: 0;
      background: linear-gradient(90deg, white 0%, #ffb914 35%, #f0462d 100%);
      border-radius: 3px;
      width: 100%;
      height: 10%;
    }
  }
  .routes:last-child {
    .name {
      cursor: default;
    }
  }
}
</style>
