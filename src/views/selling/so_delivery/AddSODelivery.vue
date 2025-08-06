<template>
  <template v-if="!initLoading">
    <!--   Submit -->
    <TitleAndButtons
      v-loading="loading"
      :title="`New Items Delivery - (${salesOrder.so_number})`"
    >
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Go Back-->
        <!--      <router-link to="/purchase-order">-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-info me-3"
          @click.prevent="this.$router.back()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
          </span>
          Go Back
        </button>

        <!--           Reset-->
        <!--      <router-link to="/purchase-order">-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click.prevent="resetForm"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr029.svg" />
          </span>
          Reset
        </button>
        <!--      </router-link>-->
        <!--        ADD-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary"
          @click.prevent="submit"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
          Submit
        </button>
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form
      :model="soDeliveryData"
      :rules="rules"
      v-loading="loading"
      ref="formRef"
      @keydown.enter.prevent="entrCheck"
    >
      <!-- Initial Details About PO-->

      <!--    <div class="card-body pt-0">-->
      <el-card class="box-card mb-4">
        <div class="row">
          <!--        ROW:1-->
          <div class="col-5">
            <el-divider>SO Details</el-divider>
            <div class="row py-3 me-1 justify-content-end border border-3">
              <!--            Project Title-->
              <div class="col-6 my-2">
                <label class="fs-6 fw-bold mb-1">Project Title</label> <br />
                <el-form-item size="small" class="mb-0" prop="project_location">
                  <el-input
                    disabled
                    :model-value="soDeliveryData.project_title"
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
                      disabled
                      :model-value="soDeliveryData.project_location"
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
                      disabled
                      :model-value="soDeliveryData.customer_name"
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
                      disabled
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

          <!--        ROW:2-->
          <div class="col-7">
            <el-divider>Delivery Statistics</el-divider>
            <div
              class="row justify-content-end py-3 ms-1 justify-content-end border border-3"
            >
              <!--            Total Order QTY-->
              <div class="col-4 my-2">
                <label class="fs-6 fw-bold mb-1">Total Order QTY</label> <br />
                <el-form-item size="small" class="mb-0" prop="project_location">
                  <el-input
                    disabled
                    :model-value="salesOrder.so_total_order_quantity"
                    class="w-auto mod-disabled"
                  ></el-input>
                </el-form-item>
              </div>

              <!--            Total Delivered QTY-->
              <div class="col-4 my-2">
                <label class="fs-6 fw-bold mb-1">Total Delivered QTY</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="project_location"
                  >
                    <el-input
                      disabled
                      :model-value="
                        salesOrder.itemDeliveredStatistics[0]
                          .total_delivery_quantity
                      "
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Number of Delivery-->
              <div class="col-4 my-2">
                <label class="fw-bold mb-1">Number of Delivery</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="customer_name">
                    <el-input
                      disabled
                      :model-value="
                        salesOrder.itemDeliveredStatistics[0].number_of_delivery
                      "
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Remaining Delivery QTY-->
              <div class="col-4 my-2">
                <label class="fs-6 fw-bold mb-1">Remaining Delivery QTY</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="project_location"
                  >
                    <el-input
                      disabled
                      :model-value="salesOrder.remaining_delivery_qty"
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Last delivery QTY-->
              <div class="col-4 my-2">
                <label class="fw-bold mb-1">Last Delivery QTY</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="customer_name">
                    <el-input
                      disabled
                      :model-value="
                        salesOrder.itemDeliveredStatistics[0]
                          .last_delivery_quantity
                      "
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <!--            Last Delivery Date-->
              <div class="col-4 my-2">
                <label class="fw-bold mb-1">Last Delivery Date</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="delivery_date">
                    <el-date-picker
                      disabled
                      :model-value="
                        salesOrder.itemDeliveredStatistics[0].last_delivery_date
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
              <th scope="col">#</th>
              <th class="required" scope="col" style="min-width: 150px">
                Item
              </th>
              <th class="required" scope="col">Delivery Date</th>
              <th class="required" scope="col">Truck NO</th>
              <th class="required" scope="col">Chalan</th>
              <th
                class="required text-end"
                style="min-width: 180px"
                scope="col"
              >
                Quantity
              </th>
              <th class="required text-end" scope="col">Rate</th>
              <th class="text-end" scope="col" style="min-width: 150px">
                Amount
              </th>
              <th class="text-end" scope="col">Action</th>
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
                <el-form-item
                  size="small"
                  class="mb-0"
                  :prop="'items.' + index + '.item_id'"
                  :rules="{
                    required: true,
                    message: 'Please select an item from the list',
                    trigger: 'change',
                  }"
                >
                  <el-select
                    fit-input-width
                    v-model="item.item_id"
                    filterable
                    placeholder="Select an item"
                    @change="setRow(index, item.item_id)"
                  >
                    <el-option
                      v-for="item in salesOrder.items"
                      :key="item.item_id"
                      :label="item.item_name"
                      :value="item.item_id"
                    />
                  </el-select>
                  <div
                    v-if="item.item_id"
                    :class="`mt-1 text-${
                      inStock(item.item_id) > 100
                        ? 'success'
                        : inStock(item.item_id) > 0
                        ? 'warning'
                        : 'danger'
                    }`"
                  >
                    Current Stock:
                    <span class="fw-bold">
                      {{ inStock(item.item_id).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    }) }}
                    </span>
                  </div>
                </el-form-item>
              </td>

              <!--            Delivery Date-->
              <td>
                <el-form-item
                  size="small"
                  class="mb-0"
                  :prop="'items.' + index + '.delivery_date'"
                  :rules="{
                    required: true,
                    message: 'Please enter a delivery date',
                    trigger: 'change',
                  }"
                >
                  <el-date-picker
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    v-model="item.delivery_date"
                    type="date"
                    placeholder="Delivery date"
                  >
                  </el-date-picker>
                </el-form-item>
              </td>

              <!--            Truck No-->
              <td>
                <el-form-item
                  size="small"
                  class="mb-0"
                  :prop="'items.' + index + '.vehicle_id'"
                  :rules="{
                    required: true,
                    message: 'Please select a truck form the list',
                    trigger: 'change',
                  }"
                >
                  <el-popover
                    placement="top-start"
                    title="Blocked!"
                    :width="200"
                    trigger="hover"
                    content="Select an item first"
                    :disabled="soDeliveryData.items[index].item_id != 0"
                  >
                    <template #reference>
                      <el-select
                        :disabled="soDeliveryData.items[index].item_id == 0"
                        v-model="item.vehicle_id"
                        filterable
                        placeholder="Truck"
                      >
                        <el-option
                          v-for="item in vehicles"
                          :key="item.id"
                          :label="item.license_plate"
                          :value="item.id"
                        />
                      </el-select>
                    </template>
                  </el-popover>
                </el-form-item>
              </td>

              <!--            Chalan-->
              <td>
                <el-form-item
                  size="small"
                  class="mb-0"
                  :prop="'items.' + index + '.chalan_no'"
                  :rules="{
                    required: true,
                    message: 'Chalan is required',
                    trigger: 'change',
                  }"
                >
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
                <el-form-item
                  size="small"
                  class="mb-0"
                  :prop="'items.' + index + '.delivered_quantity'"
                  :rules="[
                    {
                      min: 0.001,
                      type: 'number',
                      message: 'Please enter Quantity',
                      trigger: 'change',
                    },
                    {
                      type: 'number',
                      message: 'Must Be a number',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-popover
                    placement="top-start"
                    title="Blocked!"
                    :width="200"
                    trigger="hover"
                    content="Select an item first"
                    :disabled="soDeliveryData.items[index].item_id != 0"
                  >
                    <template #reference>
                      <el-input-number
                        :disabled="soDeliveryData.items[index].item_id == 0"
                        class="mod-align-right w-100"
                        v-model="item.delivered_quantity"
                        :precision="3"
                        :min="0.0"
                        :step="1"
                        :controls="false"
                        @input="
                          calculateItemAmount(
                            index,
                            item.item_id
                          )
                        "
                      />
                    </template>
                  </el-popover>
                  <div
                    v-if="item.item_id"
                    :class="`mt-1 text-${
                      availableDelivery(item.item_id) > 100
                        ? 'success'
                        : availableDelivery(item.item_id) > 0
                        ? 'warning'
                        : 'danger'
                    }`"
                  >
                    Remaining delivery:
                    <span class="fw-bold">
                      {{ availableDelivery(item.item_id).toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    }) }}
                    </span>
                  </div>
                </el-form-item>
              </td>

              <!--            Rate-->
              <td>
                <el-form-item
                  size="small"
                  class="mb-0"
                  :prop="'items.' + index + '.item_rate'"
                  :rules="{
                    required: true,
                    type: 'number',
                    min: 0.001,
                    message: 'Please enter a rate',
                    trigger: 'change',
                  }"
                >
                  <el-input-number
                    readonly
                    disabled
                    class="mod-align-right mod-disabled"
                    v-model="item.item_rate"
                    :precision="3"
                    :min="0.0"
                    :step="1"
                    :controls="false"
                    @input="calculateItemAmount(index, item.id)"
                  />
                </el-form-item>
              </td>

              <!--            Amount-->
              <td>
                <el-input
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
                  readonly
                />
              </td>

              <!--            Action-->
              <td class="text-end">
                <el-tooltip effect="dark" content="remove" placement="left">
                  <button
                    :disabled="soDeliveryData.items.length < 2"
                    class="btn btn-light-danger btn-sm"
                    @click.prevent="removeRow(item)"
                  >
                    <span class="svg-icon svg-icon-4">
                      <inline-svg
                        src="media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                  </button>
                </el-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <!--        Button for Add item-->
        <div class="mt-3">
          <el-button
            :disabled="
              salesOrder.remaining_delivery_qty <=
                soDeliveryData.total_delivered_qty ||
              soDeliveryData.items[soDeliveryData.items.length - 1]
                .delivered_quantity == 0
            "
            plain
            type="primary"
            size="mini"
            @click.prevent="addRow"
          >
            Add Row
          </el-button>
        </div>
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
                  calculateTotalQuantity.toLocaleString(undefined, {
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
                  calculateInitialTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
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
                step="2.5"
                :controls="false"
                v-model="soDeliveryData.truck_vara_rate"
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
                  calculateTotalTruckVara.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
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
                v-model="soDeliveryData.deliver_discount_in_percent"
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
                v-model="soDeliveryData.deliver_discount_in_amount"
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
                      calculateGrandTotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
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
                    v-model="calculateRoundAdjustment"
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
                      calculateRoundTotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
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
  </template>

  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ElMessage } from "element-plus";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import store from "@/store";

export default defineComponent({
  name: "add-so-delivery",
  components: { TitleAndButtons },

  setup() {
    // Set Bread Crumbs
    onMounted(() => {
      // calculateItemAmount(0);
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("New Items Delivery", [
        "Selling",
        "Sales Order",
      ]);
    });

    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******

    const route = useRoute();
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const initLoading = ref<boolean>(true);
    const store = useStore();
    fetchApi();

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** *******

    async function fetchApi() {
      initLoading.value = true;
      await store.dispatch(ACTIONS.VEHICLE.FETCH_VEHICLE_LIST);
      await store.dispatch(
        ACTIONS.SALES_ORDER.FETCH_SALES_ORDER,
        route.params.id
      );
      initLoading.value = false;
    }

    // Get Vehicles
    const vehicles = computed(() => {
      return store.getters[GETTERS.VEHICLE.vehicleList];
    });

    // Get Sales Order
    const salesOrder = computed(() => {
      return store.getters[GETTERS.SALES_ORDER.singleSalesOrder];
    });

    // Generate Chalan
    const ChalanNo = ref();
    const chalan = (lastChalan?) => {
      // sets chalan for first row
      if (!lastChalan) {
        // checks if chalan exists
        if (salesOrder.value.lastChalanID) {
          let split = salesOrder.value.lastChalanID.split("-");
          if (Number(split[2])) {
            ChalanNo.value = Number(split[2]) + 1;
            return (
              salesOrder.value.lastChalanPrefix + ChalanNo.value.toString()
            );
          } else {
            ChalanNo.value = 1;
            return (
              salesOrder.value.lastChalanPrefix + ChalanNo.value.toString()
            );
          }
        } else {
          ChalanNo.value = 1;
          return salesOrder.value.lastChalanPrefix + ChalanNo.value.toString();
        }
      } else {
        // sets chalan for except first row
        ChalanNo.value = Number(lastChalan) + 1;
        return salesOrder.value.lastChalanPrefix + ChalanNo.value.toString();
      }
    };

    const soDeliveryData = ref({
      so_date: "",
      so_id: "",
      so_total_order_quantity: "",
      delivery_date: "",
      project_title: "",
      customer_name: "",
      customer_id: "",
      project_location: "",
      total_delivered_amount: 0,
      total_delivered_qty: 0,
      truck_vara_rate: "",
      total_truck_vara_amount: "",
      deliver_discount_in_percent: "",
      deliver_discount_in_amount: "",
      deliver_so_grand_total: 0,
      deliver_rounding_adjustment: 0,
      deliver_receivable_total: 0,
      deliver_note: "",
      items: [
        {
          item_id: "",
          delivery_date: new Date().toISOString().substr(0, 10),
          vehicle_id: "",
          chalan_no: chalan(),
          item_rate: 0,
          delivered_quantity: 0,
          total_amount: 0,
        },
      ],
    });

    // Load Statistics Data
    soDeliveryData.value.so_date = salesOrder.value.so_delivery_date;
    soDeliveryData.value.so_id = salesOrder.value.id;
    soDeliveryData.value.so_total_order_quantity =
      salesOrder.value.so_total_order_quantity;
    soDeliveryData.value.delivery_date = salesOrder.value.so_delivery_date;
    soDeliveryData.value.project_title = salesOrder.value.project_title;
    soDeliveryData.value.customer_name =
      salesOrder.value.customer.customer_name;
    soDeliveryData.value.customer_id = salesOrder.value.customer_id;
    soDeliveryData.value.project_location = salesOrder.value.project_location;
    soDeliveryData.value.total_delivered_qty = salesOrder.value
      .remaining_delivery_qty
      ? salesOrder.value.remaining_delivery_qty
      : 0;

    // ******* Add and Remove Items Row ******
    // *******  ******  *******  ******  *******  ****** *******

    // Set Row
    const setRow = (index, id) => {
      for (let i = 0; i < salesOrder.value.items.length; i++) {
        if (salesOrder.value.items[i].item_id == id) {
          soDeliveryData.value.items[index].item_rate =
            salesOrder.value.items[i].item_rate;
          if (soDeliveryData.value.items.length > 1) {
            soDeliveryData.value.items[index].delivered_quantity =
              salesOrder.value.items[i].due_deliver_quantity -
              salesOrder.value.items[i]["total_delivered_quantity"];
            salesOrder.value.items[i]["total_delivered_quantity"] +=
              soDeliveryData.value.items[index].delivered_quantity;
          } else {
            soDeliveryData.value.items[index].delivered_quantity =
              salesOrder.value.items[i].due_deliver_quantity;
            salesOrder.value.items[i]["total_delivered_quantity"] =
              salesOrder.value.items[i].due_deliver_quantity;
          }
          soDeliveryData.value.items[index].total_amount =
            salesOrder.value.items[i].total_amount;
          let inventory =
            salesOrder.value.items[i].inventory.length > 0
              ? salesOrder.value.items[i].inventory[0].item_quantity
              : 0;
          if (
            salesOrder.value.items[i]["total_delivered_quantity"] > inventory
          ) {
            ElMessage({
              message:
                "No enough quantity in stock! Available Qty: " + inventory,
              type: "error",
              duration: 8000,
              showClose: true,
            });
            soDeliveryData.value.items[index].delivered_quantity = 0;
            soDeliveryData.value.items[index].total_amount = 0;
          }
        }
      }
    };

    // Add Item Row
    const addRow = () => {
      const rowData =
        soDeliveryData.value.items[soDeliveryData.value.items.length - 1];
      const row = {
        item_id: "",
        delivery_date: rowData.delivery_date,
        vehicle_id: "",
        chalan_no: chalan(ChalanNo.value),
        item_rate: 0,
        delivered_quantity: 0,
        total_amount: 0,
      };
      soDeliveryData.value.items.push(row);
      if (
        calculateTotalQuantity.value > salesOrder.value.remaining_delivery_qty
      ) {
        soDeliveryData.value.items[
          soDeliveryData.value.items.length - 1
        ].delivered_quantity = 0;
        soDeliveryData.value.items[
          soDeliveryData.value.items.length - 1
        ].total_amount = 0;
      }
    };

    // Remove Item Row
    const removeRow = (item) => {
      soDeliveryData.value.items.splice(
        soDeliveryData.value.items.indexOf(item),
        1
      );

      soDeliveryData.value.items[0].chalan_no = chalan();

      for (let i = 1; i < soDeliveryData.value.items.length; i++) {
        soDeliveryData.value.items[i].chalan_no = chalan(ChalanNo.value);
      }
    };

    // ******* Computed Values for Calculations ******
    // *******  ******  *******  ******  *******  ****** *******

    // Calculate The total Amount
    const calculateInitialTotal = computed(() => {
      let initTotal = 0;
      soDeliveryData.value.items.forEach((item) => {
        initTotal += item.total_amount;
      });
      return initTotal;
    });

    // Calculate The total Quantity
    const calculateTotalQuantity = computed(() => {
      let totalQuantity = 0;
      soDeliveryData.value.items.forEach((item) => {
        totalQuantity += item.delivered_quantity;
      });
      return Number(totalQuantity);
    });

    // Total Truck Vara
    const calculateTotalTruckVara = computed(() => {
      return (
        Number(soDeliveryData.value.truck_vara_rate) *
        Number(soDeliveryData.value.total_delivered_qty)
      );
    });

    // Calculate The Grand Total
    const calculateGrandTotal = computed(() => {
      return (
        soDeliveryData.value.total_delivered_amount -
        Number(soDeliveryData.value.deliver_discount_in_amount) -
        Number(
          soDeliveryData.value.total_delivered_amount *
            (Number(soDeliveryData.value.deliver_discount_in_percent) / 100)
        )
      );
    });

    // Calculate Round Adjustment
    const calculateRoundAdjustment = computed(() => {
      return (
        soDeliveryData.value.deliver_so_grand_total -
        Math.round(soDeliveryData.value.deliver_so_grand_total)
      ).toFixed(2);
    });

    // Calculate Round Total
    const calculateRoundTotal = computed(() => {
      return Number(soDeliveryData.value.deliver_so_grand_total.toFixed(0));
    });

    // Calculate Individual Item Amount
    const calculateItemAmount = (index, id) => {
      let i = 0;
      if(typeof soDeliveryData.value.items[index].delivered_quantity === 'undefined'){
        soDeliveryData.value.items[index].delivered_quantity = 0;
      }
      salesOrder.value.items.forEach((item, index) => {
        if (item.item_id == id) {
          i = index;
        }
      });

      salesOrder.value.items[i].total_delivered_quantity = 0;
      soDeliveryData.value.items.forEach((item) => {
        if (item["item_id"] == id) {
          salesOrder.value.items[i].total_delivered_quantity +=
            item.delivered_quantity;
        }
      });

      let inventory =
        salesOrder.value.items[i].inventory.length > 0
          ? salesOrder.value.items[i].inventory[0].item_quantity
          : 0;
      if (inventory < salesOrder.value.items[i].total_delivered_quantity) {
        soDeliveryData.value.items[index].delivered_quantity = 0;
        soDeliveryData.value.items[index].total_amount = 0;

        salesOrder.value.items[i].total_delivered_quantity = 0;
        soDeliveryData.value.items.forEach((item) => {
          if (item["item_id"] == id) {
            salesOrder.value.items[i].total_delivered_quantity +=
              item.delivered_quantity;
          }
        });

        ElMessage({
          message: "No enough quantity in stock! Available Qty: " + inventory,
          type: "error",
          duration: 8000,
          showClose: true,
        });
      } else if (
        salesOrder.value.items[i].due_deliver_quantity <
        salesOrder.value.items[i].total_delivered_quantity
      ) {
        soDeliveryData.value.items[index].delivered_quantity = 0;
        soDeliveryData.value.items[index].total_amount = 0;

        salesOrder.value.items[i].total_delivered_quantity = 0;
        soDeliveryData.value.items.forEach((item) => {
          if (item["item_id"] == id) {
            salesOrder.value.items[i].total_delivered_quantity +=
              item.delivered_quantity;
          }
        });

        ElMessage({
          message:
            "Given quantity is more than remaining quantity! Remaining QTY: " +
            (salesOrder.value.items[i].due_deliver_quantity -
              salesOrder.value.items[i].total_delivered_quantity),
          type: "error",
          duration: 8000,
          showClose: true,
        });
      } else {
        soDeliveryData.value.items[index].total_amount =
          soDeliveryData.value.items[index].item_rate *
          soDeliveryData.value.items[index].delivered_quantity;
      }
    };

    // ******* Form Submission, Validation and Rest ******
    // *******  ******  *******  ******  *******  ****** *******

    // Front End Validation Rules
    const rules = ref({
      project_title: [
        {
          required: true,
          message: "Please Select a project from the list",
          trigger: "change",
        },
      ],
      customer_id: [
        {
          required: true,
          message: "Please select a customer from the list",
          trigger: "change",
        },
      ],
      project_location: [
        {
          required: true,
          message: "Please enter a project location",
          trigger: "change",
        },
      ],
      so_date: [
        {
          required: true,
          message: "Please select a so date",
          trigger: "change",
        },
      ],
      delivery_date: [
        {
          required: true,
          message: "Please select a delivery date",
          trigger: "change",
        },
      ],
    });

    // Model for Backend Validation
    const errorMsgs = ref({});

    // Reset Form
    const resetForm = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Resetting",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          if (!formRef.value) {
            return;
          }
          formRef.value.clearValidate();
          formRef.value.resetFields();
          errorMsgs.value = {};
        }
      });
    };

    // Form Submit
    const submit = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Creating New SO Delivery",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          if (!formRef.value) {
            return;
          }
          formRef.value.validate((valid) => {
            // Frontend Validation Check
            if (valid) {
              loading.value = true;

              setTimeout(() => {
                // Send Lc create request to store
                store
                  .dispatch(
                    ACTIONS.SO_DELIVERY.CREATE_SO_DELIVERY,
                    soDeliveryData.value
                  )
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "Item Delivery added successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset form
                      router.push(
                        `/sales-order/${route.params.id}/so-delivery`
                      );
                      if (formRef.value) {
                        formRef.value.clearValidate();
                        formRef.value.resetFields();
                        errorMsgs.value = {};
                      }
                    });
                  })
                  .catch((e) => {
                    loading.value = false;
                    errorMsgs.value = e.data.validation_error;
                    Swal.fire({
                      text: "Sorry, looks like there are some errors detected, please try again.",
                      icon: "error",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // If not success Triggers Backend end Validation
                      return false;
                    });
                  });
              }, 2000);
            } else {
              // If Frontend validation fails, Triggers Frontend validation msg
              Swal.fire({
                text: "Sorry, looks like there are some errors detected, please try again.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
              loading.value = false;
              return false;
            }
          });
        }
      });
    };

    const inStock = (itemId) => {
      if (itemId) {
        const item = salesOrder.value.items.find(
          (item) => item.item_id == itemId
        );
        if (!!item && item.inventory.length > 0) {
          let inventory = item.inventory[0].item_quantity;
          let onScreenQty = calcQty(itemId);

          return inventory - onScreenQty;
        }
      }

      return 0;
    };

    const availableDelivery = (itemId) => {
      if (itemId) {
        const item = salesOrder.value.items.find(
          (item) => item.item_id == itemId
        );
        if (item) {
          let dueDelivery = item.due_deliver_quantity;
          let onScreenQty = calcQty(itemId);

          return dueDelivery - onScreenQty;
        }
      }

      return 0;
    };

    const calcQty = (itemId) => {
      let sum = 0;
      soDeliveryData.value.items.forEach((item) => {
        if (item.item_id == itemId) {
          sum += item.delivered_quantity;
        }
      });
      return sum;
    };

    return {
      // Validation and Initial setup
      rules,
      formRef,
      loading,
      initLoading,

      // Submit and Reset
      resetForm,
      submit,

      // Required/ Lookup Data
      salesOrder,
      vehicles,

      // All Model/ Data Values
      soDeliveryData,
      calculateInitialTotal,
      calculateTotalQuantity,
      calculateTotalTruckVara,
      calculateGrandTotal,
      calculateRoundAdjustment,
      calculateRoundTotal,

      // Item Add & Remove & Amount
      inStock,
      availableDelivery,
      addRow,
      setRow,
      removeRow,
      calculateItemAmount,
    };
  },

  // ******* Watch Calculated Value and change the Model with updated value ******
  // *******  ******  *******  ******  *******  ****** *******
  watch: {
    calculateInitialTotal: {
      deep: true,
      handler: function (newVal) {
        this.soDeliveryData.total_delivered_amount = newVal;
      },
    },

    calculateTotalQuantity: {
      deep: true,
      handler: function (newVal) {
        this.soDeliveryData.total_delivered_qty = newVal;
      },
    },

    calculateTotalTruckVara: {
      deep: true,
      handler: function (newVal) {
        this.soDeliveryData.total_truck_vara_amount = newVal;
      },
    },

    calculateGrandTotal: {
      deep: true,
      handler: function (newVal) {
        this.soDeliveryData.deliver_so_grand_total = newVal;
      },
    },

    calculateRoundAdjustment: {
      deep: true,
      handler: function (newVal) {
        this.soDeliveryData.deliver_rounding_adjustment = newVal;
      },
    },

    calculateRoundTotal: {
      deep: true,
      handler: function (newVal) {
        this.soDeliveryData.deliver_receivable_total = newVal;
      },
    },
  },

  methods: {
    entrCheck($event) {
      $event.target.blur();
      return false;
    },
    forceUpdate() {
      this.$forceUpdate();
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

</style>
