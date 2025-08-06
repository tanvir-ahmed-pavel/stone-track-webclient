<template>
  <div
    class="modal fade"
    id="modal_add_generatorLog"
    ref="addGeneratorLogModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_add_generatorLog_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add Entries</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_add_generatorLog_close"
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
        <el-form :model="generatorLogData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_add_generatorLog_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_add_generatorLog_header"
              data-kt-scroll-wrappers="#modal_add_generatorLog_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--              Name - Date-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Generator Name</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="generator_name">
                    <el-input
                      readonly
                      :model-value="generatorLogData.generator_name"
                      type="text"
                    />
                    <div
                      v-if="
                        generatorLogData.generator_name != '' &&
                        errorMsg.generator_name != ''
                      "
                      class="el-form-generatorLog__error"
                    >
                      {{ errorMsg.generator_name }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Date</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="run_date">
                    <el-date-picker
                      class="w-100"
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      v-model="generatorLogData.run_date"
                      type="date"
                      placeholder="Select a date"
                    >
                    </el-date-picker>
                    <div
                      v-if="
                        generatorLogData.run_date != '' &&
                        errorMsg.run_date != ''
                      "
                      class="el-form-generatorLog__error"
                    >
                      {{ errorMsg.run_date }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Meter - Diesel-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Meter Reading</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="meter">
                    <el-input
                      v-model="generatorLogData.meter"
                      type="number"
                      :step="0.1"
                      placeholder="Enter Meter Reading"
                    />
                    <div
                      v-if="
                        generatorLogData.meter != '' && errorMsg.meter != ''
                      "
                      class="el-form-generatorLog__error"
                    >
                      {{ errorMsg.meter }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Diesel</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="diesel_litter">
                    <el-input
                      v-model="generatorLogData.diesel_litter"
                      type="number"
                      :step="0.1"
                      placeholder="Enter Diesel Consumption"
                    />
                    <div
                      v-if="
                        generatorLogData.diesel_litter != '' &&
                        errorMsg.diesel_litter != ''
                      "
                      class="el-form-generatorLog__error"
                    >
                      {{ errorMsg.diesel_litter }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Amount - Working Hr-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2"> Amount </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="amount">
                    <el-input
                      :step="0.1"
                      v-model="generatorLogData.amount"
                      type="number"
                      placeholder="Enter Amount"
                    />
                    <div
                      v-if="
                        generatorLogData.amount != '' && errorMsg.amount != ''
                      "
                      class="el-form-generatorLog__error"
                    >
                      {{ errorMsg.amount }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="">Working Hours</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="working_hours">
                    <el-input
                      v-model="generatorLogData.working_hours"
                      :step="0.1"
                      type="number"
                      placeholder="Enter Working Hours"
                    />
                    <div
                      v-if="
                        generatorLogData.working_hours != '' &&
                        errorMsg.working_hours != ''
                      "
                      class="el-form-generatorLog__error"
                    >
                      {{ errorMsg.working_hours }}
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
            <button
              class="btn btn-sm btn-light me-3"
              @click.prevent="resetForm"
            >
              Reset
            </button>
            <!--end::Button-->

            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-sm btn-primary"
              @click.prevent="addGeneratorLog"
            >
              <!-- type="submit" -->
              <span v-if="!loading" class="indicator-label">
                Create
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
              data-bs-dismiss="modal"
              @click.prevent="cancel"
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
  name: "add-generator-log-modal",
  components: {},

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addGeneratorLogModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      generator_name: "",
      run_date: "",
      meter: "",
      diesel_litter: "",
      amount: "",
      working_hours: "",
    });

    const rules = ref({
      generator_name: [
        {
          required: true,
          message: "Name is required",
          trigger: "change",
        },
      ],
      run_date: [
        {
          required: true,
          message: "Date is required",
          trigger: "change",
        },
      ],
      meter: [
        {
          required: true,
          message: "Please give a meter reading",
          trigger: "change",
        },
      ],
      diesel_litter: [
        {
          required: true,
          message: "Diesel liter is required",
          trigger: "change",
        },
      ],
      amount: [
        {
          required: true,
          message: "Amount is required",
          trigger: "change",
        },
      ],
      working_hours: [
        {
          required: true,
          message: "Working hours is required",
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
      addGeneratorLogModalRef,
      resetForm,
      cancel,

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
      generatorLogData: {
        generator_name: "Deutz 560 KVA II 448 KW",
        run_date: "",
        meter: "",
        diesel_litter: "",
        amount: "",
        working_hours: "",
      },
    };
  },

  computed: {},

  methods: {
    ...mapActions({
      createGeneratorLog: ACTIONS.GENERATOR_LOG.CREATE_GENERATOR_LOG,
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

    addGeneratorLog() {
      Swal.fire({
        title: "Creating New Generator Log",
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
                      this.createNewGeneratorLog();
                    }, 1000);
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

    async createNewGeneratorLog() {
      this.loading = true;

      const data = JSON.parse(JSON.stringify(this.generatorLogData));

      var msg = await this.createGeneratorLog(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Generator Log added successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.resetForm();
          hideModal(this.addGeneratorLogModalRef);
        });
      } else if (Object.keys(msg["validation_error"]).length > 0) {
        Object.keys(msg["validation_error"]).forEach((key) => {
          msg["validation_error"][key].forEach((val) => {
            Object.keys(this.rules).forEach((key1) => {
              if (key1 == key) {
                JSON.parse(JSON.stringify(this.rules[key1])).forEach((val3) => {
                  if (val3["required"]) {
                    val3["message"] = val;
                    this.errorMsg.generator_name = val;
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
