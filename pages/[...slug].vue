<template>
  <div>
    <div class="drawer lg:drawer-open">
      <input id="contents-panel" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <label
          for="contents-panel"
          class="btn btn-primary drawer-button lg:hidden"
        >
          <Icon name="mdi:menu" />
        </label>
        <ContentDoc class="prose" />
      </div>
      <div class="drawer-side">
        <label
          for="contents-panel"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li v-for="item in chapters">
            <NuxtLink :to="item._path">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const docRoot = route.params.slug[0];
const { data: docs } = await useAsyncData(docRoot, () =>
  queryContent(docRoot).find()
);

const chapters = computed(
  () => docs.value?.filter((doc) => !doc._partial) || []
);
</script>

<style></style>
