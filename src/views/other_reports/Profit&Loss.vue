<template>
  <template v-if="!loading">
    <TitleAndButtons title="Profit & Loss Reports">
      <!--    Buttons-->
      <!--      <template v-slot:buttons>-->
      <!--        <router-link to="/reports/bank-statement">-->
      <!--          <button type="button" class="btn btn-sm btn-flex btn-primary">-->
      <!--            Bank Statement Reports-->
      <!--          </button>-->
      <!--        </router-link>-->
      <!--      </template>-->
    </TitleAndButtons>
    <div class="card shadow-sm">
      <div class="card-header py-5 align-items-center justify-content-between">
        <!-- Filter -->
        <div
          class="col-12 notice bg-hover-light bg-lighten rounded border-gray-700 border border-dashed py-3 px-4"
        >
          <!--begin::Content-->
          <el-form
            :model="postData"
            :inline="true"
            :rules="rules"
            ref="formRef"
            class="demo-form-inline"
            style="width: auto"
          >
            <div class="row justify-content-end">
              <div class="col-12 text-end">
                <el-form-item
                  label="Start Date"
                  size="small"
                  class="mb-0"
                  prop="start_date"
                >
                  <el-date-picker
                    v-model="postData.start_date"
                    type="month"
                    value-format="MM-YYYY"
                    format="MM-YYYY"
                    placeholder="Starting date"
                    size="small"
                  >
                  </el-date-picker>
                </el-form-item>



                <el-form-item
                  size="small"
                  class="mb-0"
                  prop="dateRange"
                  w="100"
                >
                  <!--                  <el-date-picker-->
                  <!--                    class="w-100"-->
                  <!--                    format="MM-YYYY"-->
                  <!--                    v-model="dateRange"-->
                  <!--                    type="monthrange"-->
                  <!--                    range-separator="-"-->
                  <!--                    start-placeholder="Start month"-->
                  <!--                    end-placeholder="End month"-->
                  <!--                    :disabled-date="disabledDate"-->
                  <!--                  />-->
                  <el-date-picker
                    v-model="postData.end_date"
                    type="month"
                    value-format="MM-YYYY"
                    format="MM-YYYY"
                    placeholder="Ending date"
                    size="small"
                    :disabled-date="disabledDate"
                  >
                  </el-date-picker>
                </el-form-item>

                <button
                  type="button"
                  class="btn btn-sm btn-success btn-flex"
                  @click="loadApis"
                >
                  <span class="svg-icon svg-icon-2">
                    <inline-svg src="media/icons/duotune/general/gen004.svg" />
                  </span>
                  Search
                </button>
              </div>
            </div>
          </el-form>
          <!--end::Content-->
        </div>
      </div>
      <div class="card-body">
        <div class="row g-5 g-xl-8 justify-content-center">
          <div class="col-xl-3">
            <StatisticCard2
              widget-classes="card-xl-stretch mb-xl-5"
              svg-icon="media/icons/duotune/finance/fin003.svg"
              color="light-success"
              icon-color="primary"
              :title="'85,925' + ' ৳'"
              description="Total Income"
            ></StatisticCard2>
          </div>
          <div class="col-1 d-flex align-items-center justify-content-center">
            <div class="">
              <div class="card bg-dark px-3 py-0 fw-bold fs-1 text-white mb-4">
                -
              </div>
            </div>
          </div>

          <div class="col-xl-3">
            <StatisticCard2
              widget-classes="card-xl-stretch mb-xl-5"
              svg-icon="media/icons/duotune/finance/fin003.svg"
              color="light-danger"
              icon-color="primary"
              :title="'85,925' + ' ৳'"
              description="Total Expense"
            ></StatisticCard2>
          </div>

          <div class="col-1 d-flex align-items-center justify-content-center">
            <div class="">
              <div
                class="card bg-success px-3 py-0 fw-bold fs-1 text-white mb-4"
              >
                =
              </div>
            </div>
          </div>

          <div class="col-xl-3">
            <StatisticCard2
              widget-classes="card-xl-stretch mb-xl-5"
              svg-icon="media/icons/duotune/finance/fin003.svg"
              color="primary"
              icon-color="white"
              :title="'85,925' + ' ৳'"
              description="Net Income"
            ></StatisticCard2>
          </div>
        </div>

        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script>
import { defineComponent, ref } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import StatisticCard2 from "@/views/reuseable/StatisticCard2.vue";

export default defineComponent({
  name: "Profit&loss",
  components: {
    TitleAndButtons,
    StatisticCard2,
  },

  setup() {
    const formRef = (ref < null) | (HTMLFormElement > null);

    const checkDate = (rule, value, callback) => {
      if (!value.isArray() || value == []) {
        callback(new Error("Please input the Date"));
      } else {
        if (dateRange.value[0] !== "" && dateRange.value[1] !== "") {
          if (!formRef.value) return;
          formRef.value.validateField("dateRange", () => null);
        }
        callback();
      }
    };


    const rules = ref({
      dateRange: [
        {
          validator: checkDate,
          message: "Please select date.",
          trigger: "change",
        },
      ],
    });

    const dateRange = ref([]);
    return {
      rules,
      formRef,
      dateRange,
    };
  },

  data() {
    return {
      series: [
        {
          name: "Income",
          data: [
            44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000,
            58000, 63000,
          ],
        },
        {
          name: "Expense",
          data: [
            76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000, 94000,
            26000, 45000,
          ],
        },
        {
          name: "Net Profit/Loss",
          data: [
            35000, 41000, 36000, 26000, 45000, 48000, 52000, 53000, 41000,
            26000, 45000,
          ],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "35%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yaxis: {
          title: {
            text: "৳ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "৳ " + val.toLocaleString() + " thousands";
            },
          },
        },
      },
      loading: false,
      postData: {
        customer_id: "0",
        start_date: new Date(new Date().setDate(new Date().getDate() - 30))
          .toISOString()
          .substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
      },
    };
  },

  computed: {
    ...mapGetters({
      cashStatementReport: GETTERS.OTHER_REPORTS.cashStatementReport,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Cash Statement", ["Reports"]);
    this.loading = true;
    await this.loadApis();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchCashStatementReports:
        ACTIONS.OTHER_REPORTS.FETCH_CASH_STATEMENT_REPORT,
    }),

    disabledDate(date){
      if (this.postData.start_date) {
        let end = new Date(this.postData.start_date);
        end.setMonth(end.getMonth() + 12);
        if (end < date) {
          return true;
        }
        return true;
      }
    },

    loadApis() {
      if (this.postData.start_date != null && this.postData.end_date != null) {
        var data = JSON.parse(
          JSON.stringify({
            startDate: this.postData.start_date,
            endDate: this.postData.end_date,
          })
        );

        this.fetchCashStatementReports(data);
      }
    },
  },
});
</script>

<style scoped>
.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
