<template>
  <template v-if="!initLoading">
    <!--   Submit -->
    <TitleAndButtons v-loading="loading" :title="`Tax And Port Fee`">
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
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form
      :model="taxAndPortFeeModel"
      v-loading="loading"
      ref="formRef"
      @keydown.enter.prevent="entrCheck"
    >
      <div class="card-body pt-0">
        <el-card class="box-card mb-4">
          <div class="row">
            <!--        ROW:1-->
            <div class="col-6">
              <div class="row py-3 me-1 justify-content-end border border-3">
                <div class="col-6 my-2">
                  <label class="fs-6 fw-bold mb-1">LC Number</label> <br />
                  <el-form-item size="small" class="mb-0">
                    <el-input
                      disabled
                      :model-value="poDetails.lc_details.lc_number"
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>

                <!--            PO Number-->
                <div class="col-6 my-2">
                  <label class="fs-6 fw-bold mb-1">PO Number</label>
                  <div>
                    <el-form-item size="small" class="mb-0">
                      <el-input
                        disabled
                        :model-value="poDetails.po_number"
                        class="w-auto mod-disabled"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="col-6 my-2">
                  <label class="fs-6 fw-bold mb-1">Bail Amount</label>
                  <div>
                    <el-form-item size="small" class="mb-0">
                      <el-input
                        disabled
                        :model-value="
                          taxAndPortFeeData.totalBailAmt.toLocaleString()
                        "
                        class="w-auto mod-disabled"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="col-6 my-2">
                  <label class="fw-bold mb-1">Tax + Port</label>
                  <div>
                    <el-form-item size="small" class="mb-0">
                      <el-input
                        disabled
                        :model-value="
                          taxAndPortFeeData.totalTaxAndPort.toLocaleString()
                        "
                        class="w-auto mod-disabled"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div
                class="row justify-content-end py-3 ms-1 justify-content-end border border-3"
              >
                <div class="col-6 my-2">
                  <label class="fs-6 fw-bold mb-1">Total Amount (Tax)</label>
                  <br />
                  <el-form-item size="small" class="mb-0">
                    <el-input
                      disabled
                      :model-value="
                        taxAndPortFeeData.totalTaxAmt.toLocaleString()
                      "
                      class="w-auto mod-disabled"
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="col-6 my-2">
                  <label class="fw-bold mb-1">Total Amount (Port)</label>
                  <div>
                    <el-form-item size="small" class="mb-0">
                      <el-input
                        disabled
                        :model-value="
                          taxAndPortFeeData.totalPortAmt.toLocaleString()
                        "
                        class="w-auto mod-disabled"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="col-6 my-2">
                  <label class="fw-bold mb-1">Total QTY (Tax)</label>
                  <div>
                    <el-form-item size="small" class="mb-0">
                      <el-input
                        disabled
                        :model-value="
                          taxAndPortFeeData.totalTaxQty.toLocaleString()
                        "
                        class="w-auto mod-disabled"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="col-6 my-2">
                  <label class="fs-6 fw-bold mb-1">Total QTY (Port)</label>
                  <div>
                    <el-form-item size="small" class="mb-0">
                      <el-input
                        disabled
                        :model-value="
                          taxAndPortFeeData.totalPortQty.toLocaleString()
                        "
                        class="w-auto mod-disabled"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="box-card mb-4">
          <table class="table table-cus mb-10">
            <thead>
              <tr class="fw-bold fs-5">
                <th class="text-center" scope="col">#</th>
                <th class="text-center" scope="col" style="min-width: 150px">
                  Date
                </th>
                <th class="text-center" scope="col">Fee Type</th>
                <th class="text-center" scope="col">Quantity</th>
                <th class="text-center" scope="col" style="min-width: 150px">
                  Amount
                </th>
                <th class="text-center" scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in taxAndPortFeeData.data" :key="index">
                <!--            INDEX-->
                <th class="align-middle fw-bold fs-5 text-center">
                  {{ index + 1 + "." }}
                </th>

                <!--            Date-->
                <td class="fs-5 text-center">
                  {{ item.posting_date || "-" }}
                </td>

                <!--              Bill for-->
                <td class="fs-5 text-center">
                  {{ item.bill_for || "-" }}
                </td>

                <!--              Quantity-->
                <td class="fw-bold text-center fs-5">
                  {{
                    item.tax_port_qty
                      ? item.tax_port_qty.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "-"
                  }}
                </td>

                <!--              Amount-->
                <td class="fw-bold text-center fs-5">
                  {{
                    item.tax_port_amount
                      ? item.tax_port_amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "-"
                  }}
                </td>

                <td class="fw-bold text-center fs-5">
                  <button
                    class="btn btn-light-danger btn-sm"
                    @click.prevent="deleteItem(item, index)"
                  >
                    <span class="svg-icon svg-icon-4">
                      <inline-svg
                        src="media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                  </button>
                </td>
              </tr>
              <tr v-if="taxAndPortFeeData.data.length < 1">
                <td colspan="6" class="fs-5 text-center">No Data</td>
              </tr>

              <tr>
                <td
                  colspan="6"
                  style="
                    border: none !important;
                    background-color: white !important;
                  "
                  class="py-5"
                ></td>
              </tr>

              <tr class="fw-bold fs-5">
                <th
                  style="
                    border: none !important;
                    background-color: white !important;
                    min-width: 150px;
                  "
                  colspan="2"
                  class="required text-center"
                  scope="col"
                >
                  Date
                </th>
                <th
                  style="
                    border: none !important;
                    background-color: white !important;
                  "
                  class="required text-center"
                  scope="col"
                >
                  Fee Type
                </th>
                <th
                  style="
                    border: none !important;
                    background-color: white !important;
                  "
                  class="required text-center"
                  scope="col"
                >
                  Quantity
                </th>
                <th
                  style="
                    border: none !important;
                    background-color: white !important;
                    min-width: 150px;
                  "
                  class="required text-center"
                  scope="col"
                >
                  Amount
                </th>
                <th
                  style="
                    border: none !important;
                    background-color: white !important;
                  "
                  class="text-center"
                  scope="col"
                >
                  Action
                </th>
              </tr>
              <tr>
                <!--              Date-->
                <td
                  style="
                    background-color: white !important;
                    border: none !important;
                  "
                  colspan="2"
                  class="text-center ps-2 pb-5 mt-0 pt-0"
                >
                  <el-form-item
                    size="small"
                    class="mb-0"
                    :prop="'posting_date'"
                    :rules="{
                      required: true,
                      message: 'Please enter a date',
                      trigger: 'change',
                    }"
                  >
                    <el-date-picker
                      class="w-100"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      v-model="taxAndPortFeeModel.posting_date"
                      type="date"
                      placeholder="Posting date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </td>

                <td
                  style="
                    background-color: white !important;
                    border: none !important;
                  "
                  class="pb-5 mt-0 pt-0"
                >
                  <el-form-item
                    size="small"
                    class="mb-0"
                    :prop="'bill_for'"
                    :rules="{
                      required: true,
                      message: 'Please select an item from the list',
                      trigger: 'change',
                    }"
                  >
                    <el-select
                      class="w-100"
                      fit-input-width
                      v-model="taxAndPortFeeModel.bill_for"
                      filterable
                      placeholder="Select Bill Type"
                    >
                      <el-option label="Tax" value="Tax" />
                      <el-option label="Port" value="Port" />
                      <el-option label="Bail Of An" value="Bail Of An" />
                    </el-select>
                  </el-form-item>
                </td>

                <!--            Quantity-->
                <td
                  style="
                    background-color: white !important;
                    border: none !important;
                  "
                  class="pb-5 mt-0 pt-0"
                >
                  <el-form-item
                    size="small"
                    class="mb-0"
                    :prop="'tax_port_qty'"
                    :rules="[
                      {
                        required: true,
                        type: 'number',
                        min: 0.001,
                        message: 'Please enter Quantity',
                        trigger: 'change',
                      },
                    ]"
                  >
                    <el-input-number
                      class="mod-align w-100"
                      v-model="taxAndPortFeeModel.tax_port_qty"
                      :precision="3"
                      :min="0.0"
                      :step="1"
                      :controls="false"
                      placeholder="Enter Quantity"
                    />
                  </el-form-item>
                </td>

                <!--            Amount-->
                <td
                  style="
                    background-color: white !important;
                    border: none !important;
                  "
                  class="pb-5 mt-0 pt-0"
                >
                  <el-form-item
                    size="small"
                    class="mb-0"
                    :prop="'tax_port_amount'"
                    :rules="[
                      {
                        required: true,
                        type: 'number',
                        min: 0.001,
                        message: 'Please enter Amount',
                        trigger: 'change',
                      },
                    ]"
                  >
                    <el-input-number
                      class="mod-align w-100"
                      v-model="taxAndPortFeeModel.tax_port_amount"
                      :precision="3"
                      :min="0.0"
                      :step="1"
                      :controls="false"
                      placeholder="Enter Amount"
                    />
                  </el-form-item>
                </td>

                <!--              Action-->
                <td
                  style="
                    background-color: white !important;
                    border: none !important;
                  "
                  class="text-center pb-5 mt-0 pt-0"
                >
                  <button
                    type="button"
                    class="btn btn-sm btn-primary py-2"
                    @click.prevent="submit"
                  >
                    <span class="svg-icon svg-icon-2">
                      <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
                    </span>
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>

        <!--    </div>-->
      </div>
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
import { mapActions, useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import store from "@/store";

export default defineComponent({
  name: "TaxAndPortFee",
  components: { TitleAndButtons },

  setup() {
    // Set Bread Crumbs
    onMounted(() => {
      // calculateItemAmount(0);
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Tax and Port Fee", [
        "Purchase",
        "Purchase Order",
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
    const taxAndPortFeeModel = ref({});
    fetchApi();

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** *******

    async function fetchApi() {
      initLoading.value = true;
      await store.dispatch(
        ACTIONS.PURCHASE.FETCH_PO_DETAILS_BY_ID,
        route.params.po_id
      );

      await store.dispatch(
        ACTIONS.PURCHASE.FETCH_TAX_AND_PORT_LIST,
        poDetails.value.lc_id
      );

      taxAndPortFeeModel.value = {
        lc_id: poDetails.value.lc_id,
        po_id: poDetails.value.id,
        posting_date: new Date().toISOString().substr(0, 10),
        bill_for: "Tax",
        tax_port_qty: "",
        tax_port_amount: "",
      };
      initLoading.value = false;
    }

    const taxAndPortFeeData = computed(() => {
      return store.getters[GETTERS.PURCHASE.taxAndPortFeeList];
    });

    const poDetails = computed(() => {
      return store.getters[GETTERS.PURCHASE.poDetailsById];
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
    const submit = async () => {
      // Confirmation Modal
      Swal.fire({
        title: "Creating Tax/Port Fee",
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
          formRef.value.validate(async (valid) => {
            // Frontend Validation Check
            if (valid) {
              // loading.value = true;
              await store
                .dispatch(
                  ACTIONS.PURCHASE.ADD_TAX_AND_PORT,
                  taxAndPortFeeModel.value
                )
                .then(() => {
                  loading.value = false;
                  store.dispatch(
                    ACTIONS.PURCHASE.FETCH_TAX_AND_PORT_LIST,
                    poDetails.value.lc_id
                  );
                  // Success Modal
                  Swal.fire({
                    text: "Tax/Port Fee Created successfully!",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                      confirmButton: "btn btn-primary",
                    },
                  }).then(() => {
                    // Reset form

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
      formRef,
      loading,
      initLoading,

      // Submit and Reset
      resetForm,
      submit,

      // Required/ Lookup Data
      poDetails,

      // Item Add & Remove & Amount
      taxAndPortFeeData,
      taxAndPortFeeModel,
    };
  },

  methods: {
    ...mapActions({
      deleteTaxAndPort: ACTIONS.PURCHASE.DELETE_TAX_AND_PORT,
      fetchTaxAndPort: ACTIONS.PURCHASE.FETCH_TAX_AND_PORT_LIST,
    }),

    async deleteItem(row, index) {
      Swal.fire({
        title: "Deleting Tax/Port Fee",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          if (index > -1) {
            const data = { index: index, id: row.id };
            await this.deleteTaxAndPort(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  this.fetchTaxAndPort(this.poDetails.lc_id);
                  Swal.fire({
                    title: "Tax/Port Fee Deleted Successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                } else {
                  Swal.fire({
                    text: response.data.message_details
                      ? response.data.message_details
                      : "Error: Couldn't Delete",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                }
              })
              .catch((e) => {
                Swal.fire({
                  icon: "error",
                  title: "Error: Something went wrong",
                  type: "warning",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ok",
                });
              });
          }
        }
      });
    },

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
.mod-disabled .el-input__inner {
  color: black !important;
}
.mod-align .el-input__inner {
  text-align: right !important;
}
</style>
