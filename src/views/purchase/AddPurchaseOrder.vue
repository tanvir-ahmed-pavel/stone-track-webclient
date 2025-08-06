<template>
  <template v-if="!loading">
    <TitleAndButtons title="Add Purchase Order">
      <!--    Buttons-->
      <template v-slot:buttons>
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click="resetForm"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
          </span>
          Reset
        </button>

        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary"
          @click.prevent="submit"
        >
          <span v-if="!loading" class="indicator-label">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
            </span>
          </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...<span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span
          ></span>
          Submit
        </button>
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form
      :model="purchaseOrderData"
      :rules="rules"
      ref="formRef"
      v-loading="loading"
    >
      <!-- Initials -->
      <!--    <div class="card-body pt-0">-->
      <el-card class="box-card mb-4">
        <table class="table mb-0">
          <tbody class="">
            <tr class="justify-content-end">
              <td>
                <label class="required fs-6 fw-bold">Purchase From</label>
                <div>
                  <el-form-item class="mb-0" prop="purchase_from">
                    <el-select
                      v-model="purchaseOrderData.purchase_from"
                      filterable
                      placeholder="Select Purchase From"
                      size="small"
                      @change="setVal"
                    >
                      <el-option
                        v-for="purchase in purchaseFrom"
                        :key="purchase.id"
                        :label="purchase.purchaseFrom"
                        :value="purchase.purchaseFrom"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </td>

              <!--            LC-->
              <td>
                <label class="required fs-6 fw-bold">LC</label>
                <div>
                  <el-form-item class="mb-0" prop="lc_id">
                    <el-select
                      v-model="purchaseOrderData.lc_id"
                      filterable
                      placeholder="Select A LC"
                      size="small"
                      :disabled="disable1"
                      @change="lcSelected"
                      clearable
                    >
                      <el-option
                        v-for="lc in lcList"
                        :key="lc.id"
                        :label="lc.lc_number"
                        :value="lc.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </td>

              <!--            Supplier-->
              <td>
                <label class="required fw-bold">Supplier</label>
                <div>
                  <el-form-item class="mb-0" prop="supplier_id">
                    <el-select
                      v-model="purchaseOrderData.supplier_id"
                      filterable
                      placeholder="Select a supplier"
                      size="small"
                      :disabled="isImported"
                      class="mod-disabled"
                    >
                      <el-option
                        v-for="supplier in supplierList"
                        :key="supplier.id"
                        :label="supplier.supplier_name"
                        :value="supplier.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </td>

              <!--            PO Date-->
              <td>
                <label class="required fw-bold">Purchase Oder Date</label>
                <div>
                  <el-form-item class="mb-0" prop="order_date">
                    <el-date-picker
                      v-model="purchaseOrderData.order_date"
                      type="date"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Select a PO date"
                      size="small"
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
                      v-model="purchaseOrderData.required_date"
                      type="date"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Select a Required date"
                      size="small"
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
              <th class="text-end" scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in purchaseOrderData.items" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5" scope="row">
                {{ index + 1 + "." }}
              </th>

              <!--            Item-->
              <td>
                <el-form-item
                  class="mb-0"
                  :prop="'items.' + index + '.item_id'"
                  :rules="{
                    required: true,
                    message: 'Please select an item from the list',
                    trigger: ['change', 'blur'],
                  }"
                >
                  <el-select
                    fit-input-width
                    v-model="item.item_id"
                    filterable
                    placeholder="Select an item"
                    size="small"
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
                  class="mb-0"
                  :prop="'items.' + index + '.required_date'"
                  :rules="{
                    required: true,
                    message: 'Please enter a required date',
                    trigger: ['change', 'blur'],
                  }"
                >
                  <el-date-picker
                    v-model="item.required_date"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="Required date"
                    size="small"
                  >
                  </el-date-picker>
                </el-form-item>
              </td>

              <!--            Quantity-->
              <td>
                <el-form-item
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
                          class="mod-disabled"
                          :disabled="isImported"
                    v-model="item.order_quantity"
                    :precision="3"
                    :min="0.0"
                    :step="1"
                    controls-position="right"
                    @input="calculateItemAmount(index)"
                    size="small"
                    :controls="false"
                  />
                </el-form-item>
              </td>

              <!--            Rate-->
              <td>
                <el-form-item
                  class="mb-0"
                  :prop="'items.' + index + '.item_rate'"
                  :rules="{
                    required: true,
                    type: 'number',
                    min: 0.001,
                    message: 'Please enter a item_rate',
                    trigger: 'change',
                  }"
                >
                  <el-input-number
                          class="mod-disabled"
                          :disabled="isImported"
                    v-model="item.item_rate"
                    :precision="3"
                    :min="0.0"
                    :step="1"
                    controls-position="right"
                    @input="calculateItemAmount(index)"
                    size="small"
                    :controls="false"
                  />
                </el-form-item>
              </td>

              <!--            Amount-->
              <td class="text-end">
                <el-input
                        class="mod-disabled"
                        :disabled="isImported"
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
                  size="small"
                />
              </td>

              <!--            Action-->
              <td class="text-end">
                <el-button
                  plain
                  type="danger"
                  size="small"
                  style="font-family: 'Helvetica Neue', 'Helvetica'"
                  :disabled="purchaseOrderData.items.length < 2 || isImported"
                  @click="removeRow(item)"
                >
                  Remove
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>
        <!--        Button for Add item-->
        <div v-if="!isImported" class="mt-3">
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
            <el-form-item>
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
                :model-value="
                  calculateInitialTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                "
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
                v-model="purchaseOrderData.discount_in_percentage"
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
                v-model="purchaseOrderData.discount_in_amount"
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
                    v-model="purchaseOrderData.delivery_note"
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
                <el-form-item>
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
                <el-form-item>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { mapGetters } from "vuex";
import { useRouter } from "vue-router";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

import Swal from "sweetalert2/dist/sweetalert2.js";
import store from "@/store";

export default defineComponent({
  name: "add-purchase-order",
  components: { TitleAndButtons },

  setup() {
    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******

    // Set Bread Crumbs
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Add Purchase Order", ["Buying"]);
    });

    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const router = useRouter();
    fetchApis();

    async function fetchApis() {
      loading.value = true;
      await store.dispatch(ACTIONS.ITEM.FETCH_ITEM_LIST);
      await store.dispatch(ACTIONS.LC.FETCH_LC_LIST_WITHOUT_PO);
      await store.dispatch(ACTIONS.SUPPLIER.FETCH_SUPPLIER_LIST);
      loading.value = false;
    }

    // Load Item list for dropdown
    const itemList = computed(() => {
      return store.getters[GETTERS.ITEM.itemList];
    });

    // Load LC list for dropdown
    const lcList = computed(() => {
      return store.getters[GETTERS.LC.lcListWithoutPo];
    });

    // Load Item Supplier for dropdown
    const supplierList = computed(() => {
      return store.getters[GETTERS.SUPPLIER.supplierList];
    });

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** *******
    const purchaseOrderData = ref({
      order_date: new Date().toISOString().substr(0, 10),
      required_date: new Date().toISOString().substr(0, 10),
      purchase_from: "Imported",
      lc_id: "",
      supplier_id: "",
      project_location: "",
      po_total_amount: 0,
      total_order_quantity: 0,
      discount_in_percentage: "",
      discount_in_amount: "",
      po_grand_total: 0,
      rounding_adjustment: 0,
      payable_total: 0,
      delivery_note: "",
      items: [
        {
          item_id: "",
          uom_id: 0,
          required_date: new Date().toISOString().substr(0, 10),
          item_rate: 0,
          order_quantity: 0,
          total_amount: 0,
        },
      ],
    });

    const lcSelected = ()=>{
      let lc = lcList.value.find(item => item.id == purchaseOrderData.value.lc_id);
      let totalAmount = lc.total_amount_bdt;
      purchaseOrderData.value.supplier_id = lc.supplier_id;
      purchaseOrderData.value.items[0].total_amount = totalAmount;
      purchaseOrderData.value.items[0].item_rate = totalAmount / lc.total_order_quantity;
      purchaseOrderData.value.items[0].order_quantity = lc.total_order_quantity;
    }

    const disable1 = ref(false);

    // ******* Computed Values for Calculations ******
    // *******  ******  *******  ******  *******  ****** *******

    // Calculate The total Amount
    const calculateInitialTotal = computed(() => {
      let initTotal = 0;
      purchaseOrderData.value.items.forEach((item) => {
        initTotal += item.total_amount;
      });
      return initTotal;
    });

    // Calculate The total Quantity
    const calculateTotalQuantity = computed(() => {
      let totalQuantity = 0;
      purchaseOrderData.value.items.forEach((item) => {
        totalQuantity += item.order_quantity;
      });
      return Number(totalQuantity);
    });

    // Calculate The Grand Total
    const calculateGrandTotal = computed(() => {
      return (
        purchaseOrderData.value.po_total_amount -
        Number(purchaseOrderData.value.discount_in_amount) -
        Number(
          purchaseOrderData.value.po_total_amount *
            (Number(purchaseOrderData.value.discount_in_percentage) / 100)
        )
      );
    });

    // Calculate Round Adjustment
    const calculateRoundAdjustment = computed(() => {
      return (
        purchaseOrderData.value.po_grand_total -
        Math.round(purchaseOrderData.value.po_grand_total)
      ).toFixed(2);
    });

    // Calculate Round Total
    const calculateRoundTotal = computed(() => {
      return Number(purchaseOrderData.value.po_grand_total.toFixed(0));
    });

    // Calculate Individual Item Amount
    const calculateItemAmount = (index) => {
      // e.preventDefault()
      purchaseOrderData.value.items[index].total_amount =
        purchaseOrderData.value.items[index].item_rate *
        purchaseOrderData.value.items[index].order_quantity;
    };

    // ******* Add and Remove Items Row ******
    // *******  ******  *******  ******  *******  ****** *******

    // Add Item Row
    const addRow = () => {
      const row = {
        item_id: "",
        uom_id: 0,
        required_date: purchaseOrderData.value.required_date,
        item_rate: 0,
        order_quantity: 0,
        total_amount: 0,
        amountLocal: "0",
      };
      purchaseOrderData.value.items.push(row);
    };

    // Remove Item Row
    const removeRow = (item) => {
      purchaseOrderData.value.items.splice(
        purchaseOrderData.value.items.indexOf(item),
        1
      );
    };

    // ******* Form Submission, Validation and Rest ******
    // *******  ******  *******  ******  *******  ****** *******

    const isImported = computed(() => {
      if (purchaseOrderData.value.purchase_from == "Imported") {
        return true;
      }
      return false;
    });

    // Front End Validation Rules
    const rules = ref({
      lc_id: [
        {
          required: isImported,
          message: "Please Select a LC from the list",
          trigger: "change",
        },
      ],
      supplier_id: [
        {
          required: true,
          message: "Please select a supplier from the list",
          trigger: "change",
        },
      ],
      order_date: [
        {
          required: true,
          message: "Please select a po date",
          trigger: "change",
        },
      ],
      required_date: [
        {
          required: true,
          message: "Please select a required date",
          trigger: "change",
        },
      ],
    });

    // Model for Backend Validation
    const errorMsgs = ref({});

    const clear = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.clearValidate();
      formRef.value.resetFields();
      purchaseOrderData.value.items = [
        {
          item_id: "",
          uom_id: 0,
          required_date: new Date().toISOString().substr(0, 10),
          item_rate: 0,
          order_quantity: 0,
          total_amount: 0,
        },
      ];
      errorMsgs.value = {};
    };

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
          clear();
        }
      });
    };

    // Form Submit
    const submit = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Creating New Purchase Order",
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
                    ACTIONS.PURCHASE.ADD_PURCHASE_ORDER,
                    purchaseOrderData.value
                  )
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "Purchase Order created successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset form
                      router.push({ path: "/purchase-order-list" });
                    });
                  })
                  .catch((e) => {
                    Swal.fire({
                      text: "Sorry, looks like there are some errors detected, please try again.",
                      icon: "error",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      loading.value = false;
                      // If not success Triggers Backend end Validation
                      errorMsgs.value = e.data.validation_error;
                    });

                    return false;
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
      clear,
      resetForm,
      submit,
      disable1,

      // Required/ Lookup Data
      itemList,
      supplierList,
      lcList,

      // All Model/ Data Values
      purchaseOrderData,
      calculateInitialTotal,
      calculateTotalQuantity,
      calculateGrandTotal,
      calculateRoundAdjustment,
      calculateRoundTotal,

      // Item Add & Remove & Amount
      addRow,
      removeRow,
      calculateItemAmount,
      isImported,
      lcSelected,

      setVal() {

        if (purchaseOrderData.value.purchase_from == "Local") {
          purchaseOrderData.value.lc_id = "";
          disable1.value = true;
        } else {
          disable1.value = false;
        }
        purchaseOrderData.value.supplier_id = "";
        purchaseOrderData.value.items = [
          {
            item_id: "",
            uom_id: 0,
            required_date: new Date().toISOString().substr(0, 10),
            item_rate: 0,
            order_quantity: 0,
            total_amount: 0,
          },
        ];
        errorMsgs.value = {};
      },
    };
  },

  computed: {
    ...mapGetters({
      purchaseFrom: GETTERS.PURCHASE.purchaseFrom,
    }),
  },

  // ******* Watch Calculated Value and change the Model with updated value ******
  // *******  ******  *******  ******  *******  ****** *******
  watch: {
    calculateInitialTotal: {
      deep: true,
      handler: function (newVal) {
        this.purchaseOrderData.po_total_amount = newVal;
      },
    },

    calculateTotalQuantity: {
      deep: true,
      handler: function (newVal) {
        this.purchaseOrderData.total_order_quantity = newVal;
      },
    },

    calculateGrandTotal: {
      deep: true,
      handler: function (newVal) {
        this.purchaseOrderData.po_grand_total = newVal;
      },
    },

    calculateRoundAdjustment: {
      deep: true,
      handler: function (newVal) {
        this.purchaseOrderData.rounding_adjustment = newVal;
      },
    },

    calculateRoundTotal: {
      deep: true,
      handler: function (newVal) {
        this.purchaseOrderData.payable_total = newVal;
      },
    },
  },
});
</script>

<style scoped></style>
