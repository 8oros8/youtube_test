<template>
  <div class="header-navbar">
    <div class="header-navbar__left-wrapper">
      <img class="header-navbar__logo"
           src="/sib_logo.svg"
           alt="place for logo" />
      <nuxt-link :class="activePage === 'search' ? 'header-navbar__search-button_active' : ''"
                 class="header-navbar__search-button"
                 :to="{ path: '/search' }">
        Поиск
      </nuxt-link>
      <nuxt-link :class="activePage === 'favorites' ? 'header-navbar__favorites-button_active' : ''"
                 class="header-navbar__favorites-button"
                 :to="{ path: '/favorites' }">
        Избранное
      </nuxt-link>
    </div>
    <div class="header-navbar__logout-button">
      Выйти
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerNavbar',
  computed: {
    activePage () {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
.header-navbar {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 220px;
  padding-right: 200px;;
  background-color: #FFFFFF;
  border-bottom: 1px solid #F1F1F1;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

.header-navbar__left-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.header-navbar__logo {
  width: 48px;
  height: 48px;
  margin-right: 40px;
}

.header-navbar__search-button {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;
  color: rgba(39, 39, 39, 0.3);
  transition-duration: 300ms;
  margin-right: 40px;
}
.header-navbar__search-button:hover {
  cursor: pointer;
}
.header-navbar__search-button_active {
  color: #1390E5;
  border-bottom: 2px solid #1390E5;
}

.header-navbar__favorites-button {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;
  color: rgba(39, 39, 39, 0.3);
  transition-duration: 300ms;
}
.header-navbar__favorites-button:hover {
  cursor: pointer;
}
.header-navbar__favorites-button_active {
  color: #1390E5;
  border-bottom: 2px solid #1390E5;
}

.header-navbar__logout-button {
  color: #1390E5;
}
.header-navbar__logout-button:hover{
  cursor: pointer;
}

@media (max-width: 1000px) {
  .header-navbar {
    padding-right: 60px;
    padding-left: 40px;
  }
}
@media (max-width: 520px) {
  .header-navbar {
    padding-right: 19px;
    padding-left: 0;
    font-size: 14px;
  }
  .header-navbar__logo {
    margin-right: 7px;
  }
  .header-navbar__search-button {
    margin-right: 20px;
  }
}
</style>
