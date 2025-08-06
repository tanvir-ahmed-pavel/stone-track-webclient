<template>
  <!--begin::Statistics Widget 5-->
  <div :class="[widgetClasses, `bg-${color}`]" class="card shadow-mod">
    <!--begin::Body-->
    <div class="card-body d-flex align-items-center">
      <span
        :class="`svg-icon-${iconColor}`"
        class="svg-icon svg-icon-3x mx-n1 pe-5"
      >
        <inline-svg :src="svgIcon" />
      </span>

      <div class="">
        <div :class="`text-inverse-${color}`" class="fw-bolder fs-2 mb-1">
          {{ title }}
        </div>

        <div :class="`text-inverse-${color}`" class="fw-bold fs-5">
          {{ description }}
        </div>
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Statistics Widget 5-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatisticCard2",
  props: {
    widgetClasses: String,
    color: String,
    iconColor: String,
    svgIcon: String,
    title: String,
    description: String,
  },
  components: {},
});
</script>

<style scoped>
.shadow-mod {
  box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
  -webkit-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
  -moz-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
}
</style>
