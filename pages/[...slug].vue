<template>
  <div class="bg-gray-50">
    <div
      class="flex justify-between items-center px-2 bg-gray-300 text-gray-800"
    >
      <div class="flex items-center gap-1 py-4">
        <NuxtLink to="/"><Icon name="mdi:arrow-left" /></NuxtLink>
        <h1 class="text-xl font-bold">{{ intro?.title }}</h1>
      </div>

      <div class="flex items-center gap-1">
        <Icon name="mdi:clock" />
        <span>{{ remainingTime }} mins remaining</span>
      </div>
    </div>
    <div class="drawer lg:drawer-open">
      <input id="contents-panel" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <label
          for="contents-panel"
          class="btn btn-primary drawer-button lg:hidden"
        >
          <Icon name="mdi:menu" />
        </label>
        {{ index }}
        <ContentDoc class="prose" />
      </div>
      <div class="drawer-side">
        <label
          for="contents-panel"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu p-4 w-80 min-h-full">
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
const [docRoot, docName] = route.params.slug[0];
const { data: docs } = await useAsyncData(docRoot, () =>
  queryContent(docRoot).find()
);

if (!docName) {
  const router = useRouter();
  router.push("/");
}

const intro = computed(() => docs.value?.[0]);
const chapters = computed(
  () => docs.value?.filter((doc) => !doc._partial) || []
);

const remainingTime = ref(0);
if (docs.value) {
  remainingTime.value = countReadingTime(docs.value);
}

const index = computed(() => {
  return chapters.value.findIndex((chapter) => {
    return chapter._path === route.path;
  });
});
</script>

<style></style>
