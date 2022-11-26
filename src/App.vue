<script setup>
import { useStore } from 'vuex';

let store = useStore()

let initHeight = document.body.clientHeight

store.commit('setBodyHeight', initHeight)
console.log('页面body高度', initHeight)

let MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver
  || window.MozMutationObserver
console.log('MutationObserver', MutationObserver)
// 选择目标节点
let target = document.body
// 创建观察者对象
let observer = new MutationObserver(function (mutations) {
  console.log(`MutationObserver 触发了`)
  initHeight = store.getters['getBodyHeight']
  console.log(`页面变化时的原height：${initHeight}`)
  if (initHeight != document.body.clientHeight) {
    initHeight = document.body.clientHeight
    store.commit('setBodyHeight', initHeight)
    console.log('body高度变化了', initHeight)
  }
})
// 配置观察选项:
let config = {
  attributes: true
}
// 传入目标节点和观察选项
observer.observe(target, config)
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="less">
html,
body,
#app {
  min-height: 100%;
}
</style>
