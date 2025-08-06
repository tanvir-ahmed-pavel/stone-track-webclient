<template>
  <div
    class="modal fade"
    id="modal_update_po_truck_loading"
    ref="receivePoTruckLoadingModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered" style="min-width: 1300px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_update_po_truck_loading_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Receive PO Truck Loading</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_update_po_truck_loading_close"
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
        <el-form :model="updatePoTruckLoadingData" ref="formRef" :rules="rules">
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
              <table class="table table-sm" style="margin-bottom: 30px">
                <thead>
                  <tr class="fw-bold fs-5">
                    <th scope="col">No.</th>
                    <th class="required" scope="col" style="min-width: 150px">
                      Item
                    </th>
                    <th class="required" scope="col">Loading Date</th>
                    <th class="required" scope="col">Truck No.</th>
                    <th class="required" scope="col">Loading Quantity</th>
                    <th class="required" scope="col">Receive Date</th>
                    <th class="required" scope="col">Receive Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <!--            INDEX-->
                    <th class="align-middle fw-bold fs-5" scope="row">
                      {{ "1." }}
                    </th>

                    <!--            Item-->
                    <td>
                      <el-form-item class="mb-0" prop="item_id">
                        <el-select
                          fit-input-width
                          v-model="updatePoTruckLoadingData.item_id"
                          filterable
                          placeholder="Select an item"
                        >
                          <el-option
                            v-for="item in itemData[0].poItems"
                            :key="item.item_id"
                            :label="item.item_name"
                            :value="item.item_id"
                          />
                        </el-select>
                      </el-form-item>
                    </td>

                    <!--            Loading Date-->
                    <td>
                      <el-form-item class="mb-0" prop="loading_date">
                        <el-date-picker
                          format="YYYY/MM/DD"
                          value-format="YYYY-MM-DD"
                          style="max-width: 170px"
                          v-model="updatePoTruckLoadingData.loading_date"
                          type="date"
                          placeholder="Loading date"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </td>

                    <!--            Truck Number-->
                    <td>
                      <el-form-item class="mb-0" prop="truck_no">
                        <el-input
                          :input-style="{
                            'min-width': '150px',
                          }"
                          placeholder="Please enter a truck no."
                          v-model="updatePoTruckLoadingData.truck_no"
                        />
                      </el-form-item>
                    </td>

                    <!--            Loading Quantity-->
                    <td>
                      <el-form-item class="mb-0" prop="loading_quantity">
                        <el-input-number
                          v-model="updatePoTruckLoadingData.loading_quantity"
                          :precision="3"
                          :min="0.0"
                          :step="1"
                          :controls="false"
                        />
                      </el-form-item>
                    </td>

                    <!--            Receive Date-->
                    <td>
                      <el-form-item class="mb-0" prop="receive_date">
                        <el-date-picker
                          format="YYYY/MM/DD"
                          value-format="YYYY-MM-DD"
                          style="max-width: 170px"
                          v-model="updatePoTruckLoadingData.receive_date"
                          type="date"
                          placeholder="Receive date"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </td>

                    <!--            Receive Quantity-->
                    <td>
                      <el-form-item class="mb-0" prop="receive_quantity">
                        <el-input-number
                          v-model="updatePoTruckLoadingData.receive_quantity"
                          :precision="3"
                          :min="0.0"
                          :step="1"
                          :controls="false"
                        />
                      </el-form-item>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                @click.prevent="submit"
              >
                <!-- type="submit" -->
                <span v-if="!loading" class="indicator-label">
                  Receive
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
          </div>
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import store from "@/store";
import { mapGetters } from "vuex";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "update-po-truck-loading",
  components: {},
  props: {
    data: { type: Object, required: true },
  },
  setup(props) {
    const formRef = ref<null | HTMLFormElement>(null);
    const receivePoTruckLoadingModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const route = useRoute();

    // Initiate Model with edit data from props
    const updatePoTruckLoadingData = ref({
      po_id: route.params.po_id,
      item_id: props.data.item_id,
      loading_date: props.data.loading_date,
      loading_quantity: props.data.loading_quantity,
      truck_no: props.data.truck_no,
      receive_quantity: props.data.receive_quantity
        ? props.data.receive_quantity
        : 0,
      receive_date: props.data.receive_date
        ? props.data.receive_date
        : new Date().toISOString().substr(0, 10),
    });

    const setPropData = () => {
      updatePoTruckLoadingData.value.po_id = route.params.po_id;
      updatePoTruckLoadingData.value.item_id = props.data.item_id;
      updatePoTruckLoadingData.value.loading_date = props.data.loading_date;
      updatePoTruckLoadingData.value.loading_quantity =
        props.data.loading_quantity;
      updatePoTruckLoadingData.value.truck_no = props.data.truck_no;
      updatePoTruckLoadingData.value.receive_quantity = props.data
        .receive_quantity
        ? props.data.receive_quantity
        : 0;
      updatePoTruckLoadingData.value.receive_date = props.data.receive_date
        ? props.data.receive_date
        : new Date().toISOString().substr(0, 10);
    };
    // watch for prop change
    watch(
      () => props.data,
      () => {
        setPropData();
      }
    );

    // Front End Validation Rules
    const rules = ref({
      item_id: [
        {
          required: true,
          message: "Please select a item from the list",
          trigger: ["change", "blur"],
        },
      ],
      loading_date: [
        {
          required: true,
          message: "Please enter a loading date",
          trigger: ["change", "blur"],
        },
      ],
      truck_no: [
        {
          required: true,
          message: "Please enter a truck no.",
          trigger: ["change", "blur"],
        },
      ],
      loading_quantity: [
        {
          required: true,
          type: "number",
          min: 0.01,
          message: "Please enter loading Quantity",
          trigger: ["change", "blur"],
        },
      ],
      receive_date: [
        {
          required: true,
          message: "Please enter a receive date",
          trigger: ["change", "blur"],
        },
      ],
      receive_quantity: [
        {
          required: true,
          type: "number",
          min: 0.01,
          message: "Please enter receive Quantity",
          trigger: ["blur"],
        },
      ],
    });

    // Backend validation error model
    const errorMsgs = ref({});

    // Form Submit
    const submit = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Receive PO Truck Loading",
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
                // Send PO Truck Loading create request to store
                store
                  .dispatch(ACTIONS.PO_TRUCK_LOADING.EDIT_PO_TRUCK_LOADING, {
                    data: updatePoTruckLoadingData.value,
                    id: props.data.id,
                  })
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "PO Truck Loading Received successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset and hide modal on success
                      resetForm();
                      hideModal(receivePoTruckLoadingModalRef.value);
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
      formRef,
      loading,
      resetForm,
      submit,
      receivePoTruckLoadingModalRef,
      // Frontend & Backend Validation
      rules,
      errorMsgs,

      // Model/ Essential Data
      updatePoTruckLoadingData,
    };
  },

  computed: {
    ...mapGetters({
      itemData: GETTERS.PO_TRUCK_LOADING.poTruckLoadingQuantity,
    }),
  },
});
</script>
