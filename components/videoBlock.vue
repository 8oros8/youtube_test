<template>
  <div :class="gridActive ? 'video-block_grid' : 'video-block_list'"
       class="video-block">
    <a :class="gridActive ? 'video-block__body_grid' : 'video-block__body_list'"
       class="video-block__body"
       :href="videoData.url"
       target="_blank">
      <div :class="gridActive ? 'video-block__body_grid' : 'video-block__body_list'"
           class="video-block__body"
           :style="{ backgroundImage: 'url(' + videoData.snippet.thumbnails.medium.url + ')' }">
      </div>
    </a>
    <div :class="gridActive ? 'video-block__info-wrapper_grid' : 'video-block__info-wrapper_list'"
         class="video-block__info-wrapper">
      <div :class="gridActive ? 'video-block__title_grid' : 'video-block__title_list'"
           class="video-block__title">
        <a :href="videoData.url"
           target="_blank">
          {{ videoData.snippet.title }}
        </a>
      </div>
      <div :class="gridActive ? 'video-block__info_grid' : 'video-block__info_list'"
           class="video-block__info">
        {{ videoData.snippet.channelTitle }}<br>
        {{ viewCountString(videoData.viewCount) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'videoBlock',
  props: {
    videoData: {},
    gridActive: Boolean
  },
  methods: {
    viewCountString (targetViewCount) {
      if (isNaN(targetViewCount)) {
        return
      }
      return targetViewCount > 1000000 ? Math.round(targetViewCount / 1000000) + ' млн. просмотров' : targetViewCount > 1000 ? Math.round(targetViewCount / 1000) + ' тыс. просмотров' : targetViewCount + ' просмотров'
    }
  }
}
</script>

<style scoped>
.video-block {
  display: flex;
}
.video-block_grid {
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  height: 226px;
  margin-bottom: 20px;
  margin-right: 20px;
}
@media (max-width: 1100px) {
  .video-block_grid {
    width: 30%;
  }
}
@media (max-width: 650px) {
  .video-block_grid {
    width: 100%;
    height: 218px;
  }
}
.video-block_list {
  width: 100%;
  flex-direction: row;
  margin-bottom: 33px;
}
.video-block__info-wrapper {
  display: flex;
  flex-direction: column;
}
.video-block__title {
  width: 100%;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: #272727;
  text-decoration: none;
}
.video-block__title > a {
  color: #272727;
  text-decoration: none;
}
.video-block__title_grid {
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* number of lines to show */
}
.video-block__title_list {
  line-height: 20px;
  margin-bottom: 8px;
}
.video-block__info {
  width: 100%;
  height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(23, 23, 25, 0.3);
}
.video-block__info_grid {
  line-height: 16px;
}
.video-block__info_list {
  line-height: 20px;
}

.video-block__body {
  background-size: cover;
  border: 1px solid #1390E5;
}
.video-block__body:hover {
  cursor: pointer;
}
.video-block__body_grid {
  width: 100%;
  height: 138px;
}
.video-block__body_list {
  width: 157px;
  height: 88px;
  margin-right: 20px;
}
</style>
