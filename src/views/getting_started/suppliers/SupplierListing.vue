<template>
  <!--  Title and Buttons-->
  <TitleAndButtons title="Supplier Listing">
    <!--    Buttons-->
    <template v-slot:buttons>
      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_add_supplier"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
        </span>
        Add Supplier
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
      <el-table ref="multipleTable" :data="supplierList" style="width: 100%">
        <el-table-column label="Supplier Name" property="supplier_name" />

        <el-table-column label="Supplier Email" property="supp_primary_email" />

        <el-table-column
          label="Supplier Mobile"
          property="supp_primary_mobile_no"
        />

        <!--        Edit & Delete-->
        <el-table-column label="Actions">
          <template #default="scope">
            <!-- <el-button size="mini" data-bs-toggle="modal" data-bs-target="#modal_add_item" @click="editSupplier(scope.row.id)">Edit</el-button> -->
            <el-button
              size="mini"
              type="success"
              @click.prevent="
                this.$router.push({
                  path: '/getting-started/suppliers/' + scope.row.id,
                })
              "
              >View</el-button
            >

            <el-button
              size="mini"
              type="primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_edit_supplier"
              @click.prevent="editSupplier(scope.row)"
              >Edit</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click.prevent="supplierDelete(scope.row)"
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
            :total="this.supplierList.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>

  <AddSupplierModal></AddSupplierModal>
  <EditSupplierModal></EditSupplierModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import AddSupplierModal from "@/views/getting_started/suppliers/Modals/AddSupplierModal.vue";
import EditSupplierModal from "@/views/getting_started/suppliers/Modals/EditSupplierModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "suppliers-listing",
  components: {
    TitleAndButtons,
    AddSupplierModal,
    EditSupplierModal,
  },
  setup() {
    return {};
  },

  data() {
    return {
      perPage: 10,
      currentPage: 1,
    };
  },

  computed: {
    ...mapGetters({
      supplierList: GETTERS.SUPPLIER.supplierList,
    }),
    // Pagination
    paginatedData() {
      return this["supplierList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  created() {
    this.fetchSupplierList();
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Suppliers Listing", ["Getting Started"]);
  },

  methods: {
    ...mapActions({
      fetchSupplierList: ACTIONS.SUPPLIER.FETCH_SUPPLIER_LIST,
      loadSupplier: ACTIONS.SUPPLIER.LOAD_SUPPLIER,
      deleteSupplier: ACTIONS.SUPPLIER.DELETE_SUPPLIER,
    }),

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    editSupplier(row) {
      this.loadSupplier(row);
    },

    supplierDelete(row) {
      Swal.fire({
        title: "Deleting Supplier Account",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.supplierList.findIndex(
            (supplier) => supplier.supp_primary_email === row.supp_primary_email
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            var msg = await this.deleteSupplier(data);
            if (msg == "success") {
              Swal.fire({
                title: "Supplier Account Deleted Successfully!",
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
