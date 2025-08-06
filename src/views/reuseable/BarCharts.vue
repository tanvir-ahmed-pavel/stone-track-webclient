<template>
  <!--begin::Charts Widget 6-->
  <div :class="widgetClasses" class="card shadow-mod">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Last 7 Days Sales</span>

        <span class="text-muted fw-bold fs-7">More than 500+ new sales</span>
      </h3>
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        type="bar"
        height="400"
        :options="options"
        :series="series"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 6-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";

export default defineComponent({
  name: "BarCharts",
  props: {
    widgetClasses: String,
  },
  components: {},
  setup() {
    const labelColor = getCSSVariableValue("--bs-gray-500");
    const borderColor = getCSSVariableValue("--bs-gray-200");

    const baseColor = getCSSVariableValue("--bs-primary");
    const baseLightColor = getCSSVariableValue("--bs-light-primary");
    const secondaryColor = getCSSVariableValue("--bs-info");

    const options = {
      chart: {
        fontFamily: "inherit",
        stacked: true,
        height: 300,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          stacked: true,
          horizontal: false,
          endingShape: "rounded",
          columnWidth: ["15%"],
        },
      },
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "01/01/2022",
          "02/01/2022",
          "03/01/2022",
          "04/01/2022",
          "05/01/2022",
          "06/01/2022",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        max: 300,
        labels: {
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
        },
        y: {
          formatter: function (val) {
            return "$" + val + " thousands";
          },
        },
      },
      colors: [baseColor, secondaryColor, baseLightColor],
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    };

    const series = [
      {
        name: "1/2'",
        type: "bar",
        stacked: true,
        data: [40, 50, 65, 70, 50, 30],
      },
      {
        name: "1/2mm",
        type: "bar",
        stacked: true,
        data: [40, 50, 65, 70, 50, 30],
      },
      {
        name: "3/4 mm",
        type: "bar",
        stacked: true,
        data: [40, 50, 65, 70, 50, 30],
      },
      {
        name: "Item 66",
        type: "bar",
        stacked: true,
        data: [20, 20, 25, 30, 30, 20],
      },
      {
        name: "Item 69",
        type: "bar",
        stacked: true,
        data: [20, 20, 25, 30, 30, 20],
      },
    ];

    return {
      options,
      series,
    };
  },
});
</script>

<style scoped>
.shadow-mod {
  box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
  -webkit-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
  -moz-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
}
</style>
