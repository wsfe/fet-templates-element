<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    attachEvents () {
      global.vbus.$on('global.$Message.show', (msg) => {
        console.log(msg)
      })
    }
  },
  created () {
    this.attachEvents()
  }
}
</script>
