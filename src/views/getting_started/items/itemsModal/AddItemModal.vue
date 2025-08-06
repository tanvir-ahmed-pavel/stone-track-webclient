<template>
  <div
    class="modal fade"
    id="modal_add_item"
    ref="addItemModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_add_item_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add an Item</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_add_item_close"
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
        <el-form :model="itemData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_add_item_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_add_item_header"
              data-kt-scroll-wrappers="#modal_add_item_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--              Name - Group-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Item Code</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="item_code">
                    <el-input
                      v-model="itemData.item_code"
                      type="text"
                      placeholder="Enter item code"
                    />
                    <div
                      v-if="
                        itemData.item_code != '' && errorMsg.item_code != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.item_code }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Item Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="item_name">
                    <el-input
                      v-model="itemData.item_name"
                      type="text"
                      placeholder="Enter item name"
                    />
                    <div
                      v-if="
                        itemData.item_name != '' && errorMsg.item_name != ''
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
                    <el-select
                      @change="setFixedAsset"
                      v-model="itemData.item_group_id"
                    >
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
                        itemData.item_group_id != '' &&
                        errorMsg.item_group_id != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.item_group_id }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Selling Price</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="selling_price">
                    <el-input
                      :disabled="isFixedSpare"
                      v-model="itemData.selling_price"
                      type="number"
                      placeholder="Enter selling price"
                    />
                    <div
                      v-if="
                        itemData.selling_price != '' &&
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
                    <el-select v-model="itemData.uom_id">
                      <el-option value="">Select a Uom...</el-option>
                      <el-option
                        v-for="uom in lookupData.uom"
                        :value="uom.id"
                        :label="uom.uom_name"
                        :key="uom.id"
                      ></el-option>
                    </el-select>
                    <div
                      v-if="itemData.uom_id != '' && errorMsg.uom_id != ''"
                      class="el-form-item__error"
                    >
                      {{ errorMsg.uom_id }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    {{
                      isFixedSpare ? "Stock Quantity" : "Opening Stock Quantity"
                    }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="opening_stock_qty">
                    <el-input
                      v-model="itemData.opening_stock_qty"
                      type="number"
                      :placeholder="`Enter ${
                        isFixedSpare ? '' : 'opening'
                      } stock quantity`"
                    />
                    <div
                      v-if="
                        itemData.opening_stock_qty != '' &&
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
                    {{
                      isFixedSpare
                        ? "Unit Price"
                        : "Opening Item Purchase Price"
                    }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item
                    size="small"
                    prop="opening_stock_unit_purchase_price"
                  >
                    <el-input
                      v-model="itemData.opening_stock_unit_purchase_price"
                      type="number"
                      :placeholder="`Enter ${
                        isFixedSpare ? 'Unit' : 'Opening Item Purchase'
                      } Price`"
                    />
                    <div
                      v-if="
                        itemData.opening_stock_unit_purchase_price != '' &&
                        errorMsg.opening_stock_unit_purchase_price != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.opening_stock_unit_purchase_price }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold">
                    <span class="">Item Status</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item size="small" prop="item_status">
                    <el-switch
                      v-model="itemData.item_status"
                      inline-prompt
                      :active-value="1"
                      :inactive-value="0"
                      active-text="Enabled"
                      inactive-text="Disabled"
                    ></el-switch>
                    <div
                      v-if="
                        itemData.item_status != '' && errorMsg.item_status != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.item_status }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-bold">
                    <span>Is fixed asset?</span>
                  </label>
                  <!--begin::Input-->
                  <el-form-item size="small" prop="is_fixed_asset">
                    <el-switch
                      v-model="itemData.is_fixed_asset"
                      inline-prompt
                      :disabled="isFixedSpare"
                      :active-value="1"
                      :inactive-value="0"
                      active-text="Yes"
                      inactive-text="No"
                    ></el-switch>
                    <div
                      v-if="
                        itemData.is_fixed_asset != '' &&
                        errorMsg.is_fixed_asset != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.is_fixed_asset }}
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div
                  class="col-md-6 fv-row"
                  v-if="isFixedSpare || itemData.is_fixed_asset"
                >
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2 required">
                    Fixed Asset Account
                  </label>
                  <!--end::Label-->

                  <el-form-item
                    :rules="{
                      required: true,
                      message: 'Please Select a Account From the list',
                    }"
                    size="small"
                    prop="fixed_asses_account_id"
                  >
                    <el-select v-model="itemData.fixed_asses_account_id">
                      <el-option value="">Select a Account...</el-option>
                      <el-option
                        v-for="item in fixedAssetAccList.original"
                        :value="item.id"
                        :label="item.account_head_name"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                    <div
                      v-if="
                        itemData.fixed_asses_account_id != '' &&
                        errorMsg.fixed_asses_account_id != ''
                      "
                      class="el-form-item__error"
                    >
                      {{ errorMsg.fixed_asses_account_id }}
                    </div>
                  </el-form-item>
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
              @click.prevent="addItem"
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
import { defineComponent, ref, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";

export default defineComponent({
  name: "add-item-modal",
  components: {},

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addItemModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const errorMsg = ref({
      item_name: "",
      item_group_id: "",
      uom_id: "",
      selling_price: "",
      is_fixed_asset: "",
      opening_stock_qty: "",
      item_status: "",
      opening_stock_unit_purchase_price: "",
    });

    const isFixedSpare = computed(() => {
      if (
        itemData.value.item_group_id == "5" ||
        itemData.value.item_group_id == "6"
      ) {
        return true;
      }
      return false;
    });

    const setFixedAsset = () => {
      itemData.value.is_fixed_asset = isFixedSpare.value ? 1 : 0;
      itemData.value.selling_price = isFixedSpare.value ? 0 : 0;
    };

    const isOpeningStock = computed(() => {
      if (itemData.value.opening_stock_qty) {
        return true;
      }
      return false;
    });

    const rules = ref({
      item_name: [
        {
          required: true,
          message: "Item name is required",
          trigger: "change",
        },
      ],
      item_code: [
        {
          required: true,
          message: "Item code is required",
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
      item_status: [
        {
          required: true,
          message: "Item status is required",
          trigger: "change",
        },
      ],
      is_fixed_asset: [
        {
          required: true,
          message: "Fixed asset is required",
          trigger: "change",
        },
      ],

      opening_stock_unit_purchase_price: [
        {
          required: isOpeningStock,
          message: "Opening Item Purchase Price is required",
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

    const itemData = ref({
      item_name: "",
      item_code: "",
      item_group_id: "",
      uom_id: "",
      selling_price: 0,
      is_fixed_asset: 0,
      opening_stock_qty: "",
      item_status: 1,
      opening_stock_unit_purchase_price: "",
      fixed_asses_account_id: "",
    });

    return {
      rules,
      formRef,
      loading,
      errorMsg,
      addItemModalRef,
      itemData,
      isFixedSpare,
      setFixedAsset,
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
    return {};
  },
  watch:{
    "itemData.is_fixed_asset"(newValue){
      if (newValue == 0){
        this.itemData.fixed_asses_account_id = "";
      }
    }
  },
  computed: {
    ...mapGetters({
      itemTypes: GETTERS.ITEM.itemTypes,
      fixedAssetAccList: GETTERS.ACCOUNT.fixedAssetAccList,
      lookupData: GETTERS.LOOKUP_DATA.lookupData,
    }),
  },

  methods: {
    ...mapActions({
      createItem: ACTIONS.ITEM.CREATE_ITEM,
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

    addItem() {
      Swal.fire({
        title: "Creating New Item",
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
                      this.createNewItem();
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

    async createNewItem() {
      this.loading = true;

      const data = JSON.parse(JSON.stringify(this.itemData));

      var msg = await this.createItem(data);

      this.loading = false;

      if (msg == "success") {
        Swal.fire({
          text: "Item added successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.resetForm();
          hideModal(this.addItemModalRef);
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
