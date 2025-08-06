<template>
  <div
    class="modal fade"
    id="modal_add_po_truck_loading"
    ref="addPoTruckLoadingModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered" style="min-width: 1200px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">PO Truck Loading</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_add_po_truck_loading_close"
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
        <el-form :model="truckLoadingData" ref="formRef" class="form">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div>
              <!--        show item-->

              <table class="table table-sm">
                <thead>
                  <tr class="fw-bold fs-5">
                    <th scope="col">No.</th>
                    <th class="required" scope="col" style="min-width: 150px">
                      Item
                    </th>
                    <th class="required" scope="col">Date</th>
                    <th class="required" scope="col">Truck No.</th>
                    <th class="required" scope="col">Loading Quantity</th>
                    <th class="text-end" scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in truckLoadingData" :key="index">
                    <!--            INDEX-->
                    <th class="align-middle fw-bold fs-5" scope="row">
                      {{ index + 1 + "." }}
                    </th>

                    <!--            Item-->
                    <td>
                      <el-form-item
                        class="mb-0"
                        :prop="index + '.item_id'"
                        :rules="{
                          required: true,
                          message: 'Please select an item from the list',
                          trigger: ['blur'],
                        }"
                      >
                        <el-select
                          size="small"
                          fit-input-width
                          v-model="item.item_id"
                          filterable
                          placeholder="Select an item"
                        >
                          <el-option
                            v-for="item in data[0].poItems"
                            :key="item.item_id"
                            :label="item.item_name"
                            :value="item.item_id"
                          />
                        </el-select>
                      </el-form-item>
                    </td>

                    <!--            Date-->
                    <td>
                      <el-form-item
                        class="mb-0"
                        :prop="index + '.loading_date'"
                        :rules="{
                          required: true,
                          message: 'Please enter a loading date',
                          trigger: ['blur'],
                        }"
                      >
                        <el-date-picker
                          size="small"
                          format="YYYY/MM/DD"
                          value-format="YYYY-MM-DD"
                          v-model="item.loading_date"
                          type="date"
                          placeholder="Loading date"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </td>

                    <!--            Truck Number-->
                    <td>
                      <el-form-item
                        class="mb-0"
                        :prop="index + '.truck_no'"
                        :rules="{
                          required: true,
                          message: 'Please enter a truck no.',
                          trigger: 'blur',
                        }"
                      >
                        <el-input
                          size="small"
                          @submit.prevent
                          :input-style="{
                            'max-width': '200px',
                          }"
                          placeholder="Please enter a truck no."
                          v-model="item.truck_no"
                        />
                      </el-form-item>
                    </td>

                    <!--            Quantity-->
                    <td>
                      <el-form-item
                        class="mb-0"
                        :prop="index + '.loading_quantity'"
                        :rules="{
                          required: true,
                          type: 'number',
                          min: 0.001,
                          message: 'Please enter Quantity',
                          trigger: 'blur',
                        }"
                      >
                        <el-input-number
                          :controls="false"
                          size="small"
                          v-model="item.loading_quantity"
                          :precision="3"
                          :min="0.0"
                          :step="1"
                        />
                      </el-form-item>
                    </td>

                    <!--            Action-->
                    <td class="text-end">
                      <button
                        :disabled="truckLoadingData.length < 2"
                        type="button"
                        style="font-family: 'Helvetica Neue', 'Helvetica'"
                        class="btn btn-light-danger btn-sm"
                        @click="removeRow(item)"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--        Button for Add item-->
              <div class="mt-3">
                <button
                  type="button"
                  style="font-family: 'Helvetica Neue', 'Helvetica'"
                  class="btn btn-light-primary btn-sm"
                  @click="addRow"
                >
                  Add Row
                </button>
              </div>
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
              @click.prevent="submit"
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
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import store from "@/store";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "add-po-truck-loading-modal",
  components: {},

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addPoTruckLoadingModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const route = useRoute();

    // ******* All Data and Model ******
    // *******  ******  *******  ******  *******  ****** *******
    const truckLoadingData = ref([
      {
        po_id: route.params.po_id,
        item_id: "",
        loading_date: new Date().toISOString().substr(0, 10),
        loading_quantity: 0,
        truck_no: "",
      },
    ]);

    // ******* Add and Remove Items Row ******
    // *******  ******  *******  ******  *******  ****** *******

    // Add Item Row
    const addRow = () => {
      const row = {
        po_id: route.params.po_id,
        item_id: "",
        loading_date: new Date().toISOString().substr(0, 10),
        loading_quantity: 0,
        truck_no: "",
      };
      truckLoadingData.value.push(row);
    };

    // Remove Item Row
    const removeRow = (item) => {
      truckLoadingData.value.splice(truckLoadingData.value.indexOf(item), 1);
    };

    // ******* Form Submission, Validation and Rest ******
    // *******  ******  *******  ******  *******  ****** *******

    // Model for Backend Validation
    const errorMsgs = ref({});

    // Form Submit
    const submit = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Creating New Po Truck Loading",
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
                // Send Po Truck Loading create request to store
                store
                  .dispatch(
                    ACTIONS.PO_TRUCK_LOADING.CREATE_PO_TRUCK_LOADING,
                    truckLoadingData.value
                  )
                  .then(() => {
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "Po Truck Loading created successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset and hide modal on success
                      resetForm();
                      hideModal(addPoTruckLoadingModalRef.value);
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
      formRef.value.resetFields();
      errorMsgs.value = {};
    };

    return {
      // Validation and Initial setup
      formRef,
      addPoTruckLoadingModalRef,
      loading,

      // Submit and Reset
      resetForm,
      submit,

      // All Model/ Data Values
      truckLoadingData,

      // Item Add & Remove & Amount
      addRow,
      removeRow,
    };
  },

  computed: {
    ...mapGetters({
      data: GETTERS.PO_TRUCK_LOADING.poTruckLoadingQuantity,
    }),
  },
});
</script>
