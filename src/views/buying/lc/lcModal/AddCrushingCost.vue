<template>
  <div
    class="modal fade"
    id="modal_add_crashing_cost"
    ref="addCrushingCost"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_add_crashing_cost_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add Crushing Cost</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_add_crashing_cost_close"
            data-bs-dismiss="modal"
            @click.prevent="resetForm"
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
          :model="crushingCostData"
          :rules="rules"
          ref="formRef"
          v-loading="loading"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_add_crashing_cost_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_add_crashing_cost_header"
              data-kt-scroll-wrappers="#modal_add_crashing_cost_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <label class="required fs-7 fw-bold mb-1">LC</label>

                  <el-form-item class="mb-4" size="small" prop="lc_number">
                    <el-input
                      readonly
                      v-model="crushingCostData.lc_number"
                      type="text"
                    />
                    <div
                      v-if="
                        crushingCostData.lc_number != '' &&
                        errorMsg.lc_number != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.lc_number" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>

                <div class="col-md-6 fv-row">
                  <label class="fs-7 fw-bold mb-1">LC Rate $ / MT</label>

                  <el-form-item class="mb-4" size="small" prop="lc_rate_usd">
                    <el-input
                      readonly
                      v-model="crushingCostData.lc_rate_usd"
                      type="text"
                    />
                    <div
                      v-if="
                        crushingCostData.lc_rate_usd != '' &&
                        errorMsg.lc_rate_usd != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.lc_rate_usd" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>

              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <label class="required fs-7 fw-bold mb-1"
                    >USD Conversion Rate In BDT</label
                  >

                  <el-form-item
                    class="mb-4"
                    size="small"
                    prop="usd_to_bdt_rate"
                  >
                    <el-input
                      readonly
                      v-model="crushingCostData.usd_to_bdt_rate"
                      type="text"
                    />
                    <div
                      v-if="
                        crushingCostData.usd_to_bdt_rate != '' &&
                        errorMsg.usd_to_bdt_rate != ''
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsg.usd_to_bdt_rate"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>

                <div class="col-md-6 fv-row">
                  <label class="required fs-7 fw-bold mb-1">Item</label>

                  <el-form-item class="mb-4" size="small" prop="item_id">
                    <el-select v-model="crushingCostData.item_id">
                      <el-option
                        v-for="item in itemCrushingCost.lcItemInfo"
                        :key="item.id"
                        :value="item.id"
                        :label="item.item_name"
                      />
                    </el-select>
                    <div
                      v-if="
                        crushingCostData.item_id != '' && errorMsg.item_id != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.item_id" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>

              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <label class="required fs-7 fw-bold mb-1">Duty Fee</label>

                  <el-form-item class="mb-4" size="small" prop="duty_fee">
                    <el-input
                      v-model="crushingCostData.duty_fee"
                      type="number"
                      placeholder="Enter Duty Fee"
                    />
                    <div
                      v-if="
                        crushingCostData.duty_fee != '' &&
                        errorMsg.duty_fee != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.duty_fee" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>

                <div class="col-md-6 fv-row">
                  <label class="required fs-7 fw-bold mb-1"> Port Fee </label>

                  <el-form-item class="mb-4" size="small" prop="port_bill">
                    <el-input
                      v-model="crushingCostData.port_bill"
                      type="number"
                      placeholder="Enter Port Fee"
                    />
                    <div
                      v-if="
                        crushingCostData.port_bill != '' &&
                        errorMsg.port_bill != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.port_bill" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>

              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <label class="fs-7 fw-bold mb-1"> DOC + C & F </label>

                  <el-form-item class="mb-4" size="small" prop="doc_c_and_f">
                    <el-input
                      v-model="crushingCostData.doc_c_and_f"
                      type="number"
                      placeholder="Enter DOC + C & F Fee"
                    />
                    <div
                      v-if="
                        crushingCostData.doc_c_and_f != '' &&
                        errorMsg.doc_c_and_f != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.doc_c_and_f" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>

              <el-divider>Calculation</el-divider>

              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <label class="required fs-7 fw-bold mb-1"
                    >Total W / All Duty</label
                  >

                  <el-form-item
                    class="mb-4"
                    size="small"
                    prop="total_all_dutys"
                  >
                    <el-input
                      placeholder="Total W / All Duty"
                      readonly
                      :model-value="
                        (crushingCostData.total_all_dutys =
                          Number(crushingCostData.duty_fee) +
                          Number(crushingCostData.port_bill) +
                          Number(crushingCostData.doc_c_and_f))
                      "
                      type="text"
                    />
                    <div
                      v-if="
                        crushingCostData.total_all_dutys != '' &&
                        errorMsg.total_all_dutys != ''
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsg.total_all_dutys"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>

                <div class="col-md-6 fv-row">
                  <label class="required fs-7 fw-bold mb-1">Total BDT</label>

                  <el-form-item class="mb-4" size="small" prop="total_bdt">
                    <el-input
                      readonly
                      :model-value="
                        (crushingCostData.total_bdt =
                          Number(crushingCostData.lc_rate_usd) *
                          Number(crushingCostData.usd_to_bdt_rate))
                      "
                      type="text"
                      placeholder="Total BDT"
                    />
                    <div
                      v-if="
                        crushingCostData.total_bdt != '' &&
                        errorMsg.total_bdt != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.total_bdt" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>

              <div class="row g-9">
                <div class="col-md-12 fv-row">
                  <label class="fs-7 fw-bold mb-1">Final Rate</label>

                  <el-form-item class="mb-4" size="small" prop="final_rate">
                    <el-input
                      readonly
                      :model-value="
                        (crushingCostData.final_rate =
                          Number(crushingCostData.total_bdt) +
                          Number(crushingCostData.total_all_dutys))
                      "
                      type="text"
                      placeholder="Final Rate"
                    />
                    <div
                      v-if="
                        crushingCostData.final_rate != '' &&
                        errorMsg.final_rate != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsg.final_rate" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              class="btn btn-light btn-sm me-3"
              @click.prevent="resetForm"
            >
              Reset
            </button>
            <!--end::Button-->

            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-sm btn-primary"
              @click.prevent="addItemCrushingCost"
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
              @click.prevent="resetForm"
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
  name: "AddCrushingCost",
  components: {},

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addCrushingCost = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      lc_id: "",
      item_id: "",
      duty_fee: "",
      port_bill: "",
      doc_c_and_f: "",
      lc_rate_usd: "",
      usd_to_bdt_rate: "",
      total_all_dutys: "",
      total_bdt: "",
      final_rate: "",
    });

    const rules = ref({
      lc_id: [
        {
          required: true,
          message: "LC is required",
          trigger: "change",
        },
      ],
      item_id: [
        {
          required: true,
          message: "'Select an Item from dropdowns'",
          trigger: "change",
        },
      ],
      duty_fee: [
        {
          required: true,
          message: "Duty fee is required",
          trigger: "change",
        },
      ],
      port_bill: [
        {
          required: true,
          message: "Port fee is required",
          trigger: "change",
        },
      ],
      doc_c_and_f: [
        {
          required: true,
          message: "DOC + C&F is required",
          trigger: "change",
        },
      ],
      lc_rate_usd: [
        {
          required: false,
          message: "LC USD Rate is required",
          trigger: "change",
        },
      ],
      usd_to_bdt_rate: [
        {
          required: true,
          message: "USD to BD rate is required",
          trigger: "change",
        },
      ],
      // total_all_dutys: [
      //   {
      //     required: false,
      //     message: "Town is required",
      //     trigger: "change",
      //   },
      // ],
      // total_bdt: [
      //   {
      //     required: false,
      //     message: "State is required",
      //     trigger: "change",
      //   },
      // ],
      // final_rate: [
      //   {
      //     required: false,
      //     message: "Country is required",
      //     trigger: "change",
      //   },
      // ],
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
      addCrushingCost,
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
      crushingCostData: {
        id: "",
        lc_id: "",
        lc_number: "",
        item_id: "",
        duty_fee: "",
        port_bill: "",
        doc_c_and_f: "",
        lc_rate_usd: "",
        usd_to_bdt_rate: "",
        total_all_dutys: "",
        total_bdt: "",
        final_rate: "",
      },
    };
  },
  watch: {
    itemCrushingCost() {
      this.crushingCostData.lc_id = this.itemCrushingCost.lcInfo[0].id;
      this.crushingCostData.lc_number = this.itemCrushingCost.lcInfo[0].lc_id;
      this.crushingCostData.usd_to_bdt_rate =
        this.itemCrushingCost.lcInfo[0].lc_conversion_rate;
      this.crushingCostData.lc_rate_usd =
        this.itemCrushingCost.lcInfo[0].lc_rate_usd;
      if (this.itemCrushingCost.data.length > 0) {
        this.crushingCostData.id = this.itemCrushingCost.data[0].id;
        this.crushingCostData.lc_id = this.itemCrushingCost.data[0].lc_id;
        this.crushingCostData.item_id = this.itemCrushingCost.data[0].item_id;
        this.crushingCostData.duty_fee = this.itemCrushingCost.data[0].duty_fee;
        this.crushingCostData.port_bill =
          this.itemCrushingCost.data[0].port_bill;
        this.crushingCostData.doc_c_and_f =
          this.itemCrushingCost.data[0].doc_c_and_f;
        this.crushingCostData.lc_rate_usd =
          this.itemCrushingCost.data[0].lc_rate_usd;
        this.crushingCostData.usd_to_bdt_rate =
          this.itemCrushingCost.data[0].usd_to_bdt_rate;
        this.crushingCostData.total_all_dutys =
          this.itemCrushingCost.data[0].total_all_dutys;
        this.crushingCostData.total_bdt =
          this.itemCrushingCost.data[0].total_bdt;
        this.crushingCostData.final_rate =
          this.itemCrushingCost.data[0].final_rate;
      }
    },
  },
  computed: {
    ...mapGetters({
      itemCrushingCost: GETTERS.LC.itemCrushingCost,
    }),
  },

  methods: {
    ...mapActions({
      createItemCrushingCost: ACTIONS.LC.CREATE_ITEM_CRUSHING_COST,
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

    addItemCrushingCost() {
      Swal.fire({
        title: "Creating New Item Crushing Cost",
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
                      this.createNewItemCrushingCost();
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

    async createNewItemCrushingCost() {
      const data = JSON.parse(JSON.stringify(this.crushingCostData));

      this.createItemCrushingCost(data)
        .then(() => {
          this.loading = false;

          Swal.fire({
            text: "Item Crushing Cost added successfully!",
            icon: "success",
            buttonsStyling: true,
            confirmButtonText: "Ok",
          }).then(() => {
            this.resetForm();
            hideModal(this.addCrushingCost);
          });
        })
        .catch((e) => {
          Object.keys(e["validation_error"]).forEach((key) => {
            e["validation_error"][key].forEach((val) => {
              Object.keys(this.rules).forEach((key1) => {
                if (key1 == key) {
                  JSON.parse(JSON.stringify(this.rules[key1])).forEach(
                    (val3) => {
                      if (val3["required"]) {
                        val3["message"] = val;
                        this.errorMsg.lc_id = val;
                      }
                    }
                  );
                }
              });
            });
          });
          this.showErrorMsg();
        });
    },
  },
});
</script>
