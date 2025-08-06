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
                <div class="fs-4 text-dark fw-bolder">4</div>
                <div class="fs-7 text-muted fw-bold">Active LC</div>
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
                <div class="fs-4 text-dark fw-bolder">5</div>
                <div class="fs-7 text-muted fw-bold">Running Projects</div>
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
                <div class="fs-4 text-dark fw-bolder">112,000 ৳</div>
                <div class="fs-7 text-muted fw-bold">ATM/W IBBL</div>
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
                <div class="fs-4 text-dark fw-bolder">856,000 ৳</div>
                <div class="fs-7 text-muted fw-bold">CQ/W IBBL</div>
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
                <div class="fs-4 text-dark fw-bolder">352,000 ৳</div>
                <div class="fs-7 text-muted fw-bold">Loan</div>
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
  name: "SummaryCardMain",
  components: {},
  props: {
    items: Object,
    widgetClasses: String,
    chartColor: String,
  },
  setup(props) {
    return {};
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
