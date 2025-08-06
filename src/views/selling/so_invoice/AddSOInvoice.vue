<template>
  <template v-if="!initLoading">
    <!--   Submit -->
    <TitleAndButtons
      v-loading="loading"
      :title="`New Invoice - (${salesOrder.so_number})`"
    >
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Go Back-->
        <!--      <router-link to="/purchase-order">-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-info me-3"
          @click="this.$router.back()"
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
          @click="resetForm"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr029.svg" />
          </span>
          Reset
        </button>
        <!--      </router-link>-->
        <!--        ADD-->
        <button
          v-if="soDeliveryList.length > 0"
          type="button"
          class="btn btn-sm btn-flex btn-primary"
          @click="submit"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
          Submit
        </button>
      </template>
    </TitleAndButtons>

    <el-form
      v-if="soDeliveryList.length > 0"
      :model="soInvoiceData"
      :rules="rules"
      v-loading="loading"
      ref="formRef"
      @keydown.enter.prevent="entrCheck"
    >
      <!-- Initial Details About PO-->

      <!--    <div class="card-body pt-0">-->
      <el-card class="box-card mb-4">
        <table class="table mb-0">
          <tbody class="">
            <tr class="justify-content-end">
              <!--            Project Title-->
              <td>
                <label class="required fs-6 fw-bold mb-1">Project Title</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="project_location"
                  >
                    <el-input
                      disabled
                      :model-value="soInvoiceData.project_title"
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </td>

              <!--            Customer-->
              <td>
                <label class="required fs-6 fw-bold mb-1">Customer</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="customer_name">
                    <el-input
                      disabled
                      :model-value="soInvoiceData.customer_name"
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>
              </td>

              <!--            Invoice Date-->
              <td>
                <label class="required fw-bold mb-1">Invoice Date</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="invoice_date">
                    <el-date-picker
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      v-model="soInvoiceData.invoice_date"
                      type="date"
                      placeholder="Select a SO date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </td>

              <!--            Invoice Due Date-->
              <td>
                <label class="required fw-bold mb-1">Invoice Due Date</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="due_date">
                    <el-date-picker
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      v-model="soInvoiceData.due_date"
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
        <el-divider>Delivery Items</el-divider>
        <!--        show item-->

        <table class="table">
          <thead>
            <tr class="fw-bold fs-5">
              <th scope="col">No.</th>
              <th class="required" scope="col">So Delivery Number</th>
              <th class="required" scope="col">So Number</th>
              <th class="required" scope="col">Delivery Date</th>
              <th class="required text-end" scope="col">Delivered QTY</th>
              <th class="required text-end" scope="col">Delivered Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr
              class="border-bottom-2"
              v-for="(item, index) in soDeliveryList"
              :key="index"
            >
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            So Delivery Number-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    :model-value="item.so_delivery_number"
                    class="w-auto"
                  />
                </el-form-item>
              </td>

              <!--            So Number-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-input
                    readonly
                    :model-value="item.so_details.so_number"
                    class="w-auto"
                  />
                </el-form-item>
              </td>

              <!--            Delivery Date-->
              <td>
                <el-form-item size="small" class="mb-0">
                  <el-date-picker
                    readonly
                    v-model="item.delivery_date"
                    type="date"
                    placeholder="Delivery date"
                    class="w-auto"
                  >
                  </el-date-picker>
                </el-form-item>
              </td>

              <!--            Total DELIVERED QTY-->
              <td class="text-end">
                <el-form-item size="small" class="mb-0 w-auto">
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    readonly
                    :model-value="
                      item.total_delivered_qty.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })
                    "
                    class="w-auto"
                  />
                </el-form-item>
              </td>

              <!--            Total Receivable Amount-->
              <td class="text-end">
                <el-form-item size="small" class="mb-0">
                  <el-input
                    :input-style="{
                      'text-align': 'right',
                    }"
                    readonly
                    :model-value="
                      item.deliver_receivable_total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    "
                    class="w-auto"
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
            <el-form-item size="small">
              <el-input
                :input-style="{
                  'text-align': 'right',
                }"
                :model-value="
                  soInvoiceData.si_total_invoice_quantity.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )
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
                  soInvoiceData.si_total_invoice_amount.toLocaleString(
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
                v-model="soInvoiceData.si_discount_in_percentage"
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
                v-model="soInvoiceData.si_discount_in_amount"
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
                    v-model="soInvoiceData.si_note"
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

    <el-card v-else class="box-card align-items-center text-center min-h-50">
      <span class="fs-1 text-muted">No Deliveries Available for Invoice</span>
    </el-card>
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
import store from "@/store";
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "add-so-invoice",
  components: { TitleAndButtons },

  setup: function () {
    // Set Bread Crumbs
    onMounted(() => {
      // calculateItemAmount(0);
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("New Invoice", ["Selling", "Invoice"]);
    });

    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******

    const route = useRoute();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const initLoading = ref<boolean>(false);
    const router = useRouter();
    fetchApi();

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** *******

    async function fetchApi() {
      initLoading.value = true;
      await store.dispatch(
        ACTIONS.SO_DELIVERY.FETCH_SO_DELIVERY_LIST_FOR_INVOICE,
        route.params.so_id
      );
      await store.dispatch(
        ACTIONS.SALES_ORDER.FETCH_SALES_ORDER,
        route.params.so_id
      );
      await calculateInitialTotal();
      await calculateTotalQuantity();

      initLoading.value = false;
    }

    // Get Delivery List
    const soDeliveryList = computed(() => {
      return store.getters[GETTERS.SO_DELIVERY.soDeliveryList];
    });

    // Get Sales Order
    const salesOrder = computed(() => {
      return store.getters[GETTERS.SALES_ORDER.singleSalesOrder];
    });

    const soInvoiceData = ref({
      so_date: salesOrder.value.so_delivery_date,
      so_id: salesOrder.value.id,
      so_total_order_quantity: "",
      invoice_date: "",
      due_date: "",
      project_title: salesOrder.value.project_title,
      customer_name: salesOrder.value.customer.customer_name,
      customer_id: salesOrder.value.customer_id,
      project_location: "",
      si_total_invoice_amount: 0,
      si_total_invoice_quantity: 0,
      truck_vara_rate: "",
      total_truck_vara_amount: "",
      si_discount_in_percentage: "",
      si_discount_in_amount: "",
      si_grand_total: 0,
      si_rounding_adjustment: 0,
      si_receivable_total: 0,
      si_note: "",
      delivery_list: [{}],
    });

    // Calculate for invoice

    const calc = () => {
      soDeliveryList.value.forEach((item) => {
        const data = {
          so_delivery_id: item.id,
          total_quantity: item.total_delivered_qty,
          total_amount: item.total_delivered_amount,
        };
        soInvoiceData.value.delivery_list.push(data);
      });
      soInvoiceData.value.delivery_list.splice(0, 1);
    };

    // setTimeout(async () => {
    //   // Fetch Available Delivery List
    //   await store.dispatch(
    //     ACTIONS.SO_DELIVERY.FETCH_SO_DELIVERY_LIST_FOR_INVOICE,
    //     route.params.so_id
    //   );
    //
    //   // Fetch Sales Order
    //   await store
    //     .dispatch(ACTIONS.SALES_ORDER.FETCH_SALES_ORDER, route.params.so_id)
    //     .then(() => {
    //       initLoading.value = false;
    //       // Load Statistics Data
    //       soInvoiceData.value.so_date = salesOrder.value.so_delivery_date;
    //       soInvoiceData.value.so_id = salesOrder.value.id;
    //       soInvoiceData.value.project_title = salesOrder.value.project_title;
    //       soInvoiceData.value.customer_name =
    //         salesOrder.value.customer.customer_name;
    //       soInvoiceData.value.customer_id = salesOrder.value.customer_id;
    //
    //       // Necessary Method Calling
    //       calculateInitialTotal();
    //       calculateTotalQuantity();
    //     });
    // }, 2000);

    // ******* Computed Values for Calculations ******
    // *******  ******  *******  ******  *******  ****** *******

    // Calculate The total Amount
    const calculateInitialTotal = () => {
      let sum = 0;
      soDeliveryList.value.forEach((item) => {
        sum += item.deliver_receivable_total;
      });
      soInvoiceData.value.si_total_invoice_amount = sum;
    };

    // Calculate The total Quantity
    const calculateTotalQuantity = () => {
      let sum = 0;
      soDeliveryList.value.forEach((item) => {
        console.log(item.total_delivered_qty);
        sum += item.total_delivered_qty;
      });
      soInvoiceData.value.si_total_invoice_quantity = sum;
    };

    // Total Truck Vara
    const calculateTotalTruckVara = computed(() => {
      console.log(soInvoiceData.value.truck_vara_rate);
      return (
        Number(soInvoiceData.value.truck_vara_rate) *
        Number(soInvoiceData.value.si_total_invoice_quantity)
      );
    });

    // Calculate The Grand Total
    const calculateGrandTotal = computed(() => {
      return (
        soInvoiceData.value.si_total_invoice_amount -
        Number(soInvoiceData.value.si_discount_in_amount) -
        Number(
          soInvoiceData.value.si_total_invoice_amount *
            (Number(soInvoiceData.value.si_discount_in_percentage) / 100)
        )
      );
    });

    // Calculate Round Adjustment
    const calculateRoundAdjustment = computed(() => {
      return (
        soInvoiceData.value.si_grand_total -
        Math.round(soInvoiceData.value.si_grand_total)
      ).toFixed(2);
    });

    // Calculate Round Total
    const calculateRoundTotal = computed(() => {
      return Number(soInvoiceData.value.si_grand_total.toFixed(0));
    });

    // ******* Form Submission, Validation and Rest ******
    // *******  ******  *******  ******  *******  ****** *******

    // Front End Validation Rules
    const rules = ref({
      due_date: [
        {
          required: true,
          message: "Please select a due date",
          trigger: "change",
        },
      ],
      invoice_date: [
        {
          required: true,
          message: "Please select a invoice date",
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
      calc();
      // Confirmation Modal
      Swal.fire({
        title: "Creating New Sales Invoice",
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
                // Send Invoice create request to store
                store
                  .dispatch(
                    ACTIONS.SO_INVOICE.CREATE_SO_INVOICE,
                    soInvoiceData.value
                  )
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "Invoice created successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      router.push(`/so-invoice`);
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
      soDeliveryList,

      // All Model/ Data Values
      soInvoiceData,
      calculateInitialTotal,
      calculateTotalQuantity,
      calculateTotalTruckVara,
      calculateGrandTotal,
      calculateRoundAdjustment,
      calculateRoundTotal,
    };
  },

  // ******* Watch Calculated Value and change the Model with updated value ******
  // *******  ******  *******  ******  *******  ****** *******
  watch: {
    $route() {
      console.log(this.$route.params.id);
    },

    calculateGrandTotal: {
      deep: true,
      handler: function (newVal) {
        this.soInvoiceData.si_grand_total = newVal;
      },
    },

    calculateRoundAdjustment: {
      deep: true,
      handler: function (newVal) {
        this.soInvoiceData.si_rounding_adjustment = newVal;
      },
    },

    calculateRoundTotal: {
      deep: true,
      handler: function (newVal) {
        this.soInvoiceData.si_receivable_total = newVal;
      },
    },
  },

  methods: {
    entrCheck($event) {
      $event.target.blur();
      return false;
    },
  },
});
</script>

<style>
.mod-disabled .el-input__inner {
  color: black !important;
}
.mod-align .el-input__inner {
  text-align: right !important;
}
</style>
