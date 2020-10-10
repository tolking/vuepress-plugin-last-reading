<template>
  <transition name="sw-update-popup">
    <slot
      :goto="goto"
      :show="show"
      :message="message"
      :buttonText="buttonText"
    >
      <div
        v-if="show"
        class="sw-update-popup"
      >
        {{ message }}

        <br>

        <button @click="goto">
          {{ buttonText }}
        </button>
      </div>
    </slot>
  </transition>
</template>

<script>
import config from '@dynamic/lastReading'

export default {
  name: 'LastReadingPopup',

  data() {
    return {
      lastReading: null,
      show: false
    }
  },

  watch: {
    $route(value) {
      this.show &&
        this.lastReading &&
        value.path === this.lastReading.path &&
        this.goto()
    }
  },

  computed: {
    popupConfig() {
      const popupConfig = config.popupConfig
      const lang = this.$lang.split('-')[0]
      return popupConfig[`/${lang}/`] || popupConfig[this.$localePath] || popupConfig
    },

    message() {
      const c = this.popupConfig
      return (c && c.message) || c['/'].message
    },

    buttonText() {
      const c = this.popupConfig
      return (c && c.buttonText) || c['/'].buttonText
    }
  },

  mounted() {
    this.lastReading = JSON.parse(localStorage.getItem('lastReading'))
    this.show =
      this.lastReading &&
      !(
        this.$route.path === this.lastReading.path &&
        document.documentElement.scrollTop === this.lastReading.scrollTop
      )

    this.show && config.countdown && setTimeout(() => {
      this.show = false
    }, config.countdown)
  },

  methods: {
    goto() {
      if (this.$route.path !== this.lastReading.path) {
        this.$router.replace(this.lastReading.path)
      } else {
        this.$nextTick(() => {
          document.documentElement.scrollTop = this.lastReading.scrollTop
          this.lastReading = null
          this.show = false
          localStorage.removeItem('lastReading')
        })
      }
    }
  }
}
</script>

<style scoped>
.sw-update-popup {
  position: fixed;
  right: 1em;
  bottom: 1em;
  padding: 1em;
  border: 1px solid #3eaf7c;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 12;
}

.sw-update-popup > button {
  margin-top: 0.5em;
  padding: 0.25em 2em;
}

.sw-update-popup-enter-active, .sw-update-popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.sw-update-popup-enter, .sw-update-popup-leave-to {
  opacity: 0;
  transform: translate(0, 50%) scale(0.5);
}
</style>
