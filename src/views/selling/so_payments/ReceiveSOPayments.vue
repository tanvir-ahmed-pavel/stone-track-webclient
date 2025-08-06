<template>
  <template v-if="!soPayments.initialLoading">
    <TitleAndButtons
      :title="`Receive Payment - (${soInvoice.so_invoice_number})`"
    >
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Print-->
        <button
          href="#"
          class="btn btn-sm btn-flex btn-success me-3"
          @click.prevent="printPayments()"
          :disabled="soPayments.loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/files/fil009.svg" />
          </span>
          Print Payments
        </button>

        <!--          Go Back-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click="this.$router.back()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
          </span>
          Go Back
        </button>

        <!--        ADD-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary me-3"
          @click.prevent="addPPI"
          :disabled="soPayments.paid_amount <= 0 || soPayments.loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
          Submit
        </button>
      </template>
    </TitleAndButtons>

    <el-form v-loading="soPayments.loading" v-model="soPayments" ref="formRef">
      <!-- Initials -->

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <el-divider>Invoice Details</el-divider>

        <div class="row">
          <div class="col" v-if="soInvoice.so_details">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <div class="row">
                  <div class="col-4">
                    <el-form-item> Project Name: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="soInvoice.so_details.project_title"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> Project Date: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-date-picker
                        :model-value="soInvoice.so_details.created_at"
                        type="date"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        placeholder="Pick a date"
                        style="width: 100%"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </el-card>
            </el-form-item>
          </div>

          <div class="col">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <div class="row">
                  <div class="col-5">
                    <el-form-item> Customer: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="soInvoice.customer.customer_name"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> SI No: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="soInvoice.so_invoice_number"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </el-card>
            </el-form-item>
          </div>

          <div class="col">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <div class="row">
                  <div class="col-5">
                    <el-form-item> Receivable Total: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="soPayments.si_receivable_total"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Total Received: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="soPayments.tillTotalPaidAmount"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Total Dues: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="soPayments.si_outstanding_amount"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </el-card>
            </el-form-item>
          </div>
        </div>
      </el-card>

      <el-card class="box-card mb-4">
        <el-divider>Payment Receive History</el-divider>
        <div
          style="
            min-height: 50px;
            max-height: 300px;
            position: relative;
            overflow: auto;
          "
        >
          <table class="table">
            <thead>
              <tr class="border-bottom-2 fw-bold fs-5">
                <th scope="col">No.</th>
                <th class="" scope="col">Date</th>
                <th class="" scope="col" style="min-width: 406px">
                  Bank/Acc no, Payment Medium & Type
                </th>
                <th class="" scope="col">Received Amount</th>
                <th class="" scope="col" style="min-width: 307px">
                  Payment Note
                </th>

                <th class="" scope="col">Action</th>
              </tr>
            </thead>

            <tbody v-if="soInvoice.salesInvoicePaymentDetails.length > 0">
              <tr
                v-for="(item, index) in soInvoice.salesInvoicePaymentDetails"
                :key="index"
              >
                <!--            INDEX-->
                <th class="align-middle fw-bold fs-5" scope="row">
                  {{ index + 1 }}.
                </th>

                <!--            Date-->
                <td>
                  <el-input
                    v-model="item.posting_date"
                    :input-style="{ 'text-align': 'right', width: '100%' }"
                    size="small"
                    readonly
                  />
                </td>

                <td>
                  <el-input
                    v-model="item.payment_details_media"
                    :input-style="{ 'text-align': 'right', width: '100%' }"
                    size="small"
                    readonly
                  />
                </td>

                <td>
                  <el-input
                    v-model="item.paid_amount"
                    :input-style="{ 'text-align': 'right', width: '100%' }"
                    size="small"
                    readonly
                  />
                </td>

                <td>
                  <el-input
                    v-model="item.payment_note"
                    :input-style="{ 'text-align': 'right', width: '100%' }"
                    size="small"
                    readonly
                  />
                </td>
                <!--                 Action-->
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteItem(item, index)"
                  >
                    <span class="svg-icon svg-icon-4">
                      <inline-svg
                        src="media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td class="text-center" colspan="5">
                  <span class="fs-3 text-muted">No Payments received yet</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-card>

      <!-- Grand Total && Delivery Notes -->
      <el-card class="box-card mb-4">
        <el-divider>Paying Amount Details</el-divider>

        <div class="row g-9">
          <div class="col-md-4 fv-row">
            <label class="fs-6 fw-bold mb-2"
              ><span class="required">Posting Date</span></label
            >
            <el-form-item prop="posting_date">
              <el-date-picker
                v-model="soPayments.posting_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date"
                style="width: 100%"
                size="small"
                :clearable="false"
                :editable="false"
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2"
              ><span class="required">Mode of Payment</span></label
            >
            <el-form-item prop="mode_of_payment">
              <el-select
                v-model="soPayments.mode_of_payment"
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
            <el-form-item>
              <el-input
                v-model="soPayments.payment_note"
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
            <el-form-item prop="soPayments.chart_of_account_head_id">
              <el-select
                v-model="soPayments.chart_of_account_head_id"
                filterable
                placeholder="Select Bank Details"
                style="width: 100%"
                size="small"
                @change="calcBalance()"
                :disabled="soPayments.disable1"
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
            <el-form-item prop="cheque_ref_no">
              <el-input
                v-model="soPayments.cheque_ref_no"
                size="small"
                placeholder="Enter Ref/Tx/Cheque no"
                :disabled="soPayments.disable1"
              />
            </el-form-item>

            <label class="fs-6 fw-bold mb-2"
              ><span class="required">Reference/Tx/Cheque Date</span></label
            >
            <el-form-item>
              <el-date-picker
                v-model="soPayments.cheque_ref_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date for Ref/Tx/Cheque"
                style="width: 100%"
                size="small"
                :disabled="soPayments.disable1"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 fv-row">
            <label class="fw-bold fs-6"><span>Available Balance</span></label>
            <el-form-item>
              <el-input
                :input-style="{ background: 'rgb(227, 236, 170)' }"
                :model-value="
                  soPayments.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                "
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2"
              ><span class="required">Receiving Now</span></label
            >
            <el-form-item prop="paid_amount">
              <el-input
                v-model="soPayments.paid_amount"
                type="number"
                placeholder="Enter paying amount"
                size="small"
                @input="cal"
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2">Remaining Amount</label>
            <el-form-item prop="remaining_amount">
              <el-input
                v-model="soPayments.remaining_amount"
                readonly
                size="small"
              />
            </el-form-item>
          </div>
        </div>
      </el-card>
    </el-form>
    <PrintSOPayments ref="printSOPayments"></PrintSOPayments>
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import PrintSOPayments from "@/views/selling/so_payments/PrintSOPayments.vue";

export default defineComponent({
  name: "purchase-order-receive",
  components: {
    PrintSOPayments,
    TitleAndButtons,
  },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);

    return {
      formRef,
      loading,
    };
  },

  data() {
    return {
      soPayments: {
        initialLoading: false,
        so_invoice_id: 0,
        si_receivable_total: 0,
        tillTotalPaidAmount: "0",
        si_outstanding_amount: "0",
        chart_of_account_head_id: "",
        cheque_ref_no: "",
        payment_note: "",
        posting_date: new Date().toISOString().substr(0, 10),
        cheque_ref_date: new Date().toISOString().substr(0, 10),
        mode_of_payment: "Cash Payment",
        paid_amount: 0,
        remaining_amount: "0",
        disable1: true,
        balance: 0,

        items: [
          {
            sl_no: 0,
            posting_date: "",
            payment_details_media: "",
            paid_amount: 0,
            payment_note: "",
            payment_id: "",
            so_payment_number: "",
          },
        ],
      },
    };
  },

  computed: {
    ...mapGetters({
      soInvoice: GETTERS.SO_INVOICE.singleSoInvoice,
      bankAccountList: GETTERS.ACCOUNT.bankAccountList,
      paymentModes: GETTERS.PURCHASE.paymentModes,
    }),

    showPrint() {
      return this["soInvoice"].salesInvoicePaymentDetails.length > 0
        ? true
        : false;
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Receive Payment", ["Selling", "Invoice"]);
    this.clear();
    this.soPayments.so_invoice_id = Number.parseInt(
      this.$route.params.so_invoice_id.toString()
    );
    this.soPayments.initialLoading = true;
    await this.fetchBankAccountList();
    await this.fetchSoInvoice(this.soPayments.so_invoice_id).then(() => {
      this.setVal2();
      this.cal();
    });
    this.soPayments.initialLoading = false;
  },

  methods: {
    ...mapActions({
      fetchSoInvoice: ACTIONS.SO_INVOICE.FETCH_SO_INVOICE,
      deleteSOPayment: ACTIONS.SO_PAYMENT.DELETE_SO_PAYMENT,
      createSoPayment: ACTIONS.SO_PAYMENT.CREATE_SO_PAYMENT,
      fetchBankAccountList: ACTIONS.ACCOUNT.FETCH_BANK_ACCOUNT_LIST,
    }),

    async printPayments() {
      await this.fetchSoInvoice(this.$route.params.so_invoice_id.toString());
      await (this.$refs["printSOPayments"] as any).show({
        data: this.soInvoice,
      });
      (this.$refs["printSOPayments"] as any).print();
    },

    async deleteItem(row, index) {
      Swal.fire({
        title: "Deleting SO Payment: " + row.so_payment_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          if (index > -1) {
            const data = { index: index, id: row.payment_id }; // id is missing in api response
            this.deleteSOPayment(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "SO Payment Deleted Successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                  this.fetchSoInvoice(this.soPayments.so_invoice_id).then(
                    () => {
                      this.setVal2();
                      this.cal();
                    }
                  );
                } else {
                  Swal.fire({
                    text: response.data.message_details
                      ? response.data.message_details
                      : "Error: Couldn't Delete",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                }
              })
              .catch((e) => {
                Swal.fire({
                  icon: "error",
                  title: "Error: Something went wrong",
                  type: "warning",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ok",
                });
              });
          }
        }
      });
    },

    clear() {
      this.soPayments.chart_of_account_head_id = "";
      this.soPayments.cheque_ref_no = "";
      this.soPayments.payment_note = "";
      this.soPayments.posting_date = new Date().toISOString().substr(0, 10);
      this.soPayments.cheque_ref_date = new Date().toISOString().substr(0, 10);
      this.soPayments.mode_of_payment = "Cash Payment";
      this.soPayments.paid_amount = 0;
      this.soPayments.disable1 = true;
    },

    setValue() {
      this.soPayments.disable1 =
        this.soPayments.mode_of_payment == "Cash Payment" ? true : false;
      this.soPayments.chart_of_account_head_id = "";
      this.soPayments.cheque_ref_no = "";
      this.calcBalance();
    },

    setVal2() {
      this.soPayments.si_receivable_total =
        this.soInvoice.si_receivable_total.toLocaleString("en-us");
      this.soPayments.tillTotalPaidAmount =
        this.soInvoice.tillTotalPaidAmount.toLocaleString("en-us");
      this.soPayments.si_outstanding_amount =
        this.soInvoice.si_outstanding_amount.toLocaleString("en-us");
    },

    cal() {
      let remaining_amount = Number(
        this.soPayments.si_outstanding_amount.replace(/[^0-9-.]/g, "")
      );
      this.soPayments.paid_amount =
        this.soPayments.paid_amount > remaining_amount
          ? 0
          : this.soPayments.paid_amount;
      this.soPayments.remaining_amount = (
        remaining_amount - this.soPayments.paid_amount
      ).toLocaleString("en-us");
      this.calcBalance();
    },

    calcBalance() {
      if (this.soPayments.mode_of_payment == "Cash Payment") {
        this.soPayments.balance =
          this.soInvoice.cashBalanceTotal + Number(this.soPayments.paid_amount);
      } else if (this.soPayments.mode_of_payment == "Bank/Mobile Payment") {
        if (this.soPayments.chart_of_account_head_id) {
          let bankBalance = this.bankAccountList.find(
            (elm) => elm.id == this.soPayments.chart_of_account_head_id
          ).account_balance;
          this.soPayments.balance = bankBalance + Number(this.soPayments.paid_amount);
        } else {
          this.soPayments.balance = 0;
        }
      }
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
        this.soPayments.mode_of_payment != "Cash Payment" &&
        (this.soPayments.chart_of_account_head_id == "" ||
          this.soPayments.cheque_ref_no == "")
      ) {
        this.showErrorMsg();
      } else {
        Swal.fire({
          title: "Receiving Payments",
          text: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            this.loading = true;
            setTimeout(() => {
              this.createPIP();
            }, 2000);
          }
        });
      }
    },

    async createPIP() {
      const data = JSON.parse(
        JSON.stringify({
          si_id: this.soPayments.so_invoice_id,
          so_id: this.soInvoice.so_id,
          posting_date: this.soPayments.posting_date,
          mode_of_payment: this.soPayments.mode_of_payment,
          chart_of_account_head_id: this.soPayments.chart_of_account_head_id,
          cheque_ref_no: this.soPayments.cheque_ref_no,
          cheque_ref_date:
            this.soPayments.mode_of_payment == "Cash Payment"
              ? ""
              : this.soPayments.cheque_ref_date,
          paid_amount: this.soPayments.paid_amount,
          payment_note: this.soPayments.payment_note,
        })
      );

      let msg = await this.createSoPayment(data);

      this.loading = false;

      if (msg.length > 0) {
        Swal.fire({
          text: "Payment Received Successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(async () => {

          let row = {
            sl_no: this.soPayments.items.length + 1,
            posting_date: msg[0].posting_date,
            payment_details_media: msg[0].payment_details_media,
            paid_amount: msg[0].paid_amount,
            payment_note: msg[0].payment_note,
            payment_id: msg[0].payment_id,
            so_payment_number: msg[0].so_payment_number,
          };

          this.soInvoice.salesInvoicePaymentDetails.push(row);

          this.clear();
          await this.fetchSoInvoice(this.soPayments.so_invoice_id);
          await this.fetchBankAccountList();
          this.calcBalance();

          let val = Number(msg[0].paid_amount.toString());

          this.soPayments.tillTotalPaidAmount = (
            Number(
              this.soPayments.tillTotalPaidAmount
                .toString()
                .replace(/[^0-9-.]/g, "")
            ) + val
          ).toLocaleString("en-us");
          this.soPayments.remaining_amount =
            this.soPayments.si_outstanding_amount = (
              Number(
                this.soPayments.si_outstanding_amount
                  .toString()
                  .replace(/[^0-9-.]/g, "")
              ) - val
            ).toLocaleString("en-us");
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
