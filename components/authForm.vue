<template>
  <div class="auth-form">
    <div class="auth-form__logo">
      <img src="/sib_logo.svg" alt="place for logo" />
    </div>
    <h3 class="auth-form__header">
      Вход
    </h3>
    <div class="auth-form__login">
      <div class="login-input">
        <div class="login-input__label">
          Логин
        </div>
        <input v-model="authData.login"
               class="login-input__body">
      </div>
    </div>
    <div class="auth-form__password">
      <div class="password-input">
        <div class="password-input__label">
          Пароль
        </div>
        <input ref="password-input__body"
               v-model="authData.password"
               :type="passwordVisible ? 'text' : 'password'"
               @focus="focusPassword"
               @blur="blurPassword"
               class="password-input__body"/>
        <svg-icon v-if="passwordVisible"
                  name="eyeOpen"
                  class="password-input__hider"
                  @click="passwordVisible=false"
                  :class="{ active: passwordFocused }"/>
        <svg-icon v-if="!passwordVisible"
                  name="eyeCross"
                  class="password-input__hider"
                  @click="passwordVisible=true"
                  :class="{ active: passwordFocused }"/>
      </div>
    </div>
    <button @click="authUser"
            class="auth-form__login-button">
      Войти
    </button>
  </div>
</template>

<script>
export default {
  name: 'authForm',
  data () {
    return {
      authData: {
        login: '',
        password: ''
      },
      passwordFocused: false,
      active: false,
      passwordVisible: false
    }
  },
  methods: {
    focusPassword () {
      this.passwordFocused = true
    },
    blurPassword () {
      this.passwordFocused = false
    },
    authUser () {
      this.$store.dispatch('loadAuthData')
        .then((res) => {
          console.log('here!', res)
          const auth = res.find((item) => {
            if (item.login.toString() === this.authData.login && item.password.toString() === this.authData.password) {
              localStorage.setItem('token', `${this.authData.login}.${this.authData.password}`)
              return true
            } else {
              return false
            }
          })
          if (auth) {
            this.$router.push('/search')
          } else {
            alert('Неверный логин или пароль')
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px 88px 60px 88px;
  width: 510px;
  height: 520px;
  background-color: #FFFFFF;
  border: 1px solid rgba(39, 39, 39, 0.1);
  border-radius: 10px;
}
.auth-form__header {
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: #000000;
  margin-top: 32px;
  margin-bottom: 20px;
}
.auth-form__login {
  width: 100%;
  margin-bottom: 20px;
}
.login-input__label {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: rgba(23, 23, 25, 0.3);;
}
.login-input__body {
  display: flex;
  width: 100%;
  height: 48px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-radius: 10px;
  padding: 12px 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  transition-duration: 300ms;
}
.login-input__body:focus-visible {
  background-color: rgba(197, 228, 249, 0.3);
  border-color: #1390E5;
  outline: none;
}
.auth-form__password {
  width: 100%;
  margin-bottom: 40px;
  position: relative;
}
.password-input__body {
  display: flex;
  width: 100%;
  height: 48px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-radius: 10px;
  padding: 12px 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  transition-duration: 300ms;
}
.password-input__body:focus-visible {
  background-color: rgba(197, 228, 249, 0.3);
  border-color: #1390E5;;
  outline: none;
}
.password-input__label {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: rgba(23, 23, 25, 0.3);;
}
.password-input__hider {
  position: absolute;
  width: 24px;
  height: 24px;
  right: 15px;
  top: 34px;
  color: rgba(209, 209, 209, 1);
  fill: none;
  transition-duration: 400ms;
}
.password-input__hider.active {
  color: rgba(19, 144, 229, 1);
}
.password-input__hider:hover {
  cursor: pointer;
}
.auth-form__login-button {
  width: 176px;
  height: 52px;
  background-color: #1390E5;
  border: none;
  border-radius: 5px;
  font-weight: 400;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 24px;
}
.auth-form__login-button:hover {
  cursor: pointer;
}
@media (max-width: 520px) {
  .auth-form {
    margin-left: 8px;
    margin-right: 8px;
    padding: 40px 10px 60px 10px;
  }
  .auth-form__login-button {
    height: 52px;
  }
}
</style>
