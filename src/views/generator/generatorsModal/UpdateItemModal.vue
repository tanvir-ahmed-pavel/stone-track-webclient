<template>
  <div
    class="modal fade"
    id="modal_update_item"
    ref="updateItemModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_update_item_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Edit an Item</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_update_item_close"
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
        <el-form :model="itemEditData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_update_item_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_update_item_header"
              data-kt-scroll-wrappers="#modal_update_item_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--              Name - Group-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Item Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="item_name">
                    <el-input
                      v-model="itemEditData.item_name"
                      type="text"
                      placeholder="Enter item name"
                    />
                    <div
                      v-if="
                        itemEditData.item_name != '' && errorMsg.item_name != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.item_name }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Item Group</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="item_group_id">
                    <el-select v-model="itemEditData.item_group_id">
                      <el-option value="">Select a Group...</el-option>
                      <el-option
                        v-for="itemGroup in lookupData.itemGroup"
                        :value="itemGroup.id"
                        :label="itemGroup.item_group_name"
                        :key="itemGroup.id"
                      ></el-option>
                    </el-select>
                    <div
                      v-if="
                        itemEditData.item_group_id != '' &&
                        errorMsg.item_group_id != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.item_group_id }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Selling Price - UOM-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Selling Price</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="selling_price">
                    <el-input
                      v-model="itemEditData.selling_price"
                      type="number"
                      placeholder="Enter selling price"
                    />
                    <div
                      v-if="
                        itemEditData.selling_price != '' &&
                        errorMsg.selling_price != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.selling_price }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Unit of measure</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="uom_id">
                    <el-select v-model="itemEditData.uom_id">
                      <el-option value="">Select a Uom...</el-option>
                      <el-option
                        v-for="uom in lookupData.uom"
                        :value="uom.id"
                        :label="uom.uom_name"
                        :key="uom.id"
                      ></el-option>
                    </el-select>
                    <div
                      v-if="itemEditData.uom_id != '' && errorMsg.uom_id != ''"
                      class="el-form-item__error"
                    >
                      {{ errorMsg.uom_id }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Opening Stock - Item Status-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    Opening Stock Quantity
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="opening_stock_qty">
                    <el-input
                      v-model="itemEditData.opening_stock_qty"
                      type="number"
                      placeholder="Enter opening stock quantity"
                    />
                    <div
                      v-if="
                        itemEditData.opening_stock_qty != '' &&
                        errorMsg.opening_stock_qty != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.opening_stock_qty }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="">Item Status</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="item_status">
                    <el-switch
                      v-model="itemEditData.item_status"
                      inline-prompt
                      :active-value="1"
                      :inactive-value="0"
                      active-text="Enabled"
                      inactive-text="Disabled"
                    ></el-switch>
                    <div
                      v-if="
                        itemEditData.item_status != '' &&
                        errorMsg.item_status != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.item_status }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Is Fixed Asset?-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-3 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mt-3">
                    <span>Is fixed asset?</span>
                  </label>
                  <!--end::Label-->
                </div>

                <div class="col-md-3 fv-row">
                  <!--begin::Input-->
                  <el-form-item size="small" prop="is_fixed_asset">
                    <el-switch
                      v-model="itemEditData.is_fixed_asset"
                      inline-prompt
                      :active-value="1"
                      :inactive-value="0"
                      active-text="Yes"
                      inactive-text="No"
                    ></el-switch>
                    <div
                      v-if="
                        itemEditData.is_fixed_asset != '' &&
                        errorMsg.is_fixed_asset != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.is_fixed_asset }}
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
              @click.prevent="editItemInfo"
            >
              <!-- type="submit" -->
              <span v-if="!loading" class="indicator-label">
                Update
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
              @click.prevent="setData(JSON.parse(JSON.stringify(data)))"
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
  name: "update-item-modal",
  components: {},
  props: {
    data: { type: Object, required: true },
  },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateItemModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      item_name: "",
      item_group_id: "",
      uom_id: "",
      selling_price: "",
      is_fixed_asset: "",
      opening_stock_qty: "",
      item_status: "",
    });

    const rules = ref({
      item_name: [
        {
          required: true,
          message: "Item name is required",
          trigger: "change",
        },
      ],
      uom_id: [
        {
          required: true,
          message: "Unit of measure is required",
          trigger: "change",
        },
      ],
      item_group_id: [
        {
          required: true,
          message: "Item group is required",
          trigger: "change",
        },
      ],
      selling_price: [
        {
          required: true,
          message: "Define a selling price",
          trigger: "change",
        },
      ],
    });

    return {
      rules,
      formRef,
      loading,
      errorMsg,
      updateItemModalRef,

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
      itemEditData: {
        id: "",
        item_name: "",
        item_group_id: "",
        uom_id: "",
        selling_price: "",
        is_fixed_asset: 0,
        opening_stock_qty: "",
        item_status: 1,
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
      itemTypes: GETTERS.ITEM.itemTypes,
      lookupData: GETTERS.LOOKUP_DATA.lookupData,
    }),
  },

  methods: {
    setData(data) {
      this.itemEditData.id = data.id;
      this.itemEditData.item_name = data.item_name;
      this.itemEditData.item_group_id = data.group.id;
      this.itemEditData.uom_id = data.uom.id;
      this.itemEditData.selling_price = data.selling_price;
      this.itemEditData.is_fixed_asset = data.is_fixed_asset;
      this.itemEditData.opening_stock_qty = data.opening_stock_qty;
    },
    ...mapActions({
      editItem: ACTIONS.ITEM.EDIT_ITEM,
    }),

    resetForm() {
      Object.keys(this.itemEditData).forEach((val) => {
        this.itemEditData[val] = "";
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

    editItemInfo() {
      Swal.fire({
        title: "Updating Item Information",
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
                      this.updateItem();
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

    async updateItem() {
      const data = JSON.parse(JSON.stringify(this.itemEditData));

      var msg = await this.editItem(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Item added successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.resetForm();
          hideModal(this.updateItemModalRef);
        });
      } else if (Object.keys(msg["validation_error"]).length > 0) {
        Object.keys(msg["validation_error"]).forEach((key) => {
          msg["validation_error"][key].forEach((val) => {
            Object.keys(this.rules).forEach((key1) => {
              if (key1 == key) {
                JSON.parse(JSON.stringify(this.rules[key1])).forEach((val3) => {
                  if (val3["required"]) {
                    val3["message"] = val;
                    this.errorMsg.item_name = val;
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
