<template>
  <template v-if="!initLoading">
    <!-- Submit -->
    <TitleAndButtons title="Purchase Payment Invoice">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Print-->
        <a
          v-if="showPrint"
          href="#"
          class="btn btn-sm btn-flex btn-success me-3"
          @click.prevent="printPayments()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/files/fil009.svg" />
          </span>
          Print Payments
        </a>

        <!--          Go Back-->
        <button
          @click.prevent="this.$router.back()"
          type="button"
          class="btn btn-sm btn-flex btn-info me-3"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
          </span>
          Go Back
        </button>
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click="resetForm"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr029.svg" />
          </span>
          Reset
        </button>
        <!--        ADD-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary me-3"
          @click.prevent="addPPI"
          :disabled="paid_amount <= 0 || loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
          Submit
        </button>
      </template>
    </TitleAndButtons>
    <!--  <div class="card">-->
    <el-form :model="form" :rules="rules" ref="formRef" v-loading="loading">
      <!-- Initials -->

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <el-divider>Purchase Payment Invoice</el-divider>

        <div class="row">
          <div class="col" v-if="piDetailsById.lc_details">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <div class="row">
                  <div class="col-4">
                    <el-form-item> LC No: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="piDetailsById.lc_details.lc_number"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> LC Date: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-date-picker
                        v-model="piDetailsById.lc_details.created_at"
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
                    <el-form-item> Supplier: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="piDetailsById.supplier.supplier_name"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> PI No: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="piDetailsById.po_invoice_number"
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
                    <el-form-item> Payable Total: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="pi_payable_total"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Total Paid: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="tillTotalPaidAmount"
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
                        v-model="outstanding_amount"
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
        <el-divider>Paid Amount Details</el-divider>
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
                <th class="" scope="col">Paid Amount</th>
                <th class="" scope="col" style="min-width: 307px">
                  Payment Note
                </th>
                <th class="" scope="col">Action</th>
              </tr>
            </thead>

            <tbody v-if="piDetailsById.purchaseInvoicePaymentDetails.length>0">
              <tr v-for="(item, index) in piDetailsById.purchaseInvoicePaymentDetails" :key="index">
                <!--            INDEX-->
                <th class="align-middle fw-bold fs-5" scope="row">
                  {{ index+1}}.
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
            <el-form-item>
              <el-date-picker
                v-model="posting_date"
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
                v-model="mode_of_payment"
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
                v-model="payment_note"
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
            <el-form-item prop="chart_of_account_head_id">
              <el-select
                v-model="chart_of_account_head_id"
                filterable
                placeholder="Select Bank Details"
                style="width: 100%"
                size="small"
                :disabled="disable1"
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
                v-model="cheque_ref_no"
                size="small"
                placeholder="Enter Ref/Tx/Cheque no"
                :disabled="disable1"
              />
            </el-form-item>

            <label class="fs-6 fw-bold mb-2"
              ><span class="required">Reference/Tx/Cheque Date</span></label
            >
            <el-form-item>
              <el-date-picker
                v-model="cheque_ref_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date for Ref/Tx/Cheque"
                style="width: 100%"
                size="small"
                :disabled="disable1"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 fv-row">
            <label class="fw-bold fs-6 mb-2"
              ><span class="required">Paying Now</span></label
            >
            <el-form-item prop="paid_amount">
              <el-input
                v-model="paid_amount"
                type="number"
                placeholder="Enter paying amount"
                size="small"
                @input="cal"
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2">Remaining Amount</label>
            <el-form-item prop="remaining_amount">
              <el-input v-model="remaining_amount" readonly size="small" />
            </el-form-item>
          </div>
        </div>
      </el-card>
    </el-form>
    <PrintPOPayments ref="printPOPayments"></PrintPOPayments>
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import PrintPOPayments from "@/views/purchase/PrintPOPayments.vue";

export default defineComponent({
  name: "purchase-order-receive",
  components: { PrintPOPayments, TitleAndButtons },

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
      initLoading: false,
      pi_id: 0,
      pi_payable_total: 0,
      tillTotalPaidAmount: "0",
      outstanding_amount: "0",
      chart_of_account_head_id: "",
      cheque_ref_no: "",
      payment_note: "",
      posting_date: new Date().toISOString().substr(0, 10),
      cheque_ref_date: new Date().toISOString().substr(0, 10),
      mode_of_payment: "Cash Payment",
      paid_amount: 0,
      remaining_amount: "0",
      disable1: true,

      items: [
        {
          sl_no: 0,
          posting_date: "",
          payment_details_media: "",
          paid_amount: 0,
          payment_note: "",
          payment_id: "",
          po_payment_number: "",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      piDetailsById: GETTERS.PURCHASE.piDetailsById,
      bankAccountList: GETTERS.ACCOUNT.bankAccountList,
      paymentModes: GETTERS.PURCHASE.paymentModes,
    }),

    showPrint() {
      return this["piDetailsById"].purchaseInvoicePaymentDetails.length > 0 ? true : false;
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchase Payment Invoice", [
      "Buying - Purchase Invoice List",
    ]);
    this.initLoading = true;
    this.pi_id = await Number.parseInt(this.$route.params.id.toString());
    await this.fetchPiDetailsById(this.pi_id);
    await this.fetchBankAccountList();
    await this.setVal2();
    await this.cal();
    this.initLoading = false;
  },

  methods: {
    ...mapActions({
      fetchPiDetailsById: ACTIONS.PURCHASE.FETCH_PI_DETAILS_BY_ID,
      createPIPayment: ACTIONS.PURCHASE.CREATE_PI_PAYMENT,
      fetchBankAccountList: ACTIONS.ACCOUNT.FETCH_BANK_ACCOUNT_LIST,
      deletePIPayment: ACTIONS.PURCHASE.DELETE_PI_PAYMENT,
    }),

    async deleteItem(row, index) {
      Swal.fire({
        title: "Deleting PO Payment: " + row.po_payment_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {

          if (index > -1) {
            const data = { index: index, id: row.payment_id }; // id is missing in api response
            this.deletePIPayment(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "PO Payment Deleted Successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                  this.fetchPiDetailsById(this.pi_id).then(()=>{
                    this.setVal2();
                    this.cal();
                  })

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

    async printPayments() {
      await this.fetchPiDetailsById(this.$route.params.id.toString());
      await (this.$refs["printPOPayments"] as any).show({
        data: this.piDetailsById,
      });
      (this.$refs["printPOPayments"] as any).print();
    },

    clear() {
      this.chart_of_account_head_id = "";
      this.cheque_ref_no = "";
      this.payment_note = "";
      this.posting_date = new Date().toISOString().substr(0, 10);
      this.cheque_ref_date = new Date().toISOString().substr(0, 10);
      this.mode_of_payment = "Cash Payment";
      this.paid_amount = 0;
      this.disable1 = true;
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
      this.disable1 = this.mode_of_payment == "Cash Payment" ? true : false;
      this.chart_of_account_head_id = "";
      this.cheque_ref_no = "";
    },

    setVal2() {
      this.pi_payable_total =
        this.piDetailsById.pi_payable_total.toLocaleString("en-us");
      this.tillTotalPaidAmount =
        this.piDetailsById.tillTotalPaidAmount.toLocaleString("en-us");
      this.outstanding_amount =
        this.piDetailsById.outstanding_amount.toLocaleString("en-us");
    },

    cal() {
      var remaining_amount = Number(
        this.outstanding_amount.replace(/[^0-9-.]/g, "")
      );
      this.paid_amount =
        this.paid_amount > remaining_amount ? 0 : this.paid_amount;
      this.remaining_amount = (
        remaining_amount - this.paid_amount
      ).toLocaleString("en-us");
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
        this.mode_of_payment != "Cash Payment" &&
        (this.chart_of_account_head_id == "" || this.cheque_ref_no == "")
      ) {
        this.showErrorMsg();
      } else {
        Swal.fire({
          title: "Creating Purchase Payment Invoice",
          text: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              this.createPIP();
            }, 2000);
          }
        });
      }
    },

    async createPIP() {
      this.loading = true;

      const data = JSON.parse(
        JSON.stringify({
          pi_id: this.pi_id,
          lc_id: this.piDetailsById.lc_id ? this.piDetailsById.lc_id : null,
          po_id: this.piDetailsById.po_id,
          po_receipt_id: this.piDetailsById.po_receipt_id,
          posting_date: this.posting_date,
          mode_of_payment: this.mode_of_payment,
          chart_of_account_head_id: this.chart_of_account_head_id,
          cheque_ref_no: this.cheque_ref_no,
          cheque_ref_date:
            this.mode_of_payment == "Cash Payment"
              ? null
              : this.cheque_ref_date,
          paid_amount: this.paid_amount,
          payment_note: this.payment_note,
        })
      );

      var msg = await this.createPIPayment(data);

      this.loading = false;

      if (msg.length > 0) {
        Swal.fire({
          text: "Purchase payment made successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          // this.$router.push({ name: "pi-list" });

          var row = {
            sl_no: this.items.length + 1,
            posting_date: msg[0].posting_date,
            payment_details_media: msg[0].payment_details_media,
            paid_amount: msg[0].paid_amount,
            payment_note: msg[0].payment_note,
            payment_id: msg[0].payment_id,
            po_payment_number: msg[0].po_payment_number,
          };

          this.piDetailsById.purchaseInvoicePaymentDetails.push(row);


          this.clear();

          var val = Number(msg[0].paid_amount.toString());

          this.tillTotalPaidAmount = (
            Number(
              this.tillTotalPaidAmount.toString().replace(/[^0-9-.]/g, "")
            ) + val
          ).toLocaleString("en-us");
          this.remaining_amount = this.outstanding_amount = (
            Number(
              this.outstanding_amount.toString().replace(/[^0-9-.]/g, "")
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
