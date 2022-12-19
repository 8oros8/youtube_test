<template>
  <div class="search-item-modal"
       :style="{ height: modalHeight}"
       @click="overlayClick($event)">
    <div class="search-item-modal__body">
      <div class="modal-window">
        <h2 class="modal-window__header">
          {{ modalMode === 'save' ? 'Сохранить запрос' : 'Изменить запрос' }}
        </h2>
        <div class="modal-window__item">
          <div class="query">
            <div class="query__label">
              Запрос
            </div>
            <input v-model="modalParams.query"
                   :disabled="modalMode === 'save'"
                   :class="{ 'query__input_disabled': modalMode === 'save' }"
                   class="query__input" />
            <div v-if="noQuery"
                 class="query__error">
              Пожалуйста, введите запрос
            </div>
          </div>
        </div>
        <div class="modal-window__item">
          <div class="name">
            <div class="name__label">
              * Название
            </div>
            <input v-model="modalParams.name"
                   class="name__input"
                   placeholder="Укажите название" />
            <div v-if="noName"
                 class="name__error">
              Пожалуйста, введите название запроса
            </div>
          </div>
        </div>
        <div class="modal-window__item">
          <div class="sort-by">
            <div class="sort-by__label">
              Сортировать по
            </div>
            <select v-model="modalParams.sortBy"
                    class="sort-by__select">
              <option value="">Без сортировки</option>
              <option value="date">По дате</option>
              <option value="rating">По рейтингу</option>
              <option value="relevance">По релевантности</option>
              <option value="title">По названию</option>
              <option value="viewCount">По количеству просмотров</option>
            </select>
          </div>
        </div>
        <div class="modal-window__item">
          <div class="max-number">
            <div class="max-number__label">
              Максимальное количество
            </div>
            <div class="max-number__inputs-wrapper">
              <input class="max-number__slider"
                     type="range"
                     min="0"
                     max="50"
                     v-model="modalParams.maxQuantity">
              <input v-model="modalParams.maxQuantity"
                     class="max-number__input">
            </div>
          </div>
        </div>
        <div v-if="modalMode === 'save'"
             class="modal-window__buttons-wrapper">
          <button class="modal-window__cancel-button"
                  @click="closeModal">
            Не сохранять
          </button>
          <button class="modal-window__save-button"
                  @click="addToFavorites">
            Сохранить
          </button>
        </div>
        <div v-if="modalMode === 'edit'"
             class="modal-window__buttons-wrapper">
          <button class="modal-window__cancel-button"
                  @click="closeModal">
            Не изменять
          </button>
          <button class="modal-window__save-button"
                  @click="editFavorite">
            Изменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchItemModal',
  data () {
    return {
      modalParams: {
        query: '',
        name: '',
        sortBy: '',
        maxQuantity: ''
      },
      noName: false,
      noQuery: false
    }
  },
  props: {
    searchParams: {},
    modalMode: String
  },
  computed: {
    modalHeight () {
      return window.innerHeight + 80 + 'px'
    }
  },
  methods: {
    addToFavorites () {
      this.noName = false
      this.noQuery = false
      if ((this.modalParams.query !== '') && (this.modalParams.name !== '')) {
        const userToken = localStorage.getItem('token')
        let favoritesArray = []
        if (!localStorage.getItem(`${userToken}`)) {
          favoritesArray.push(this.modalParams)
          localStorage.setItem(`${userToken}`, `${JSON.stringify(favoritesArray)}`)
        } else {
          favoritesArray = JSON.parse(localStorage.getItem(`${userToken}`))
          favoritesArray.push(this.modalParams)
          localStorage.setItem(`${userToken}`, `${JSON.stringify(favoritesArray)}`)
        }
        this.$emit('save-successful')
        this.closeModal()
      } else if (this.modalParams.name === '') {
        this.noName = true
      } else if (this.modalParams.query === '') {
        this.noQuery = true
      }
    },
    closeModal () {
      this.$emit('close-modal')
    },
    overlayClick (event) {
      if (event.target.className === 'search-item-modal__body') {
        this.closeModal()
      }
    },
    editFavorite () {
      if ((this.modalParams.query !== '') && (this.modalParams.name !== '')) {
        let favoriteSearches = []
        const newItem = this.modalParams
        const userToken = localStorage.getItem('token')
        if (userToken && localStorage.getItem(`${userToken}`)) {
          favoriteSearches = JSON.parse(localStorage.getItem(`${userToken}`))
        }
        const targetId = favoriteSearches.findIndex(item => item.query === this.searchParams.query)
        console.log('targetID', targetId)
        favoriteSearches.splice(targetId, 1, newItem)
        localStorage.setItem(`${userToken}`, `${JSON.stringify(favoriteSearches)}`)
        this.$emit('edit-successful', this.modalParams)
        this.closeModal()
      } else if (this.modalParams.name === '') {
        this.noName = true
      } else if (this.modalParams.query === '') {
        this.noQuery = true
      }
    }
  },
  created () {
    this.noName = false
    this.noQuery = false
    console.log('this.searchParams', this.searchParams)
    this.modalParams.name = this.searchParams.name
    this.modalParams.query = this.searchParams.query
    this.modalParams.maxQuantity = this.searchParams.maxQuantity ? this.searchParams.maxQuantity : '12'
    this.modalParams.sortBy = this.searchParams.sortBy ? this.searchParams.sortBy : ''
    console.log('this.modalParams', this.modalParams)
  },
  watch: {
    'modalParams.maxQuantity': {
      handler (newVal) {
        if (newVal > 50) {
          this.modalParams.maxQuantity = 50
        }
        if (newVal < 0) {
          this.modalParams.maxQuantity = 0
        }
      }
    }
  }
}
</script>

<style scoped>
.search-item-modal {
  position: absolute;
  top: -80px;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  z-index: 2;
  background-color: rgba(117, 199, 255, 0.5);
}
.search-item-modal__body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 510px;
  height: 573px;
  background: #FFFFFF;
  box-shadow: 0 10px 50px rgba(19, 144, 229, 0.8);
  border-radius: 10px;
  padding: 36px 40px;
}
.modal-window__header {
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
}
.modal-window__item {
  width: 100%;
  margin-bottom: 24px;
}
.query {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.query__label {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #272727;
}
.query__input {
  height: 48px;
  padding: 12px 15px;
  background-color: #FFFFFF;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-radius: 10px;
}
.query__input_disabled {
  background-color: #FAFAFA;
  color: rgb(187,187,187);
}
.name {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
}
.name__label {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #272727;
}
.name__input {
  height: 48px;
  padding: 12px 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  background-color: #FFFFFF;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-radius: 10px;
}
.query__error {
  position: absolute;
  bottom: -20px;
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: darkred;
}
.name__error {
  position: absolute;
  bottom: -20px;
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: darkred;
}
.sort-by {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.sort-by__label {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #272727;
}
.sort-by__select {
  height: 48px;
  padding: 12px 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  background-color: #FFFFFF;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-radius: 10px;
  opacity: 0.6;
}
.max-number {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.max-number__label {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #272727;
}
.max-number__inputs-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.max-number__slider {
  height: 6px;
  width: 70%;
}
.max-number__slider:hover {
  cursor: pointer;
}
.max-number__input {
  width: 20%;
  height: 48px;
  padding: 12px 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  text-align: center;
  margin-left: 20px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-radius: 10px;
}
.modal-window__buttons-wrapper {
  display: flex;
  justify-content: space-between;
}
.modal-window__cancel-button {
  width: 210px;
  height: 52px;
  margin-right: 10px;
  border-radius: 10px;
  padding: 14px 20px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #1390E5;
  background-color: #FFFFFF;
  border: 1px solid #1390E5;
  transition-duration: 300ms;
}
.modal-window__cancel-button:hover {
  cursor: pointer;
  background-color: #1390E5;
  color: white;
}
.modal-window__save-button {
  width: 210px;
  height: 52px;
  border-radius: 10px;
  padding: 14px 20px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #FFFFFF;
  background-color: #1390E5;
  border: 1px solid #1390E5;
  transition-duration: 300ms;
}
.modal-window__save-button:hover {
  cursor: pointer;
  background-color: white;
  border: 1px solid #1390E5;
  color: #1390E5;
}
</style>
