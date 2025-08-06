<template>
  <template v-if="!loading">
    <TitleAndButtons title="Accounts Payable Details">
      <!--    Buttons-->
      <template v-slot:buttons>
        <router-link to="/reports/accounts-payable-summary">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            Accounts Payable Summary Report
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
                  label="Supplier"
                  size="small"
                  class="mb-0"
                  prop="supplier_id"
                >
                  <el-select
                    fit-input-width
                    v-model="postData.supplier_id"
                    filterable
                    clearable
                    placeholder="Select an Supplier"
                    size="small"
                  >
                    <el-option
                      value="0"
                      label="Select Supplier"
                      key="0"
                      aria-selected="true"
                      >Select Supplier
                    </el-option>
                    <el-option
                      v-for="supplier in supplierList"
                      :key="supplier.id"
                      :label="supplier.supplier_name"
                      :value="supplier.id"
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
                    @click="loadAccountsPyableDetailsReportData"
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
          <thead class="">
            <tr class="fw-bolder fs-3">
              <th>Invoice Date</th>
              <th>LC Number</th>
              <th>Supplier Name</th>
              <th>Due Date</th>
              <th>Voucher No</th>
              <th class="text-lg-end">Invoice Amount</th>
              <th class="text-lg-end">Paid Amount</th>
              <th class="text-lg-end p-3">Outstanding Total</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="accountPayableDetailsReport.data.length>0">
              <tr
                v-for="(tableRow, rowIndex) in accountPayableDetailsReport.data"
                :key="rowIndex"
                class="border-bottom-2 border-gray-400 border-dashed"
              >
                <td class="py-5 fs-5 px-5">
                  <span>
                    {{ tableRow.invoice_date }}
                  </span>
                </td>
                <td class="py-5 fs-5 px-5">
                  <span>
                    {{ tableRow.lc_number }}
                  </span>
                </td>
                <td class="py-5 fs-5">
                  <span>
                    {{ tableRow.supplier_name }}
                  </span>
                </td>

                <td class="py-5 fs-5">
                  <span>
                    {{ tableRow.due_date }}
                  </span>
                </td>

                <td class="py-5 fs-5">
                  <span>
                    {{ tableRow.po_invoice_number }}
                  </span>
                </td>
                <td class="py-5 fs-5 text-lg-end w-auto">
                  <span class="text-right">
                    {{ tableRow.payable_total }} ৳
                  </span>
                </td>
                <td class="py-5 fs-5 text-lg-end p-3">
                  <span> {{ tableRow.paid_total }} ৳ </span>
                </td>
                <td class="py-5 fs-5 text-lg-end w-auto">
                  <span> {{ tableRow.outstanding_amount }} ৳ </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td :colspan="8" class="text-center">
                  <span class="fs-3 fa-w-3">No Records</span>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot
            v-if="accountPayableDetailsReport.data.length>0"
            class=""
            style="position: sticky; inset-block-end: 0"
          >
            <tr class="fs-3 fw-bolder bg-light shadow-mod">
              <th colspan="5" class="text-lg-end">
                {{ "Total: " }}
              </th>
              <th class="text-lg-end">
                {{ accountPayableDetailsReport.total.payable_total }} ৳
              </th>
              <th class="text-lg-end p-3">
                {{ accountPayableDetailsReport.total.paid_total }} ৳
              </th>
              <th class="text-lg-end">
                {{ accountPayableDetailsReport.total.outstanding_amount }} ৳
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
  name: "accountsPayableDetails",
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
        supplier_id: "0",
        start_date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
      },
      table: {
        head: [
          "Invoice Date",
          "LC Number",
          "Supplier Name",
          "Voucher No",
          "Due Date",
          "Payable Total",
          "Paid Total",
          "Outstanding Total",
        ],
      },
    };
  },

  computed: {
    ...mapGetters({
      accountPayableDetailsReport: GETTERS.ACCOUNT.accountsPayableDetailsReport,
      supplierList: GETTERS.SUPPLIER.supplierList,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Accounts Payable Details", ["Reports"]);
    this.loading = true;
    await this.fetchSupplierList();
    await this.loadAccountsPyableDetailsReportData();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchAccountsPayableDetailsReport:
        ACTIONS.ACCOUNT.FETCH_ACCOUNTS_PAYABLE_DETAILS_REPORT,
      fetchSupplierList: ACTIONS.SUPPLIER.FETCH_SUPPLIER_LIST,
    }),

    loadAccountsPyableDetailsReportData() {
      if (this.postData.start_date != null && this.postData.end_date != null) {
        var data = JSON.parse(
          JSON.stringify({
            startDate: this.postData.start_date,
            endDate: this.postData.end_date,
            supplierID: this.postData.supplier_id,
          })
        );

        this.fetchAccountsPayableDetailsReport(data);
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
