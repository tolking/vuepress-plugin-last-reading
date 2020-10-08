const path = require('path')
const i18n = require('./i18n')

module.exports = ({
  popupComponent = 'LastReadingPopup',
  updatePopup = i18n
}) => {
  return {
    async clientDynamicModules () {
      return [{
        name: 'lastReading.js',
        content: `export default ${JSON.stringify({
          popupComponent,
          updatePopup
        })}`
      }]
    },

    globalUIComponents: popupComponent ? popupComponent : undefined,

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
  }
}
