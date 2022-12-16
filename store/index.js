export const state = () => {
  return {
    videos: []
  }
}

export const getters = {

}

export const mutations = {

}

export const actions = {
  searchVideos (ctx, searchParams) {
    const {
      apiKey,
      queryString,
      type,
      part,
      maxResults
    } = searchParams
    return this.$axios.$get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${queryString}&type=${type}&part=${part}&maxResults=${maxResults}`)
      .then((res) => {
        console.log('search results', res)
        return res
      })
      .catch((e) => {
        console.log('error', e)
      })
  }
}
