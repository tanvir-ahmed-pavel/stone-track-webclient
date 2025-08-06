<template>
  <template v-if="!loading">
    <TitleAndButtons title="Accounts Receivable Summary">
      <!--    Buttons-->
      <template v-slot:buttons>
        <router-link to="/reports/accounts-receivable-details">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            Accounts Receivable Details Report
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
            ref="formRefACP"
            class="demo-form-inline"
            style="width: auto"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item
                  label="Customer"
                  size="small"
                  class="mb-0"
                  prop="customer_id"
                >
                  <el-select
                    fit-input-width
                    v-model="postData.customer_id"
                    filterable
                    clearable
                    placeholder="Select an Customer"
                    size="small"
                  >
                    <el-option
                      value="0"
                      label="Select Customer"
                      key="0"
                      aria-selected="true"
                      >Select Customer
                    </el-option>
                    <el-option
                      v-for="customer in customerList"
                      :key="customer.id"
                      :label="customer.customer_name"
                      :value="customer.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
                    class="w-75"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
                    class="w-75"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="text-lg-end">
                <el-form-item class="mb-0 w-100">
                  <button
                    type="button"
                    class="btn btn-sm btn-success w-100"
                    @click="loadAccountsReceivableSummaryReportData"
                  >
                    <span class="svg-icon svg-icon-2">
                      <inline-svg
                        src="media/icons/duotune/general/gen004.svg"
                      />
                    </span>
                    Search
                  </button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--end::Content-->
        </div>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead class="text-center">
            <tr class="fw-bolder fs-3">
              <th>Customer Name</th>
              <th class="text-lg-end">Invoice Amount</th>
              <th class="text-lg-end">Paid Amount</th>
              <th class="text-lg-end p-3">Outstanding Amount</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="accountReceivableSummaryReport.data.length>0">
              <tr
                v-for="(tableRow, rowIndex) in accountReceivableSummaryReport.data"
                :key="rowIndex"
                class="border-bottom-2 border-gray-400 border-dashed"
              >
                <td class="py-5 fs-5 px-5 w-50">
                  <span>
                    {{ tableRow.customer_name }}
                  </span>
                </td>
                <td class="py-5 fs-5 text-lg-end w-auto">
                  <span class="text-right">
                    {{ tableRow.receivable_total }} ৳
                  </span>
                </td>
                <td class="py-5 fs-5 text-lg-end w-auto">
                  <span> {{ tableRow.outstanding_amount }} ৳ </span>
                </td>
                <td class="py-5 fs-5 text-lg-end p-3">
                  <span> {{ tableRow.paid_total }} ৳ </span>
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
            v-if="accountReceivableSummaryReport.data.length>0"
            class=""
            style="position: sticky; inset-block-end: 0"
          >
            <tr class="fs-3 fw-bolder bg-light shadow-mod">
              <th class="text-lg-end">
                {{ "Total: " }}
              </th>
              <th class="text-lg-end">
                {{ accountReceivableSummaryReport.total.receivable_total }} ৳
              </th>
              <th class="text-lg-end">
                {{ accountReceivableSummaryReport.total.outstanding_amount }} ৳
              </th>
              <th class="text-lg-end p-3">
                {{ accountReceivableSummaryReport.total.paid_total }} ৳
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
  name: "accountsReceivableSummary",
  components: {
    TitleAndButtons,
  },

  setup() {
    const formRefACP = (ref < null) | (HTMLFormElement > null);

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
      formRefACP,
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
      table: {
        head: [
          "Customer Name",
          "Invoice Amount",
          "Paid Amount",
          "Outstanding Amount",
        ],
      },
    };
  },

  computed: {
    ...mapGetters({
      accountReceivableSummaryReport: GETTERS.ACCOUNT.accountReceivableSummaryReport,
      customerList: GETTERS.CUSTOMER.customerList,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Accounts Receivable Summary", ["Reports"]);
    this.loading = true;
    await this.fetchCustomerList();
    await this.loadAccountsReceivableSummaryReportData();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchAccountsReceivableSummaryReport:
        ACTIONS.ACCOUNT.FETCH_ACCOUNTS_RECEIVABLE_SUMMARY_REPORT,
      fetchCustomerList: ACTIONS.CUSTOMER.FETCH_CUSTOMER_LIST,
    }),

    loadAccountsReceivableSummaryReportData() {
      if (this.postData.start_date != null && this.postData.end_date != null) {
        var data = JSON.parse(
          JSON.stringify({
            startDate: this.postData.start_date,
            endDate: this.postData.end_date,
            customerID: this.postData.customer_id,
          })
        );

        this.fetchAccountsReceivableSummaryReport(data);
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
