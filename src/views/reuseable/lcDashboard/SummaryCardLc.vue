<template>
  <!--begin::Mixed Widget 6-->
  <div :class="widgetClasses" class="card shadow-mod">
    <!--begin::Beader-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-1 mb-1">
          <slot name="title"></slot>
        </span>
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
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body p-0 d-flex flex-column">
      <!--begin::Stats-->
      <div class="card-px flex-grow-1">
        <!--begin::Row-->
        <div class="row g-0 mb-5">
          <!--begin::Col-->
          <div v-for="(item, index) in items" v-bind:key="index" class="col">
            <div class="d-flex align-items-center me-2">
              <!--begin::Symbol-->
              <div class="symbol symbol-50px me-3">
                <div :class="`symbol-label bg-light-${item.iconColor}`">
                  <span
                    :class="`svg-icon svg-icon-1 svg-icon-${item.iconColor}`"
                  >
                    <!--                    media/icons/duotune/art/art007.svg-->
                    <inline-svg :src="item.icon" />
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

          <!--begin::Col-->
          <div class="col">
            <div class="d-flex align-items-center me-2">
              <!--begin::Symbol-->
              <div class="symbol symbol-50px me-3">
                <div class="symbol-label bg-light-danger">
                  <span class="svg-icon svg-icon-1 svg-icon-danger">
                    <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                  </span>
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="fs-4 text-dark fw-bolder">{{ lc.lc_number }}</div>
                <div class="fs-7 text-muted fw-bold">LC Number</div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div class="col">
            <div class="d-flex align-items-center me-2">
              <!--begin::Symbol-->
              <div class="symbol symbol-50px me-3">
                <div class="symbol-label bg-light-success">
                  <span class="svg-icon svg-icon-1 svg-icon-success">
                    <inline-svg
                      src="media/icons/duotune/ecommerce/ecm002.svg"
                    />
                  </span>
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="fs-4 text-dark fw-bolder">
                  {{ new Date(lc.issue_date).toLocaleString().substr(0, 8) }}
                </div>
                <div class="fs-7 text-muted fw-bold">LC Date</div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div class="col mb-3">
            <div class="d-flex align-items-center me-2">
              <!--begin::Symbol-->
              <div class="symbol symbol-50px me-3">
                <div class="symbol-label bg-light-primary">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg
                      src="media/icons/duotune/ecommerce/ecm010.svg"
                    />
                  </span>
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="fs-4 text-dark fw-bolder">{{lc.issuing_bank_name}}</div>
                <div class="fs-7 text-muted fw-bold">Issuing Bank</div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div class="col mb-3">
            <div class="d-flex align-items-center me-2">
              <!--begin::Symbol-->
              <div class="symbol symbol-50px me-3">
                <div class="symbol-label bg-light-primary">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg
                      src="media/icons/duotune/ecommerce/ecm010.svg"
                    />
                  </span>
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="fs-4 text-dark fw-bolder">{{lc.supplier_name}}</div>
                <div class="fs-7 text-muted fw-bold">Supplier</div>
              </div>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Col-->


          <!--begin::Col-->
          <div class="col mb-3">
            <div class="d-flex align-items-center me-2">
              <!--begin::Symbol-->
              <div class="symbol symbol-50px me-3">
                <div class="symbol-label bg-light-primary">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg
                      src="media/icons/duotune/ecommerce/ecm010.svg"
                    />
                  </span>
                </div>
              </div>
              <!--end::Symbol-->

              <!--begin::Title-->
              <div>
                <div class="fs-4 text-dark fw-bolder">{{lc.lc_conversion_rate}}</div>
                <div class="fs-7 text-muted fw-bold">Rate</div>
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
import { defineComponent, ref } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";

export default defineComponent({
  name: "SummaryCardLc",
  components: {},
  props: {
    lc: Object,
    items: Object,
    widgetClasses: String,
    chartColor: String,
    chartHeight: String,
  },
  setup(props) {
    const color = ref(props.chartColor);

    const labelColor = getCSSVariableValue("--bs-" + "gray-800");
    const strokeColor = getCSSVariableValue("--bs-" + "gray-300");
    const baseColor = getCSSVariableValue("--bs-" + color.value);
    const lightColor = getCSSVariableValue("--bs-light-" + color.value);

    const chartOptions = {
      chart: {
        fontFamily: "inherit",
        type: "area",
        height: props.chartHeight,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [baseColor],
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: strokeColor,
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        min: 0,
        max: 60,
        labels: {
          show: false,
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
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
      colors: [lightColor],
      markers: {
        colors: [lightColor],
        strokeColor: [baseColor],
        strokeWidth: 3,
      },
    };

    const series = [
      {
        name: "Net Profit",
        data: [30, 25, 45, 30, 55, 55],
      },
    ];

    return {
      series,
      chartOptions,
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
