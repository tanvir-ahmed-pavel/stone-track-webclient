<template>
  <!--begin::Mixed Widget 6-->
  <div :class="widgetClasses" class="card shadow-mod">
    <!--begin::Beader-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-1 mb-1">
          <slot name="title"></slot>
        </span>

        <span class="text-muted fw-bold fs-7"
          ><slot name="inner-title"></slot
        ></span>
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
        <Dropdown1></Dropdown1>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body p-0 d-flex flex-column">
      <div class="flex-grow-1">
        <!--begin::Chart-->
        <apexchart
          class="mixed-widget-4-chart"
          :options="chartOptions"
          :series="series"
          :height="300"
          type="donut"
        ></apexchart>
        <!--end::Chart-->
      </div>

      <!--begin::Stats-->
      <div class="card-px flex-grow-1">
        <!--begin::Row-->
        <div class="row g-0 mt-5 mb-5">
          <!--begin::Col-->
          <div
            v-for="(item, index) in data"
            v-bind:key="index"
            class="col-4 my-4"
          >
            <div class="d-flex align-items-center me-2">
              <!--begin::Symbol-->
              <div class="symbol symbol-50px me-3" v-if="item.title">
                <div
                  :class="`symbol-label bg-light-success bg-light-${item.iconColor}`"
                >
                  <span
                    :class="`svg-icon svg-icon-1 svg-icon-success svg-icon-${item.iconColor}`"
                  >
                    <!--                    media/icons/duotune/art/art007.svg-->
                    <inline-svg
                      :src="'media/icons/duotune/abstract/abs027.svg'"
                    />
                  </span>
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="fs-5 fw-bold">{{ item.title }}</div>
                <div class="fs-2 text-dark fw-bolder">{{ item.value }}</div>
              </div>

              <!--end::Title-->
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
      </div>
      <!--end::Stats-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Mixed Widget 6-->
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";

export default defineComponent({
  name: "summary-card-2",
  components: {
    Dropdown1,
  },
  props: {
    items: Object,
    widgetClasses: String,
    labels: Array,
    chartColor: String,
    chartHeight: String,
    chartData1: Object,
    chartData2: Object,
  },
  setup(props) {
    const data = ref(props.items);
    const chartOptions = {
      colors:['#19ce30', '#dc2852'],

      labels: props.labels ?props.labels:["Paid Total", "Due Total"],
      chart: {
        height: props.chartHeight,
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
        show: true,
        curve: "smooth",
        width: 2,
        dashArray: 1,
      },
    };

    const series = [
      Number(props.chartData1!['value']),
      Number(props.chartData2!['value'])
    ];

    return {
      series,
      chartOptions,
      data,
    };
  },
});
</script>
<style scoped>
.shadow-mod {
  box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
}
</style>
