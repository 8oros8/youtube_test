<template>
  <div class="search-page">
    <h1 class="search-page__header">
      Поиск видео
    </h1>
    <div class="search-page__input-wrapper">
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
    <div style="width: 100%; background-color: red">
      <div v-if="displayedVideos"
           style="width: 300px; height: 300px">
        <div v-for="video in displayedVideos"
             :key="video.id.videoId">
          {{ video.snippet.title }}
          <iframe :src="video.url"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchParams: {
        apiKey: 'AIzaSyDgFtNbbH6Uc-q4_ErSkEXdLa6Wge4jKtU',
        queryString: '',
        type: 'video',
        part: 'snippet',
        maxResults: 12
      },
      displayedVideos: []
    }
  },
  methods: {
    search () {
      this.$store.dispatch('searchVideos', this.searchParams).then((res) => {
        for (let i = 0; i < res.items.length; i++) {
          res.items[i].url = `https://www.youtube.com/embed/${res.items[i].id.videoId}`
        }
        this.displayedVideos = res.items
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
}
.search-page__header {
  color: #000000;
  font-weight: 400;
  font-size: 36px;
  line-height: 52px;
  margin-top: 0;
  margin-bottom: 40px;
}
.search-page__input-wrapper {
  width: 686px;
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
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: #272727;
  border: 1px solid rgba(23, 23, 25, 0.2);
  border-right: none;
  border-radius: 10px 0px 0px 10px;
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
  border-radius: 0px 10px 10px 0px;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  line-height: 24px;
}
.search-input__button:hover {
  cursor: pointer;
}
</style>
