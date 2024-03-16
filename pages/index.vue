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
        <label
          for="filter-panel"
          class="btn btn-primary drawer-button lg:hidden"
        >
          Filter
        </label>
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

const filteredArticles = computed(() => {
  if (isEmpty(selectedTags.value)) {
    return navigation.value;
  }

  return (
    navigation.value?.filter((nav) =>
      selectedTags.value.some((tag) => nav.tags?.includes(tag))
    ) || []
  );
});
</script>

<style></style>
