<template>
  <div
    class="modal fade"
    id="modal_update_vehicle"
    ref="updateVehicleModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_update_vehicle_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Edit a Vehicle</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_update_vehicle_close"
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

        <el-form :model="vehicleEditData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_update_vehicle_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_update_vehicle_header"
              data-kt-scroll-wrappers="#modal_update_vehicle_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--              License Plate and Mark -->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1"
                    >License Plate</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="license_plate">
                    <el-input
                      v-model="vehicleEditData.license_plate"
                      type="text"
                      placeholder="Enter license plate number"
                    />
                    <div
                      v-if="
                        vehicleEditData.license_plate != '' &&
                        errorMsg.license_plate != ''
                      "
                      class="el-form-driver__error"
                    >
                      {{ errorMsg.license_plate }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Mark-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1">Mark</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="mark">
                    <el-input
                      v-model="vehicleEditData.mark"
                      type="text"
                      placeholder="Enter vehicle mark"
                    />
                    <div
                      v-if="vehicleEditData.mark != '' && errorMsg.mark != ''"
                      class="el-form-driver__error"
                    >
                      {{ errorMsg.mark }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--             Model and Vehicle -->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1">Model</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="model">
                    <el-input
                      v-model="vehicleEditData.model"
                      type="text"
                      placeholder="Enter model"
                    />
                    <div
                      v-if="vehicleEditData.model != '' && errorMsg.model != ''"
                      class="el-form-driver__error"
                    >
                      {{ errorMsg.model }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Driver-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1"> Driver </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="vehicle_id">
                    <el-select v-model="vehicleEditData.driver_id">
                      <el-option value="">Select a Driver...</el-option>
                      <el-option
                        v-for="driver in driverList"
                        :value="driver.id"
                        :label="driver.driver_name"
                        :key="driver.id"
                      ></el-option>
                    </el-select>
                    <div
                      v-if="
                        vehicleEditData.driver_id != '' &&
                        errorMsg.driver_id != ''
                      "
                      class="el-form-driver__error"
                    >
                      {{ errorMsg.driver_id }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Fuel and Status -->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1">Fuel Type</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="fuel_type">
                    <el-radio-group
                      v-model="vehicleEditData.fuel_type"
                      size="small"
                    >
                      <el-radio-button label="Diesel"></el-radio-button>
                      <el-radio-button label="Octane"></el-radio-button>
                    </el-radio-group>
                    <div
                      v-if="
                        vehicleEditData.fuel_type != '' &&
                        errorMsg.fuel_type != ''
                      "
                      class="el-form-driver__error"
                    >
                      {{ errorMsg.fuel_type }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Status-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold">
                    <span>Vehicle Status:</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="vehicle_status">
                    <el-switch
                      v-model="vehicleEditData.vehicle_status"
                      inline-prompt
                      :active-value="1"
                      :inactive-value="0"
                      active-text="Enabled"
                      inactive-text="Disabled"
                    ></el-switch>
                    <div
                      v-if="
                        vehicleEditData.vehicle_status != '' &&
                        errorMsg.vehicle_status != ''
                      "
                      class="el-form-driver__error"
                    >
                      {{ errorMsg.vehicle_status }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->
            </div>
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-sm btn-primary"
              @click.prevent="editVehicleInfo"
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
  name: "add-vehicle-modal",
  components: {},

  props: {
    data: { type: Object, required: true },
  },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateVehicleModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      license_plate: "",
      mark: "",
      model: "",
      fuel_type: "",
      driver_id: "",
      vehicle_status: "",
    });

    const rules = ref({
      license_plate: [
        {
          required: true,
          message: "License plate number is required",
          trigger: "change",
        },
      ],
      mark: [
        {
          required: true,
          message: "mark is required",
          trigger: "change",
        },
      ],
      fuel_type: [
        {
          required: true,
          message: "Fuel type is required",
          trigger: "change",
        },
      ],
      model: [
        {
          required: true,
          message: "Model is required",
          trigger: "change",
        },
      ],
      driver_id: [
        {
          required: true,
          message: "Driver is required",
          trigger: "change",
        },
      ],
      vehicle_status: [
        {
          required: true,
          message: "Vehicle status is required",
          trigger: "change",
        },
      ],
    });

    return {
      rules,
      formRef,
      loading,
      errorMsg,
      updateVehicleModalRef,

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

  data() {
    return {
      vehicleEditData: {
        id: "",
        license_plate: "",
        mark: "",
        model: "",
        fuel_type: "Diesel",
        driver_id: "",
        vehicle_status: "",
      },
    };
  },

  watch: {
    data() {
      this.setData(JSON.parse(JSON.stringify(this.data)));
    },
  },

  computed: {
    ...mapGetters({
      vehicleTypes: GETTERS.VEHICLE.vehicleTypes,
      lookupData: GETTERS.LOOKUP_DATA.lookupData,
      driverList: GETTERS.DRIVER.driverList,
    }),
  },

  methods: {
    setData(data) {
      this.vehicleEditData.id = data.id;
      this.vehicleEditData.license_plate = data.license_plate;
      this.vehicleEditData.mark = data.mark;
      this.vehicleEditData.model = data.model;
      this.vehicleEditData.fuel_type = data.fuel_type;
      this.vehicleEditData.driver_id = data.driver_id;
      this.vehicleEditData.vehicle_status = data.vehicle_status;
    },

    ...mapActions({
      editVehicle: ACTIONS.VEHICLE.EDIT_VEHICLE,
    }),

    resetForm() {
      Object.keys(this.vehicleEditData).forEach((val) => {
        this.vehicleEditData[val] = "";
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

    editVehicleInfo() {
      Swal.fire({
        title: "Updating Vehicle Information",
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
                      this.updateVehicle();
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

    async updateVehicle() {
      this.loading = true;

      const data = JSON.parse(JSON.stringify(this.vehicleEditData));

      var msg = await this.editVehicle(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Vehicle added successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.resetForm();
          hideModal(this.updateVehicleModalRef);
        });
      } else if (Object.keys(msg["validation_error"]).length > 0) {
        Object.keys(msg["validation_error"]).forEach((key) => {
          msg["validation_error"][key].forEach((val) => {
            Object.keys(this.rules).forEach((key1) => {
              if (key1 == key) {
                JSON.parse(JSON.stringify(this.rules[key1])).forEach((val3) => {
                  if (val3["required"]) {
                    val3["message"] = val;
                    this.errorMsg.driver_id = val;
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
