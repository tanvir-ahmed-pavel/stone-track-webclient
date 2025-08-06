<template>
  <div
    class="modal fade"
    id="kt_modal_edit_supplier"
    ref="editSupplierModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_supplier_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Update Supplier Info</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_edit_supplier_close"
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
          :model="supplierEditData"
          :rules="rules"
          ref="formRef"
          v-loading="loading"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--                Supplier Name && Opening Balance -->
            <div class="row g-9">
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="required fs-7 fw-bold mb-1">Supplier Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item class="mb-4" size="small" prop="supplier_name">
                  <el-input
                    v-model="supplierEditData.supplier_name"
                    type="text"
                    placeholder="Enter supplier name"
                  />
                  <div
                    v-if="
                      supplierEditData.supplier_name != '' &&
                      errorMsg.supplier_name != ''
                    "
                    class="el-form-item__error"
                  >
                    <div v-for="errMsg in errorMsg.supplier_name" :key="errMsg">
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--                Opening Balance-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="fs-7 fw-bold mb-1">Opening Balance</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_opening_balance"
                >
                  <el-input
                    readonly
                    v-model="supplierEditData.supp_opening_balance"
                    type="number"
                    placeholder="Enter opening balance"
                  />
                  <div
                    v-if="
                      supplierEditData.supp_opening_balance != '' &&
                      errorMsg.supp_opening_balance != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_opening_balance"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <!--              Group & Type-->
            <div class="row g-9">
              <!--               Supplier Type -->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="required fs-7 fw-bold mb-1">Supplier Type</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item class="mb-4" size="small" prop="supplier_type">
                  <el-select v-model="supplierEditData.supplier_type">
                    <el-option
                      v-for="suppt in supplierTypes"
                      :key="suppt.id"
                      :value="suppt.id"
                      :label="suppt.supplier_type"
                    />
                  </el-select>
                  <div
                    v-if="
                      supplierEditData.supplier_type != '' &&
                      errorMsg.supplier_type != ''
                    "
                    class="el-form-item__error"
                  >
                    <div v-for="errMsg in errorMsg.supplier_type" :key="errMsg">
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--                Supplier Group-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="required fs-7 fw-bold mb-1">Supplier Group</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supplier_group_id"
                >
                  <el-select v-model="supplierEditData.supplier_group_id">
                    <el-option
                      v-for="suppt in supplierGroup"
                      :key="suppt.id"
                      :value="suppt.id"
                      :label="suppt.supplier_group_name"
                    />
                  </el-select>
                  <div
                    v-if="
                      supplierEditData.supplier_group_id != '' &&
                      errorMsg.supplier_group_id != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supplier_group_id"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <!--                Supplier Email & Mobile -->
            <div class="row g-9">
              <!--                Email-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="required fs-7 fw-bold mb-1">Email</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_primary_email"
                >
                  <el-input
                    v-model="supplierEditData.supp_primary_email"
                    type="text"
                    placeholder="Enter supplier email"
                  />
                  <div
                    v-if="
                      supplierEditData.supp_primary_email != '' &&
                      errorMsg.supp_primary_email != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_primary_email"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--                Mobile-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="required fs-7 fw-bold mb-1">
                  Mobile No
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Mobile Number must be valid"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_primary_mobile_no"
                >
                  <el-input
                    v-model="supplierEditData.supp_primary_mobile_no"
                    type="email"
                    placeholder="Enter supplier mobile"
                  />
                  <div
                    v-if="
                      supplierEditData.supp_primary_mobile_no != '' &&
                      errorMsg.supp_primary_mobile_no != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_primary_mobile_no"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <!--                Status -->
            <div class="row g-9">
              <!--                Status-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="fs-7 fw-bold mb-1"> Status </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item class="mb-4" size="small" prop="supplier_status">
                  <el-switch
                    v-model="supplierEditData.supplier_status"
                    inline-prompt
                    :active-value="1"
                    :inactive-value="0"
                    active-text="Enabled"
                    inactive-text="Disabled"
                  ></el-switch>
                  <div
                    v-if="
                      supplierEditData.supplier_status != '' &&
                      errorMsg.supplier_status != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supplier_status"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <!--              Address-->
            <el-divider>Supplier Address</el-divider>

            <!--                Supplier Address -->
            <div class="row g-9">
              <div class="col-md-12 fv-row">
                <!--begin::Label-->
                <label class="required fs-7 fw-bold mb-1">Address</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_primary_address"
                >
                  <el-input
                    v-model="supplierEditData.supp_primary_address"
                    type="text"
                    placeholder="Enter supplier name"
                  />
                  <div
                    v-if="
                      supplierEditData.supp_primary_address != '' &&
                      errorMsg.supp_primary_address != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_primary_address"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <!--              City & State-->
            <div class="row g-9">
              <!--                City-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="fs-7 fw-bold mb-1">City</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_primary_city"
                >
                  <el-input
                    v-model="supplierEditData.supp_primary_city"
                    type="text"
                    placeholder="Enter city"
                  />
                  <div
                    v-if="
                      supplierEditData.supp_primary_city != '' &&
                      errorMsg.supp_primary_city != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_primary_city"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--                State-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="fs-7 fw-bold mb-1">State / Province</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_primary_state"
                >
                  <el-input
                    v-model="supplierEditData.supp_primary_state"
                    type="text"
                    placeholder="Enter state"
                  />
                  <div
                    v-if="
                      supplierEditData.supp_primary_state != '' &&
                      errorMsg.supp_primary_state != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_primary_state"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <!--              ZIP & Country-->
            <div class="row g-9">
              <!--                Post/ Zip-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="fs-7 fw-bold mb-1">Post Code</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_primary_zip_code"
                >
                  <el-input
                    v-model="supplierEditData.supp_primary_zip_code"
                    type="text"
                    placeholder="Enter post code"
                  />
                  <div
                    v-if="
                      supplierEditData.supp_primary_zip_code != '' &&
                      errorMsg.supp_primary_zip_code != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_primary_zip_code"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--                Country-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="fs-7 fw-bold mb-1">Country</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item
                  class="mb-4"
                  size="small"
                  prop="supp_primary_country"
                >
                  <el-select v-model="supplierEditData.supp_primary_country">
                    <el-option
                      v-for="_country in country"
                      :key="_country.id"
                      :value="_country.id"
                      :label="_country.country_name"
                    />
                  </el-select>
                  <div
                    v-if="
                      supplierEditData.supp_primary_country != '' &&
                      errorMsg.supp_primary_country != ''
                    "
                    class="el-form-item__error"
                  >
                    <div
                      v-for="errMsg in errorMsg.supp_primary_country"
                      :key="errMsg"
                    >
                      {{ errMsg }}
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-sm btn-primary"
              @click.prevent="editSupplierInfo"
            >
              <!-- type="submit" -->
              <span v-if="!loading" class="indicator-label">
                Update
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";

export default defineComponent({
  name: "edit-supplier-modal",
  components: {},

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const editSupplierModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      supplier_name: "",
      supplier_type: "",
      supplier_group_id: "",
      supp_primary_email: "",
      supp_primary_mobile_no: "",
      supp_primary_address: "",
      supp_primary_city: "",
      supp_primary_state: "",
      supp_primary_zip_code: "",
      supp_primary_country: "",
      supplier_status: "",
      supp_opening_balance: "",
    });

    const rules = ref({
      supplier_name: [
        {
          required: true,
          message: "Supplier name is required",
          trigger: "change",
        },
      ],
      supplier_type: [
        {
          required: true,
          message: "Supplier type is required",
          trigger: "change",
        },
      ],
      supplier_group_id: [
        {
          required: true,
          message: "Supplier group is required",
          trigger: "change",
        },
      ],
      supp_primary_email: [
        {
          required: true,
          message: "Supplier email is required",
          immediate: true,
          // trigger: "",
        },
      ],
      supp_primary_mobile_no: [
        {
          required: true,
          message: "Supplier mobile is required",
          trigger: "change",
        },
      ],
      supplier_status: [
        {
          required: false,
          message: "Supplier status is required",
          trigger: "change",
        },
      ],
      supp_primary_address: [
        {
          required: true,
          message: "Address is required",
          trigger: "change",
        },
      ],
      supp_primary_city: [
        {
          required: false,
          message: "Town is required",
          trigger: "change",
        },
      ],
      supp_primary_state: [
        {
          required: false,
          message: "State is required",
          trigger: "change",
        },
      ],
      supp_primary_country: [
        {
          required: false,
          message: "Country is required",
          trigger: "change",
        },
      ],
      supp_primary_zip_code: [
        {
          required: false,
          message: "Post code is required",
          trigger: "change",
        },
      ],
    });

    return {
      rules,
      formRef,
      loading,
      errorMsg,
      editSupplierModalRef,

      formResetting() {
        if (!formRef.value) {
          return;
        }
        formRef.value?.clearValidate();
        formRef.value?.resetFields();
        Object.keys(errorMsg.value).forEach((val) => {
          errorMsg.value[val] = "";
        });
      },

      _value() {
        if (!formRef.value) {
          return;
        }
        Object.keys(errorMsg).forEach((val) => {
          errorMsg[val] = "";
        });
        return formRef.value?.validate();
      },
    };
  },

  computed: {
    ...mapGetters({
      supplierTypes: GETTERS.SUPPLIER.supplierTypes,
      supplierGroup: GETTERS.LOOKUP_DATA.supplierGroup,
      status: GETTERS.LOOKUP_DATA.status,
      country: GETTERS.LOOKUP_DATA.country,
      supplierEditData: GETTERS.SUPPLIER.supplierEditData,
    }),
  },

  methods: {
    ...mapActions({
      editSupplier: ACTIONS.SUPPLIER.EDIT_SUPPLIER,
    }),

    resetForm() {
      Object.keys(this.supplierEditData).forEach((val) => {
        this.supplierEditData[val] = "";
      });
      Object.keys(this.errorMsg).forEach((val) => {
        this.errorMsg[val] = "";
      });
    },

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

    editSupplierInfo() {
      Swal.fire({
        title: "Updating Supplier Information",
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
                      this.updateSupplier();
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

    async updateSupplier() {
      this.loading = true;

      const data = JSON.parse(JSON.stringify(this.supplierEditData));

      var msg = await this.editSupplier(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Supplier updated successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.resetForm();
          hideModal(this.editSupplierModalRef);
        });
      } else if (Object.keys(msg["validation_error"]).length > 0) {
        Object.keys(msg["validation_error"]).forEach((key) => {
          msg["validation_error"][key].forEach((val) => {
            Object.keys(this.rules).forEach((key1) => {
              if (key1 == key) {
                JSON.parse(JSON.stringify(this.rules[key1])).forEach((val3) => {
                  if (val3["required"]) {
                    val3["message"] = val;
                    this.errorMsg.supp_primary_email = val;
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
