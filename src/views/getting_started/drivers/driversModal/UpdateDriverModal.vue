<template>
  <div
    class="modal fade"
    id="modal_update_driver"
    ref="updateDriverModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_update_driver_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Edit a Driver</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_update_driver_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span @click.prevent="setData(data)" class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->

        <el-form :model="driverEditData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_update_driver_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_update_driver_header"
              data-kt-scroll-wrappers="#modal_update_driver_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--              Name and Mobile -->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1">Driver Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="driver_name">
                    <el-input
                      v-model="driverEditData.driver_name"
                      type="text"
                      placeholder="Enter driver name"
                    />
                    <div
                      v-if="
                        driverEditData.driver_name != '' &&
                        errorMsg.driver_name != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.driver_name }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Mobile-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1"
                    >Driver Mobile</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="driver_mobile_no">
                    <el-input
                      v-model="driverEditData.driver_mobile_no"
                      type="text"
                      placeholder="Enter driver mobile"
                    />
                    <div
                      v-if="
                        driverEditData.driver_mobile_no != '' &&
                        errorMsg.driver_mobile_no != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.driver_mobile_no }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Driver Status-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-3 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mt-3">
                    <span>Driver Status:</span>
                  </label>
                  <!--end::Label-->
                </div>

                <div class="col-md-3 fv-row">
                  <!--begin::Input-->
                  <el-form-item prop="driver_status">
                    <el-switch
                      v-model="driverEditData.driver_status"
                      inline-prompt
                      :active-value="1"
                      :inactive-value="0"
                      active-text="Enabled"
                      inactive-text="Disabled"
                    ></el-switch>
                    <div
                      v-if="
                        driverEditData.driver_status != '' &&
                        errorMsg.driver_status != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.driver_status }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Divider Heading - Driver License-->
              <div class="row g-9 my-2">
                <el-divider>Driver License Info</el-divider>
              </div>

              <!--              License Number and Issued Place  -->
              <!--begin::Input group-->
              <div class="row g-9">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-1"> License Number </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="license_number">
                    <el-input
                      v-model="driverEditData.license_number"
                      type="text"
                      placeholder="Enter license number"
                    />
                    <div
                      v-if="
                        driverEditData.license_number != '' &&
                        errorMsg.license_number != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.license_number }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Issue Location-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-1"> Issued Location </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="issued_location">
                    <el-input
                      v-model="driverEditData.issued_location"
                      type="text"
                      placeholder="Enter issued location"
                    />
                    <div
                      v-if="
                        driverEditData.issued_location != '' &&
                        errorMsg.issued_location != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.issued_location }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--                Issue Date and Expiry Date-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-1"> Issuing Date </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="issuing_date">
                    <el-date-picker
                      v-model="driverEditData.issuing_date"
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Pick a date"
                      style="width: 100%"
                    ></el-date-picker>
                    <div
                      v-if="
                        driverEditData.issuing_date != '' &&
                        errorMsg.issuing_date != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.issuing_date }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Expiry Date-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-1"> Expiry Date </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="expiry_date">
                    <el-date-picker
                      v-model="driverEditData.expiry_date"
                      type="date"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      placeholder="Pick a date"
                      style="width: 100%"
                    ></el-date-picker>
                    <div
                      v-if="
                        driverEditData.expiry_date != '' &&
                        errorMsg.expiry_date != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.expiry_date }}
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
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-sm btn-primary"
              @click.prevent="editDriverInfo"
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
            <button
              @click.prevent="setData(data)"
              data-bs-dismiss="modal"
              class="btn btn-sm btn-primary"
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
  name: "update-driver-modal",
  components: {},

  props: {
    data: { type: Object, required: true },
  },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateDriverModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      driver_name: "",
      driver_mobile_no: "",
      driver_status: "",
      license_number: "",
      issuing_date: "",
      expiry_date: "",
      issued_location: "",
    });

    const rules = ref({
      driver_name: [
        {
          required: true,
          message: "Driver name is required",
          trigger: "change",
        },
      ],
      driver_mobile_no: [
        {
          required: true,
          message: "Driver mobile is required",
          trigger: "change",
        },
      ],
      // license_number: [
      //   {
      //     required: true,
      //     message: "License number is required",
      //     trigger: "change",
      //   },
      // ],
      // issuing_date: [
      //   {
      //     required: true,
      //     message: "Issuing date is required",
      //     trigger: "change",
      //   },
      // ],
      // expiry_date: [
      //   {
      //     required: true,
      //     message: "Expiry date is required",
      //     trigger: "change",
      //   },
      // ],
      // issued_location: [
      //   {
      //     required: true,
      //     message: "Issued location is required",
      //     trigger: "change",
      //   },
      // ],
    });

    return {
      rules,
      formRef,
      loading,
      errorMsg,
      updateDriverModalRef,

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

  watch: {
    data() {
      this.setData(JSON.parse(JSON.stringify(this.data)));
    },
  },

  data() {
    return {
      driverEditData: {
        id: "",
        driver_name: "",
        driver_mobile_no: "",
        driver_status: "",
        license_number: "",
        issuing_date: "",
        expiry_date: "",
        issued_location: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      lookupData: GETTERS.LOOKUP_DATA.lookupData,
    }),
  },

  methods: {
    setData(data) {
      this.driverEditData.id = data.id;
      this.driverEditData.driver_name = data.driver_name;
      this.driverEditData.driver_mobile_no = data.driver_mobile_no;
      this.driverEditData.license_number = data.license_number;
      this.driverEditData.driver_status = data.driver_status;
      this.driverEditData.expiry_date = data.expiry_date;
      this.driverEditData.issuing_date = data.issuing_date;
      this.driverEditData.issued_location = data.issued_location;
    },

    ...mapActions({
      editDriver: ACTIONS.DRIVER.EDIT_DRIVER,
    }),

    resetForm() {
      Object.keys(this.driverEditData).forEach((val) => {
        this.driverEditData[val] = "";
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

    editDriverInfo() {
      Swal.fire({
        title: "Updating Driver Information",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          Promise.resolve([this._value()]).then((value) => {
            Promise.allSettled(value).then((results) =>
              results.forEach((result) => {
                if (result.status == "fulfilled") {
                  if (result["value"]) {
                    setTimeout(() => {
                      this.updateDriver();
                    }, 1000);
                  }
                } else if (result.status == "rejected") {
                  this.loading = false;
                  this.showErrorMsg();
                }
              })
            );
          });
        }
      });
    },

    async updateDriver() {
      const data = JSON.parse(JSON.stringify(this.driverEditData));

      var msg = await this.editDriver(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Driver updated successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.resetForm();
          hideModal(this.updateDriverModalRef);
        });
      } else if (Object.keys(msg["validation_error"]).length > 0) {
        Object.keys(msg["validation_error"]).forEach((key) => {
          msg["validation_error"][key].forEach((val) => {
            Object.keys(this.rules).forEach((key1) => {
              if (key1 == key) {
                JSON.parse(JSON.stringify(this.rules[key1])).forEach((val3) => {
                  if (val3["required"]) {
                    val3["message"] = val;
                    this.errorMsg.driver_name = val;
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
