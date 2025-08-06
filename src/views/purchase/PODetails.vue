<template>
  <template v-if="!loading">
    <TitleAndButtons title="Purchase Order Details">
      <!--    Buttons-->
      <template v-slot:buttons>
        <router-link to="/purchase-order-list">
          <button type="button" class="btn btn-sm btn-flex btn-danger">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
            </span>
            Back to Purchase Order List
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
      <!--    <div class="card-body pt-0">-->
      <el-card class="box-card mb-4">
        <table class="table mb-0">
          <tbody class="">
            <tr class="justify-content-between">
              <td>
                <label class="required fs-6 fw-bold">Purchase From</label>
                <div>
                  <el-form-item class="mb-0">
                    <el-input
                      size="small"
                      readonly
                      :model-value="poDetailsById.purchase_from"
                    />
                  </el-form-item>
                </div>
              </td>

              <!--            LC-->
              <td>
                <template v-if="poDetailsById.lc_details">
                  <label class="required fs-6 fw-bold">LC</label>
                  <div>
                    <el-form-item class="mb-0">
                      <el-input
                        size="small"
                        readonly
                        :model-value="poDetailsById.lc_details.lc_number"
                      />
                    </el-form-item>
                  </div>
                </template>
              </td>

              <!--            Supplier-->
              <td>
                <label class="required fw-bold">Supplier</label>
                <div>
                  <el-form-item class="mb-0" prop="supplier_id">
                    <el-input
                      size="small"
                      readonly
                      :model-value="poDetailsById.supplier.supplier_name"
                    />
                  </el-form-item>
                </div>
              </td>

              <!--            PO Date-->
              <td>
                <label class="required fw-bold">Purchase Oder Date</label>
                <div>
                  <el-form-item class="mb-0" prop="order_date">
                    <el-date-picker
                      v-model="poDetailsById.order_date"
                      type="date"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Select a PO date"
                      size="small"
                      style="pointer-events: none"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </td>

              <!--            Required Date-->
              <td>
                <label class="required fw-bold">Required Date</label>
                <div>
                  <el-form-item class="mb-0" prop="required_date">
                    <el-date-picker
                      v-model="poDetailsById.required_date"
                      type="date"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Select a Required date"
                      size="small"
                      style="pointer-events: none"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <el-divider>Items</el-divider>
        <!--        show item-->

        <table class="table table-sm">
          <thead>
            <tr class="border-bottom-2 fw-bold">
              <th scope="col">No.</th>
              <th class="required" scope="col" style="min-width: 150px">
                Item
              </th>
              <th class="required" scope="col">Required Date</th>
              <th class="required" scope="col">Quantity</th>
              <th class="required" scope="col">Rate</th>
              <th class="text-end" scope="col" style="min-width: 150px">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in poDetailsById.items" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            Item-->
              <td>
                <el-form-item class="mb-0">
                  <el-input
                    class="w-100"
                    readonly
                    :model-value="item.item_name || '-'"
                    size="small"
                    style="pointer-events: none"
                  />
                </el-form-item>
              </td>

              <!--            Date-->
              <td>
                <el-form-item class="mb-0">
                  <el-date-picker
                    class="w-100"
                    v-model="item.required_date"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="Required date"
                    size="small"
                    readonly
                  >
                  </el-date-picker>
                </el-form-item>
              </td>

              <!--            Quantity-->
              <td>
                <el-form-item class="mb-0">
                  <el-input-number
                    class="w-100"
                    v-model="item.order_quantity"
                    :precision="3"
                    :min="0.0"
                    :step="1"
                    :controls="false"
                    size="small"
                    style="pointer-events: none"
                  />
                </el-form-item>
              </td>

              <!--            Rate-->
              <td>
                <el-form-item class="mb-0">
                  <el-input-number
                    v-model="item.item_rate"
                    :precision="3"
                    class="w-100"
                    :min="0.0"
                    :step="1"
                    :controls="false"
                    size="small"
                    style="pointer-events: none"
                  />
                </el-form-item>
              </td>

              <!--            Amount-->
              <td class="text-end">
                <el-form-item>
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :step="0.001"
                    :model-value="item.total_amount.toLocaleString()"
                    class="w-100"
                    size="small"
                    style="pointer-events: none"
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
          <!--        Total Quantity-->
          <div class="col-md-4 fv-row">
            <el-form-item>
              <el-input
                :input-style="{
                  'text-align': 'right',
                }"
                v-model="poDetailsById.total_order_quantity"
                readonly
                size="small"
              >
                <template #prepend>Total Quantity</template>
              </el-input>
            </el-form-item>
          </div>

          <!--        Total Amount-->
          <div class="col-md-4 fv-row">
            <el-form-item>
              <el-input
                :input-style="{
                  'text-align': 'right',
                }"
                v-model="poDetailsById.po_total_amount"
                readonly
                size="small"
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
            <el-form-item>
              <el-input
                v-model="poDetailsById.discount_in_percentage"
                type="number"
                placeholder="Enter Discount In Percent"
                size="small"
              >
                <template #prepend>%</template>
              </el-input>
            </el-form-item>
          </div>

          <!--        In Amount-->
          <div class="col-md-4 mt-5 fv-row">
            <label class="fw-bold fs-6 mb-1"
              >Additional Discount in Amount</label
            >
            <el-form-item prop="lc_rate_usd">
              <el-input
                v-model="poDetailsById.discount_in_amount"
                type="number"
                placeholder="Enter Discount In Percent"
                size="small"
              >
                <template #prepend>Amount</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-card>

      <!-- Grand Total && Required Notes -->
      <el-card class="box-card mb-4">
        <div class="row g-9">
          <!--        Additional Notes-->
          <div class="col-md-6 mt-5 fv-row">
            <el-divider>Notes</el-divider>
            <div class="row justify-content-center">
              <div class="col-8">
                <el-form-item>
                  <el-input
                    v-model="poDetailsById.delivery_note"
                    :autosize="{ minRows: 7, maxRows: 7 }"
                    type="textarea"
                    placeholder="Please input"
                    resize="none"
                  >
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <!--        Grand Total-->
          <div class="col-md-6 mt-5 fv-row">
            <el-divider>Grand Total</el-divider>
            <div class="row justify-content-center">
              <!--            Grand Total-->
              <div class="col-8">
                <el-form-item>
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    v-model="poDetailsById.po_grand_total"
                    readonly
                  >
                    <template #prepend>Grand Total</template>
                  </el-input>
                </el-form-item>
              </div>

              <!--            Round Adjustment-->
              <div class="col-8">
                <el-form-item>
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    v-model="poDetailsById.rounding_adjustment"
                    readonly
                  >
                    <template #prepend>Round Adjustment</template>
                  </el-input>
                </el-form-item>
              </div>

              <!--            Round Total-->
              <div class="col-8">
                <el-form-item>
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    v-model="poDetailsById.payable_total"
                    readonly
                  >
                    <template #prepend>Round Total</template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <!--    </div>-->
    </el-form>
    <POPrint ref="print"></POPrint>
    <!--  </div>-->
  </template>

  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import POPrint from "@/views/purchase/POPrint.vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "add-purchase-order",
  components: { POPrint, TitleAndButtons },

  computed: {
    ...mapGetters({
      poDetailsById: GETTERS.PURCHASE.poDetailsById,
      purchaseFrom: GETTERS.PURCHASE.purchaseFrom,
    }),
  },

  data() {
    return {
      loading: false,
    };
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchase Order Details", [
      "Buying",
      "Purchase Order List",
    ]);
    this.loading = true;
    var por_id = Number.parseInt(this.$route.params.id.toString());
    await this.fetchPODetailsById(por_id);
    this.loading = false;
  },

  methods: {
    async print() {
      await (this.$refs["print"] as any).show({
        data: this.poDetailsById,
      });
      (this.$refs["print"] as any).print();
    },

    ...mapActions({
      fetchPODetailsById: ACTIONS.PURCHASE.FETCH_PO_DETAILS_BY_ID,
    }),
  },
});
</script>

<style scoped></style>
