<template>
  <div>
    <header class="my-8 text-center">
      <div class="flex justify-center items-center gap-4">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img src="/images/app.jpeg" alt="LOGO" />
          </div>
        </div>
        <h1 class="text-3xl font-bold">Codebook</h1>
      </div>
      <p class="w-4/5 lg:w-2/5 mx-auto mt-4">
        Codebook is your online guide to coding skills. Learn from a variety of
        tutorials on different topics, languages, and frameworks. Check out
        Codebook today and start coding!
      </p>
    </header>
    <main class="drawer lg:drawer-open">
      <input id="filter-panel" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center gap-4 p-4">
        <div class="flex justify-center items-center gap-2 w-full">
          <label
            class="input input-bordered flex items-center gap-2 w-full lg:w-1/2"
          >
            <input
              type="text"
              placeholder="Type to search..."
              class="grow"
              v-model="keyword"
            />
            <Icon name="mdi:magnify" size="24px" />
          </label>
          <label
            for="filter-panel"
            class="btn btn-primary drawer-button lg:hidden"
          >
            Filter
          </label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ArticleCard
            v-for="article in filteredArticles"
            :key="article.title"
            :title="article.title"
            :description="article.description"
            :updatedAt="article.updatedAt"
            :link="article._path"
            :tags="article.tags?.split('|') || []"
          />
        </div>
      </div>
      <div class="drawer-side">
        <label
          for="filter-panel"
          aria-label="close sidebar"
          class="drawer-overlay text-gray-500 px-2"
        >
          Filter by Tag
        </label>

        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li v-for="(tag, i) in allTags" :key="i">
            <div>
              <input
                type="checkbox"
                class="checkbox"
                :id="`tag-${i}`"
                :checked="selectedTags.includes(tag)"
                @change="
                  () => {
                    if (selectedTags.includes(tag)) {
                      selectedTags = selectedTags.filter((t) => t !== tag);
                    } else {
                      selectedTags = [...selectedTags, tag];
                    }
                  }
                "
              />
              <label :for="`tag-${i}`">{{ tag }}</label>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation()
);

const allTags = computed(() =>
  useChain(navigation.value)
    .map((e) => (e.tags as string)?.split('|') || [])
    .flatten()
    .uniq()
    .value()
);

const selectedTags = ref<string[]>([]);
const keyword = ref('');

const filteredArticles = computed(() => {
  return (
    navigation.value?.filter((nav) => {
      const tags = (nav.tags as string)?.split('|') || [];
      const isTagMatch = isEmpty(selectedTags.value)
        ? true
        : selectedTags.value.every((tag) => tags.includes(tag));
      const isKeywordMatch = isEmpty(keyword.value)
        ? true
        : nav.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
          nav.description.toLowerCase().includes(keyword.value.toLowerCase());
      return isTagMatch && isKeywordMatch;
    }) || []
  );
});
</script>

<style></style>
