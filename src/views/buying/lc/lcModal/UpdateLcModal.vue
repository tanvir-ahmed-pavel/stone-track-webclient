<template>
  <div
    class="modal fade"
    id="modal_update_lc"
    ref="updateLcModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_update_lc_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Edit LC</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_update_lc_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1" @click.prevent="resetForm">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form :model="lcData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_add_lc_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_add_lc_header"
              data-kt-scroll-wrappers="#modal_add_lc_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--              Lc Number && Issuing Bank-->
              <!--begin::Input group-->
              <!--begin::Row-->
              <div class="row g-9">
                <!--              Lc Number-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Lc Number</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="lc_number">
                    <el-input
                            size="small"
                      v-model="lcData.lc_number"
                      type="text"
                      placeholder="Enter lc number"
                    />
                    <div
                      v-if="lcData.lc_number != '' && errorMsgs.lc_number"
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsgs.lc_number" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Issuing Bank-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Issuing Bank</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="issuing_bank">
                    <el-select
                            class="w-100"
                      v-model="lcData.issuing_bank"
                      filterable
                      placeholder="Select an issuing Bank..."
                    >
                      <el-option
                        v-for="bank in bankList"
                        :value="bank.id"
                        :label="bank.account_head_name"
                        v-bind:key="bank.id"
                      >
                      </el-option>
                    </el-select>
                    <div
                      v-if="
                        lcData.issuing_bank != '' &&
                        errorMsgs.issuing_bank != ''
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.issuing_bank"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Lc Rate($USD) && Issue Date-->
              <!--begin::Input group-->
              <!--begin::Row-->
              <div class="row g-9">
                <!--              Lc Rate ($USD)-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Lc Rate in $USD</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="lc_rate_usd">
                    <el-input
                            size="small"
                      v-model="lcData.lc_rate_usd"
                      type="number"
                      placeholder="Enter Lc Rate in $USD"
                    >
                      <template #prepend>$</template>
                    </el-input>
                    <div
                      v-if="lcData.lc_rate_usd != '' && errorMsgs.lc_rate_usd"
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.lc_rate_usd"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Issuing Date-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Issue Date</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="issue_date">
                    <el-date-picker
                      v-model="lcData.issue_date"
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Pick a date"
                      style="width: 100%"
                    ></el-date-picker>
                    <div
                      v-if="
                        lcData.issue_date != '' && errorMsgs.issue_date != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsgs.issue_date" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--             Quantity && Supplier-->
              <!--begin::Input group-->
              <!--begin::Row-->
              <div class="row g-9">
                <!--               Quantity in Ton-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Quantity in Ton</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item size="small" prop="total_order_quantity">
                    <el-input
                            size="small"
                      v-model="lcData.total_order_quantity"
                      type="number"
                      placeholder="Enter the total_order_quantity"
                    >
                      <template #prepend>Ton</template>
                    </el-input>
                    <div
                      v-if="
                        lcData.total_order_quantity != '' &&
                        errorMsgs.total_order_quantity
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.total_amount_bdt"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Supplier-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required"> Supplier </span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="supplier_id">
                    <el-select
                            class="w-100"
                      v-model="lcData.supplier_id"
                      filterable
                      placeholder="Select a Supplier..."
                    >
                      <el-option
                        v-for="supplier in supplier_list"
                        :value="supplier.id"
                        :label="supplier.supplier_name"
                        :key="supplier.id"
                      ></el-option>
                      <!--                      <el-button-->
                      <!--                        class="text-center m-5"-->
                      <!--                        type="primary"-->
                      <!--                        plain-->
                      <!--                        size="mini"-->
                      <!--                      >-->
                      <!--                        <b>+ </b>Add new supplier-->
                      <!--                      </el-button>-->
                    </el-select>
                    <div
                      v-if="
                        lcData.supplier_id != '' && errorMsgs.supplier_id != ''
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.supplier_id"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Lc Under Amount (USD) && Lc Open Amount (USD)-->
              <div class="row g-9">
                <!--              Lc Open Amount ($USD)-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2"
                  >Lc Open Amount in $USD</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="lc_open_rate_usd">
                    <el-input
                            v-model="lcData.lc_open_rate_usd"
                            type="number"
                            placeholder="Enter Lc Open Amount in $USD"
                    >
                      <template #prepend>$</template>
                    </el-input>
                    <div
                            v-if="
                        lcData.lc_open_rate_usd != '' &&
                        errorMsgs.lc_open_rate_usd
                      "
                            class="el-form-item__error"
                    >
                      <div
                              v-for="errMsg in errorMsgs.lc_open_rate_usd"
                              :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--              Lc Under Amount ($USD)-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2"
                  >Lc Under Amount in $USD</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item size="small" prop="lc_under_rate_usd">
                    <el-input
                            v-model="lcData.lc_under_rate_usd"
                            type="number"
                            placeholder="Enter Lc Under Amount in $USD"
                    >
                      <template #prepend>$</template>
                    </el-input>
                    <div
                            v-if="
                        lcData.lc_under_rate_usd != '' &&
                        errorMsgs.lc_under_rate_usd
                      "
                            class="el-form-item__error"
                    >
                      <div
                              v-for="errMsg in errorMsgs.lc_under_rate_usd"
                              :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>

              <!--               Conversion Rate && Total Amount (BDT) -->

              <div class="row g-9">
                <!--              Conversion Rate Bank-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2"
                  >Conversion Rate in BDT (Bank)</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item size="small" prop="lc_conversion_rate_bank">
                    <el-input
                            v-model="lcData.lc_conversion_rate_bank"
                            type="number"
                            placeholder="Enter Lc conversion rate in BDT (Bank)"
                    >
                      <template #prepend>৳</template>
                    </el-input>
                    <div
                            v-if="
                        lcData.lc_conversion_rate_bank != '' &&
                        errorMsgs.lc_conversion_rate_bank
                      "
                            class="el-form-item__error"
                    >
                      <div
                              v-for="errMsg in errorMsgs.lc_conversion_rate_bank"
                              :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--              Conversion Rate Under-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2"
                  >Conversion Rate in BDT (Under)</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item size="small" prop="lc_conversion_rate">
                    <el-input
                            v-model="lcData.lc_conversion_rate"
                            type="number"
                            placeholder="Enter Lc conversion rate in BDT (Under)"
                    >
                      <template #prepend>৳</template>
                    </el-input>
                    <div
                            v-if="
                        lcData.lc_conversion_rate != '' &&
                        errorMsgs.lc_conversion_rate
                      "
                            class="el-form-item__error"
                    >
                      <div
                              v-for="errMsg in errorMsgs.lc_conversion_rate"
                              :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>

              <!--              ///////// Read Only Values ////////////-->

              <!--              Divider-->
              <div class="row g-9 my-2">
                <el-divider>Calculated Total</el-divider>
              </div>

              <!--              Bank Total (BDT) && Under Total (BDT)-->
              <!--begin::Input group-->
              <!--begin::Row-->
              <div class="row g-9">
                <!--              Bank Total (BDT)-->
                <div class="col-md-6 fv-row">
                  <!--begin::Input-->
                  <el-form-item size="small" prop="bank_total_amount_bdt">
                    <!--begin::Description-->
                    <el-descriptions border>
                      <el-descriptions-item
                        label="Bank Total in BDT ৳"
                        label-align="center"
                        align="center"
                      >
                        {{ lcData.bank_total_amount_bdt.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) }}
                      </el-descriptions-item>
                    </el-descriptions>

                    <!--end::Input-->
                    <div
                      v-if="
                        lcData.bank_total_amount_bdt != '' &&
                        errorMsgs.bank_total_amount_bdt
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.bank_total_amount_bdt"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--              Under Total (BDT)-->
                <div class="col-md-6 fv-row">
                  <!--begin::Input-->
                  <el-form-item size="small" prop="under_total_amount_bdt">
                    <!--begin::Description-->
                    <el-descriptions border>
                      <el-descriptions-item
                        label="Under Total in BDT ৳"
                        label-align="center"
                        align="center"
                      >
                        {{ lcData.under_total_amount_bdt.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) }}
                      </el-descriptions-item>
                    </el-descriptions>

                    <!--end::Input-->
                    <div
                      v-if="
                        lcData.under_total_amount_bdt != '' &&
                        errorMsgs.under_total_amount_bdt
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.under_total_amount_bdt"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--               Open 10% && NOC 50%-->
              <!--begin::Input group-->
              <!--begin::Row-->
              <div class="row g-9">
                <!--              Open 10% -- Read Only-->
                <div v-show="false" class="col-md-6 fv-row">
                  <!--begin::Description-->
                  <el-form-item size="small" prop="open_10_percent_amount_bdt">
                    <el-descriptions border>
                      <el-descriptions-item
                        label="Open 10% in BDT ৳"
                        label-align="center"
                        align="center"
                      >
                        {{ lcData.open_10_percent_amount_bdt }}
                      </el-descriptions-item>
                    </el-descriptions>
                    <div
                      v-if="
                        lcData.open_10_percent_amount_bdt != '' &&
                        errorMsgs.open_10_percent_amount_bdt
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.open_10_percent_amount_bdt"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--              NOC 50%-->
                <div v-show="false" class="col-md-6 fv-row">
                  <el-form-item size="small" prop="noc_50_percent_amount_bdt">
                    <!--begin::Description-->
                    <el-descriptions border>
                      <el-descriptions-item
                        label="NOC 50% in BDT ৳"
                        label-align="center"
                        align="center"
                      >
                        {{ lcData.noc_50_percent_amount_bdt }}
                      </el-descriptions-item>
                    </el-descriptions>
                    <div
                      v-if="
                        lcData.noc_50_percent_amount_bdt != '' &&
                        errorMsgs.noc_50_percent_amount_bdt
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.noc_50_percent_amount_bdt"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button class="btn btn-sm btn-light me-3" @click.prevent="resetForm">
              Reset
            </button>
            <!--end::Button-->

            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-sm btn-primary"
              @click.prevent="submit"
            >
              <!-- type="submit" -->
              <span v-if="!loading" class="indicator-label">
                Update
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
                </span>
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->

            <!--begin::Close-->
            <button data-bs-dismiss="modal" class="btn btn-sm btn-primary">
              Cancel
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
              </span>
            </button>
            <!--end::Close-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import store from "@/store";

export default defineComponent({
  name: "update-lc-modal",
  components: {},
  props: {
    data: { type: Object, required: true },
  },
  setup(props) {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateLcModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    // Look up data for bank account
    const bankList = computed(() => {
      return store.getters[GETTERS.ACCOUNT.bankAccountList];
    });

    // Initiate Model with edit data from props
    let lcData = ref({
      id:"",
      lc_number: "",
      issuing_bank: "",
      issue_date: "",
      supplier_id: "",
      lc_rate_usd: "",
      total_order_quantity: "",
      lc_open_rate_usd: "",
      lc_under_rate_usd: "",
      bank_total_amount_bdt: {},
      under_total_amount_bdt: {},
      open_10_percent_amount_bdt: {},
      noc_50_percent_amount_bdt: {},
      lc_conversion_rate: "",
      lc_conversion_rate_bank: "",
      lc_status: 0,
    });
    const setPropData = () => {
      lcData.value.id = props.data.id;
      lcData.value.lc_number = props.data.lc_number;
      lcData.value.issuing_bank = props.data.issuing_bank_name;
      lcData.value.issue_date = props.data.issue_date;
      lcData.value.supplier_id = props.data.supplier_id;
      lcData.value.lc_rate_usd = props.data.lc_rate_usd;
      lcData.value.total_order_quantity = props.data.total_order_quantity;
      lcData.value.lc_open_rate_usd = props.data.lc_open_rate_usd;
      lcData.value.lc_under_rate_usd = props.data.lc_under_rate_usd;
      lcData.value.lc_conversion_rate = props.data.lc_conversion_rate;
      lcData.value.lc_conversion_rate_bank = props.data.lc_conversion_rate_bank;

      // for (const key in props.data) {
      //   console.log(key+": "+props.data[key])
      //   // lcData.value[key] = props.data[key];
      // }
      // lcData.value.bank_total_amount_bdt = props.data.bank_total_amount_bdt;
      lcData.value.lc_status = 0;
    };
    // watch for prop change
    watch(
      () => props.data,
      () => {
        setPropData();
      }
    );

    // ************Computed Calculation*************

    // Open 10 %
    lcData.value.open_10_percent_amount_bdt = computed(() => {
      return parseFloat(
        String(Number(lcData.value.bank_total_amount_bdt) * (10 / 100))
      ).toFixed(2);
    });

    // NOC 50 %
    lcData.value.noc_50_percent_amount_bdt = computed(() => {
      return parseFloat(
        String(Number(lcData.value.bank_total_amount_bdt) * (50 / 100))
      ).toFixed(2);
    });

    // Bank Total %
    lcData.value.bank_total_amount_bdt = computed(() => {
      return parseFloat(
        String(
          Number(lcData.value.total_order_quantity) *
            Number(lcData.value.lc_conversion_rate_bank) *
            Number(lcData.value.lc_open_rate_usd)
        )
      );
    });

    // Under Total %
    lcData.value.under_total_amount_bdt = computed(() => {
      return parseFloat(
        String(
          Number(lcData.value.total_order_quantity) *
            Number(lcData.value.lc_conversion_rate) *
            Number(lcData.value.lc_under_rate_usd)
        )
      );
    });

    // Load Supplier list for dropdown
    const supplier_list = computed(() => {
      return store.getters[GETTERS.SUPPLIER.supplierList];
    });

    // Backend validation error model
    const errorMsgs = ref({});

    // Front End Validation Rules
    const rules = ref({
      lc_number: [
        {
          required: true,
          message: "Lc number is required",
          trigger: "change",
        },
      ],
      issuing_bank: [
        {
          required: true,
          message: "Please select the issuing bank from the list",
          trigger: "change",
        },
      ],
      issue_date: [
        {
          required: true,
          message: "Please enter the LC issue date",
          trigger: "change",
        },
      ],
      supplier_id: [
        {
          required: true,
          message: "Please select supplier from the list",
          trigger: "change",
        },
      ],
      lc_rate_usd: [
        {
          required: true,
          message: "Please enter the LC rate",
          trigger: "change",
        },
      ],
      total_order_quantity: [
        {
          required: true,
          message: "Enter total order quantity",
          trigger: "change",
        },
      ],
      lc_under_rate_usd: [
        {
          required: false,
          message: "Enter lc under rate",
          trigger: "change",
        },
      ],
      lc_conversion_rate: [
        {
          required: false,
          message: "Enter lc conversion rate",
          trigger: "change",
        },
      ],
      lc_open_rate_usd: [
        {
          required: false,
          message: "Enter a lc open rate",
          trigger: "change",
        },
      ],
      bank_total_amount_bdt: [
        {
          required: false,
          message: "Enter a bank total amount",
          trigger: "change",
        },
      ],
      under_total_amount_bdt: [
        {
          required: false,
          message: "Enter under total amount",
          trigger: "change",
        },
      ],
      open_10_percent_amount_bdt: [
        {
          required: false,
          message: "Enter open 10% amount",
          trigger: "change",
        },
      ],
      noc_50_percent_amount_bdt: [
        {
          required: false,
          message: "Enter Noc 50%",
          trigger: "change",
        },
      ],
      total_amount_bdt: [
        {
          required: false,
          message: "Enter total amount",
          trigger: "change",
        },
      ],
    });

    // Form Submit
    const submit = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Updating Lc",
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
                  .dispatch(ACTIONS.LC.EDIT_LC, {
                    data: lcData.value,
                    id: props.data.id,
                  })
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "Lc updated successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset and hide modal on success
                      resetForm();
                      hideModal(updateLcModalRef.value);
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

    // Reset Form
    const resetForm = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.clearValidate();
      setPropData();
      errorMsgs.value = {};
    };

    return {
      // Form setup
      rules,
      formRef,
      loading,
      resetForm,
      submit,
      updateLcModalRef,
      bankList,

      // Backend Validation
      errorMsgs,

      // Model/ Essential Data
      lcData,
      supplier_list,
    };
  },
});
</script>
