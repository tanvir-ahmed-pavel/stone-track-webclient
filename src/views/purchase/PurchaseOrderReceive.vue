<template>
  <template v-if="!loading">
    <!-- Submit -->
    <TitleAndButtons title="Purchase Order Receive">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Go Back-->
        <router-link to="/purchase-order-list">
          <button type="button" class="btn btn-sm btn-flex btn-info me-3">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
            </span>
            Go Back
          </button>
        </router-link>
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
        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary"
          @click.prevent="addPOR"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
          Submit
        </button>
      </template>
    </TitleAndButtons>
    <!--  <div class="card">-->
    <el-form :model="formData" :rules="rules" ref="formRef" v-loading="loading">
      <!-- Initials -->

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <div class="row">
          <div v-if="formData.poDetails.lc_details" class="col">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <el-form-item
                  v-if="formData.poDetails.lc_details"
                  class="text-center fw-bold"
                  style="line-height: 10px; padding-bottom: 5px"
                >
                  LC Info
                </el-form-item>
                <div class="row">
                  <div class="col-4">
                    <el-form-item> LC No: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="formData.poDetails.lc_details.lc_number"
                        size="small"
                        readonly
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
                        v-model="formData.poDetails.lc_details.created_at"
                        type="date"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        placeholder="Pick a date"
                        style="width: 100%"
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> Supplier: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="formData.poDetails.supplier.supplier_name"
                        size="small"
                        readonly
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
                <el-form-item
                  class="text-center fw-bold"
                  style="line-height: 10px; padding-bottom: 5px"
                >
                  PO Info
                </el-form-item>
                <div v-if="!formData.poDetails.lc_details" class="row">
                  <div class="col-4">
                    <el-form-item> Supplier: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="formData.poDetails.supplier.supplier_name"
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <el-form-item> PO Date: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-date-picker
                        v-model="formData.poDetails.order_date"
                        type="date"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        placeholder="Pick a date"
                        style="width: 100%"
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> PO No: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="formData.po_number"
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> PO Qty Total: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="formData.poDetails.total_order_quantity"
                        size="small"
                        readonly
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
                <el-form-item
                  class="text-center fw-bold"
                  style="line-height: 10px; padding-bottom: 5px"
                >
                  Received Details
                </el-form-item>
                <div class="row">
                  <div class="col-5">
                    <el-form-item> Rcvd. Delivery: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="
                          formData.poDetails.itemReceivedStatistics[0]
                            .number_of_received_delivery
                        "
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Last Rcvd. Date: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="
                          formData.poDetails.itemReceivedStatistics[0]
                            .last_received_date
                        "
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Last Rcvd. Qty: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="
                          formData.poDetails.itemReceivedStatistics[0]
                            .last_received_quantity
                        "
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <el-form-item> Total Rcvd. Qty: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="
                          formData.poDetails.itemReceivedStatistics[0]
                            .total_received_quantity
                        "
                        size="small"
                        readonly
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
        <el-divider>Accepted Item Details</el-divider>
        <table class="table">
          <thead>
            <tr class="border-bottom-2 fw-bold fs-5">
              <th scope="col">No.</th>

              <!-- <th class="required" scope="col" style="min-width: 150px">Purchase Order</th> -->
              <th class="required" scope="col">Item</th>
              <th class="required" scope="col">Accepted Quantity</th>
              <th class="required text-center" scope="col">Extra Quantity</th>
              <th class="required" scope="col">Rate</th>
              <th class="required" scope="col">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in formData.poDetails.items" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            Item-->
              <td>
                <el-form-item>
                  <el-input
                    v-model="item.item_name"
                    :input-style="{ 'text-align': 'left', width: '100%' }"
                    size="small"
                    readonly
                  />
                </el-form-item>
              </td>

              <!--            Quantity Received-->
              <td>
                <el-form-item
                  :prop="'poDetails.items.' + index + '.accepted_quantity'"
                  :rules="[
                    {
                      type: 'number',
                      required: !item.is_extra_quantity_needed,
                      min: item.is_extra_quantity_needed? 0 : 0.1,
                      message: 'Must be greater than 0',
                      trigger: ['blur', 'change'],
                    },
                    {
                      type: 'number',
                      max: formData.availableQty,
                      message: 'Available QTY is ' + formData.availableQty,
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input-number
                    v-model="item.accepted_quantity"
                    ref="acceptedQTY"
                    :precision="3"
                    :step="1"
                    :min="0"
                    class="w-100 text-start"
                    size="small"
                    :controls="false"
                    @input="calTotal(index, item)"
                  />
                </el-form-item>
              </td>

              <!--              Extra Qty Field-->
              <td class="d-flex align-items-center">
                <el-switch
                  @click="
                    (item.extra_quantity = 0),
                      (formData.total_extra_quantity = 0),
                      calTotal(index, item)
                  "
                  v-model="item.is_extra_quantity_needed"
                  class="ml-2"
                />

                <el-form-item
                  class="mb-0 ms-4 w-100"
                  :prop="'poDetails.items.' + index + '.extra_quantity'"
                  :rules="[
                    {
                      type: 'number',
                      required: item.is_extra_quantity_needed,
                      message: 'Input Extra Quantity',
                      min: item.is_extra_quantity_needed ? 0.001 : 0,
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input-number
                    :disabled="!item.is_extra_quantity_needed"
                    v-model="item.extra_quantity"
                    :precision="3"
                    :step="1"
                    :min="0"
                    class="w-100 text-start"
                    size="small"
                    :controls="false"
                    @input="calTotal(index, item)"
                  />
                </el-form-item>
              </td>

              <!--            Quantity Rate-->
              <td>
                <el-form-item>
                  <el-input
                    v-model="item.item_rate"
                    :input-style="{ 'text-align': 'right', width: '100%' }"
                    size="small"
                    readonly
                  />
                </el-form-item>
              </td>

              <!--            Amount-->
              <td>
                <el-form-item>
                  <el-input
                    v-model="item.row_item_total_amount"
                    :input-style="{ 'text-align': 'right', width: '100%' }"
                    size="small"
                    readonly
                  />
                </el-form-item>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>

      <!-- Initial Total -->
      <el-card class="box-card mb-4">
        <el-divider>Total</el-divider>

        <div class="row g-9 justify-content-around">
          <div class="col-md-4 mt-5 fv-row">
            <el-form-item>
              <el-input
                v-model="formData.total_receipt_quantity"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              >
                <template #prepend>Total Quantity</template>
              </el-input>
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-form-item>
              <el-input
                :model-value="formData.total_extra_quantity.toLocaleString()"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              >
                <template #prepend>Total Extra Quantity</template>
              </el-input>
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-form-item prop="lc_rate_usd">
              <el-input
                v-model="formData.po_total_receipt_amount"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              >
                <template #prepend>Total Amount</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-card>

      <el-card class="box-card mb-4">
        <div class="row g-9">
          <div class="col-md-4 mt-5 fv-row">
            <el-divider>Posting Dates</el-divider>

            <label class="required fw-bold fs-6">PO Receive Date</label>
            <el-form-item
              prop="receipt_date"
              :rules="{
                required: true,
                message: 'Please select a date',
                trigger: ['change', 'blur'],
              }"
            >
              <el-date-picker
                v-model="formData.receipt_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date"
                size="small"
                style="width: 100%"
              />
            </el-form-item>

            <!--            <label class="required fw-bold fs-6">Payment Due Date</label>-->
            <!--            <el-form-item-->
            <!--              :rules="{-->
            <!--                required: true,-->
            <!--                message: 'Please select a date',-->
            <!--                trigger: ['change', 'blur'],-->
            <!--              }"-->
            <!--            >-->
            <!--              <el-date-picker-->
            <!--                v-model="formData.due_date"-->
            <!--                type="date"-->
            <!--                format="YYYY-MM-DD"-->
            <!--                value-format="YYYY-MM-DD"-->
            <!--                placeholder="Pick a date"-->
            <!--                size="small"-->
            <!--                style="width: 100%"-->
            <!--              />-->
            <!--            </el-form-item>-->

            <label class="fw-bold fs-6 mb-2">Notes</label>
            <el-form-item>
              <el-input
                v-model="formData.receipt_note"
                :autosize="{ minRows: 2, maxRows: 2 }"
                type="textarea"
                placeholder="Please input"
                resize="none"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-divider>Additional Discounts</el-divider>
            <label class="fw-bold fs-6 mb-1"
              >Additional Discount in Percent</label
            >
            <!-- v-model="purchaseOrderData.discount_in_percentage" -->
            <el-form-item>
              <el-input
                v-model="formData.discount_in_percentage"
                type="number"
                size="small"
                placeholder="Enter Discount In Percent"
                @input="cal"
              >
                <template #prepend>%</template>
              </el-input>
            </el-form-item>

            <label class="fw-bold fs-6 mb-1"
              >Additional Discount in Amount</label
            >
            <el-form-item prop="lc_rate_usd">
              <el-input
                v-model="formData.discount_in_amount"
                type="number"
                size="small"
                placeholder="Enter Discount In Percent"
                @input="cal2"
              >
                <template #prepend>Amount</template>
              </el-input>
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-divider>Grand Total</el-divider>

            <label class="fw-bold fs-6">Grand Total</label>
            <el-form-item>
              <el-input
                v-model="formData.receipt_po_grand_total"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6">Round Adjustment</label>
            <el-form-item>
              <el-input
                v-model="formData.receipt_rounding_adjustment"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6">Round Total</label>
            <el-form-item>
              <el-input
                v-model="formData.receipt_payable_total"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>
          </div>
        </div>
      </el-card>

      <!-- Submit -->
      <!--      <div class="card-body">-->
      <!--        <div class="row mb-7 justify-content-end">-->
      <!--          <div class="col-md-6 fv-row">-->
      <!--            <el-checkbox-->
      <!--              v-model="formData.processWithInvoice"-->
      <!--              label="An invoice will be auto generated for receiving items"-->
      <!--              border-->
      <!--              size="mini"-->
      <!--              style="width: 100%; pointer-events: none"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--    </div>-->
    </el-form>
    <!--  </div>-->
  </template>

  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "purchase-order-receive",
  components: { TitleAndButtons },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);

    // Front End Validation Rules
    // const rules = ref({
    //   receipt_date: [
    //     {
    //       required: true,
    //       message: "Please Select a date of received goods",
    //       trigger: "change",
    //     },
    //   ],
    //   due_date: [
    //     {
    //       required: true,
    //       message: "Please Select a due date",
    //       trigger: "change",
    //     },
    //   ],
    //   total_tax_fee: [
    //     {
    //       required: true,
    //       message: "Please enter tax fees",
    //       trigger: "change",
    //     },
    //   ],
    //   total_port_fee: [
    //     {
    //       required: true,
    //       message: "Please enter port fees",
    //       trigger: "change",
    //     },
    //   ],
    // });

    return {
      formRef,

      _value() {
        if (!formRef.value) {
          return;
        }
        return formRef.value?.validate();
      },
    };
  },

  data() {
    return {
      loading: false,
      formData: {
        po_id: 0,
        po_number: "",
        total_receipt_quantity: "0",
        po_total_receipt_amount: "0",

        total_extra_quantity: 0,

        discount_in_percentage: "0",
        discount_in_amount: "0",

        total_tax_fee: 0,
        total_port_fee: 0,

        receipt_po_grand_total: "0",
        receipt_rounding_adjustment: "0",
        receipt_payable_total: "0",

        receipt_note: "",
        receipt_date: new Date().toISOString().substr(0, 10),
        due_date: new Date().toISOString().substr(0, 10),

        processWithInvoice: true,
        poDetails: {} as any,
        availableQty: 0,
      },
    };
  },

  computed: {
    ...mapGetters({
      itemList: GETTERS.ITEM.itemList,
      // quantityReceived1: GETTERS.PURCHASE.quantityReceived,
      poDetailsById: GETTERS.PURCHASE.poDetailsById,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchase Order Receive", [
      "Buying",
      "Purchase Order List",
    ]);
    this.loading = true;
    this.formData.po_id = Number.parseInt(this.$route.params.id.toString());
    await this.fetchPoDetailsById(this.formData.po_id);
    this.formData.poDetails = await this.poDetailsById;
    this.formData.po_number =
      this.formData.poDetails.id +
      this.formData.poDetails.order_date.replaceAll("-", "");
    this.calTotal(-1, 0);
    this.formData.availableQty = JSON.parse(
      JSON.stringify(await this.formData.poDetails.items[0].accepted_quantity)
    );
    this.formData.poDetails.items.forEach((item) => {
      item["extra_quantity"] = 0;
      item["is_extra_quantity_needed"] = false;
    });
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchPoDetailsById: ACTIONS.PURCHASE.FETCH_PO_DETAILS_BY_ID,
      createPOReceive: ACTIONS.PURCHASE.CREATE_PO_RECEIVE,
    }),

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
          this.fetchPoDetailsById(this.formData.po_id);

          this.formData.total_receipt_quantity = "0";
          this.formData.total_extra_quantity = 0;
          this.formData.po_total_receipt_amount = "0";

          this.formData.discount_in_percentage = "0";
          this.formData.discount_in_amount = "0";

          this.formData.total_tax_fee = 0;
          this.formData.total_port_fee = 0;

          this.formData.receipt_po_grand_total = "0";
          this.formData.receipt_rounding_adjustment = "0";
          this.formData.receipt_payable_total = "0";

          this.formData.receipt_note = "";
          this.formData.receipt_date = new Date().toISOString().substr(0, 10);
          this.formData.due_date = new Date().toISOString().substr(0, 10);

          this.formData.processWithInvoice = true;
        }
      });
    },

    calTotal(index, item) {
      if (index > -1) {
        this.formData.poDetails.items[index].row_item_total_amount =
          (this.formData.poDetails.items[index].total_amount =
            (item.is_extra_quantity_needed ? item.extra_quantity : 0) *
              item.item_rate +
            item.accepted_quantity * item.item_rate).toLocaleString("en-us");
      }

      var total_receipt_quantity = 0;
      var total_extra_quantity = 0;
      var po_total_receipt_amount = 0;

      for (var i = 0; this.formData.poDetails.items.length > i; i++) {
        total_receipt_quantity +=
          this.formData.poDetails.items[i].accepted_quantity;

        total_extra_quantity += this.formData.poDetails.items[i].extra_quantity;

        po_total_receipt_amount +=
          // extra amount if have
          (this.formData.poDetails.items[i].is_extra_quantity_needed
            ? this.formData.poDetails.items[i].extra_quantity
            : 0) *
            this.formData.poDetails.items[i].item_rate +
          // plus regular amount
          this.formData.poDetails.items[i].accepted_quantity *
            this.formData.poDetails.items[i].item_rate;

        this.formData.poDetails.items[i].row_item_total_amount =
          this.formData.poDetails.items[i].row_item_total_amount.toLocaleString(
            "en-us"
          );
      }

      this.formData.total_receipt_quantity =
        total_receipt_quantity.toLocaleString("en-us");

      this.formData.total_extra_quantity = total_extra_quantity || 0;

      this.formData.po_total_receipt_amount =
        po_total_receipt_amount.toLocaleString("en-us");
      this.cal();
    },

    cal() {
      this.formData.discount_in_percentage =
        this.formData.discount_in_percentage.match(/\d+/g) &&
        100 > Number(this.formData.discount_in_percentage)
          ? this.formData.discount_in_percentage
          : "0";
      this.formData.discount_in_amount = (
        (Number(
          this.formData.po_total_receipt_amount.replace(/[^0-9-.]/g, "")
        ) *
          Number(this.formData.discount_in_percentage)) /
        100
      ).toFixed(3);
      this.formData.receipt_po_grand_total = (
        Number(this.formData.po_total_receipt_amount.replace(/[^0-9-.]/g, "")) -
        Number(this.formData.discount_in_amount)
      ).toLocaleString("en-us");
      this.adjustment();
    },

    cal2() {
      this.formData.discount_in_amount =
        this.formData.discount_in_amount.match(/\d+/g) &&
        Number(this.formData.po_total_receipt_amount.replace(/[^0-9-.]/g, "")) >
          Number(this.formData.discount_in_amount.replace(/[^0-9-.]/g, ""))
          ? this.formData.discount_in_amount
          : "0";
      this.formData.discount_in_percentage = (
        (Number(this.formData.discount_in_amount) /
          Number(
            this.formData.po_total_receipt_amount.replace(/[^0-9-.]/g, "")
          )) *
        100
      ).toFixed(3);
      this.formData.receipt_po_grand_total = (
        Number(this.formData.po_total_receipt_amount.replace(/[^0-9-.]/g, "")) -
        Number(this.formData.discount_in_amount)
      ).toLocaleString("en-us");
      this.adjustment();
    },

    adjustment() {
      this.formData.receipt_payable_total = Number(
        Number(
          this.formData.receipt_po_grand_total.replace(/[^0-9-.]/g, "")
        ).toFixed()
      ).toLocaleString("en-us");
      this.formData.receipt_rounding_adjustment = (
        Number(this.formData.receipt_po_grand_total.replace(/[^0-9-.]/g, "")) -
        Number(this.formData.receipt_payable_total.replace(/[^0-9-.]/g, ""))
      ).toFixed(3);
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

    addPOR() {
      Swal.fire({
        title: "Creating Purchase Order Receipt",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          // setTimeout(() => {
          //   this.createPOR();
          // }, 2000);

          Promise.resolve([this._value()]).then((value) => {
            Promise.allSettled(value).then((results) =>
              results.forEach((result) => {
                if (result.status == "fulfilled") {
                  if (result["value"]) {
                    this.createPOR();
                  }
                } else if (result.status == "rejected") {
                  this.showErrorMsg();
                }
              })
            );
          });
        }
      });
    },

    async createPOR() {
      this.loading = true;

      const data = JSON.parse(
        JSON.stringify({
          po_id: this.formData.po_id,
          lc_id: this.formData.poDetails.lc_id,
          supplier_id: this.formData.poDetails.supplier.id,
          receipt_date: this.formData.receipt_date,
          // due_date: this.formData.due_date,
          pi_auto_create: this.formData.processWithInvoice,

          total_receipt_quantity: Number(
            this.formData.total_receipt_quantity.replace(/[^0-9-.]/g, "")
          ),
          total_extra_quantity: Number(this.formData.total_extra_quantity),

          po_total_receipt_amount: Number(
            this.formData.po_total_receipt_amount.replace(/[^0-9-.]/g, "")
          ),

          receipt_discount_in_amount: Number(
            this.formData.discount_in_amount.replace(/[^0-9-.]/g, "")
          ),
          receipt_discount_in_percentage: Number(
            this.formData.discount_in_percentage.replace(/[^0-9-.]/g, "")
          ),

          receipt_po_grand_total: Number(
            this.formData.receipt_po_grand_total.replace(/[^0-9-.]/g, "")
          ),
          receipt_rounding_adjustment: Number(
            this.formData.receipt_rounding_adjustment.replace(/[^0-9-.]/g, "")
          ),
          receipt_payable_total: Number(
            this.formData.receipt_payable_total.replace(/[^0-9-.]/g, "")
          ),

          total_tax_fee: this.formData.total_tax_fee,
          total_port_fee: this.formData.total_port_fee,

          receipt_note: this.formData.receipt_note,
          items: this.formData.poDetails.items,
        })
      );

      // console.log(data)

      var msg = await this.createPOReceive(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Purchase order received successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.$router.push({ name: "po-list" });
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
