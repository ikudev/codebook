<template>
  <div>
    <header class="mt-4 text-center">
      <div class="flex justify-center items-center gap-4">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img src="/images/app.jpeg" alt="LOGO" />
          </div>
        </div>
        <h1 class="text-3xl font-bold">Codebook</h1>
      </div>
      <p class="w-2/5 mx-auto mt-4">
        Codebook is your online guide to coding skills. Learn from a variety of
        tutorials on different topics, languages, and frameworks. Check out
        Codebook today and start coding!
      </p>
    </header>
    <main class="drawer lg:drawer-open">
      <input id="filter-panel" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <label
          for="filter-panel"
          class="btn btn-primary drawer-button lg:hidden"
        >
          Filter
        </label>
      </div>
      <div class="drawer-side">
        <div class="px-4 py-2">
          <label
          for="filter-panel"
          aria-label="close sidebar"
          class="drawer-overlay"
        >
          FILTER BY
        </label>
        </div>

        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <!-- Sidebar content here -->
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation()
);
</script>

<style></style>
