<template>
  <template v-if="!loading">
    <TitleAndButtons title="Payment Entry">
      <!--    Buttons-->
      <template v-slot:buttons>
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click="resetForm"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
          </span>
          Reset
        </button>

        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary"
          @click.prevent="addPPI"
        >
          <span v-if="!loading" class="indicator-label">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
            </span>
          </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...<span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span
          ></span>
          Submit
        </button>
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
                <label class="required fs-6 fw-bold">Payment Type</label>
                <div>
                  <el-form-item class="mb-0" prop="bill_type">
                    <el-select
                      v-model="data.bill_type"
                      filterable
                      placeholder="Select Payment Type"
                      size="small"
                      @change="
                        [calcBalance(), (data.chart_of_account_head_id = '')]
                      "
                    >
                      <el-option label="Income" value="Income" />
                      <el-option label="Expenses" value="Expenses" />
                      <el-option
                        label="Bank/Cash Transfer"
                        value="Bank/Cash Transfer"
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
                      v-model="data.chart_of_account_head_id"
                      filterable
                      placeholder="Select a Chart of A/C"
                      size="small"
                    >
                      <template
                        v-for="chart in allChartOfAccount"
                        :key="chart.id"
                      >
                        <el-option
                          v-if="
                            data.bill_type == 'Bank/Cash Transfer'
                              ? chart.root_type == 'Asset' &&
                                (chart.parent_id == 11 || chart.parent_id == 12)
                              : data.bill_type == chart.root_type
                          "
                          :label="chart.account_head_name"
                          :value="chart.id"
                        />
                      </template>
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
              ><span class="required">Posting Date</span></label
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
              ><span class="required">Mode of Payment</span></label
            >
            <el-form-item prop="mode_of_payment">
              <el-select
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
              ><span class="required">Bank/Acc no</span></label
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
                @change="calcBalance"
                :disabled="data.disable1"
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
              ><span class="required">Reference/Tx/Cheque No</span></label
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
                v-model="data.cheque_ref_no"
                size="small"
                placeholder="Enter Ref/Tx/Cheque no"
                :disabled="data.disable1"
              />
            </el-form-item>

            <label class="fs-6 fw-bold mb-2"
              ><span class="required">Reference/Tx/Cheque Date</span></label
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
                v-model="data.cheque_ref_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date for Ref/Tx/Cheque"
                style="width: 100%"
                size="small"
                :disabled="data.disable1"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 fv-row">
            <label class="fw-bold fs-6"><span>Available Balance</span></label>
            <el-form-item
              prop="balance"
              :rules="{
                min: 0,
                type: 'number',
                message: 'Not Enough Balance!!',
                trigger: 'change',
              }"
            >
              <el-input
                :input-style="{ background: 'rgb(227, 236, 170)' }"
                :model-value="
                  data.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                "
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2"
              ><span class="required">Paying Now</span></label
            >
            <el-form-item
              prop="paid_amount"
              :rules="{
                required: true,
                min: 0.1,
                type: 'number',
                message: 'Please input amount',
                trigger: 'change',
              }"
            >
              <el-input
                @input="calcBalance"
                v-model.number="data.paid_amount"
                type="number"
                class="w-100 text-start"
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
  name: "PaymentEntry",
  components: { TitleAndButtons },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);

    function validate() {
      if (!formRef.value) {
        return;
      }
      let flag = false;
      formRef.value.validate((res) => {
        console.log(res);
        flag = res;
      });

      return flag;
    }
    return {
      formRef,
      validate,
      loading,
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
        paid_amount: Number(0),
        disable1: true,
        balance: 0,
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
      balance: GETTERS.ACCOUNT.balance,
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
    this.loading = true;
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Payment Entry", ["Payment"]);
    await this.fetchAccountList();
    await this.fetchBankAccountList();
    await this.fetchFixedAssetAccountList();
    await this.fetchLcList();
    await this.fetchBalance();
    this.calcBalance();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchBankAccountList: ACTIONS.ACCOUNT.FETCH_BANK_ACCOUNT_LIST,
      fetchAccountList: ACTIONS.ACCOUNT.FETCH_ACCOUNT_LIST,
      fetchFixedAssetAccountList:
        ACTIONS.ACCOUNT.FETCH_FIXED_ASSET_ACCOUNT_LIST,
      fetchLcList: ACTIONS.LC.FETCH_LC_LIST,
      createIncomeExpense: ACTIONS.ACCOUNT.CREATE_INCOME_EXPENSE,
      fetchBalance: ACTIONS.ACCOUNT.FETCH_BALANCE,
    }),

    calcBalance() {
      if (this.data.mode_of_payment == "Cash Payment") {
        if (
          this.data.bill_type == "Expenses" ||
          this.data.bill_type == "Bank/Cash Transfer"
        ) {
          this.data.balance =
            this.balance.cashBalanceTotal - this.data.paid_amount;
        } else {
          this.data.balance =
            this.balance.cashBalanceTotal + this.data.paid_amount;
        }
      } else if (this.data.mode_of_payment == "Bank/Mobile Payment") {
        if (this.data.chart_of_account_bank_head_id) {
          let bankBalance = this.bankAccountList.find(
            (elm) => elm.id == this.data.chart_of_account_bank_head_id
          ).account_balance;
          if (
            this.data.bill_type == "Expenses" ||
            this.data.bill_type == "Bank/Cash Transfer"
          ) {
            this.data.balance = bankBalance - this.data.paid_amount;
          } else {
            this.data.balance = bankBalance + this.data.paid_amount;
          }
        } else {
          this.data.balance = 0;
        }
      }
    },

    clear() {
      this.data.bill_type = "Income";
      this.data.chart_of_account_head_id = "";
      this.data.lc_id = "";
      this.data.account_id = "";

      this.data.chart_of_account_bank_head_id = "";
      this.data.cheque_ref_no = "";
      this.data.payment_note = "";
      this.data.posting_date = new Date().toISOString().substr(0, 10);
      this.data.cheque_ref_date = new Date().toISOString().substr(0, 10);
      this.data.mode_of_payment = "Cash Payment";
      this.data.paid_amount = Number(0);
      this.data.disable1 = true;
    },

    resetForm() {
      Swal.fire({
        title: "Resetting",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          this.clear();
        }
      });
    },

    setValue() {
      this.data.disable1 = this.data.mode_of_payment == "Cash Payment";
      this.data.chart_of_account_bank_head_id = "";
      this.data.cheque_ref_no = "";
      this.calcBalance();
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
      Swal.fire({
        title: "Creating Payment Entry",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          if (this.validate()) {
            this.createInEx();
          } else {
            this.showErrorMsg();
          }
        }
      });
    },

    async createInEx() {
      this.loading = true;

      const data = JSON.parse(
        JSON.stringify({
          bill_type: this.data.bill_type,
          chart_of_account_head_id: this.data.chart_of_account_head_id,
          lc_id: this.data.lc_id,
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
          text: "Payment recorded successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(async () => {
          await this.fetchBalance();
          await this.fetchBankAccountList();
          this.clear();
          this.calcBalance();
        });
      } else {
        this.showErrorMsg();
      }
    },
  },
  watch: {
    showLC() {
      if (!this.showLC) {
        this.data.lc_id = "";
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
