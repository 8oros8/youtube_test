export const state = () => {
  return {
    apiKey: 'AIzaSyDgFtNbbH6Uc-q4_ErSkEXdLa6Wge4jKtU',
    videos: []
  }
}

export const getters = {
  getVideos: state => state.videos.items
}

export const mutations = {
  videosLoaded (state, loadedData) {
    for (let i = 0; i < loadedData.items.length; i++) {
      loadedData.items[i].url = `https://www.youtube.com/${loadedData.items[i].id.videoId}`
    }
    state.videos = loadedData
  },
  addVideosData (state, additionalData) {
    for (let i = 0; i < state.videos.items.length; i++) {
      if (state.videos.items[i].id.videoId === additionalData.items[i].id) {
        state.videos.items[i].viewCount = additionalData.items[i].statistics.viewCount
      }
    }
  }
}

export const actions = {
  searchVideos (ctx, searchParams) {
    const {
      queryString,
      type,
      part,
      maxResults
    } = searchParams
    return this.$axios.$get(`https://www.googleapis.com/youtube/v3/search?key=${ctx.state.apiKey}&q=${queryString}&type=${type}&part=${part}&maxResults=${maxResults}`)
      .then((res) => {
        ctx.commit('videosLoaded', res) // load initial videos data
        return ctx.dispatch('loadAdditionalVideosInfo', res)
          .then((secondResult) => {
            for (let i = 0; i < res.items.length; i++) {
              if (res.items[i].id.videoId === secondResult.items[i].id) {
                res.items[i].viewCount = secondResult.items[i].statistics.viewCount
              }
            }
            ctx.commit('addVideosData', res)
            return res
          }) // request for additional statistics info
      })
      .catch((e) => {
        console.log('searchVideos error', e)
      })
  },
  loadAdditionalVideosInfo (ctx, videosList) {
    let idString = ''
    for (let i = 0; i < videosList.items.length; i++) {
      idString += `${videosList.items[i].id.videoId}` + '%2C'
    }
    return this.$axios.$get(`https://www.googleapis.com/youtube/v3/videos?key=${ctx.state.apiKey}&part=statistics&id=${idString}`)
      .then(res => res)
      .catch((e) => {
        console.log('loadAdditionalVideosInfo error', e)
      })
  },
  loadAuthData (ctx) {
    return this.$axios.$get('/auth.json')
      .then((res) => {
        console.log(res)
        return res
      })
  }
}
