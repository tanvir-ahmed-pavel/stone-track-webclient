<template>
  <div v-loading="loading" class="card shadow-sm z-index-fix"></div>
</template>

<script>
export default {
  name: "FallbackLoading",
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style scoped>
.z-index-fix {
  z-index: 99;
  height: 75vh;
}
</style>
