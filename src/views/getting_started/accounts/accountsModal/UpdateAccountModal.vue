<template>
  <div
    class="modal fade"
    id="modal_update_account"
    ref="updateAccountModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_update_account_header">
          <!--begin::Modal title-->
          <h2 v-if="isView" class="fw-bolder">View Account</h2>
          <h2 v-else class="fw-bolder">Edit Account</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_update_account_close"
            @click="hide"
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
        <el-form
          :model="accountData"
          :rules="rules"
          ref="formRef"
          v-loading="loading"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="modal_update_account_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_update_account_header"
              data-kt-scroll-wrappers="#modal_update_account_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--              Account Name && Parent Account-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-7 fw-bold mb-1">Account Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item
                    class="mb-4"
                    size="small"
                    prop="account_head_name"
                  >
                    <el-input
                      :readonly="isView"
                      v-model="accountData.account_head_name"
                      type="text"
                      placeholder="Enter account name"
                    />
                    <div
                      v-if="
                        accountData.account_head_name != '' &&
                        errorMsgs.account_head_name != ''
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.account_head_name"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Parent Account-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-1">
                    <span class="required">Parent Account</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item class="mb-4" size="small" prop="parent_id">
                    <el-input
                      readonly
                      :model-value="data.parent_name"
                      type="text"
                      placeholder="Parent Account"
                    />
                    <div
                      v-if="
                        accountData.parent_id != '' && errorMsgs.parent_id != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsgs.parent_id" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                    <div
                      v-if="
                        accountData.parent_id != '' && errorMsgs.parent_id != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsgs.parent_id" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Account Type && Root Type-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-1">
                    <span class="required">Account Type</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item
                    class="mb-4"
                    size="small"
                    prop="account_type_id"
                  >
                    <el-select
                      :disabled="isView"
                      v-model="accountData.account_type_id"
                      filterable
                      placeholder="Select an Account Type..."
                    >
                      <el-option
                        v-for="account_type in account_type_list"
                        :value="account_type.id"
                        :label="account_type.account_type_name"
                        :key="account_type.id"
                      ></el-option>
                    </el-select>
                    <div
                      v-if="
                        accountData.account_type_id != '' &&
                        errorMsgs.account_type_id != ''
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.account_type_id"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <!--                Root type-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-1">
                    <span class="required">Root Account</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item class="mb-4" size="small" prop="root_type">
                    <el-input
                      readonly
                      :model-value="accountData.root_type"
                      type="text"
                      placeholder="Root Name"
                    />
                    <div
                      v-if="
                        accountData.root_type != '' && errorMsgs.root_type != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsgs.parent_id" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                    <div
                      v-if="
                        accountData.root_type != '' && errorMsgs.root_type != ''
                      "
                      class="el-form-item__error"
                    >
                      <div v-for="errMsg in errorMsgs.root_type" :key="errMsg">
                        {{ errMsg }}
                      </div>
                    </div>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <!--end::Input group-->

              <!--              Render Data if Type is Bank-->

              <div v-show="accountData.account_type_id == 1">
                <!--              Bank Name-->
                <!--begin::Input group-->
                <!--begin::Col-->
                <div class="row g-9">
                  <div class="col-md-12 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-7 fw-bold mb-1">Bank Name</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item
                      class="mb-4"
                      size="small"
                      prop="bank_account_head_name"
                      :rules="{
                        required: accountData.account_type_id == 1,
                        message: 'Bank name is required',
                        trigger: 'change',
                      }"
                    >
                      <el-input
                        :readonly="isView"
                        v-model="accountData.bank_account_head_name"
                        type="text"
                        placeholder="Enter bank name"
                      />
                      <div
                        v-if="
                          accountData.bank_account_head_name != '' &&
                          errorMsgs.bank_account_head_name != ''
                        "
                        class="el-form-item__error"
                      >
                        <div
                          v-for="errMsg in errorMsgs.bank_account_head_name"
                          :key="errMsg"
                        >
                          {{ errMsg }}
                        </div>
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Input group-->

                <!--              Account Number && Branch -->
                <!--begin::Input group-->
                <!--begin::Col-->
                <div class="row g-9">
                  <!--                Account Number -->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-7 fw-bold mb-1"
                      >Account Number</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item
                      class="mb-4"
                      size="small"
                      prop="account_number"
                      :rules="{
                        required: accountData.account_type_id == 1,
                        message: 'Account number is required',
                        trigger: 'change',
                      }"
                    >
                      <el-input
                        :readonly="isView"
                        v-model="accountData.account_number"
                        type="text"
                        placeholder="Enter account number"
                      />
                      <div
                        v-if="
                          accountData.account_number != '' &&
                          errorMsgs.account_number != ''
                        "
                        class="el-form-item__error"
                      >
                        <div
                          v-for="errMsg in errorMsgs.account_number"
                          :key="errMsg"
                        >
                          {{ errMsg }}
                        </div>
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>

                  <!--                Branch-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-7 fw-bold mb-1">Branch</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item
                      class="mb-4"
                      size="small"
                      prop="branch"
                      :rules="{
                        required: accountData.account_type_id == 1,
                        message: 'Branch name is required',
                        trigger: 'change',
                      }"
                    >
                      <el-input
                        :readonly="isView"
                        v-model="accountData.branch"
                        type="text"
                        placeholder="Enter branch"
                      />
                      <div
                        v-if="
                          accountData.branch != '' && errorMsgs.branch != ''
                        "
                        class="el-form-item__error"
                      >
                        <div v-for="errMsg in errorMsgs.branch" :key="errMsg">
                          {{ errMsg }}
                        </div>
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Input group-->

                <!--              Account Routing && SWIFT -->
                <!--begin::Input group-->
                <!--begin::Col-->
                <div class="row g-9">
                  <!--                Routing -->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-7 fw-bold mb-1">Account Routing No.</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item
                      class="mb-4"
                      size="small"
                      prop="routing_number"
                    >
                      <el-input
                        :readonly="isView"
                        v-model="accountData.routing_number"
                        type="text"
                        placeholder="Enter account routing number"
                      />
                      <div
                        v-if="
                          accountData.routing_number != '' &&
                          errorMsgs.routing_number != ''
                        "
                        class="el-form-item__error"
                      >
                        <div
                          v-for="errMsg in errorMsgs.routing_number"
                          :key="errMsg"
                        >
                          {{ errMsg }}
                        </div>
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>

                  <!--                SWIFT-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-7 fw-bold mb-1">SWIFT Code</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item class="mb-4" size="small" prop="swift_code">
                      <el-input
                        :readonly="isView"
                        v-model="accountData.swift_code"
                        type="text"
                        placeholder="Enter Swift Code"
                      />
                      <div
                        v-if="
                          accountData.swift_code != '' &&
                          errorMsgs.swift_code != ''
                        "
                        class="el-form-item__error"
                      >
                        <div
                          v-for="errMsg in errorMsgs.swift_code"
                          :key="errMsg"
                        >
                          {{ errMsg }}
                        </div>
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Input group-->
              </div>

              <!--              Account Status-->
              <!--begin::Input group-->
              <!--begin::Col-->
              <div class="row g-9">
                <!--                Account Status-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-7 fw-bold mb-0">
                    <span class="">Account Status</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item class="mb-4" size="small" prop="account_status">
                    <el-switch
                      :disabled="isView"
                      v-model="accountData.account_status"
                      inline-prompt
                      :active-value="1"
                      :inactive-value="0"
                      active-text="Enabled"
                      inactive-text="Disabled"
                    ></el-switch>
                    <div
                      v-if="
                        accountData.account_status != '' &&
                        errorMsgs.account_status != ''
                      "
                      class="el-form-item__error"
                    >
                      <div
                        v-for="errMsg in errorMsgs.account_status"
                        :key="errMsg"
                      >
                        {{ errMsg }}
                      </div>
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
              v-if="!isView"
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-sm btn-primary"
              @click.prevent="submit"
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
              class="btn btn-sm btn-danger"
              @click="hide"
              @click.prevent="resetForm"
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
import { computed, defineComponent, ref, watch } from "vue";
import { hideModal, newHideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import store from "@/store";

export default defineComponent({
  name: "update-account-modal",
  components: {},
  props: {
    data: Object,
    isView: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateAccountModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(true);
    const accountData = ref({});
    store.dispatch(ACTIONS.ACCOUNT.FETCH_ACCOUNT, props.data!.id).then(() => {
      accountData.value = store.getters[GETTERS.ACCOUNT.account];
      loading.value = false;
    });

    const hide = () => {
      loading.value = true;
      // for (const key in accountData.value) {
      //   accountData.value[key] = "";
      // }
      hideModal(updateAccountModalRef.value);
      loading.value = false;
    };

    // watch for prop change
    watch(
      () => props.data!.id,
      () => {
        loading.value = true;
        store
          .dispatch(ACTIONS.ACCOUNT.FETCH_ACCOUNT, props.data!.id)
          .then(() => {
            accountData.value = store.getters[GETTERS.ACCOUNT.account];
            loading.value = false;
          });
        // setPropData();
      }
    );
    // Look up data for account type
    const account_type_list = computed(() => {
      return store.getters[GETTERS.LOOKUP_DATA.chartOfAccountType];
    });

    // Load account list for parent account dropdown
    const account_list = computed(() => {
      return store.getters[GETTERS.ACCOUNT.accountList];
    });

    // Backend validation error model
    const errorMsgs = ref({});

    // Front End Validation Rules
    const rules = ref({
      account_head_name: [
        {
          required: true,
          message: "Account name is required",
          trigger: "change",
        },
      ],

      account_status: [
        {
          required: true,
          message: "Define an account status",
          trigger: "change",
        },
      ],
      parent_id: [
        {
          required: props.isView,
          message: "Parent account is required",
          trigger: "change",
        },
      ],
      account_type_id: [
        {
          required: true,
          message: "Account type is required",
          trigger: "change",
        },
      ],
      is_default: [
        {
          required: true,
          message: "Define a default state",
          trigger: "change",
        },
      ],
    });

    // Form Submit
    const submit = () => {
      // Confirmation Modal
      Swal.fire({
        title: "Updating Account",
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

              setTimeout( () => {
                // Send Account create request to store
                store
                  .dispatch(ACTIONS.ACCOUNT.EDIT_ACCOUNT, {
                    data: accountData.value,
                    id: props.data!.id,
                  })
                  .then(async () => {
                    await store.dispatch(ACTIONS.ACCOUNT.FETCH_ACCOUNT_LIST);
                    loading.value = false;
                    // Success Modal
                    Swal.fire({
                      text: "Account updated successfully!",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn btn-primary",
                      },
                    }).then(() => {
                      // Reset and hide modal on success
                      resetForm();
                      hideModal(updateAccountModalRef.value);
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
      // setPropData();
      errorMsgs.value = {};
    };

    return {
      // Form setup
      rules,
      formRef,
      loading,
      resetForm,
      submit,
      updateAccountModalRef,
      hide,
      accountData,

      // Backend Validation
      errorMsgs,

      // Model/ Essential Data
      // accountData,
      account_type_list,
      account_list,
    };
  },
});
</script>
