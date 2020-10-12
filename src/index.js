const path = require('path')
const i18n = require('./i18n')

module.exports = ({
  popupComponent = 'LastReadingPopup',
  popupConfig = i18n,
  popupCountdown = 10000,
  popupCustom,
}) => {
  return {
    async clientDynamicModules () {
      return [{
        name: 'lastReading.js',
        content: `export default {
          popupComponent: '${popupComponent}',
          popupConfig: ${JSON.stringify(popupConfig)},
          popupCountdown: ${popupCountdown},
          popupCustom: ${popupCustom},
        }`
      }]
    },

    globalUIComponents: popupComponent ? popupComponent : undefined,

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
  }
}
