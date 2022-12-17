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
               v-model="searchParams.queryString"
               @keydown.enter="search"
               placeholder="Что хотите посмотреть?"/>
        <button @click="search"
                class="search-input__button">
          Найти
        </button>
      </div>
    </div>
    <div v-if="displayedVideos.length > 0"
         class="search-page__filter-panel">
      <div class="search-info">
        <div class="search-info__query">
          Видео по запросу  «<b>{{searchParams.queryString}}</b>»
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  data () {
    return {
      searchParams: {
        queryString: '',
        type: 'video',
        part: 'snippet',
        maxResults: 12
      },
      displayedVideos: [],
      totalResults: Number,
      gridActive: true
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
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.search-page {
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
.search-page__header_found {
  align-self: flex-start;
}
.search-page__input-wrapper {
  width: 686px;
  transition-duration: 300ms;
}
.search-page__input-wrapper_found {
  width: 100%;
}
.search-input {
  display: flex;
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
@media (max-width: 1000px) {
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
