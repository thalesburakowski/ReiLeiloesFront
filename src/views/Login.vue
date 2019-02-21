<template>
  <div class="fields">
    <div class="line-inputs">
      <div>
        <label class="label-input">
          <input type="text" required>
          <div class="label-text">Usuario</div>
        </label>
      </div>
      <div>
        <div>
          <label class="label-input">
            <input type="text" maxlength="80" required>
            <div class="label-text">Senha</div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.line-inputs {
  grid-template-columns: 25% 25% 25%;
}
</style>


<script>
export default {
  name: "Login",
  data() {}
};
</script>
