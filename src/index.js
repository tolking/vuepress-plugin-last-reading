const path = require('path')
const i18n = require('./i18n')

module.exports = ({
  popupComponent = 'LastReadingPopup',
  popupConfig = i18n,
  countdown = 30000,
}) => {
  return {
    async clientDynamicModules () {
      return [{
        name: 'lastReading.js',
        content: `export default ${JSON.stringify({
          popupComponent,
          countdown,
          popupConfig
        })}`
      }]
    },

    globalUIComponents: popupComponent ? popupComponent : undefined,

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
  }
}
