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
const [docRoot, docName] = route.params.slug;
const { data: docs } = await useAsyncData(docRoot, () =>
  queryContent(docRoot).find()
);

const intro = computed(() => docs.value?.[0]);
const chapters = computed(() => docs.value?.slice(1) || []);

const currentPos = computed(() => {
  return (
    docs.value?.findIndex((doc) => {
      return doc._path === route.path;
    }) || 0
  );
});

const remainingTime = ref(0);
if (docs.value) {
  remainingTime.value = countReadingTime(
    docs.value.slice(currentPos.value <= 1 ? 0 : currentPos.value)
  );
}

onMounted(() => {
  if (currentPos.value <= 0) {
    const router = useRouter();
    nextTick(() => {
      router.push(chapters.value?.[0]?._path || '/');
    });
  }
});
</script>

<style></style>
