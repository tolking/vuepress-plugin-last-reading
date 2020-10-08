<template>
  <transition name="sw-update-popup">
    <slot
      :reload="reload"
      :enabled="enabled"
      :message="message"
      :buttonText="buttonText"
    >
      <div
        v-if="enabled"
        class="sw-update-popup"
      >
        {{ message }}

        <br>

        <button @click="reload">
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
      enabled: false
    }
  },

  watch: {
    $route(value) {
      value.path === this.lastReading.path && this.reload()
    }
  },

  computed: {
    popupConfig() {
      return config.updatePopup[this.$lang] || config.updatePopup
    },

    message() {
      const c = this.popupConfig
      return (c && c.message) || c['/'].message || ''
    },

    buttonText() {
      const c = this.popupConfig
      return (c && c.buttonText) || c['/'].buttonText || ''
    }
  },

  mounted() {
    this.lastReading = JSON.parse(localStorage.getItem('lastReading'))
    this.enabled = !!this.lastReading && !(this.$route.path === this.lastReading.path && document.documentElement.scrollTop === this.lastReading.scrollTop)
  },

  methods: {
    reload () {
      if (this.$route.path !== this.lastReading.path) {
        this.$router.replace(this.lastReading.path)
      } else {
        document.documentElement.scrollTop = this.lastReading.scrollTop
        this.enabled = false
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
  z-index: 2;
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
