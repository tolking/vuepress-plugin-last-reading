## 介绍

该插件在页面关闭时，记录当前浏览的位置信息。用来在下一次访问时，展示一个前往该位置的弹窗。

默认的弹窗样式与 [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa) 一样。

---

## 安装

``` sh
yarn add vuepress-plugin-last-reading
# or
npm i vuepress-plugin-last-reading
```

## 使用

``` js
module.exports = {
  plugins: [
    'last-reading'
  ]
}
```

## 选项

### popupConfig
- 类型: `Object`
- 必须: `false`

弹出组件中显示的默认提示文本内容。

``` js
module.exports = {
  plugins: [
    ['last-reading', {
      popupConfig: {
        message: '返回之前位置',
        buttonText: '确定'
      },
    }]
  ]
}
```

或者参考 [i18n](../../src/i18n.js) 配置多语言。

### popupCountdown
- 类型: `Number`
- 默认值: `10000`
- 必须: `false`

配置弹窗显示的时间。

### popupComponent
- 类型: `string`
- 必须: `false`

用于替换默认弹出组件的自定义组件，参考[自定义弹窗样式](#自定义弹窗样式)。

### popupCustom
- 类型: `Function`
- 必须: `false`

自定义弹窗相关逻辑。

::: tip
如果配置该选项，请通过下面方式定义函数
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

## 自定义弹窗样式

首先，您需要在 `.vuepress/components` 中创建一个全局组件 (例如 `MyPopup`)。 一个基于默认组件创建的简单组件如下：

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

接着，更新你的插件配置：

``` js
module.exports = {
  plugins: [
    ['last-reading', {
      popupComponent: 'MyPopup'
    }]
  ]
}
```
