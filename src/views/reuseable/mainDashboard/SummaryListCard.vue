<template>
  <!--begin::List Widget 1-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Header-->
      <div
        :class="`bg-${widgetColor}`"
        class="px-9 pt-7 card-rounded h-275px w-100"
      >
        <!--begin::Heading-->
        <div class="d-flex flex-stack">
          <h3 class="m-0 text-white fw-bolder fs-1">
            <slot name="card-title"></slot>
          </h3>

          <div class="ms-1">
            <!--begin::Menu-->
            <button
              type="button"
              :class="`btn-active-color-${widgetColor}`"
              class="btn btn-sm btn-icon btn-color-white btn-active-white border-0 me-n3"
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
        <!--end::Heading-->

        <!--begin::Balance-->
        <div
          v-if="titles"
          class="d-flex text-white mt-5 justify-content-around"
        >
          <div
            class="d-flex text-center flex-column mx-5"
            v-for="(title, index) in titles"
            :key="index"
          >
            <div
              class="notice d-flex bg-hover-light bg-lighten rounded border-gray-700 border border-dashed py-3 px-4"
            >
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack flex-grow-1">
                <!--begin::Content-->
                <div class="fw-bold">
                  <h4 class="fs-2 fw-bolder">
                    {{ title.value }}
                  </h4>

                  <div class="fs-6 fs-3 text-gray-700">
                    {{ title.name }}
                  </div>
                </div>
                <!--end::Content-->
              </div>
              <!--end::Wrapper-->
            </div>
          </div>
        </div>
        <!--end::Balance-->
      </div>
      <!--end::Header-->

      <!--      Tables-->
      <div
        class="shadow-mod card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-white scroll-mod"
        :style="titles ? 'margin-top: -100px' : 'margin-top: -180px'"
      >
        <!--begin::Item-->
        <div class="d-flex align-items-center">
          <table class="table table-striped">
            <thead class="text-center">
              <th
                class="fw-bolder fs-4"
                scope="col"
                v-for="(head, index) in heading"
                :key="index"
              >
                {{ head }}
              </th>
            </thead>
            <tbody>
              <template v-if="table.length > 0">
                <tr
                  v-for="(tableRow, rowIndex) in table"
                  :key="rowIndex"
                  class="text-center border-bottom-2 border-gray-400 border-dashed"
                >
                  <template v-if="keys">
                    <td
                      class="py-6"
                      v-for="(key, cellIndex) in keys"
                      :key="cellIndex"
                    >
                      <router-link
                        v-if="key == 'actionLink' && routePrefix"
                        class="fs-6"
                        :to="routePrefix + tableRow[key]"
                      >
                        <el-button size="mini" type="primary">
                          {{ "View" }}
                        </el-button>
                      </router-link>

                      <span v-else>
                        {{ tableRow[key] }}
                      </span>
                    </td>
                  </template>

                  <template v-else>
                    <td
                      class="py-6"
                      v-for="(tableCell, key, cellIndex) in tableRow"
                      :key="cellIndex"
                    >
                      <router-link
                        v-if="key == 'actionLink' && routePrefix"
                        class="fs-6"
                        :to="routePrefix + tableCell"
                      >
                        <el-button size="mini" type="primary">
                          {{ "View" }}
                        </el-button>
                      </router-link>

                      <span v-else>
                        {{ tableCell }}
                      </span>
                    </td>
                  </template>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td :colspan="heading.length" class="text-center">
                    <span class="fs-3 fa-w-3">No Records</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!--end::Item-->
      </div>
      <!--end::Items-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 1-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";

export default defineComponent({
  name: "SummaryListCard",
  components: {
    Dropdown3,
  },
  props: {
    widgetClasses: String,
    keys: Array,
    widgetColor: String,
    chartHeight: Number,
    titles: Array,
    table: Array,
    heading: Array,
    routePrefix: String,
  },
  setup() {
    return {
      // items,
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

.scroll-mod {
  height: 434px;
  overflow-y: auto;
}
</style>
