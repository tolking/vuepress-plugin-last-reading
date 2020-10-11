# vuepress-plugin-last-reading

> record the last reading

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
        message: 'Go back to the last reading',
        buttonText: 'ok'
      },
    }]
  ]
}
```

Or refer to [i18n](./src/i18n.js)

### popupCountdown
- Type: `Number`
- Default: `1000`
- Required: `false`

The popup component will close after the `popupCountdown` time.

### popupCustom
- Type: `Object`
- Required: `false`

``` js
module.exports = {
  plugins: [
    ['last-reading', {
      popupCustom: (event) => {
        const now = new Date().getTime()
        if (now - event.lastReading.timestamp > 30 * 24 * 60 *60 * 1000) {
          event.clean()
        } else if (event.$route.path === event.lastReading.path) {
          event.goto()
        } else {
          event.show = true
          setTimeout(event.clean, 10000)
        }
      },
    }]
  ]
}
```

### popupComponent
- Type: `string`
- Required: `false`

A custom component to replace the default popup component (some as [@vuepress/plugin-pwa](https://vuepress.vuejs.org/plugin/official/plugin-pwa.html))

``` js
module.exports = {
  plugins: [
    ['last-reading', {
      popupComponent: 'MyPopup'
    }]
  ]
}
```

you need to create a global component (e.g. MyPopup) at .vuepress/components. A simple component created based on the default component is as follows:

``` vue
<template>
  <LastReadingPopup v-slot="{ show, goto, message, buttonText }">
    <div
      v-if="show"
      class="my-sw-update-popup">
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

## License

[MIT](http://opensource.org/licenses/MIT)
