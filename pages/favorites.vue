<template>
  <div class="favorites-page">
    <h1 class="favorites-page__header">
      Избранное
    </h1>
    <div class="favorites-page__no-favorites favorite-searches__request-item" v-if="favoriteSearches.length === 0">
      Здесь будут отображаться ваши избранные запросы
    </div>
    <div class="favorites-page__body favorite-searches">
      <div v-for="search in favoriteSearches"
           :key="search.query"
           class="favorite-searches__request-item">
        <div class="request-item__name">
          {{ search.name }}
        </div>
        <div class="request-item__buttons-wrapper">
          <div class="request-item__execute-button"
               @click="executeSearch(search)">
            Выполнить
          </div>
          <div class="request-item__edit-button"
               @click="openEditModal(search)">
            Изменить
          </div>
          <div class="request-item__delete-button"
               @click="deleteItem(search)">
            Удалить
          </div>
        </div>
      </div>
    </div>
    <search-item-modal v-if="editingProcess"
                       modal-mode="edit"
                       @edit-successful="handleEditSuccess($event)"
                       :searchParams="searchParams"
                       @close-modal="editingProcess = false">
    </search-item-modal>
  </div>
</template>

<script>
export default {
  name: 'favorites',
  data () {
    return {
      editingProcess: false,
      searchParams: {},
      refresh: 0
    }
  },
  computed: {
    favoriteSearches () {
      console.log(this.refresh)
      let favoriteSearches = []
      const userToken = localStorage.getItem('token')
      if (userToken && localStorage.getItem(`${userToken}`)) {
        favoriteSearches = JSON.parse(localStorage.getItem(`${userToken}`))
      }
      return favoriteSearches
    }
  },
  methods: {
    executeSearch (targetItem) {
      this.$router.push({ path: '/search', query: targetItem })
    },
    deleteItem (targetItem) {
      let favoriteSearches = []
      const userToken = localStorage.getItem('token')
      if (userToken && localStorage.getItem(`${userToken}`)) {
        favoriteSearches = JSON.parse(localStorage.getItem(`${userToken}`))
      }
      const targetId = favoriteSearches.findIndex(item => item.query === targetItem.query)
      favoriteSearches.splice(targetId, 1)
      localStorage.setItem(`${userToken}`, `${JSON.stringify(favoriteSearches)}`)
      this.refresh++
    },
    openEditModal (targetItem) {
      console.log('target', targetItem)
      this.editingProcess = true
      this.searchParams = targetItem
    },
    handleEditSuccess (editedItem) {
      this.searchParams = editedItem
      this.refresh++
    }
  },
  created () {
  }
}
</script>

<style scoped>
.favorites-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-top: 40px;
  padding-right: 200px;
  padding-left: 200px;
}
@media (max-width: 1100px) {
  .favorites-page {
    padding-right: 40px;
    padding-left: 40px;
  }
}
@media (max-width: 650px) {
  .favorites-page {
    padding-right: 10px;
    padding-left: 10px;
  }
}
.favorites-page__header {
  margin-bottom: 40px;
  font-weight: 400;
  font-size: 28px;
  line-height: 40px;
  color: #000000;
}
.favorites-page__no-favorites {
  display: flex;
  height: auto!important;
  justify-content: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  color: rgba(39, 39, 39, 0.3);
}
.favorites-page__body {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.favorite-searches__request-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 47px;
  background-color: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  border-bottom: 1px solid #F1F1F1;
  padding: 13px 20px;
}
.favorite-searches__request-item:hover {
  cursor: pointer;
}
.favorite-searches__request-item:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.favorite-searches__request-item:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.request-item__buttons-wrapper {
  display: flex;
  height: 100%;
  width: 300px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
.request-item__buttons-wrapper:hover {
  cursor: pointer;
}
.favorite-searches__request-item:hover .request-item__edit-button {
  visibility: visible;
}
.favorite-searches__request-item:hover .request-item__delete-button {
  visibility: visible;
}
.favorite-searches__request-item:hover .request-item__execute-button {
  visibility: visible;
}
.request-item__execute-button {
  visibility: hidden;
  margin-right: 30px;
  color: #1390E5;
}
.request-item__execute-button:hover {
  cursor: pointer;
}
.request-item__edit-button {
  visibility: hidden;
  margin-right: 30px;
  color: #1390E5;
}
.request-item__edit-button:hover {
  cursor: pointer;
}
.request-item__delete-button {
  visibility: hidden;
  color: #FF0000;
}
.request-item__delete-button:hover {
  cursor: pointer;
}

</style>
