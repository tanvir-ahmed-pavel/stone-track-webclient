<template>
  <template v-if="!initLoading">
    <!--   Submit -->
    <TitleAndButtons
      v-loading="loading"
      :title="`Invoice - (${soInvoiceData.so_invoice_number})`"
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

        <!--          Print-->
        <a
          href="#"
          class="btn btn-sm btn-flex btn-success me-3"
          @click.prevent="printInvoice()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/files/fil009.svg" />
          </span>
          Print Invoice
        </a>
      </template>
    </TitleAndButtons>

    <el-form ref="formRef" @keydown.enter.prevent="entrCheck">
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
                      :model-value="soInvoiceData.so_details.project_title"
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
                      :model-value="soInvoiceData.customer.customer_name"
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
                      readonly
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
                      readonly
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
              <th class="required text-end" scope="col">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr
              class="border-bottom-2"
              v-for="(item, index) in soInvoiceData.salesInvoiceDetails"
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
                    :model-value="soInvoiceData.so_details.so_number"
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
                    :model-value="item.total_quantity"
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
                    :model-value="item.total_amount"
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
                readonly
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
                readonly
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
                    readonly
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
                      soInvoiceData.si_grand_total.toLocaleString(undefined, {
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
                    v-model="soInvoiceData.si_rounding_adjustment"
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
                      soInvoiceData.si_receivable_total.toLocaleString(
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
    <PrintSOInvoice ref="printInvoice"></PrintSOInvoice>
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
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import PrintSOInvoice from "@/views/selling/so_invoice/PrintSOInvoice.vue";

export default defineComponent({
  name: "view-so-invoice",
  components: { PrintSOInvoice, TitleAndButtons },

  setup: function () {
    // Set Bread Crumbs
    onMounted(() => {
      // calculateItemAmount(0);
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Invoice Details", ["Selling", "Invoice"]);
    });

    // ******* Initial Setup and Load All Required Data ******
    // *******  ******  *******  ******  *******  ****** *******

    const route = useRoute();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const initLoading = ref<boolean>(false);
    fetchApi();

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** *******

    async function fetchApi() {
      initLoading.value = true;
      await store.dispatch(
        ACTIONS.SO_INVOICE.FETCH_SO_INVOICE,
        route.params.invoice_id
      );

      initLoading.value = false;
    }

    const soInvoiceData = computed(() => {
      return store.getters[GETTERS.SO_INVOICE.singleSoInvoice];
    });

    return {
      // Validation and Initial setup
      formRef,
      loading,
      initLoading,

      // All Model/ Data Values
      soInvoiceData,
    };
  },

  // ******* Watch Calculated Value and change the Model with updated value ******
  // *******  ******  *******  ******  *******  ****** *******

  methods: {
    entrCheck($event) {
      $event.target.blur();
      return false;
    },

    async printInvoice() {
      await (this.$refs["printInvoice"] as any).show({
        data: this.soInvoiceData,
      });
      (this.$refs["printInvoice"] as any).print();
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
