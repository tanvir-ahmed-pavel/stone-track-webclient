<template>
  <template v-if="!intLoading">
    <!-- Submit -->
    <TitleAndButtons
      v-loading="loading"
      :title="`Sales Order Details - (${salesOrder.so_number})`"
    >
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Print-->
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

        <!--          Go Back-->
        <!--      <router-link to="/purchase-order">-->
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
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form v-loading="loading" ref="formRef">
      <!-- Initials -->
      <!--    <div class="card-body pt-0">-->
      <el-card class="box-card mb-4">
        <table class="table mb-0">
          <tbody class="">
            <tr class="justify-content-end">
              <!--            Project Title-->
              <td>
                <label class="fs-6 fw-bold mb-1">Project Title</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="project_title">
                    <el-input
                      readonly
                      :model-value="salesOrder.project_title"
                      placeholder="Enter A Project Title"
                      class="w-auto"
                    ></el-input>
                  </el-form-item>
                </div>
              </td>

              <!--            Project Location-->
              <td>
                <label class="fs-6 fw-bold mb-1">Project Location</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="project_location"
                  >
                    <el-input
                      readonly
                      :model-value="salesOrder.project_location"
                      placeholder="Enter A Project Location"
                      class="w-auto"
                    ></el-input>
                  </el-form-item>
                </div>
              </td>

              <!--            Customer-->
              <td>
                <label class="fw-bold mb-1">Customer</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="customer_id">
                    <el-input
                      readonly
                      :model-value="salesOrder.customer.customer_name"
                      class="w-auto"
                    ></el-input>
                  </el-form-item>
                </div>
              </td>

              <!--            SO Date-->
              <td>
                <label class="fw-bold mb-1">Sales Oder Date</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="so_order_date">
                    <el-date-picker
                      readonly
                      :model-value="salesOrder.so_order_date"
                      type="date"
                      placeholder="Select a SO date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </td>

              <!--            Delivery Date-->
              <td>
                <label class="fw-bold mb-1">Delivery Date</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="so_delivery_date"
                  >
                    <el-date-picker
                      readonly
                      :model-value="salesOrder.so_delivery_date"
                      type="date"
                      placeholder="Select a Delivery date"
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
            <tr class="border-bottom fw-bold fs-5">
              <th scope="col">No.</th>
              <th class="" scope="col" style="min-width: 150px">Item</th>
              <th class="" scope="col">Delivery Date</th>
              <th class="" scope="col">Quantity</th>
              <th class="" scope="col">Rate</th>
              <th class="text-end" scope="col" style="min-width: 150px">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in salesOrder.items" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            Item-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    :model-value="item.item_name"
                    class="w-auto"
                  ></el-input>
                </el-form-item>
              </td>

              <!--            Date-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-date-picker
                    readonly
                    :model-value="item.delivery_date"
                    type="date"
                    placeholder="Delivery date"
                  >
                  </el-date-picker>
                </el-form-item>
              </td>

              <!--            Quantity-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    :model-value="
                      item.order_quantity.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })
                    "
                    class="w-auto"
                  />
                </el-form-item>
              </td>

              <!--            Rate-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    :model-value="
                      item.item_rate.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })
                    "
                    class="w-auto"
                  />
                </el-form-item>
              </td>

              <!--            Amount-->
              <td class="text-end">
                <el-input
                  readonly
                  size="small"
                  :input-style="{
                    'text-align': 'right',
                  }"
                  :step="0.001"
                  :model-value="
                    item.total_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  "
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
          <!--        Total Quantity-->
          <div class="col-md-4 fv-row">
            <el-form-item size="small">
              <el-input
                readonly
                :input-style="{
                  'text-align': 'right',
                }"
                :model-value="
                  salesOrder.so_total_order_quantity.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                "
              >
                <template #prepend>Total Quantity</template>
              </el-input>
            </el-form-item>
          </div>

          <!--        Total Amount-->
          <div class="col-md-4 fv-row">
            <el-form-item size="small">
              <el-input
                readonly
                :input-style="{
                  'text-align': 'right',
                }"
                :model-value="
                  salesOrder.so_total_amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                "
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
            <el-form-item size="small">
              <el-input
                readonly
                :model-value="salesOrder.so_discount_in_percentage"
                type="number"
                placeholder="Enter Discount In Percent"
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
            <el-form-item size="small" prop="lc_rate_usd">
              <el-input
                readonly
                :model-value="salesOrder.so_discount_in_amount"
                type="number"
                placeholder="Enter Discount In Amount"
              >
                <template #prepend>Amount</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-card>

      <!-- Grand Total && Delivery Notes -->
      <el-card class="box-card mb-4">
        <div class="row g-9">
          <!--        Additional Notes-->
          <div class="col-md-6 mt-5 fv-row">
            <el-divider>Notes</el-divider>
            <div class="row justify-content-center">
              <div class="col-8">
                <el-form-item size="small">
                  <el-input
                    readonly
                    :model-value="salesOrder.so_delivery_note"
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
                <el-form-item size="small">
                  <el-input
                    readonly
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :model-value="
                      salesOrder.so_grand_total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    "
                  >
                    <template #prepend>Grand Total</template>
                  </el-input>
                </el-form-item>
              </div>

              <!--            Round Adjustment-->
              <div class="col-8">
                <el-form-item size="small">
                  <el-input
                    readonly
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :model-value="salesOrder.so_rounding_adjustment"
                  >
                    <template #prepend>Round Adjustment</template>
                  </el-input>
                </el-form-item>
              </div>

              <!--            Round Total-->
              <div class="col-8">
                <el-form-item size="small">
                  <el-input
                    readonly
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :model-value="
                      salesOrder.receivable_total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    "
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
    <!--  </div>-->
    <PrintComponent ref="print"></PrintComponent>
  </template>

  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import store from "@/store";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import { useRouter, useRoute } from "vue-router";
import PrintComponent from "@/views/reuseable/print/PrintComponent.vue";

export default defineComponent({
  name: "add-sales-order",
  components: { TitleAndButtons, PrintComponent },

  setup() {
    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******

    // Set Bread Crumbs
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Sales Order Details", [
        "Selling",
        "Sales Order",
      ]);
    });

    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const intLoading = ref<boolean>(false);
    const route = useRoute();
    fetchApis();

    // Load Sales Order
    // setTimeout(() => {
    //   // Fetch Sales Order

    //     .then(() => {
    //       intLoading.value = false;
    //     });
    // }, 2000);

    async function fetchApis() {
      intLoading.value = true;
      await store.dispatch(
        ACTIONS.SALES_ORDER.FETCH_SALES_ORDER_VIEW,
        route.params.id
      );
      await store.dispatch(ACTIONS.ITEM.FETCH_ITEM_LIST);
      await store.dispatch(ACTIONS.CUSTOMER.FETCH_CUSTOMER_LIST);
      intLoading.value = false;
    }

    const salesOrder = computed(() => {
      return store.getters[GETTERS.SALES_ORDER.singleSalesOrder];
    });

    // Load Item list for dropdown
    const itemList = computed(() => {
      return store.getters[GETTERS.ITEM.itemList];
    });

    // Load Item Customer for dropdown
    const customerList = computed(() => {
      return store.getters[GETTERS.CUSTOMER.customerList];
    });

    return {
      // Validation and Initial setup
      formRef,
      loading,
      intLoading,
      // Required/ Lookup Data
      itemList,
      customerList,
      salesOrder,
    };
  },

  methods: {
    async print() {
      await (this.$refs["print"] as any).show({
        data: this.salesOrder,
      });
      (this.$refs["print"] as any).print();
    },
  },
});
</script>

<style scoped></style>
