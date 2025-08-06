<template>
  <template v-if="!loading">
    <TitleAndButtons title="Bank Statement Reports">
      <!--    Buttons-->
      <template v-slot:buttons>
        <router-link to="/reports/cash-statement">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            Cash Statement Reports
          </button>
        </router-link>
      </template>
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
              <div class="col-12 d-flex justify-content-end align-items-center text-end">
                <el-form-item
                  label="Start Date"
                  size="small"
                  class="mb-0"
                  prop="start_date"
                >
                  <el-date-picker
                    v-model="postData.start_date"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="Starting date"
                    size="small"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  label="End Date"
                  size="small"
                  class="mb-0"
                  prop="end_date"
                >
                  <el-date-picker
                    v-model="postData.end_date"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="Ending date"
                    size="small"
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
        <table class="table table-striped">
          <thead class="text-center">
            <tr class="fw-bolder fs-3">
              <th>Date</th>
              <th class="text-lg-end">Bill Number</th>
              <th class="text-lg-end">Account Head</th>
              <th class="text-lg-end p-3">Bank / Mobile AC</th>
              <th class="text-lg-end p-3">Income</th>
              <th class="text-lg-end p-3">Expense</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="bankStatementReport.data.length > 0">
              <tr
                v-for="(
                  tableRow, rowIndex
                ) in bankStatementReport.data"
                :key="rowIndex"
                class="border-bottom-2 border-gray-400 border-dashed"
              >
                <td class="py-5 fs-5 px-5">
                  <span>
                    {{ tableRow.posting_date }}
                  </span>
                </td>
                <td class="py-5 fs-5 text-lg-end w-auto">
                  <span class="text-right">
                    {{ tableRow.payment_number }}
                  </span>
                </td>
                <td class="py-5 fs-5 text-lg-end w-auto">
                  <span> {{ tableRow.account_head_name }} </span>
                </td>
                <td class="py-5 fs-5 text-lg-end w-auto">
                  <span> {{ tableRow.account_head_name }} </span>
                </td>
                <td class="py-5 fs-5 text-lg-end p-3">
                  <span> ৳ {{ tableRow.amount_income }}  </span>
                </td>
                <td class="py-5 fs-5 text-lg-end p-3">
                  <span> ৳ {{ tableRow.amount_expenses }}  </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td :colspan="6" class="text-center">
                  <span class="fs-3 fa-w-3">No Records</span>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot
            v-if="bankStatementReport.data.length > 0"
            class=""
            style="position: sticky; inset-block-end: 0"
          >
            <tr class="fs-3 fw-bolder bg-light shadow-mod-total">
              <th colspan="4" class="text-lg-end">
                {{ "Total: " }}
              </th>
              <th class="text-lg-end">
                ৳ {{ bankStatementReport.total.totalIncome.toLocaleString() }}
              </th>
              <th class="text-lg-end">
                ৳ {{ bankStatementReport.total.totalExpenses.toLocaleString() }}
              </th>
            </tr>
          </tfoot>
        </table>
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

export default defineComponent({
  name: "BankStatementReports",
  components: {
    TitleAndButtons,
  },

  setup() {
    const formRef = (ref < null) | (HTMLFormElement > null);

    const rules = ref({
      start_date: [
        {
          required: true,
          message: "Please select start date.",
          trigger: "change",
        },
      ],
      end_date: [
        {
          required: true,
          message: "Please select end date.",
          trigger: "change",
        },
      ],
    });

    return {
      rules,
      formRef,
    };
  },

  data() {
    return {
      loading: false,
      postData: {
        customer_id: "0",
        start_date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
      },
    };
  },

  computed: {
    ...mapGetters({
      bankStatementReport:
        GETTERS.OTHER_REPORTS.bankStatementReport,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Accounts Receivable Summary", ["Reports"]);
    this.loading = true;
    await this.loadApis();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchBankStatementReports:
        ACTIONS.OTHER_REPORTS.FETCH_BANK_STATEMENT_REPORT,
    }),

    loadApis() {
      if (this.postData.start_date != null && this.postData.end_date != null) {
        var data = JSON.parse(
          JSON.stringify({
            startDate: this.postData.start_date,
            endDate: this.postData.end_date,
            accountHeadID: "0"
          })
        );

        this.fetchBankStatementReports(data);
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
