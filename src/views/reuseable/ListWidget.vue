<template>
  <!--begin::List Widget 6-->
  <div class="card" :class="widgetClasses + ' shadow-mod'">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title text-dark fw-bolder fs-1">
        <slot name="card-title"></slot>
      </h3>

      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen024.svg" />
          </span>
        </button>
        <Dropdown3></Dropdown3>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-0 scroll-mod">
      <template v-for="(item, index) in charges" :key="index">
        <!--begin::Item-->
        <div
          :class="[
            'mb-7' && charges.length - 1 !== index,
            `bg-light-${item.color}`,
          ]"
          class="d-flex align-items-center rounded p-5 mb-7"
        >
          <!--begin::Icon-->
          <span :class="`svg-icon-${item.color}`" class="svg-icon me-5">
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
            </span>
          </span>
          <!--end::Icon-->

          <!--begin::Title-->
          <div class="flex-grow-1 me-2">
            <a
              @click.prevent
              href="#"
              class="fw-bolder text-gray-800 text-hover-primary fs-4"
              >{{ item.title }}</a
            >

            <span class="text-muted fw-bold d-block">{{ item.text }}</span>
          </div>
          <!--end::Title-->

          <!--begin::Lable-->
          <span :class="`text-${item.color}`" class="fs-4 fw-bolder py-1">{{
            item.number
          }}</span>
          <!--end::Lable-->
        </div>
        <!--end::Item-->
      </template>
    </div>

    <div class="card-footer border-0"></div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 6-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";

export default defineComponent({
  name: "listWidget",
  components: {
    Dropdown3,
  },
  props: {
    widgetClasses: String,
    charges: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.scroll-mod {
  height: 50vh;
  overflow-y: auto;
}
.shadow-mod {
  box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
}
</style>
