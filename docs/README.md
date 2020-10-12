## Introduction

The plugIn records the current location information when the page is closed. It is used to show a popup window to that location during the next visit.

same as [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa).

---

## Installation

``` sh
yarn add vuepress-plugin-last-reading
# or
npm i vuepress-plugin-last-reading
```

## Usage

``` js
module.exports = {
  plugins: [
    'last-reading'
  ]
}
```

## Options

### popupConfig
- Type: `Object`
- Required: `false`

The default content displayed in the popup component.

``` js
module.exports = {
  plugins: [
    ['last-reading', {
      popupConfig: {
        message: 'Go back',
        buttonText: 'ok'
      },
    }]
  ]
}
```

Or refer to [i18n](../src/i18n.js)

### popupCountdown
- Type: `Number`
- Default: `1000`
- Required: `false`

Configure the time that the popup will display.

### popupComponent
- Type: `string`
- Required: `false`

A custom component to replace the default popup component, refer to [Customize the UI of Popup](#customize-the-ui-of-popup).

### popupCustom
- Type: `Object`
- Required: `false`

Custom popup related logic.

::: tip
If this option is configured, define the function in the following way
:::

``` js
module.exports = {
  plugins: [
    ['last-reading', {
      popupCustom: function() {
        const now = new Date().getTime()
        if (now - this.lastReading.timestamp > 30 * 24 * 60 *60 * 1000) {
          this.clean()
        } else if (this.$route.path === this.lastReading.path) {
          this.goto()
        } else {
          this.show = true
          setTimeout(this.clean, 10000)
        }
      },
    }]
  ]
}
```

## Customize the UI of Popup

you need to create a global component (e.g. `MyPopup`) at `.vuepress/components`. A simple component created based on the default component is as follows:

``` vue
<template>
  <LastReadingPopup v-slot="{ show, goto, message, buttonText }">
    <div v-if="show" class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="goto">{{ buttonText }}</button>
    </div>
  </LastReadingPopup>
</template>

<script>
import LastReadingPopup from 'vuepress-plugin-last-reading/src/LastReadingPopup.vue'

export default {
  components: { LastReadingPopup }
}
</script>

<style>
.my-sw-update-popup {
  text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 10px;
  border: 5px solid #3eaf7c;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
}
</style>
```

Then, update your plugin config:

``` js
module.exports = {
  plugins: [
    ['last-reading', {
      popupComponent: 'MyPopup'
    }]
  ]
}
```
