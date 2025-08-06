<template>
  <template v-if="!initLoading">
    <!-- Submit -->
    <TitleAndButtons title="PO Payment">
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

      <el-card class="box-card mb-4">
        <div class="row">
          <div class="col-4">
            <el-divider>LC/PO Details</el-divider>
            <el-form-item>
              <div
                v-if="poPaymentsDetails.lc_details"
                class="border border-dark card bg-light rounded px-2 py-2 mb-2"
              >
                <div class="row">
                  <div class="col-4">
                    <el-form-item> LC No: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="poPaymentsDetails.lc_details.lc_number"
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
                        v-model="poPaymentsDetails.lc_details.issue_date"
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

                <!--                Lc Qty-->
                <div class="row">
                  <div class="col-4">
                    <el-form-item> LC QTY: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.lc_details.total_order_quantity.toLocaleString()
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>

              <!--              Po Details-->
              <div class="border border-dark card bg-light rounded px-2 py-2">
                <div class="row">
                  <div class="col-4">
                    <el-form-item> Po No: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="poPaymentsDetails.po_number"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> PO Total QTY: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.total_order_quantity.toLocaleString()
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <!--                PO Date-->
                <div class="row">
                  <div class="col-4">
                    <el-form-item> PO Date: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-date-picker
                        v-model="poPaymentsDetails.order_date"
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

                <!--                Supplier-->
                <div class="row">
                  <div class="col-4">
                    <el-form-item> Supplier: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="poPaymentsDetails.supplier.supplier_name"
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>

          <div class="col-4">
            <el-divider>Payment Statistics</el-divider>
            <el-form-item>
              <!--              Po Payments-->
              <div
                class="border border-dark card bg-light rounded px-2 py-2 mb-2"
              >
                <div class="row">
                  <div class="col-4">
                    <el-form-item> Payable Total: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.payable_total.toLocaleString()
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item>Total Paid: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.tillTotalPaidAmount.toLocaleString()
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> Total Dues: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.outstanding_amount.toLocaleString()
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>

              <!--              LC Payments-->
              <div
                v-if="poPaymentsDetails.lc_details"
                class="border border-dark card bg-light rounded px-2 py-2"
              >
                <div class="row">
                  <div class="col-4">
                    <el-form-item> Open 10%: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.lc_details
                            .open_10_percent_amount_bdt
                            ? poPaymentsDetails.lc_details.open_10_percent_amount_bdt.toLocaleString()
                            : '-'
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> NOC 50%: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.lc_details.noc_50_percent_amount_bdt
                            ? poPaymentsDetails.lc_details.noc_50_percent_amount_bdt.toLocaleString()
                            : '-'
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item>1st Under: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.lc_details.first_under_amount
                            ? poPaymentsDetails.lc_details.first_under_amount.toLocaleString()
                            : '-'
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item>2nd Under: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.lc_details.second_under_amount
                            ? poPaymentsDetails.lc_details.second_under_amount.toLocaleString()
                            : '-'
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>

          <div class="col-4">
            <el-divider>Received Statistic</el-divider>

            <el-form-item>
              <div class="border border-dark card bg-light rounded px-2 py-2">
                <div class="row">
                  <div class="col-5">
                    <el-form-item> Received Delivery: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.itemReceivedStatistics[0]
                            .number_of_received_delivery
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item>Total Received QTY: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.itemReceivedStatistics[0]
                            .total_received_quantity
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Total Extra QTY: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.itemReceivedStatistics[0]
                            .total_extra_quantity
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Last Received Date: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-date-picker
                        v-model="
                          poPaymentsDetails.itemReceivedStatistics[0]
                            .last_received_date
                        "
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

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Last Received QTY: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.itemReceivedStatistics[0]
                            .last_received_quantity
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Last Received Extra QTY: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        :model-value="
                          poPaymentsDetails.itemReceivedStatistics[0]
                            .last_received_extra_quantity
                        "
                        readonly
                        size="small"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-card>

      <el-card class="box-card mb-4">
        <el-divider>Paid Amount Details</el-divider>
        <div
          style="
            min-height: 50px;
            max-height: 500px;
            position: relative;
            overflow: auto;
          "
        >
          <table class="table table-cus">
            <thead>
              <tr class="fw-bold fs-4">
                <th class="text-center px-3" scope="col">#</th>
                <th class="text-center" scope="col">Date</th>
                <th class="text-center" scope="col">Payment Number</th>
                <th class="text-center" scope="col">Payment Type</th>
                <th class="text-center" scope="col">
                  Bank/Acc no, Payment Medium & Type
                </th>
                <th class="text-center" scope="col" style="min-width: 150px">
                  Paid Amount
                </th>
                <th class="text-center" scope="col">Payment Note</th>
                <th class="text-center px-2" scope="col">Action</th>
              </tr>
            </thead>

            <tbody
              v-if="poPaymentsDetails.purchaseOrderPaymentDetails.length > 0"
            >
              <tr
                v-for="(
                  item, index
                ) in poPaymentsDetails.purchaseOrderPaymentDetails"
                :key="index"
              >
                <!--            INDEX-->
                <td class="text-center fw-bold fs-5">
                  {{ index + 1 }}
                </td>

                <!--            Date-->
                <td class="text-center fs-5">
                  {{ item.posting_date }}
                </td>

                <td class="text-center fs-5">
                  {{ item.po_payment_number }}
                </td>

                <td class="text-center fs-5">
                  {{ item.payment_type }}
                </td>

                <td class="text-center fs-5">
                  {{ item.payment_details_media }}
                </td>

                <td class="text-center fs-5 fw-bold">
                  {{
                    item.paid_amount
                      ? item.paid_amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "-"
                  }}
                </td>

                <td class="text-center fs-5">
                  {{ item.payment_note || "-" }}
                </td>

                <!--                 Action-->
                <td class="text-center fs-5">
                  <span class="">
                    <button
                      class="btn btn-light-danger btn-sm"
                      @click="deleteItem(item, index)"
                    >
                      <span class="svg-icon px-0">
                        <inline-svg
                          src="media/icons/duotune/general/gen027.svg"
                        />
                      </span>
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
            <tr v-else>
              <td class="text-center fw-bold fs-3 mt-2 text-muted" colspan="7">
                No Records
              </td>
            </tr>
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
                @change="calcBalance($event)"
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
            <label class="fw-bold fs-6"><span>Available Balance</span></label>
            <el-form-item>
              <el-input
                :input-style="{ background: 'rgb(227, 236, 170)' }"
                :model-value="
                  balance.toLocaleString(undefined, {
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
            <el-form-item prop="paid_amount">
              <el-input
                v-model="paid_amount"
                type="number"
                placeholder="Enter paying amount"
                size="small"
                @input="cal"
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2 required">Payment Type</label>
            <el-form-item class="w-100" prop="paid_amount">
              <el-select
                :disabled="!poPaymentsDetails.lc_details"
                class="w-100"
                size="small"
                v-model="payment_type"
                filterable
                placeholder="Select Payment Type"
              >
                <el-option
                  label="Regular Bank Payment"
                  value="Regular Bank Payment"
                />
                <el-option label="1st Under" value="1st Under" />
                <el-option label="2nd Under" value="2nd Under" />
                <el-option label="Opening 10%" value="Opening 10%" />
                <el-option label="NOC 50%" value="NOC 50%" />
              </el-select>
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
  name: "PurchasePayment",
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
      po_id: 0,
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
      payment_type: "Regular Bank Payment",
      balance: 0,
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
      poPaymentsDetails: GETTERS.PURCHASE.poPaymentStatistics,
      bankAccountList: GETTERS.ACCOUNT.bankAccountList,
      paymentModes: GETTERS.PURCHASE.paymentModes,
    }),

    showPrint() {
      return this["poPaymentsDetails"].purchaseOrderPaymentDetails.length > 0
        ? true
        : false;
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("PO Payment", ["Buying - Purchase Order"]);
    this.initLoading = true;
    this.po_id = await Number.parseInt(this.$route.params.po_id.toString());
    await this.fetchPoPayments(this.po_id);
    await this.fetchBankAccountList();
    await this.setVal2();
    await this.cal();
    this.initLoading = false;
  },

  methods: {
    ...mapActions({
      fetchPoPayments: ACTIONS.PURCHASE.FETCH_PO_PAYMENT_STATISTICS,
      createPoPayment: ACTIONS.PURCHASE.ADD_PO_PAYMENT,
      fetchBankAccountList: ACTIONS.ACCOUNT.FETCH_BANK_ACCOUNT_LIST,
      deletePOPayment: ACTIONS.PURCHASE.DELETE_PO_PAYMENT,
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
            this.deletePOPayment(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "PO Payment Deleted Successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                  this.fetchPoPayments(this.po_id).then(() => {
                    this.setVal2();
                    this.cal();
                  });
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
      await this.fetchPoPayments(this.$route.params.po_id.toString());
      await (this.$refs["printPOPayments"] as any).show({
        data: this.poPaymentsDetails,
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
      this.calcBalance();
    },

    setVal2() {
      this.pi_payable_total =
        this.poPaymentsDetails.payable_total.toLocaleString("en-us");
      this.tillTotalPaidAmount =
        this.poPaymentsDetails.tillTotalPaidAmount.toLocaleString("en-us");
      this.outstanding_amount =
        this.poPaymentsDetails.outstanding_amount.toLocaleString("en-us");
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

      this.calcBalance();
    },

    calcBalance() {
      if (this.mode_of_payment == "Cash Payment") {
        this.balance =
          this.poPaymentsDetails.cashBalanceTotal - this.paid_amount;
      } else if (this.mode_of_payment == "Bank/Mobile Payment") {
        if (this.chart_of_account_head_id) {
          let bankBalance = this.bankAccountList.find(
            (elm) => elm.id == this.chart_of_account_head_id
          ).account_balance;
          this.balance = bankBalance - this.paid_amount;
        } else {
          this.balance = 0;
        }
      }
    },

    showErrorMsg(p?) {
      Swal.fire({
        text: p
          ? "Please Select Bank and Fill the Cheque Ref Properly. "
          : "Sorry, looks like there are some errors detected, please try again.",
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
        this.showErrorMsg("show validation msg");
      } else if (this.balance < 0) {
        Swal.fire({
          text: "Not Enough Balance Available!!",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return false;
      } else {
        Swal.fire({
          title: `Making Payment for ${this.payment_type} by ${this.mode_of_payment}`,
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
          lc_id: this.poPaymentsDetails.lc_id
            ? this.poPaymentsDetails.lc_id
            : null,
          po_id: this.poPaymentsDetails.id,
          po_receipt_id: this.poPaymentsDetails.po_receipt_id,
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
          payment_type: this.payment_type,
        })
      );

      var msg = await this.createPoPayment(data);

      this.loading = false;

      if (msg.length > 0) {
        Swal.fire({
          text: "Purchase payment made successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(async () => {
          // this.$router.push({ name: "pi-list" });

          var row = {
            sl_no: this.items.length + 1,
            posting_date: msg[0].posting_date,
            payment_details_media: msg[0].payment_details_media,
            paid_amount: msg[0].paid_amount,
            payment_note: msg[0].payment_note,
            payment_id: msg[0].payment_id,
            po_payment_number: msg[0].po_payment_number,
            payment_type: msg[0].payment_type,
          };

          this.poPaymentsDetails.purchaseOrderPaymentDetails.push(row);

          this.clear();
          await this.fetchPoPayments(this.po_id);
          await this.fetchBankAccountList();
          this.calcBalance();

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
