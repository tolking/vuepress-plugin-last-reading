const path = require('path')

module.exports = ({
  popupComponent = 'LastReadingPopup',
  countdown = 5000,
  popupConfig
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
