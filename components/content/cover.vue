<template>
  <div>
    <h1 class="text-center">{{ title }}</h1>
    <h2>About</h2>
    <p>{{ description }}</p>
    <small v-if="author" class="flex items-center gap-2">
      <Icon name="mdi:user-circle" />
      Written by {{ author }}
    </small>
    <small v-if="updatedAt" class="flex items-center gap-2">
      <Icon name="mdi:text-subject" />
      Last updated at {{ useFormatDate(updatedAt) }}
    </small>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  description: String,
  updatedAt: String,
  author: String
});
</script>

<style></style>
