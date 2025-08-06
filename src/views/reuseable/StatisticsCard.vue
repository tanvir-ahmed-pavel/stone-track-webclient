<template>
  <!--begin: Statistics Widget 6-->
  <a
    href="#"
    :class="`text-${color}`"
    class="card-title fw-bolder fs-6 d-block"
    @click.prevent
  >
    <div
      :class="[widgetClasses, `bg-light-${color}`]"
      class="card shadow-none hoverable"
    >
      <!--begin::Body-->

      <div :class="`card-body p-5 ${progress?'':'py-6'}`">
        {{ description }}

        <div>
          <span class="text-dark fs-2 fw-bolder me-2">{{ title }}</span>

          <span class="fw-bold text-muted fs-6" v-if="progress">{{ progress }}</span>
        </div>

        <div v-if="progress" :class="`bg-${color}`" class="progress h-8px bg-opacity-20">
          <div
            :class="`bg-${color}`"
            class="progress-bar progress-bar-striped text-end"
            role="progressbar"
            :style="`width: ${progress}`"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
      <!--end:: Body-->
    </div>
  </a>

  <!--end: Statistics Widget 6-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-6",
  props: {
    widgetClasses: String,
    color: String,
    description: String,
    progress: String,
    title: String,
  },
  components: {},
});
</script>
