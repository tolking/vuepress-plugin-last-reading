module.exports = {
  base: '/vuepress-plugin-last-reading/',
  title: 'vuepress-plugin-last-reading',
  description: 'A vuepress plugin to record the last reading',
  dest: 'dist/',
  theme: 'default-prefers-color-scheme',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'vuepress-plugin-last-reading',
      description: 'A vuepress plugin to record the last reading'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vuepress-plugin-last-reading',
      description: '一个记录上次的阅读位置的 vuepress 插件'
    }
  },
  themeConfig: {
    repo: 'tolking/vuepress-plugin-last-reading',
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        sidebar: 'auto'
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '最后更新时间',
        sidebar: 'auto'
      }
    }
  },
  plugins: [
    [require.resolve('../../src/index.js'), {
      // popupComponent: 'MyPopup',
      // popupCountdown: 0,
      // popupConfig: {
      //   message: 'Go back to the last reading',
      //   buttonText: 'ok'
      // },
      // popupCustom: function() {
      //   const now = new Date().getTime()
      //   if (now - this.lastReading.timestamp > 30 * 24 * 60 *60 * 1000) {
      //     this.clean()
      //   } else if (this.$route.path === this.lastReading.path) {
      //     this.goto()
      //   } else {
      //     this.show = true
      //     setTimeout(this.clean, 10000)
      //   }
      // },
    }]
  ]
}
