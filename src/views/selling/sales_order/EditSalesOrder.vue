<template>
  <!-- Submit -->
  <TitleAndButtons title="Edit Sales Order">
    <!--    Buttons-->
    <template v-slot:buttons>
      <!--          Go Back-->
      <!--      <router-link to="/purchase-order">-->
      <button
        type="button"
        class="btn btn-sm btn-flex btn-danger me-3"
        @click="resetForm"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr029.svg" />
        </span>
        Cancel
      </button>
      <!--      </router-link>-->
      <!--        ADD-->
      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        @click="submit"
        :disabled="loading"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
        </span>
        Update
      </button>
    </template>
  </TitleAndButtons>

  <!--  <div class="card">-->
  <el-form
    :model="salesOrderData"
    :rules="rules"
    v-loading="loading"
    ref="formRef"
  >
    <!-- Initials -->
    <!--    <div class="card-body pt-0">-->
    <el-card class="box-card mb-4">
      <table class="table mb-0">
        <tbody class="">
          <tr class="justify-content-end">
            <!--            Project Title-->
            <td>
              <label class="required fs-6 fw-bold">Project Title</label>
              <div>
                <el-form-item size="small" class="mb-0" prop="project_title">
                  <el-input
                    v-model="salesOrderData.project_title"
                    placeholder="Enter A Project Title"
                    class="w-auto"
                  ></el-input>
                </el-form-item>
              </div>
            </td>

            <!--            Project Location-->
            <td>
              <label class="required fs-6 fw-bold">Project Location</label>
              <div>
                <el-form-item size="small" class="mb-0" prop="project_location">
                  <el-input
                    v-model="salesOrderData.project_location"
                    placeholder="Enter A Project Location"
                    class="w-auto"
                  ></el-input>
                </el-form-item>
              </div>
            </td>

            <!--            Customer-->
            <td>
              <label class="required fw-bold">Customer</label>
              <div>
                <el-form-item size="small" class="mb-0" prop="customer_id">
                  <el-select
                    v-model="salesOrderData.customer_id"
                    filterable
                    placeholder="Select a customer"
                  >
                    <el-option
                      v-for="customers in customerList"
                      :key="customers.id"
                      :label="customers.customer_name"
                      :value="customers.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </td>

            <!--            SO Date-->
            <td>
              <label class="required fw-bold">Sales Oder Date</label>
              <div>
                <el-form-item size="small" class="mb-0" prop="so_order_date">
                  <el-date-picker
                    v-model="salesOrderData.so_order_date"
                    type="date"
                    placeholder="Select a SO date"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </td>

            <!--            Delivery Date-->
            <td>
              <label class="required fw-bold">Delivery Date</label>
              <div>
                <el-form-item size="small" class="mb-0" prop="so_delivery_date">
                  <el-date-picker
                    v-model="salesOrderData.so_delivery_date"
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
            <th class="required" scope="col" style="min-width: 150px">Item</th>
            <th class="required" scope="col">Delivery Date</th>
            <th class="required" scope="col">Quantity</th>
            <th class="required" scope="col">Rate</th>
            <th class="text-end" scope="col" style="min-width: 150px">
              Amount
            </th>
            <th class="text-end" scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in salesOrderData.items" :key="index">
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
                >
                  <el-option
                    v-for="item in itemList"
                    :key="item.id"
                    :label="item.item_name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </td>

            <!--            Date-->
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
                  v-model="item.delivery_date"
                  type="date"
                  placeholder="Delivery date"
                >
                </el-date-picker>
              </el-form-item>
            </td>

            <!--            Quantity-->
            <td>
              <el-form-item
                size="small"
                class="mb-0"
                :prop="'items.' + index + '.order_quantity'"
                :rules="{
                  required: true,
                  type: 'number',
                  min: 0.001,
                  message: 'Please enter Quantity',
                  trigger: 'change',
                }"
              >
                <el-input-number
                  v-model="item.order_quantity"
                  :precision="3"
                  :min="0.0"
                  :step="1"
                  :controls="false"
                  @input="calculateItemAmount(index)"
                />
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
                  v-model="item.item_rate"
                  :precision="3"
                  :min="0.0"
                  :step="1"
                  :controls="false"
                  @input="calculateItemAmount(index)"
                />
              </el-form-item>
            </td>

            <!--            Amount-->
            <td class="text-end">
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
                  :disabled="salesOrderData.items.length < 2"
                  class="btn btn-light-danger btn-sm"
                  @click="removeRow(item)"
                >
                  <span class="svg-icon svg-icon-4">
                    <inline-svg src="media/icons/duotune/general/gen027.svg" />
                  </span>
                </button>
              </el-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
      <!--        Button for Add item-->
      <div class="mt-3">
        <el-button plain type="primary" size="small" @click="addRow">
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
              v-model="salesOrderData.so_discount_in_percentage"
              type="number"
              placeholder="Enter Discount In Percent"
            >
              <template #prepend>%</template>
            </el-input>
          </el-form-item>
        </div>

        <!--        In Amount-->
        <div class="col-md-4 mt-5 fv-row">
          <label class="fw-bold fs-6 mb-1">Additional Discount in Amount</label>
          <el-form-item size="small" prop="lc_rate_usd">
            <el-input
              v-model="salesOrderData.so_discount_in_amount"
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
                  v-model="salesOrderData.so_delivery_note"
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
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import store from "@/store";
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "add-sales-order",
  components: { TitleAndButtons },

  setup() {
    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******

    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(true);
    const router = useRouter();

    // Load Item list for dropdown
    store.dispatch(ACTIONS.ITEM.FETCH_ITEM_LIST);
    const itemList = computed(() => {
      return store.getters[GETTERS.ITEM.itemList];
    });

    // Load Item Customer for dropdown
    store.dispatch(ACTIONS.CUSTOMER.FETCH_CUSTOMER_LIST);
    const customerList = computed(() => {
      return store.getters[GETTERS.CUSTOMER.customerList];
    });

    // Set Bread Crumbs
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Add Sales Order", ["Selling", "Sales Order"]);
    });

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** *******
    const salesOrderData = ref({
      so_order_date: new Date().toISOString().substr(0, 10),
      so_delivery_date: new Date().toISOString().substr(0, 10),
      delivery_date: new Date().toISOString().substr(0, 10),
      project_title: "",
      customer_id: "",
      project_location: "",
      so_total_amount: 0,
      so_total_order_quantity: 0,
      so_discount_in_percentage: "",
      so_discount_in_amount: "",
      so_grand_total: 0,
      so_rounding_adjustment: 0,
      receivable_total: 0,
      so_delivery_note: "",
      items: [
        {
          item_id: "",
          delivery_date: new Date().toISOString().substr(0, 10),
          item_rate: 0,
          order_quantity: 0,
          total_amount: 0,
        },
      ],
    });

    // ******* Computed Values for Calculations ******
    // *******  ******  *******  ******  *******  ****** *******

    // Calculate The total Amount
    const calculateInitialTotal = computed(() => {
      let initTotal = 0;
      salesOrderData.value.items.forEach((item) => {
        initTotal += item.total_amount;
      });
      return initTotal;
    });

    // Calculate The total Quantity
    const calculateTotalQuantity = computed(() => {
      let totalQuantity = 0;
      salesOrderData.value.items.forEach((item) => {
        totalQuantity += item.order_quantity;
      });
      return Number(totalQuantity);
    });

    // Calculate The Grand Total
    const calculateGrandTotal = computed(() => {
      return (
        salesOrderData.value.so_total_amount -
        Number(salesOrderData.value.so_discount_in_amount) -
        Number(
          salesOrderData.value.so_total_amount *
            (Number(salesOrderData.value.so_discount_in_percentage) / 100)
        )
      );
    });

    // Calculate Round Adjustment
    const calculateRoundAdjustment = computed(() => {
      return (
        salesOrderData.value.so_grand_total -
        Math.round(salesOrderData.value.so_grand_total)
      ).toFixed(2);
    });

    // Calculate Round Total
    const calculateRoundTotal = computed(() => {
      return Number(salesOrderData.value.so_grand_total.toFixed(0));
    });

    // Calculate Individual Item Amount
    const calculateItemAmount = (index) => {
      // e.preventDefault()
      salesOrderData.value.items[index].total_amount =
        salesOrderData.value.items[index].item_rate *
        salesOrderData.value.items[index].order_quantity;
    };

    // ******* Add and Remove Items Row ******
    // *******  ******  *******  ******  *******  ****** *******

    // Add Item Row
    const addRow = () => {
      const row = {
        item_id: "",
        delivery_date: salesOrderData.value.so_delivery_date,
        item_rate: 0,
        order_quantity: 0,
        total_amount: 0,
      };
      salesOrderData.value.items.push(row);
    };

    // Remove Item Row
    const removeRow = (item) => {
      salesOrderData.value.items.splice(
        salesOrderData.value.items.indexOf(item),
        1
      );
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
      so_order_date: [
        {
          required: true,
          message: "Please select a so date",
          trigger: "change",
        },
      ],
      so_delivery_date: [
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
        title: "Update Sales Info",
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
                    ACTIONS.SALES_ORDER.CREATE_SALES_ORDER,
                    salesOrderData.value
                  )
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "SO created successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset form
                      // resetForm();
                      router.push("/sales-order");
                    });
                  })
                  .catch((e) => {
                    loading.value = false;
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
                      errorMsgs.value = e.data.validation_error;
                    });

                    return false;
                  });
              }, 2000);
            } else {
              // If Frontend validation fails, Shows Frontend validation msg
              loading.value = false;
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
            }
          });
        }
      });
    };

    return {
      // Validation and Initial setup
      rules,
      formRef,
      loading,

      // Submit and Reset
      resetForm,
      submit,

      // Required/ Lookup Data
      itemList,
      customerList,

      // All Model/ Data Values
      salesOrderData,
      calculateInitialTotal,
      calculateTotalQuantity,
      calculateGrandTotal,
      calculateRoundAdjustment,
      calculateRoundTotal,

      // Item Add & Remove & Amount
      addRow,
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
        this.salesOrderData.so_total_amount = newVal;
      },
    },

    calculateTotalQuantity: {
      deep: true,
      handler: function (newVal) {
        this.salesOrderData.so_total_order_quantity = newVal;
      },
    },

    calculateGrandTotal: {
      deep: true,
      handler: function (newVal) {
        this.salesOrderData.so_grand_total = newVal;
      },
    },

    calculateRoundAdjustment: {
      deep: true,
      handler: function (newVal) {
        this.salesOrderData.so_rounding_adjustment = newVal;
      },
    },

    calculateRoundTotal: {
      deep: true,
      handler: function (newVal) {
        this.salesOrderData.receivable_total = newVal;
      },
    },
  },
});
</script>

<style scoped></style>
