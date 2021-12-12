<script setup lang="ts">
// import { TodoElement } from '../../../libs/types/src/index'
import { TodoElement } from '@shared/types'

const item: TodoElement = {
  id: 1,
  title: 'aaa',
  content: 'bbbbbbb',
}
</script>

<template>
  <h1>Home page!</h1>
  <div>{{ item.content }}</div>
</template>


