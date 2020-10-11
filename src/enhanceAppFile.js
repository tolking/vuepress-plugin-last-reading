import LastReadingPopup from './LastReadingPopup.vue'

export default ({ Vue }) => {
  Vue.component(LastReadingPopup.name, LastReadingPopup)

  Vue.mixin({
    mounted() {
      window.addEventListener('unload', this.saveLastReading)
    },

    methods: {
      saveLastReading() {
        localStorage.setItem('lastReading', JSON.stringify({
          path: this.$route.path,
          scrollTop: document.documentElement.scrollTop,
          timestamp: new Date().getTime(),
        }))
      }
    }
  })
}