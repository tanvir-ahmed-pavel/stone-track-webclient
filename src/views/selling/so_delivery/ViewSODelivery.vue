<template>
  <template v-if="!initLoading">
    <!-- Submit -->

    <TitleAndButtons
      :title="`Item Delivery Details - (${soDeliveryData.so_delivery_number})`"
    >
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Print-->
        <a
          href="#"
          class="btn btn-sm btn-flex btn-success me-3"
          @click.prevent="printChalan()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/files/fil009.svg" />
          </span>
          Print Chalan
        </a>

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
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form
      :model="soDeliveryData"
      :rules="rules"
      v-loading="loading"
      ref="formRef"
    >
      <!-- Initial Details About PO-->

      <!--    <div class="card-body pt-0">-->
      <el-card class="box-card mb-4">
        <div class="row">
          <!--        Left Hand Side:1-->
          <div class="col">
            <el-divider>SO Details</el-divider>
            <div class="row py-3 me-1 justify-content-end border border-3">
              <!--            Project Title-->
              <div class="col-6 my-2">
                <label class="fs-6 fw-bold mb-1">Project Title</label> <br />
                <el-form-item size="small" class="mb-0" prop="project_location">
                  <el-input
                    readonly
                    :model-value="soDeliveryData.so_details.project_title"
                    class="w-auto mod-disabled"
                  ></el-input>
                </el-form-item>
              </div>

              <!--            Project Location-->
              <div class="col-6 my-2">
                <label class="fs-6 fw-bold mb-1">Project Location</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="project_location"
                  >
                    <el-input
                      readonly
                      :model-value="soDeliveryData.so_details.project_location"
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Customer-->
              <div class="col-6 my-2">
                <label class="fw-bold mb-1">Customer</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="customer_name">
                    <el-input
                      readonly
                      :model-value="soDeliveryData.customer.customer_name"
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Delivery Date-->
              <div class="col-6 my-2">
                <label class="fw-bold mb-1">Delivery Date</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="delivery_date">
                    <el-date-picker
                      readonly
                      :model-value="soDeliveryData.delivery_date"
                      type="date"
                      class="mod-disabled"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <!--        Right Hand Side:2-->
          <div class="col">
            <el-divider>Last Delivery Statistics</el-divider>
            <div
              class="row justify-content-end py-3 ms-1 justify-content-end border border-3"
            >
              <!--            Total Delivered QTY-->
              <div class="col-6 my-2">
                <label class="fs-6 fw-bold mb-1">Total Delivered QTY</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="project_location"
                  >
                    <el-input
                      readonly
                      :model-value="
                        soDeliveryData.itemDeliveredStatistics[0]
                          .total_delivery_quantity
                      "
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Number of Delivery-->
              <div class="col-6 my-2">
                <label class="fw-bold mb-1">Number of Delivery</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="customer_name">
                    <el-input
                      readonly
                      :model-value="
                        soDeliveryData.itemDeliveredStatistics[0]
                          .number_of_delivery
                      "
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Last delivery QTY-->
              <div class="col-6 my-2">
                <label class="fw-bold mb-1">Last Delivery QTY</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="customer_name">
                    <el-input
                      readonly
                      :model-value="
                        soDeliveryData.itemDeliveredStatistics[0]
                          .last_delivery_quantity
                      "
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Last Delivery Date-->
              <div class="col-6 my-2">
                <label class="fw-bold mb-1">Last Delivery Date</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="delivery_date">
                    <el-date-picker
                      readonly
                      :model-value="
                        soDeliveryData.itemDeliveredStatistics[0]
                          .last_delivery_date
                      "
                      type="date"
                      placeholder="YYYY-MM-DD"
                      class="mod-disabled"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <el-divider>Items</el-divider>
        <!--        show item-->

        <table class="table table-sm">
          <thead>
            <tr class="fw-bold fs-5">
              <th scope="col">No.</th>
              <th class="required" scope="col" style="min-width: 150px">
                Item
              </th>
              <th class="required" scope="col">Delivery Date</th>
              <th class="required" scope="col">Truck No</th>
              <th class="required" scope="col">Chalan</th>
              <th class="required text-end" scope="col">Quantity</th>
              <th class="required text-end" scope="col">Rate</th>
              <th class="text-end" scope="col" style="min-width: 150px">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in soDeliveryData.items" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            Item-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    fit-input-width
                    class="w-auto"
                    :model-value="item.item_name"
                  />
                </el-form-item>
              </td>

              <!--            Delivery Date-->
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

              <!--            Truck No-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    :model-value="item.license_plate"
                    class="w-auto"
                  />
                </el-form-item>
              </td>

              <!--            Chalan-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    v-model="item.chalan_no"
                    placeholder="Chalan"
                    class="w-auto"
                  />
                </el-form-item>
              </td>

              <!--            Quantity-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    class="mod-align"
                    :model-value="
                      item.delivered_quantity.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })
                    "
                  />
                </el-form-item>
              </td>

              <!--            Rate-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :model-value="
                      item.item_rate.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })
                    "
                    @input="calculateItemAmount(index, item.id)"
                  />
                </el-form-item>
              </td>

              <!--            Amount-->
              <td>
                <el-input
                  readonly
                  size="small"
                  :input-style="{
                    'text-align': 'right',
                  }"
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
                :input-style="{
                  'text-align': 'right',
                }"
                :model-value="
                  soDeliveryData.total_delivered_qty.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                "
                readonly
              >
                <template #prepend>Total Quantity</template>
              </el-input>
            </el-form-item>
          </div>

          <!--        Total Amount-->
          <div class="col-md-4 fv-row">
            <el-form-item size="small">
              <el-input
                :input-style="{
                  'text-align': 'right',
                }"
                :model-value="
                  soDeliveryData.total_delivered_amount.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )
                "
                readonly
              >
                <template #prepend>Total Amount</template>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <!--      Truck Vara-->
        <div class="row g-9 justify-content-around">
          <!--        Vara Rate-->
          <div class="col-md-4 fv-row">
            <el-form-item size="small">
              <el-input
                type="number"
                :input-style="{
                  'text-align': 'right',
                }"
                min="0.0"
                readonly
                step="2.5"
                :controls="false"
                :model-value="
                  soDeliveryData.truck_vara_rate
                    ? soDeliveryData.truck_vara_rate
                    : 0
                "
              >
                <template #prepend class="text-dark"
                  >Truck Vara Rate:
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!--        Total Truck Vara-->
          <div class="col-md-4 fv-row">
            <el-form-item size="small">
              <el-input
                :input-style="{
                  'text-align': 'right',
                }"
                :model-value="
                  soDeliveryData.total_truck_vara_amount.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )
                "
                readonly
              >
                <template #prepend>Total Truck Vara:</template>
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
                :model-value="soDeliveryData.deliver_discount_in_percent"
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
                :model-value="soDeliveryData.deliver_discount_in_amount"
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
                    v-model="soDeliveryData.deliver_note"
                    :autosize="{ minRows: 7, maxRows: 7 }"
                    type="textarea"
                    placeholder="Please input"
                    resize="none"
                    readonly
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
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :model-value="
                      soDeliveryData.deliver_so_grand_total.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    "
                    readonly
                  >
                    <template #prepend>Grand Total</template>
                  </el-input>
                </el-form-item>
              </div>

              <!--            Round Adjustment-->
              <div class="col-8">
                <el-form-item size="small">
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :model-value="soDeliveryData.deliver_rounding_adjustment"
                    readonly
                  >
                    <template #prepend>Round Adjustment</template>
                  </el-input>
                </el-form-item>
              </div>

              <!--            Round Total-->
              <div class="col-8">
                <el-form-item size="small">
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    :model-value="
                      soDeliveryData.deliver_receivable_total.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    "
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
    <!--  </div>-->
    <ChalanPrint ref="chalanPrint"></ChalanPrint>
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import store from "@/store";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import ChalanPrint from "@/views/reuseable/print/ChalanPrint.vue";

export default defineComponent({
  name: "add-so-delivery",
  components: { ChalanPrint, TitleAndButtons },

  setup: function () {
    // Set Bread Crumbs
    onMounted(() => {
      // calculateItemAmount(0);
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Item Delivery Details", [
        "Selling",
        "Sales Order",
      ]);
    });

    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******

    const route = useRoute();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const initLoading = ref<boolean>(true);
    fetchApis();

    // Fetch Sales Order
    async function fetchApis() {
      initLoading.value = true;
      await store.dispatch(
        ACTIONS.SO_DELIVERY.FETCH_SO_DELIVERY,
        route.params.so_delivery_id
      );
      initLoading.value = false;
    }

    // Get Sales Order
    const soDeliveryData = computed(() => {
      return store.getters[GETTERS.SO_DELIVERY.singleSoDelivery];
    });

    return {
      // Validation and Initial setup
      formRef,
      loading,
      initLoading,

      // All Model/ Data Values
      soDeliveryData,
    };
  },
  methods: {
    async printChalan() {
      await (this.$refs["chalanPrint"] as any).show({
        data: this.soDeliveryData,
      });
      (this.$refs["chalanPrint"] as any).print();
    },
  },
});
</script>

<style>
.textColor {
  background-color: #ff3636;
}
.textColor > .el-notification__group > .el-notification__title {
  color: white !important;
}
.textColor > .el-notification__group > .el-notification__content {
  color: white !important;
}
.textColor > .el-notification__group > .el-notification__closeBtn {
  color: white !important;
}
.textColor > .el-notification__group > .el-icon-error {
  color: white !important;
}
.mod-disabled .el-input__inner {
  color: black !important;
}
.mod-align .el-input__inner {
  text-align: right !important;
}
</style>
