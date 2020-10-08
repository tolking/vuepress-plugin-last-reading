import LastReadingPopup from './LastReadingPopup.vue'

export default ({ Vue }) => {
  Vue.component(LastReadingPopup.name, LastReadingPopup)

  Vue.mixin({
    data() {
      return {
        running: false
      }
    },

    mounted() {
      window.addEventListener('scroll', this.lastReading)
    },
    
    methods: {
      lastReading() {
        if (!this.running) {
          this.running = true
          requestAnimationFrame(this.save)
        }
      },
      save() {
        localStorage.setItem('lastReading', JSON.stringify({
          path: this.$route.path,
          scrollTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, 0),
          timestamp: new Date().getTime()
        }))
        this.running = false
      }
    }
  })
}