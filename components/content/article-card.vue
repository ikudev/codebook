<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <small v-if="updatedAt" class="text-right text-gray-500">
        Updated at {{ useFormatDate(updatedAt) }}
      </small>
      <p>{{ displayDescription }}</p>
      <div class="card-actions flex-row-reverse justify-between items-center">
        <NuxtLink class="btn btn-primary" :to="link">Start</NuxtLink>
        <div class="w-1/2 flex flex-wrap items-center gap-1">
          <span
            class="badge badge-ghost text-xs"
            v-for="(tag, i) in tags"
            :key="i"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  description: String,
  link: String,
  updatedAt: String,
  tags: {
    type: Array,
    default: () => [],
    validate: (tags: string[]) => tags.every((tag) => typeof tag === 'string')
  }
});

const displayDescription = computed(() =>
  useTruncate(props.description, { length: 100 })
);
</script>

<style></style>
