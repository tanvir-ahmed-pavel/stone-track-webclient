<template>
  <TitleAndButtons
    title="Generator Reports (Generator Deutz 560 KVA II 448 KW)"
  >
    <!--    Buttons-->
    <template v-slot:buttons>
      <router-link to="/generator">
        <button type="button" class="btn btn-sm btn-flex btn-primary">
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr013.svg" />
          </span>
          Generator Log
        </button>
      </router-link>
    </template>
  </TitleAndButtons>

  <div class="card shadow-sm">
    <div class="card-header py-5 align-items-center justify-content-between">
      <!--      Info-->
      <div
        class="notice d-flex bg-hover-light bg-lighten rounded border-gray-700 border border-dashed py-3 px-4"
      >
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="d-flex text-center flex-column mx-5">
            <div class="fw-bold">
              <h4 class="fs-4 fw-bolder text-gray-700">
                {{ "For The Month Of" }}
              </h4>

              <div class="fs-3">
                <b>
                  {{
                    new Date(month).toLocaleString("en-us", { month: "long" })
                  }}
                  {{ new Date(month).getFullYear() }}</b
                >
              </div>
            </div>
          </div>
          <!--end::Content-->
        </div>

        <!--        Diesel Consumption Per Hour-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="d-flex text-center flex-column mx-5">
            <div class="fw-bold">
              <h4 class="fs-4 fw-bolder text-gray-700">
                {{ "Diesel Per Hour (L/H)" }}
              </h4>

              <div class="fs-3">
                <b
                  >{{
                    (
                      generatorReport.total.diesel /
                        generatorReport.total.workingHours || 0
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                  Litter</b
                >
              </div>
            </div>
          </div>
          <!--end::Content-->
        </div>

        <!--        Working Hour Per Litter-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="d-flex text-center flex-column mx-5">
            <div class="fw-bold">
              <h4 class="fs-4 fw-bolder text-gray-700">
                {{ "Working Hour Per Litter" }}
              </h4>

              <div class="fs-3">
                <b
                  >{{
                    (
                      generatorReport.total.workingHours /
                        generatorReport.total.diesel || 0
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                  Hour</b
                >
              </div>
            </div>
          </div>
          <!--end::Content-->
        </div>

        <!--        Cost Per Hour-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="d-flex text-center flex-column mx-5">
            <div class="fw-bold">
              <h4 class="fs-4 fw-bolder text-gray-700">
                {{ "Cost Per Hour" }}
              </h4>

              <div class="fs-3">
                <b
                  >{{
                    (
                      generatorReport.total.amount /
                        generatorReport.total.workingHours || 0
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                  ৳</b
                >
              </div>
            </div>
          </div>
          <!--end::Content-->
        </div>

        <!--end::Wrapper-->
      </div>

      <!--      Filter-->
      <div
        class="notice d-flex bg-hover-light bg-lighten rounded border-gray-700 border border-dashed py-3 px-4"
      >
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="d-flex text-center flex-column mx-5">
            <div class="fw-bold">
              <h4 class="fs-4 fw-bolder text-gray-700">
                {{ "Filter By Month" }}
              </h4>

              <div class="fs-3">
                <el-date-picker
                  class="me-3"
                  v-model="month"
                  @change="
                    fetchGeneratorReport(
                      new Date(month).toString().substring(0, 10)
                    )
                  "
                  type="month"
                  size="small"
                  format="MM-YYYY"
                  :editable="false"
                  placeholder="Pick a month"
                />
              </div>
            </div>
          </div>
          <!--end::Content-->
        </div>
        <!--end::Wrapper-->
      </div>
    </div>
    <div class="card-body">
      <table class="table table-striped">
        <thead class="text-center">
          <th
            class="fw-bolder fs-3"
            scope="col"
            v-for="(head, index) in table.head"
            :key="index"
          >
            {{ head }}
          </th>
        </thead>
        <tbody>
          <template v-if="generatorReport.data.length > 0">
            <tr
              v-for="(tableRow, rowIndex) in generatorReport.data"
              :key="rowIndex"
              class="text-center border-bottom-2 border-gray-400 border-dashed"
            >
              <td class="py-5 fs-5">
                <span>
                  {{ tableRow.run_date }}
                </span>
              </td>
              <td class="py-5 fs-5">
                <span>
                  {{ tableRow.meter }}
                </span>
              </td>

              <td class="py-5 fs-5">
                <span>
                  {{ tableRow.diesel_litter }}
                </span>
              </td>

              <td class="py-5 fs-5">
                <span>
                  {{ tableRow.amount }}
                </span>
              </td>

              <td class="py-5 fs-5">
                <span>
                  {{ tableRow.working_hours }}
                </span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td :colspan="table.head.length" class="text-center">
                <span class="fs-3 fa-w-3">No Records</span>
              </td>
            </tr>
          </template>
        </tbody>

        <tfoot
          v-if="generatorReport.data.length > 0"
          class=""
          style="position: sticky; inset-block-end: 0"
        >
          <tr class="fs-3 fw-bolder text-center bg-light shadow-mod">
            <th class="">
              {{ "" }}
            </th>
            <th class="">
              {{ "Total: " }}
            </th>
            <th class="">
              {{ generatorReport.total.diesel }}
            </th>
            <th>
              {{ generatorReport.total.amount.toLocaleString() + " ৳" }}
            </th>
            <th>
              {{ generatorReport.total.workingHours }}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "GeneratorReports",
  components: {
    TitleAndButtons,
  },

  setup() {
    const table = {
      head: ["Date", "Meter", "Diesel(L)", "Amount", "Working Hour"],
    };
    const month = ref(new Date());
    return {
      table,
      month,
    };
  },
  data() {
    return {
      loading: false,
    };
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Generator Reports", ["Generator"]);
    this.loading = true;
    await this.fetchGeneratorReport(
      new Date(this.month).toString().substring(0, 10)
    );
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchGeneratorReport: ACTIONS.GENERATOR_LOG.FETCH_GENERATOR_REPORT,
    }),
  },

  computed: {
    ...mapGetters({
      generatorReport: GETTERS.GENERATOR_LOG.generatorReport,
    }),
  },
});
</script>

<style scoped>
.shadow-mod {
  -webkit-box-shadow: 0px -3px 1px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px -3px 1px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px -3px 1px 0px rgba(0, 0, 0, 0.4);
}
</style>
