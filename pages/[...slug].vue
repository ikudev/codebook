<template>
  <div class="drawer lg:drawer-open bg-gray-50">
    <div
      class="flex justify-between items-center px-2 bg-gray-300 text-gray-800 fixed w-full z-10"
    >
      <div class="flex items-center gap-1 py-4">
        <NuxtLink to="/"><Icon name="mdi:arrow-left" size="24px" /></NuxtLink>
        <h1 class="text-xl font-bold">{{ intro?.title }}</h1>
      </div>

      <div class="flex items-center gap-1">
        <Icon name="mdi:clock" size="24px" />
        <span>{{ remainingTime }} mins remaining</span>
      </div>
    </div>

    <input id="contents-panel" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content mt-20">
      <label
        for="contents-panel"
        class="btn drawer-button lg:hidden sticky top-16 ml-4"
      >
        <Icon name="mdi:menu" />
      </label>
      <Cover
        v-if="currentPos === 1 && intro"
        class="mx-auto prose border border-solid p-4"
        :title="intro.title"
        :description="intro.description"
        :updatedAt="intro.updatedAt"
        :author="intro.author"
      />
      <ContentDoc class="prose p-4 mx-auto mt-4 rounded-lg shadow-lg" />
      <div
        class="sticky bottom-8 flex justify-between items-center mx-8 lg:mx-32"
      >
        <NuxtLink
          class="btn btn-primary btn-outline opacity-75"
          :class="{ invisible: isBeginning }"
          :to="prev?._path || route.path"
        >
          Back
        </NuxtLink>
        <NuxtLink
          class="btn btn-primary btn-outline opacity-75"
          :class="{ invisible: isEnding }"
          :to="next?._path || route.path"
        >
          Next
        </NuxtLink>
      </div>
    </div>
    <div class="drawer-side">
      <label
        for="contents-panel"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu steps steps-vertical sticky top-16 ml-4">
        <li
          v-for="(item, i) in chapters"
          class="step"
          :class="{ 'step-primary ': i + 1 <= currentPos }"
        >
          <NuxtLink
            :to="item._path"
            :class="{ 'font-semibold': currentPos === i + 1 }"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
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

const isBeginning = computed(() => currentPos.value <= 1);
const isEnding = computed(() => currentPos.value >= chapters.value.length);

const [prev, next] = await queryContent()
  .only(['_path'])
  .findSurround(route.path);

onMounted(() => {
  if (currentPos.value <= 0) {
    const router = useRouter();
    nextTick(() => {
      router.push(chapters.value?.[0]?._path || '/');
    });
  }
});
</script>

<style scoped>
.nav-btn {
  @apply btn btn-primary btn-outline opacity-75;
}
</style>
