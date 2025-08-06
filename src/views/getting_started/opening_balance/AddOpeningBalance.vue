<template>
  <template v-if="!loading">
    <!-- Submit -->
    <TitleAndButtons title="Create Opening Balance">
      <!--    Buttons-->
      <template v-slot:buttons>
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

        <button
          type="button"
          class="btn btn-sm btn-flex btn-info me-3"
          @click="resetForm"
          :disabled="loading"
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
          @click="submit"
          :disabled="loading"
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
      :model="openingBalance"
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
              <!--            Posting Date-->
              <td>
                <label class="required fw-bold mb-1">Posting Date</label>
                <div>
                  <el-form-item
                    size="small"
                    class="mb-0"
                    prop="posting_date"
                    :rules="{
                      required: true,
                      message: 'Please enter Date',
                      trigger: 'change',
                    }"
                  >
                    <el-date-picker
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      v-model="openingBalance.posting_date"
                      type="date"
                      placeholder="Select a Posting date"
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
        <el-divider>Account List</el-divider>
        <!--        show item-->

        <table class="table table-cus mb-10 table-hover">
          <thead>
            <tr class="fw-bold fs-5">
              <th class="text-center" scope="col">#</th>
              <th class="" scope="col" style="min-width: 150px">
                Account Head
              </th>
              <th class="" scope="col">Credit Amount</th>
              <th class="" scope="col">Debit Amount</th>
              <th class="text-center" scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in openingBalance.account_list"
              :key="index"
            >
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5 text-center">
                {{ index + 1 + "." }}
              </th>

              <!--            Name-->
              <td class="fw-bold">
                {{ item.head_name || "-" }}
              </td>

              <!--              Credit-->
              <td class="">
                <el-form-item size="small" class="mb-0">
                  <el-input
                    type="number"
                    placeholder="Enter Credit"
                    v-model="item.credit"
                  />
                </el-form-item>
              </td>

              <!--              :rules="{-->
              <!--              required: true,-->
              <!--              type: 'number',-->
              <!--              min: 0.001,-->
              <!--              message: 'Please enter Credit',-->
              <!--              trigger: 'change',-->
              <!--              }"-->

              <!--              Debit-->
              <td class="">
                <el-form-item size="small" class="mb-0">
                  <el-input
                    type="number"
                    placeholder="Enter Debit"
                    v-model="item.debit"
                  />
                </el-form-item>
              </td>

              <!--            Action-->
              <td class="text-center">
                <button
                  :disabled="openingBalance.account_list.length < 2"
                  class="btn btn-light-danger btn-sm"
                  @click="removeRow(index)"
                >
                  <span class="svg-icon svg-icon-3 m-0">
                    <inline-svg src="media/icons/duotune/general/gen027.svg" />
                  </span>
                </button>
              </td>
            </tr>

            <!--            Total-->
            <tr>
              <td class="fw-bold fs-3 text-end align-middle" colspan="2">
                Total:
              </td>

              <td class="text-center">
                <el-form-item
                  prop="total_credit_amount"
                  class="p-0 my-4 item-mod"
                  :rules="{
                    len: calculateDebitTotal,
                    type: 'number',
                    message: 'Total Credit and Debit doesn\'t match',
                    trigger: 'change',
                  }"
                >
                  <span class="fw-bold fs-3">{{
                    calculateCreditTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}</span>
                </el-form-item>
              </td>

              <td class="fw-bold fs-3 text-center">
                <el-form-item
                  class="p-0 my-4 item-mod"
                  prop="total_debit_amount"
                  :rules="{
                    len: calculateCreditTotal,
                    type: 'number',
                    message: 'Total Credit and Debit doesn\'t match',
                    trigger: 'change',
                  }"
                >
                  <span class="fw-bold fs-3">{{
                    calculateDebitTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}</span>
                </el-form-item>
              </td>
              <td class="fw-bold fs-5 text-end"></td>
            </tr>
          </tbody>
        </table>
      </el-card>
    </el-form>
    <!--  </div>-->
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AddOpeningBalance",
  components: { TitleAndButtons },

  setup() {
    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******
    // Set Bread Crumbs
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Create Opening Balance", ["Getting Started"]);
    });

    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const router = useRouter();

    // Load Item list for dropdown
    const chartOfAccount = computed(() => {
      return store.getters[GETTERS.LOOKUP_DATA.allChartOfAccount];
    });

    async function fetchApis() {
      loading.value = true;
      await setAccountList();
      loading.value = false;
    }

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** ******

    const openingBalance = ref({
      posting_date: new Date().toISOString().substr(0, 10),
      total_debit_amount: "",
      total_credit_amount: "",
      account_list: [] as any,
    });
    fetchApis();
    async function setAccountList() {
      await chartOfAccount.value.forEach((item) => {
        const row = {
          chart_of_account_head_id: item.id,
          head_name: item.account_head_name,
          debit: "",
          credit: "",
        };
        openingBalance.value.account_list.push(row);
      });
    }

    // ******* Computed Values for Calculations ******
    // *******  ******  *******  ******  *******  ****** *******

    // Calculate The total Amount
    const calculateCreditTotal = computed(() => {
      let initTotal = 0;
      openingBalance.value.account_list.forEach((item) => {
        initTotal += Number(item.credit);
      });
      return initTotal;
    });

    const calculateDebitTotal = computed(() => {
      let initTotal = 0;
      openingBalance.value.account_list.forEach((item) => {
        initTotal += Number(item.debit);
      });
      return initTotal;
    });

    // Remove Item Row
    const removeRow = (index) => {
      openingBalance.value.account_list.splice(index, 1);
    };

    // ******* Form Submission, Validation and Rest ******
    // *******  ******  *******  ******  *******  ****** *******

    // Front End Validation Rules
    const rules = ref({
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
          clearFiled();
          errorMsgs.value = {};
        }
      });
    };

    const clearFiled = () => {
      openingBalance.value.account_list.forEach((el) => {
        el.credit = "";
        el.debit = "";
      });
    };

    // Form Submit
    const submit = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Creating Opening Balance Record",
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
                    ACTIONS.ACCOUNT.CREATE_OPENING_BALANCE,
                    openingBalance.value
                  )
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "Opening Balance created successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset form
                      // resetForm();
                      router.push("/getting-started/opening-balance");
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
      chartOfAccount,

      // All Model/ Data Values
      calculateCreditTotal,
      calculateDebitTotal,
      openingBalance,

      // Item Add & Remove & Amount
      removeRow,
    };
  },

  // ******* Watch Calculated Value and change the Model with updated value ******
  // *******  ******  *******  ******  *******  ****** *******
  watch: {
    calculateCreditTotal: {
      deep: true,
      handler: function (newVal) {
        this.openingBalance.total_credit_amount = newVal;
      },
    },

    calculateDebitTotal: {
      deep: true,
      handler: function (newVal) {
        this.openingBalance.total_debit_amount = newVal;
      },
    },
  },
});
</script>

<style>
.table-cus tr td,
.table-cus tr th {
  border-collapse: collapse;
  border: 1px solid #b4b4b4 !important;
}
.table-cus tr:last-child {
  border-bottom: 1px solid #b4b4b4 !important;
}
.table-cus tbody tr:last-child td {
  border-bottom: 1px solid #b4b4b4 !important;
}

.item-mod .el-form-item__content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  line-height: 0px !important;
  position: relative;
  font-size: 1px !important;
}
</style>
