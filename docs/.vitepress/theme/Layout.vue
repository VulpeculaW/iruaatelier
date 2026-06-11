<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import StarfieldCanvas from './components/StarfieldCanvas.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <StarfieldCanvas />
    </template>
  </Layout>
</template>
