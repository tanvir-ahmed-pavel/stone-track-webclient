<template>
  <TitleAndButtons title="Customer Listing">
    <!--    Buttons-->
    <template v-slot:buttons>
      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal_add_customer"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
        </span>
        Add Customer
      </button>
    </template>
  </TitleAndButtons>

  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title"></div>
      <!--begin::Card title-->
    </div>
    <div class="card-body pt-0">
      <el-table ref="multipleTable" :data="paginatedData" style="width: 100%">
        <el-table-column label="Customer Name" property="customer_name" />

        <el-table-column label="Customer Email" property="cus_primary_email" />

        <el-table-column
          label="Customer Mobile"
          property="cus_primary_mobile_no"
        />

        <!--        Edit & Delete-->
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button
              size="mini"
              type="success"
              @click.prevent="
                this.$router.push({
                  path: '/getting-started/customers/' + scope.row.id,
                })
              "
              >View</el-button
            >

            <el-button
              size="mini"
              data-bs-toggle="modal"
              data-bs-target="#modal_edit_customer"
              @click.prevent="editData = scope.row"
              >Edit</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click.prevent="customerDelete(scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--      Pagination-->
      <div class="row">
        <div class="col-12 my-4 pt-3" style="text-align: right">
          <el-pagination
            background
            :page-sizes="[10, 20, 50, 100]"
            :page-size="perPage"
            layout="sizes, prev, pager, next"
            :total="this.customerList.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>

  <AddCustomerModal></AddCustomerModal>
  <UpdateCustomerModal :data="editData"></UpdateCustomerModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AddCustomerModal from "@/views/getting_started/customers/customersModal/AddCustomerModal.vue";
import UpdateCustomerModal from "@/views/getting_started/customers/customersModal/UpdateCustomerModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "customers-listing",
  components: {
    TitleAndButtons,
    AddCustomerModal,
    UpdateCustomerModal,
  },
  setup() {
    return {};
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
      customerList: GETTERS.CUSTOMER.customerList,
    }),
    // Pagination
    paginatedData() {
      return this["customerList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  created() {
    this.fetchCustomerList();
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Customers Listing", ["Getting Started"]);
  },

  methods: {
    ...mapActions({
      fetchCustomerList: ACTIONS.CUSTOMER.FETCH_CUSTOMER_LIST,
      loadCustomer: ACTIONS.CUSTOMER.LOAD_CUSTOMER,
      deleteCustomer: ACTIONS.CUSTOMER.DELETE_CUSTOMER,
    }),

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    customerDelete(row) {
      Swal.fire({
        title: "Deleting Customer Account",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.customerList.findIndex(
            (customer) => customer.cus_primary_email === row.cus_primary_email
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            var msg = await this.deleteCustomer(data);
            if (msg == "success") {
              Swal.fire({
                title: "Customer Account Deleted Successfully!",
                type: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
            }
          }
        }
      });
    },
  },
});
</script>
