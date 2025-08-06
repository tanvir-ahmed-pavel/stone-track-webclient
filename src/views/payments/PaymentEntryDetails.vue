<template>
  <template v-if="!loading">
    <TitleAndButtons title="Payment Entry Details">
      <!--    Buttons-->
      <template v-slot:buttons>
        <router-link to="/payment-entry-list">
          <button
            type="button"
            class="btn btn-sm btn-flex btn-primary"
            style="margin-right: 10px"
          >
            Back to Income/Expense List
          </button>
        </router-link>
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form :model="data" ref="formRef">
      <!-- Initials -->

      <!-- Selected Items -->

      <el-card class="box-card mb-4">
        <table class="table mb-0">
          <tbody class="">
            <tr class="justify-content-end">
              <td>
                <label class="required fs-6 fw-bold">Bill Type</label>
                <div>
                  <el-form-item class="mb-0" prop="bill_type">
                    <el-select
                      disabled
                      v-model="data.bill_type"
                      filterable
                      placeholder="Select Bill Type"
                      size="small"
                      @change="setVal"
                    >
                      <el-option
                        v-for="bill in billTypes"
                        :key="bill.id"
                        :label="bill.billType"
                        :value="bill.billType"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </td>

              <td>
                <label class="required fs-6 fw-bold">Chart of A/C</label>
                <div>
                  <el-form-item
                    class="mb-0"
                    prop="chart_of_account_head_id"
                    :rules="{
                      required: true,
                      message: 'Please select a Chart of A/C from the list',
                      trigger: 'change',
                    }"
                  >
                    <el-select
                      disabled
                      v-model="data.chart_of_account_head_id"
                      filterable
                      placeholder="Select a Chart of A/C"
                      size="small"
                    >
                      <el-option
                        v-for="chart in allChartOfAccount"
                        :key="chart.id"
                        :label="chart.account_head_name"
                        :value="chart.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </td>

              <!--              LC-->
              <td v-if="showLC">
                <label class="required fs-6 fw-bold">LC List</label>
                <div>
                  <el-form-item
                    class="mb-0"
                    prop="lc_id"
                    :rules="{
                      required: true,
                      type: 'number',
                      message: 'Please select a lc from the list',
                      trigger: 'change',
                    }"
                  >
                    <el-select
                      disabled
                      v-model="data.lc_id"
                      filterable
                      placeholder="Select a Chart of A/C"
                      size="small"
                    >
                      <el-option
                        v-for="item in lcList"
                        :key="item.id"
                        :label="item.lc_number"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>

      <!-- Grand Total && Delivery Notes -->
      <el-card class="box-card mb-4">
        <el-divider>Transaction Details</el-divider>

        <div class="row g-9">
          <div class="col-md-4 fv-row">
            <label class="fs-6 fw-bold mb-2"
              ><span>Posting Date</span></label
            >
            <el-form-item
              :rules="{
                required: true,
                message: 'Posting Date in needed',
                trigger: 'change',
              }"
              prop="posting_date"
            >
              <el-date-picker
                readonly
                v-model="data.posting_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date"
                style="width: 100%"
                size="small"
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2"
              ><span>Mode of Payment</span></label
            >
            <el-form-item prop="mode_of_payment">
              <el-select
                disabled
                v-model="data.mode_of_payment"
                filterable
                style="width: 100%"
                placeholder="Select a Mode of Payment"
                size="small"
                @change="setValue"
              >
                <el-option
                  v-for="mode in paymentModes"
                  :key="mode.id"
                  :label="mode.paymentMode"
                  :value="mode.paymentMode"
                  size="small"
                />
              </el-select>
            </el-form-item>

            <label class="fs-6 fw-bold mb-2"><span>Notes</span></label>
            <el-form-item prop="payment_note">
              <el-input
                readonly
                v-model="data.payment_note"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 2 }"
                size="small"
                resize="none"
                placeholder="Please input"
              />
            </el-form-item>
          </div>
          <div class="col-md-4 fv-row">
            <label class="fs-6 fw-bold mb-2"
              ><span>Bank/Acc no</span></label
            >
            <el-form-item
              prop="chart_of_account_bank_head_id"
              :rules="{
                required: !data.disable1,
                message: 'Please select a Bank A/C from the list',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="data.chart_of_account_bank_head_id"
                filterable
                placeholder="Select Bank Details"
                style="width: 100%"
                size="small"
                disabled
              >
                <el-option
                  v-for="bank in bankAccountList"
                  :key="bank.id"
                  :label="bank.account_head_name"
                  :value="bank.id"
                />
              </el-select>
            </el-form-item>

            <label class="fw-bold fs-6 mb-2"
              ><span>Reference/Tx/Cheque No</span></label
            >
            <el-form-item
              prop="cheque_ref_no"
              :rules="{
                required: !data.disable1,
                message: 'Please provide Reference',
                trigger: 'change',
              }"
            >
              <el-input
                readonly
                v-model="data.cheque_ref_no"
                size="small"
                placeholder="Enter Ref/Tx/Cheque no"
              />
            </el-form-item>

            <label class="fs-6 fw-bold mb-2"
              ><span>Reference/Tx/Cheque Date</span></label
            >
            <el-form-item
              prop="cheque_ref_date"
              :rules="{
                required: !data.disable1,
                message: 'Please provide Ref Date',
                trigger: 'change',
              }"
            >
              <el-date-picker
                readonly
                v-model="data.cheque_ref_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date for Ref/Tx/Cheque"
                style="width: 100%"
                size="small"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 fv-row">
            <label class="fw-bold fs-6 mb-2"
              ><span>Paid Amount</span></label
            >
            <el-form-item
              prop="paid_amount"
              :rules="{
                required: true,
                type: 'number',
                min: 0.1,
                message: 'Please input amount',
                trigger: 'change',
              }"
            >
              <el-input
                readonly
                v-model="data.paid_amount"
                type="number"
                placeholder="Enter paying amount"
                size="small"
              />
            </el-form-item>
          </div>
        </div>
      </el-card>
      <!--    </div>-->
    </el-form>
    <!--  </div>-->
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "PaymentEntryDetails",
  components: { TitleAndButtons },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);

    // Reset Form
    const resetForm = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Resetting",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          if (!formRef.value) {
            return;
          }
          formRef.value.clearValidate();
          formRef.value.resetFields();
        }
      });
    };

    return {
      formRef,
      loading,
      resetForm,
    };
  },

  data() {
    return {
      data: {
        bill_type: "Income",
        chart_of_account_head_id: "",
        lc_id: "",
        account_id: "",
        chart_of_account_bank_head_id: "",
        cheque_ref_no: "",
        payment_note: "",
        posting_date: new Date().toISOString().substr(0, 10),
        cheque_ref_date: new Date().toISOString().substr(0, 10),
        mode_of_payment: "Cash Payment",
        paid_amount: 0,
        disable1: true,
      },
    };
  },

  computed: {
    ...mapGetters({
      billTypes: GETTERS.ACCOUNT.billTypes,
      allChartOfAccount: GETTERS.LOOKUP_DATA.allChartOfAccount,
      bankAccountList: GETTERS.ACCOUNT.bankAccountList,
      paymentModes: GETTERS.PURCHASE.paymentModes,
      lcList: GETTERS.LC.lcList,
      incomeExpenseDetails: GETTERS.ACCOUNT.incomeExpenseDetails,
    }),
    showLC() {
      return (
        Number(this["data"].chart_of_account_head_id) == 79 ||
        Number(this["data"].chart_of_account_head_id) == 80 ||
        Number(this["data"].chart_of_account_head_id) == 81 ||
        Number(this["data"].chart_of_account_head_id) == 82
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Payment Entry Details", ["Payment"]);

    this.loading = true;
    let ie_id = Number.parseInt(this.$route.params.id.toString());
    await this.fetchIncomeExpenseDetails(ie_id);
    await this.fetchAccountList();
    await this.fetchBankAccountList();
    await this.fetchLcList();

    await this.setValue();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchIncomeExpenseDetails: ACTIONS.ACCOUNT.FETCH_INCOME_EXPENSE_DETAILS,
      fetchLcList: ACTIONS.LC.FETCH_LC_LIST,
      fetchBankAccountList: ACTIONS.ACCOUNT.FETCH_BANK_ACCOUNT_LIST,
      fetchAccountList: ACTIONS.ACCOUNT.FETCH_ACCOUNT_LIST,
      createIncomeExpense: ACTIONS.ACCOUNT.CREATE_INCOME_EXPENSE,
    }),

    setValue() {
      this.data.disable1 = this.incomeExpenseDetails.mode_of_payment == "Cash Payment";

      this.data.bill_type = this.incomeExpenseDetails.bill_type;

      this.data.chart_of_account_bank_head_id =
              this.data.disable1? "" : this.incomeExpenseDetails.chart_of_account_bank_head_id;

      this.data.posting_date = this.incomeExpenseDetails.posting_date;

      this.data.mode_of_payment = this.incomeExpenseDetails.mode_of_payment;

      this.data.chart_of_account_head_id =
        this.incomeExpenseDetails.chart_of_account_head_id;

      this.data.cheque_ref_no = this.incomeExpenseDetails.cheque_ref_no;

      this.data.cheque_ref_date = this.incomeExpenseDetails.cheque_ref_date;

      this.data.paid_amount = this.incomeExpenseDetails.paid_amount;

      this.data.payment_note = this.incomeExpenseDetails.payment_note;

      this.data.lc_id = this.incomeExpenseDetails.lc_id;
    },

    showErrorMsg() {
      Swal.fire({
        text: "Sorry, looks like there are some errors detected, please try again.",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
      return false;
    },

    addPPI() {
      if (
        this.data.mode_of_payment != "Cash Payment" &&
        (this.data.chart_of_account_head_id == "" ||
          this.data.cheque_ref_no == "")
      ) {
        this.showErrorMsg();
      } else {
        Swal.fire({
          title: "Creating Payment Entry",
          text: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              this.createInEx();
            }, 2000);
          }
        });
      }
    },

    async createInEx() {
      this.loading = true;

      const data = JSON.parse(
        JSON.stringify({
          bill_type: this.data.bill_type,
          chart_of_account_head_id: this.data.chart_of_account_head_id,
          posting_date: this.data.posting_date,
          mode_of_payment: this.data.mode_of_payment,
          chart_of_account_bank_head_id:
            this.data.chart_of_account_bank_head_id,
          cheque_ref_no: this.data.cheque_ref_no,
          cheque_ref_date:
            this.data.mode_of_payment == "Cash Payment"
              ? null
              : this.data.cheque_ref_date,
          paid_amount: this.data.paid_amount,
          payment_note: this.data.payment_note,
        })
      );

      var msg = await this.createIncomeExpense(data);

      this.loading = false;

      if (msg.length > 0) {
        Swal.fire({
          text: "Transaction recorded successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.$router.back();
        });
      } else {
        this.showErrorMsg();
      }
    },
  },
});
</script>

<style scoped>
.mod-btn-style {
  text-align: left;
  font-weight: 100;
  /* background-color: gray; */
  border-color: gray;
  width: 100%;
  padding-left: 12px;
}
</style>
