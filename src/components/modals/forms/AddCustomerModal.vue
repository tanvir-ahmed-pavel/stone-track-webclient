<template>
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="addCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add a Customer</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Form-->
        <!-- @submit.prevent="submit()" -->
        <el-form
          :model="customerData"
          :rules="rules"
          ref="formRef"
          v-loading="loading"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Customer Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="customer_name">
                  <el-input
                    v-model="customerData.customer_name"
                    type="text"
                    placeholder=""
                  />
                  <div
                    v-if="
                      customerData.customer_name != '' &&
                      errorMsg.customer_name != ''
                    "
                    class="el-form-item__error"
                  >
                    {{ errorMsg.customer_name }}
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Type</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Customer Type"
                  ></i>
                </label>
                <!--end::Label-->
                <el-form-item prop="customer_type">
                  <el-select v-model="customerData.customer_type">
                    <el-option
                      v-for="cust in customerTypes"
                      :key="cust.id"
                      :value="cust.id"
                      :label="cust.customer_type"
                    />
                  </el-select>
                  <div
                    v-if="
                      customerData.customer_type != '' &&
                      errorMsg.customer_type != ''
                    "
                    class="el-form-item__error"
                  >
                    {{ errorMsg.customer_type }}
                  </div>
                </el-form-item>
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Group</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Customer Group"
                  ></i>
                </label>
                <!--end::Label-->
                <el-form-item prop="customer_group_id">
                  <el-select v-model="customerData.customer_group_id">
                    <el-option
                      v-for="cust in customerGroup"
                      :key="cust.id"
                      :value="cust.id"
                      :label="cust.customer_group_name"
                    />
                  </el-select>
                  <div
                    v-if="
                      customerData.customer_group_id != '' &&
                      errorMsg.customer_group_id != ''
                    "
                    class="el-form-item__error"
                  >
                    {{ errorMsg.customer_group_id }}
                  </div>
                </el-form-item>
              </div>

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Email</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Email address must be active"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="cus_primary_email">
                  <el-input v-model="customerData.cus_primary_email" />
                  <div
                    v-if="
                      customerData.cus_primary_email != '' &&
                      errorMsg.cus_primary_email != ''
                    "
                    class="el-form-item__error"
                  >
                    {{ errorMsg.cus_primary_email }}
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Mobile No</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Mobile Number must be valid"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="cus_primary_mobile_no">
                  <el-input v-model="customerData.cus_primary_mobile_no" />
                  <div
                    v-if="
                      customerData.cus_primary_mobile_no != '' &&
                      errorMsg.cus_primary_mobile_no != ''
                    "
                    class="el-form-item__error"
                  >
                    {{ errorMsg.cus_primary_mobile_no }}
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Statusssss</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Status"
                  ></i>
                </label>
                <!--end::Label-->
                <el-form-item prop="customer_status">
                  <el-select v-model="customerData.customer_status">
                    <el-option
                      v-for="stat in status"
                      :key="stat.id"
                      :value="stat.id"
                      :label="stat.status"
                    />
                  </el-select>
                  <div
                    v-if="
                      customerData.customer_status != '' &&
                      errorMsg.customer_status != ''
                    "
                    class="el-form-item__error"
                  >
                    {{ errorMsg.customer_status }}
                  </div>
                </el-form-item>
              </div>

              <!--begin::Billing toggle-->
              <div
                class="fw-bolder fs-3 rotate collapsible mb-7"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="kt_customer_view_details"
              >
                Customer Address
              </div>
              <!--end::Billing toggle-->

              <!--begin::Billing form-->
              <div
                id="kt_modal_add_customer_billing_info"
                class="collapse show"
              >
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Address</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="cus_primary_address">
                    <el-input v-model="customerData.cus_primary_address" />
                    <div
                      v-if="
                        customerData.cus_primary_address != '' &&
                        errorMsg.cus_primary_address != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.cus_primary_address }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">City</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="cus_primary_city">
                    <el-input v-model="customerData.cus_primary_city" />
                    <div
                      v-if="
                        customerData.cus_primary_city != '' &&
                        errorMsg.cus_primary_city != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.cus_primary_city }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-bold mb-2"
                      >State / Province</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="cus_primary_state">
                      <el-input v-model="customerData.cus_primary_state" />
                      <div
                        v-if="
                          customerData.cus_primary_state != '' &&
                          errorMsg.cus_primary_state != ''
                        "
                        class="el-form-item__error"
                      >
                        {{ errorMsg.cus_primary_state }}
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-bold mb-2">Post Code</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="cus_primary_zip_code">
                      <el-input v-model="customerData.cus_primary_zip_code" />
                      <div
                        v-if="
                          customerData.cus_primary_zip_code != '' &&
                          errorMsg.cus_primary_zip_code != ''
                        "
                        class="el-form-item__error"
                      >
                        {{ errorMsg.cus_primary_zip_code }}
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Input group-->

                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Country</span>
                    <i
                      class="fas fa-exclamation-circle ms-1 fs-7"
                      data-bs-toggle="tooltip"
                      title="Country"
                    ></i>
                  </label>
                  <!--end::Label-->
                  <el-form-item prop="cus_primary_country">
                    <el-select v-model="customerData.cus_primary_country">
                      <el-option
                        v-for="_country in country"
                        :key="_country.id"
                        :value="_country.id"
                        :label="_country.country_name"
                      />
                    </el-select>
                    <div
                      v-if="
                        customerData.cus_primary_country != '' &&
                        errorMsg.cus_primary_country != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.cus_primary_country }}
                    </div>
                  </el-form-item>
                </div>
              </div>
              <!--end::Billing form-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <!-- <button type="reset" id="kt_modal_add_customer_cancel" class="btn btn-light me-3">Reset</button> -->
            <button class="btn btn-light me-3" @click.prevent="resetForm">
              Reset
            </button>
            <!--end::Button-->

            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              @click.prevent="addCustomer"
            >
              <!-- type="submit" -->
              <span v-if="!loading" class="indicator-label">
                Create
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="icons/duotune/arrows/arr064.svg" />
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
            <button
              @click.prevent="cancel"
              data-bs-dismiss="modal"
              class="btn btn-lg btn-primary"
            >
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";

export default defineComponent({
  name: "add-customer-modal",
  components: {},

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      customer_name: "",
      customer_type: "",
      customer_group_id: "",
      cus_primary_email: "",
      cus_primary_mobile_no: "",
      cus_primary_address: "",
      cus_primary_city: "",
      cus_primary_state: "",
      cus_primary_zip_code: "",
      cus_primary_country: "",
      customer_status: "",
    });

    const rules = ref({
      customer_name: [
        {
          required: true,
          message: "Customer name is required",
          trigger: "change",
        },
      ],
      customer_type: [
        {
          required: true,
          message: "Customer type is required",
          trigger: "change",
        },
      ],
      customer_group_id: [
        {
          required: true,
          message: "Customer group is required",
          trigger: "change",
        },
      ],
      cus_primary_email: [
        {
          required: true,
          message: "Customer email is required",
          immediate: true,
          // trigger: "",
        },
      ],
      cus_primary_mobile_no: [
        {
          required: true,
          message: "Customer mobile is required",
          trigger: "change",
        },
      ],
      customer_status: [
        {
          required: true,
          message: "Customer status is required",
          trigger: "change",
        },
      ],
      cus_primary_address: [
        {
          required: true,
          message: "Address is required",
          trigger: "change",
        },
      ],
      cus_primary_city: [
        {
          required: true,
          message: "Town is required",
          trigger: "change",
        },
      ],
      cus_primary_state: [
        {
          required: true,
          message: "State is required",
          trigger: "change",
        },
      ],
      cus_primary_country: [
        {
          required: true,
          message: "Country is required",
          trigger: "change",
        },
      ],
      cus_primary_zip_code: [
        {
          required: true,
          message: "Post code is required",
          trigger: "change",
        },
      ],
    });

    // Reset Form
    const resetForm = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.clearValidate();
      formRef.value.resetFields();
    };

    const cancel = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.clearValidate();
    };

    return {
      rules,
      formRef,
      loading,
      errorMsg,
      addCustomerModalRef,
      resetForm,
      cancel,

      _value() {
        if (!formRef.value) {
          return;
        }
        Object.keys(errorMsg.value).forEach((val) => {
          errorMsg.value[val] = "";
        });
        return formRef.value?.validate();
      },
    };
  },

  data() {
    return {
      customerData: {
        customer_name: "",
        customer_type: "",
        customer_group_id: "",
        cus_primary_email: "",
        cus_primary_mobile_no: "",
        cus_primary_address: "",
        cus_primary_city: "",
        cus_primary_state: "",
        cus_primary_zip_code: "",
        cus_primary_country: "",
        customer_status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({
      customerTypes: GETTERS.CUSTOMER.customerTypes,
      customerGroup: GETTERS.LOOKUP_DATA.customerGroup,
      status: GETTERS.LOOKUP_DATA.status,
      country: GETTERS.LOOKUP_DATA.country,
    }),
  },

  methods: {
    ...mapActions({
      createCustomer: ACTIONS.CUSTOMER.CREATE_CUSTOMER,
    }),

    showErrorMsg() {
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
    },

    addCustomer() {
      Swal.fire({
        title: "Creating New Customer",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          Promise.resolve([this._value()]).then((value) => {
            Promise.allSettled(value).then((results) =>
              results.forEach((result) => {
                if (result.status == "fulfilled") {
                  if (result["value"]) {
                    setTimeout(() => {
                      this.createNewCustomer();
                    }, 2000);
                  }
                } else if (result.status == "rejected") {
                  this.showErrorMsg();
                }
              })
            );
          });
        }
      });
    },

    async createNewCustomer() {
      this.loading = true;

      const data = JSON.parse(
        JSON.stringify({ customerData: this.customerData })
      );

      var msg = await this.createCustomer(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Customer added successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.resetForm();
          hideModal(this.addCustomerModalRef);
        });
      } else if (Object.keys(msg["validation_error"]).length > 0) {
        Object.keys(msg["validation_error"]).forEach((key) => {
          msg["validation_error"][key].forEach((val) => {
            Object.keys(this.rules).forEach((key1) => {
              if (key1 == key) {
                JSON.parse(JSON.stringify(this.rules[key1])).forEach((val3) => {
                  if (val3["required"]) {
                    val3["message"] = val;
                    this.errorMsg.cus_primary_email = val;
                  }
                });
              }
            });
          });
        });
        this.showErrorMsg();
      } else {
        this.showErrorMsg();
      }
    },
  },
});
</script>
