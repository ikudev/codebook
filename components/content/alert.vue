<template>
  <div role="alert" class="alert" :class="alertType">
    <Icon :name="iconName" :color="iconColor" size="32px" />
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: () => 'info',
    validator: (type: string) => ['info', 'warning', 'error'].includes(type)
  }
});

const alertType = computed(() => {
  return `alert-${props.type}`;
});

const iconName = computed(() => {
  switch (props.type) {
    case 'info':
      return 'mdi:information';
    case 'warning':
      return 'mdi:warning-circle';
    case 'error':
      return 'mdi:close-circle';
    default:
      return 'mdi:information';
  }
});

const iconColor = computed(() => {
  switch (props.type) {
    case 'info':
      return 'blue';
    case 'warning':
      return 'gold';
    case 'error':
      return 'crimson';
    default:
      return 'lightblue';
  }
});
</script>

<style></style>
