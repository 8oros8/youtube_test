<template>
  <div class="search-page">
    <h1 class="search-page__header"
        :class="{ 'search-page__header_found': displayedVideos.length > 0}">
      Поиск видео
    </h1>
    <div class="search-page__input-wrapper"
         :class="{ 'search-page__input-wrapper_found': displayedVideos.length > 0}">
      <div class="search-input">
        <input class="search-input__body"
               tabindex="1"
               v-model="searchParams.query"
               @keydown.enter="search"
               placeholder="Что хотите посмотреть?"/>
        <svg-icon name="favorite"
                  @click="openModal"
                  class="search-input__favorite-button" />
        <button @click="search"
                class="search-input__button">
          Найти
        </button>
        <div v-if="saveError"
             class="search-input__save-error">
          Пожалуйста, введите запрос, чтобы его сохранить
        </div>
        <div v-if="saveSuccessful"
             class="search-input_save-success save-success">
          <div class="save-success__text">
            Поиск сохранён в разделе «Избранное»
          </div>
          <div class="save-success__to-favorites"
               @click="goToFavorites()">
            Перейти в избранное
          </div>
        </div>
      </div>
    </div>
    <div v-if="displayedVideos.length > 0"
         class="search-page__filter-panel">
      <div class="search-info">
        <div class="search-info__query">
          Видео по запросу  «<b>{{searchParams.query}}</b>»
        </div>
        <div class="search-info__number">
          {{totalResults}}
        </div>
      </div>
      <div class="view-switcher">
        <svg-icon name="switcherList"
                  :class="{ active: !gridActive }"
                  @click="gridActive = false"
                  class="view-switcher__icon">
        </svg-icon>
        <svg-icon name="switcherGrid"
                  :class="{ active: gridActive }"
                  @click="gridActive = true"
                  class="view-switcher__icon">
        </svg-icon>
      </div>
    </div>
    <div v-if="displayedVideos"
         class="search-page__videos-wrapper">
      <div class="videos"
           :class="gridActive ? 'videos_grid' : 'videos_list'">
        <video-block v-for="video in displayedVideos"
                     :gridActive="gridActive"
                     :video-data="video"
                     :key="video.id.videoId">
        </video-block>
      </div>
    </div>
    <search-item-modal v-if="savingProcess"
                       modal-mode="save"
                       :searchParams="searchParams"
                       @save-successful="showSaveSuccessful()"
                       @close-modal="savingProcess = false">
    </search-item-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Поиск'
  },
  name: 'search',
  data () {
    return {
      searchParams: {
        query: '',
        type: 'video',
        part: 'snippet',
        maxResults: 12
      },
      displayedVideos: [],
      totalResults: Number,
      gridActive: true,
      savingProcess: false,
      saveError: false,
      saveSuccessful: false
    }
  },
  computed: {
    ...mapGetters({
      getVideos: 'getVideos'
    })
  },
  methods: {
    search () {
      this.$store.dispatch('searchVideos', this.searchParams)
        .then((res) => {
          this.displayedVideos = res.items
          this.totalResults = res.pageInfo.totalResults
        })
    },
    goToFavorites () {
      this.$router.push('/favorites')
    },
    openModal () {
      if (this.searchParams.query !== '') {
        this.saveError = false
        this.savingProcess = true
      } else {
        this.saveError = true
      }
    },
    showSaveSuccessful () {
      this.saveSuccessful = true
      setTimeout(() => {
        this.saveSuccessful = false
      }, 3000)
    }
  },
  mounted () {
    if (this.$route.query.query) {
      this.searchParams = this.$route.query
      this.search()
    }
  }
}
</script>

<style scoped>
.search-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 40px;
  padding-right: 200px;
  padding-left: 200px;
}
.search-page__header {
  display: flex;
  color: #000000;
  font-weight: 400;
  font-size: 36px;
  line-height: 52px;
  margin-top: 0;
  margin-bottom: 40px;
  transition-duration: 300ms;
}
@media (max-width: 650px) {
  .search-page__header {
    font-size: 28px;
  }
}
.search-page__header_found {
  align-self: flex-start;
}
.search-page__input-wrapper {
  width: 686px;
  transition-duration: 300ms;
}
@media (max-width: 700px) {
  .search-page__input-wrapper {
    width: 100%;
  }
}
.search-page__input-wrapper_found {
  width: 100%;
}
.search-input {
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  height: 52px;
  background-color: #FFFFFF;
}
.search-input__body{
  width: 100%;
  padding: 14px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: #272727;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-right: none;
  border-radius: 10px 0 0 10px;
  transition-duration: 300ms;
}
.search-input__body:focus-visible {
  border: 1px solid #1390E5;
  border-right: none;
  background: rgba(197, 228, 249, 0.3);
  outline: none;
}
.search-input__favorite-button {
  position: absolute;
  width: 21px;
  height: 19px;
  bottom: 16.5px;
  right: 141px;
  color: transparent;
  transition-duration: 300ms;
}
@media (max-width: 650px) {
  .search-input__favorite-button {
    right: 123px;
  }
}
.search-input__favorite-button:hover {
  cursor: pointer;
  color: rgba(197, 228, 249, 1);
}
.search-input__button {
  width: 150px;
  height: 52px;
  background-color: #1390E5;
  border: none;
  border-radius: 0 10px 10px 0;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
}
.search-input__button:hover {
  cursor: pointer;
}
.search-input__save-error {
  position: absolute;
  bottom: -20px;
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: darkred;
}
.search-input_save-success {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: -114px;
  right: 60px;
  width: 220px;
  height: 117px;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  transition-duration: 300ms;
}
.save-success__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #272727;
  opacity: 0.5;
}
.save-success {
  padding: 19px 15px 15px 15px;
}
.save-success__to-favorites {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #1390E5;
}
.save-success__to-favorites:hover {
  cursor: pointer;
}
.search-page__filter-panel {
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  margin-top: 40px;
  margin-bottom: 20px;
  padding-right: 20px;
}
.search-info {
  display: flex;
}
.search-info__number {
  margin-left: 15px;
  color: rgba(23, 23, 25, 0.3);
}
.view-switcher__icon {
  width: 24px;
  height: 24px;
  color: #bbbbbb;
  transition-duration: 300ms;
}
.view-switcher__icon.active {
  color: #272727;
}
.view-switcher__icon:hover {
  cursor: pointer;
}
.search-page__videos-wrapper {
  width: 100%;
  height: auto;
}
.videos {
  width: 100%;
  display: flex;
}
.videos_grid {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.videos_list {
  flex-direction: column;
  justify-content: center;
}
@media (max-width: 1100px) {
  .search-page {
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media (max-width: 520px) {
  .search-page {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>
