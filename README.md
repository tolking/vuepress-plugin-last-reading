# vuepress-plugin-last-reading

> A vuepress plugin to record the last reading

[Documentation](https://tolking.github.io/vuepress-plugin-last-reading/)

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

Or refer to [i18n](./src/i18n.js)

### popupCountdown
- Type: `Number`
- Default: `10000`
- Required: `false`

Configure the time that the popup will display.

### popupComponent
- Type: `string`
- Required: `false`

A custom component to replace the default popup component, refer to [Customize the UI of Popup](https://tolking.github.io/vuepress-plugin-last-reading/#customize-the-ui-of-popup).

### popupCustom
- Type: `Function`
- Required: `false`

Custom popup related logic.

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

## License

[MIT](http://opensource.org/licenses/MIT)
