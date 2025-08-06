<template>
  <template v-if="!loading">
    <!-- Submit -->
    <TitleAndButtons title="Purchase Invoice Details">
      <!--    Buttons-->

      <template v-slot:buttons>
        <!--          Go Back-->
        <a
          href="#"
          class="btn btn-sm btn-flex btn-success me-3"
          @click.prevent="print()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/files/fil009.svg" />
          </span>
          Print
        </a>

        <button
          @click="this.$router.back()"
          type="button"
          class="btn btn-sm btn-flex btn-info"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
          </span>
          Go Back
        </button>
      </template>
    </TitleAndButtons>
    <!--  <div class="card">-->
    <el-form ref="formRef">
      <!-- Initials -->

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <div class="row">
          <div v-if="piDetailsById.lc_details" class="col-6">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <el-form-item
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
                        :model-value="piDetailsById.lc_details.lc_number"
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
                        :model-value="piDetailsById.lc_details.created_at"
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
                        :model-value="piDetailsById.supplier.supplier_name"
                        size="small"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>
              </el-card>
            </el-form-item>
          </div>

          <div class="col-6">
            <el-form-item>
              <el-card class="btn-light mod-btn-style">
                <el-form-item
                  class="text-center fw-bold"
                  style="line-height: 10px; padding-bottom: 5px"
                >
                  PO Info
                </el-form-item>
                <div v-if="!piDetailsById.lc_details" class="row">
                  <div class="col-4">
                    <el-form-item> Supplier: </el-form-item>
                  </div>

                  <div class="col-8">
                    <el-form-item>
                      <el-input
                        :model-value="piDetailsById.supplier.supplier_name"
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
                        :model-value="piDetailsById.po_details.order_date"
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
                        :model-value="piDetailsById.po_details.po_number"
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
                        :model-value="
                          piDetailsById.po_details.total_order_quantity
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

              <th class="" scope="col">Item</th>
              <th class="" scope="col">Quantity</th>
              <th class="" scope="col">Rate</th>
              <th class="" scope="col">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in piDetailsById.items" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            Item-->
              <td>
                <el-input
                  :model-value="item.item_name"
                  :input-style="{ 'text-align': 'left', width: '100%' }"
                  size="small"
                  readonly
                />
              </td>

              <!--            Quantity Received-->
              <td>
                <el-input
                  size="small"
                  :model-value="item.accepted_quantity.toLocaleString()"
                  readonly
                />
              </td>

              <!--            Quantity Rate-->
              <td>
                <el-input
                  :model-value="item.item_rate"
                  :input-style="{ 'text-align': 'right', width: '100%' }"
                  size="small"
                  readonly
                />
              </td>

              <!--            Amount-->
              <td>
                <el-input
                  :model-value="item.total_amount.toLocaleString()"
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
                :model-value="
                  piDetailsById.total_accepted_quantity.toLocaleString()
                "
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
                :model-value="piDetailsById.pi_total_amount.toLocaleString()"
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
            <!-- :model-value="purchaseOrderData.discount_in_percentage" -->
            <el-form-item>
              <el-input
                :model-value="piDetailsById.pi_discount_in_percentage"
                type="number"
                size="small"
                placeholder="Enter Discount In Percent"
              >
                <template #prepend>%</template>
              </el-input>
            </el-form-item>
          </div>

          <!-- :model-value="purchaseOrderData.discount_in_amount" -->
          <!--        In Amount-->
          <div class="col-md-4 mt-5 fv-row">
            <label class="fw-bold fs-6 mb-1"
              >Additional Discount in Amount</label
            >
            <el-form-item prop="lc_rate_usd">
              <el-input
                readonly
                :model-value="
                  piDetailsById.pi_discount_in_amount.toLocaleString()
                "
                type="number"
                size="small"
                placeholder="Enter Discount In Percent"
              >
                <template #prepend>Amount</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-card>

      <el-card class="box-card mb-4">
        <div class="row g-9 justify-content-around">
          <div class="col-md-4 mt-5 fv-row">
            <el-divider>Posting Dates</el-divider>

            <label class="required fw-bold fs-6">Payment Due Date</label>
            <el-form-item :rules="{ required: true }">
              <el-date-picker
                readonly
                :model-value="piDetailsById.due_date"
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
                readonly
                :model-value="piDetailsById.pi_note"
                :autosize="{ minRows: 2, maxRows: 2 }"
                type="textarea"
                placeholder="Please input"
                resize="none"
              />
            </el-form-item>
          </div>

          <div class="col-md-4 mt-5 fv-row">
            <el-divider>Grand Total</el-divider>

            <label class="fw-bold fs-6">Grand Total</label>
            <el-form-item>
              <el-input
                :model-value="piDetailsById.pi_grand_total.toLocaleString()"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6">Round Adjustment</label>
            <el-form-item>
              <el-input
                :model-value="
                  piDetailsById.pi_rounding_adjustment.toLocaleString()
                "
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>

            <label class="fw-bold fs-6">Round Total</label>
            <el-form-item>
              <el-input
                :model-value="piDetailsById.pi_payable_total.toLocaleString()"
                :input-style="{ 'text-align': 'right' }"
                size="small"
                readonly
              />
            </el-form-item>
          </div>
        </div>
      </el-card>
      <!--    </div>-->
    </el-form>
    <PrintComponent ref="print"></PrintComponent>
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>

  <!--  </div>-->
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import PrintComponent from "./PiPrint.vue";

export default defineComponent({
  name: "purchase-order-receive",
  components: { TitleAndButtons, PrintComponent },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);

    return {
      formRef,
      loading,
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
      po_id: 0,
      po_number: "",
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
    };
  },

  computed: {
    ...mapGetters({
      itemList: GETTERS.ITEM.itemList,
      // quantityReceived1: GETTERS.PURCHASE.quantityReceived,
      piDetailsById: GETTERS.PURCHASE.piDetailsById,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchase Invoice Details", [
      "Buying",
      "Purchase Order List",
    ]);
    this.loading = true;
    this.po_id = Number.parseInt(this.$route.params.id.toString());
    await this.fetchPiDetailsById(this.po_id);
    this.loading = false;
    // this.po_number =
    //   this.piDetailsById.id + this.piDetailsById.order_date.replaceAll("-", "");
  },

  methods: {
    async print() {
      await (this.$refs["print"] as any).show({
        data: this.piDetailsById,
      });
      (this.$refs["print"] as any).print();
    },
    ...mapActions({
      fetchPiDetailsById: ACTIONS.PURCHASE.FETCH_PI_DETAILS_BY_ID,
    }),
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
