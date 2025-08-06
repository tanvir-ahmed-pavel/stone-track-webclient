<template>
  <template v-if="!loading">
    <!-- Submit -->
    <TitleAndButtons title="Purchase Order Receive Details">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--begin::PO-->
        <router-link :to="'/por-receive-list/' + porDetailsById.po_id">
          <button type="button" class="btn btn-sm btn-flex btn-info me-3">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
            </span>
            Back PO Receipt List
          </button>
        </router-link>

        <!--          Print-->
        <a
          href="#"
          class="btn btn-sm btn-flex btn-success ms-3"
          @click.prevent="print()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/files/fil009.svg" />
          </span>
          Print
        </a>
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form ref="formRef" v-loading="loading">
      <!-- Initials -->

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <el-divider>PO Received Details</el-divider>

        <div class="row">
          <div v-if="porDetailsById.lc_details" class="col">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <div class="row">
                  <div class="col-4">
                    <el-form-item> LC No: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="porDetailsById.lc_details.lc_number"
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
                        v-model="porDetailsById.lc_details.created_at"
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
              </el-card>
            </el-form-item>
          </div>

          <div class="col">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <div class="row">
                  <div class="col-4">
                    <el-form-item> Supplier: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="porDetailsById.supplier.supplier_name"
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <el-form-item> POR No: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        v-model="porDetailsById.po_receipt_number"
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
                <div class="row">
                  <div class="col-5">
                    <el-form-item> PO Received Date: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-date-picker
                        v-model="porDetailsById.receipt_date"
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
                  <div class="col-5">
                    <el-form-item> PO Qty Total: </el-form-item>
                  </div>

                  <div class="col-7">
                    <el-form-item>
                      <el-input
                        v-model="total_order_quantity"
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
                        v-model="total_receive_qty"
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
              <th class="required" scope="col">Rate</th>
              <th class="required" scope="col">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in porDetailsById.items" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            Item-->
              <td>
                <el-input
                  v-model="item.item_name"
                  :input-style="{ 'text-align': 'left', width: '100%' }"
                  size="small"
                  readonly
                />
              </td>

              <!--            Quantity Received-->
              <td>
                <el-input-number
                  v-model="item.accepted_quantity"
                  :precision="3"
                  :step="1"
                  :min="0"
                  size="small"
                  controls-position="right"
                  @input="calTotal(index, item)"
                  style="pointer-events: none"
                  readonly
                />
              </td>

              <!--            Quantity Rate-->
              <td>
                <el-input
                  v-model="item.item_rate"
                  :input-style="{ 'text-align': 'right', width: '100%' }"
                  size="small"
                  readonly
                />
              </td>

              <!--            Amount-->
              <td>
                <el-input
                  v-model="item.total_amount"
                  :input-style="{ 'text-align': 'right', width: '100%' }"
                  size="small"
                  readonly
                />
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
                v-model="porDetailsById.total_receipt_quantity"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              >
                <template #prepend>Total Quantity</template>
              </el-input>
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-form-item prop="lc_rate_usd">
              <el-input
                v-model="porDetailsById.po_total_receipt_amount"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              >
                <template #prepend>Total Amount</template>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <!--      Discounts-->
        <el-divider class="mt-2">Additional Discounts</el-divider>

        <div class="row g-9 justify-content-around">
          <!--        In Percent-->
          <div class="col-md-4 mt-5 fv-row">
            <label class="fw-bold fs-6 mb-1"
              >Additional Discount in Percent</label
            >
            <!-- v-model="purchaseOrderData.discount_in_percentage" -->
            <el-form-item>
              <el-input
                v-model="porDetailsById.receipt_discount_in_percentage"
                type="number"
                size="small"
                placeholder="Enter Discount In Percent"
                @input="cal"
              >
                <template #prepend>%</template>
              </el-input>
            </el-form-item>
          </div>

          <!-- v-model="purchaseOrderData.discount_in_amount" -->
          <!--        In Amount-->
          <div class="col-md-4 mt-5 fv-row">
            <label class="fw-bold fs-6 mb-1"
              >Additional Discount in Amount</label
            >
            <el-form-item prop="lc_rate_usd">
              <el-input
                v-model="porDetailsById.receipt_discount_in_amount"
                type="number"
                size="small"
                placeholder="Enter Discount In Percent"
                @input="cal2"
              >
                <template #prepend>Amount</template>
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
            <el-form-item :rules="{ required: true }">
              <el-date-picker
                v-model="porDetailsById.receipt_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date"
                size="small"
                style="width: 100%"
              />
            </el-form-item>

            <label class="required fw-bold fs-6">Due Date</label>
            <el-form-item :rules="{ required: true }">
              <el-date-picker
                v-model="porDetailsById.pi_due_date"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="Pick a date"
                size="small"
                style="width: 100%"
              />
            </el-form-item>

            <label class="fw-bold fs-6 mb-2">Notes</label>
            <el-form-item>
              <el-input
                v-model="porDetailsById.receipt_note"
                :autosize="{ minRows: 2, maxRows: 2 }"
                type="textarea"
                placeholder="Please input"
                resize="none"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-divider>Applied Charges</el-divider>

            <label class="required fw-bold fs-6">Total Tax Fees</label>
            <el-form-item>
              <el-input
                v-model="porDetailsById.total_tax_fee"
                type="number"
                placeholder="Enter Discount In Percent"
                size="small"
              />
            </el-form-item>

            <label class="required fw-bold fs-6">Total Port Fees</label>
            <el-form-item>
              <el-input
                v-model="porDetailsById.total_port_fee"
                type="number"
                placeholder="Enter Discount In Percent"
                size="small"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-divider>Grand Total</el-divider>

            <label class="fw-bold fs-6">Grand Total</label>
            <el-form-item>
              <el-input
                v-model="porDetailsById.receipt_po_grand_total"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6">Round Adjustment</label>
            <el-form-item>
              <el-input
                v-model="porDetailsById.receipt_rounding_adjustment"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6">Round Total</label>
            <el-form-item>
              <el-input
                v-model="porDetailsById.receipt_payable_total"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>
          </div>
        </div>
      </el-card>

      <!-- Submit -->
      <div class="card-body" hidden>
        <div class="row mb-7 justify-content-end">
          <div class="col-md-6 fv-row">
            <el-checkbox
              v-model="processWithInvoice"
              label="An invoice will be auto generated for receiving items"
              border
              size="mini"
              style="width: 100%; pointer-events: none"
            />
          </div>
        </div>
      </div>
      <!--    </div>-->
    </el-form>
    <POReceivePrint ref="print"></POReceivePrint>
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
import POReceivePrint from "@/views/purchase/POReceivePrint.vue";

export default defineComponent({
  name: "purchase-order-receive",
  components: { POReceivePrint, TitleAndButtons },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);

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
      por_id: 0,
      total_order_quantity: "0",
      total_receive_qty: "0",
      total_receipt_quantity: "0",
      po_total_receipt_amount: "0",

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
    };
  },

  computed: {
    ...mapGetters({
      itemList: GETTERS.ITEM.itemList,
      quantityReceived1: GETTERS.PURCHASE.quantityReceived,
      porDetailsById: GETTERS.PURCHASE.porDetailsById,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchase Order Receive Details", [
      "Buying",
      "Purchase Order List",
      "Purchased Items Receipt List",
    ]);

    this.loading = true;
    this.por_id = Number.parseInt(this.$route.params.id.toString());
    await this.fetchPorDetailsById(this.por_id);

    this.total_order_quantity =
      this.porDetailsById.po_details.total_order_quantity.toString() + " Ton";
    this.total_receive_qty =
      this.porDetailsById.po_details.total_receive_qty.toString() + " Ton";
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchPorDetailsById: ACTIONS.PURCHASE.FETCH_POR_DETAILS_BY_ID,
      createPOReceive: ACTIONS.PURCHASE.CREATE_PO_RECEIVE,
    }),

    async print() {
      await (this.$refs["print"] as any).show({
        data: this.porDetailsById,
      });
      (this.$refs["print"] as any).print();
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
