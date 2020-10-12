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
    window.addEventListener('load', this.init)
  },

  methods: {
    init() {
      this.lastReading = JSON.parse(localStorage.getItem('lastReading'))

      if (this.lastReading) {
        if (
          this.$route.path === this.lastReading.path &&
          document.documentElement.scrollTop === this.lastReading.scrollTop
        ) {
          this.clean()
        } else if (config.popupCustom) {
          config.popupCustom.apply(this)
        } else {
          this.show = true
          config.popupCountdown && setTimeout(this.clean, config.popupCountdown)
        }
      }
    },

    goto() {
      if (this.$route.path !== this.lastReading.path) {
        this.$router.replace(this.lastReading.path).then(() => {
          document.documentElement.scrollTop = this.lastReading.scrollTop
          this.clean()
        })
      } else {
        this.$nextTick(() => {
          document.documentElement.scrollTop = this.lastReading.scrollTop
          this.clean()
        })
      }
    },

    clean() {
      this.show = false
      this.lastReading = null
      localStorage.removeItem('lastReading')
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
