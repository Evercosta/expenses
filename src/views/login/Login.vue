<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Expenses</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input v-model="email" required type="email" class="form-control" placeholder="E-mail">
        </div>
        <div class="form-group">
          <input v-model="password" required type="password" class="form-control" placeholder="Senha">
        </div>
        <button class="btn btn-primary w-100">
          <template v-if="loading">
            Entrando...
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Entrar
            <i class="fa fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      loading: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async doLogin () {
      this.loading = true
      const { email, password } = this
      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        // armezenar para saber se o user esta logado
        window.uid = res.user.uid
        // this.$router.push({ name: 'home' })
      } catch (err) {
        let message = ''
        switch (err.code) {
          case 'auth/user-not-found':
            message = 'Não foi possível localizar o usuário.'
            break
          case 'auth/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível fazer login, tente novamente'
        }

        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }
      this.loading = false
    }
  },
  beforeRouteEnter (to, from, next) {
    // roda antes da rota ser ativada
    next(vm => {
      if (window.uid) { // se exitir o uid router para home
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 25%;
    color: var(--darker)
  }
}
h1 {
  font-size: 18pt;
}
</style>
