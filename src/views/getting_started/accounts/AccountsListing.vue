<template>
  <!--  Title and Buttons-->
  <TitleAndButtons title="Account Listing"> </TitleAndButtons>

  <div class="card shadow-sm" v-loading="loading">
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title"></div>
      <!--begin::Card title-->
    </div>
    <div class="card-body pt-0">
      <TreeComponent
        @clicked="addChild"
        @clicked-edit="loadEdit($event)"
        @clicked-view="loadView($event)"
        @clicked-delete="accountDelete($event)"
        v-for="(item, index) in accountList"
        :label="item.account_head_name"
        :balance="item.balance"
        :is_default="item.is_default"
        :children="item.children"
        :node="{
          id: item.id,
          parent_name: item.parent_name,
          self_parent: item.account_head_name,
          root_type: item.root_type,
          parent_id: item.parent_id,
        }"
        v-bind:key="index"
      ></TreeComponent>
    </div>
  </div>

  <AddAccountModal ref="addAccountModalRef" :node="node"></AddAccountModal>
  <UpdateAccountModal :data="data" :is-view="isView"></UpdateAccountModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AddAccountModal from "@/views/getting_started/accounts/accountsModal/AddAccountModal.vue";
import UpdateAccountModal from "@/views/getting_started/accounts/accountsModal/UpdateAccountModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import TreeComponent from "@/views/reuseable/TreeComponent.vue";
import { showModal } from "@/core/helpers/dom";
export default defineComponent({
  name: "accounts-listing",
  components: {
    TreeComponent,
    TitleAndButtons,
    AddAccountModal,
    UpdateAccountModal,
  },
  setup() {
    const node = ref({});
    const data = ref({
      id: "",
      parent_name: "",
    });

    const loading = ref(false);
    const isView = ref(false);

    const openModal = (id) => {
      showModal(id);
    };

    const addChild = (nodeData) => {
      node.value = nodeData;
      openModal("modal_add_account");
      // node.value = nodeData;
    };

    const loadEdit = ($event) => {
      data.value.id = $event.id;
      data.value.parent_name = $event.parent;
      isView.value = false;
      openModal("modal_update_account");
    };

    const loadView = ($event) => {
      data.value.id = $event.id;
      data.value.parent_name = $event.parent;
      isView.value = true;
      openModal("modal_update_account");
    };

    return {
      openModal,
      node,
      loading,
      addChild,
      loadEdit,
      data,
      loadView,
      isView,
    };
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      editData: {},
    };
  },

  computed: {
    ...mapGetters({
      accountList: GETTERS.ACCOUNT.accountList,
    }),
    // Pagination
    paginatedData() {
      return this["accountList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  created() {
    this.fetchAccountList();
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Account Listing", ["Getting Started"]);
  },

  methods: {
    ...mapActions({
      fetchAccountList: ACTIONS.ACCOUNT.FETCH_ACCOUNT_LIST,
      loadAccount: ACTIONS.ACCOUNT.LOAD_ACCOUNT,
      deleteAccount: ACTIONS.ACCOUNT.DELETE_ACCOUNT,
    }),

    async accountDelete($event) {
      Swal.fire({
        title: "Deleting Account",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          this.loading = true;
          const data = { id: $event.id };
          let msg = await this.deleteAccount(data);
          if (msg == "success") {
            await this.fetchAccountList();
            this.loading = false;
            Swal.fire({
              title: "Account Deleted Successfully!",
              type: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            });
          }
          this.loading = false;
        }
      });
    },
  },
});
</script>
