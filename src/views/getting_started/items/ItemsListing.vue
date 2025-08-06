<template>
  <template v-if="!loading">
    <!--  Title and Buttons-->
    <TitleAndButtons title="Item Listing">
      <!--    Buttons-->
      <template v-slot:buttons>
        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modal_add_item"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
          Add Item
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
        <!--      Table Begin-->
        <el-table ref="multipleTable" :data="paginatedData" style="width: 100%">
          <!--        More Details Column-->
          <el-table-column type="expand">
            <template #default="props">
              <div class="row">
                <!--              Column-1-->
                <div class="col-md">
                  <p><b>Item Code: </b> {{ props.row.item_code }}</p>
                  <p>
                    <b>Is fixed asset: </b>
                    {{ props.row.is_fixed_asset ? "Yes" : "No" }}
                  </p>
                </div>
                <!--              Column-2-->
                <div class="col-md">
                  <p>
                    <b>Item Status: </b>
                    {{ props.row.item_status ? "Enabled" : "Disabled" }}
                  </p>
                  <p>
                    <b>Opening Stock QTY: </b> {{ props.row.opening_stock_qty }}
                  </p>
                </div>
                <!--              Column-3-->
                <div class="col-md">
                  <p><b>Unit of Measure: </b> {{ props.row.uom.uom_name }}</p>
                  <p><b>Created By: </b> {{ props.row.created_by }}</p>
                </div>
              </div>
            </template>
          </el-table-column>

          <!--Item Name-->
          <el-table-column property="item_name" label="Item Name" />

          <!--Item Group-->
          <el-table-column
            property="group.item_group_name"
            label="Item Group"
          />

          <!--        Selling Price-->
          <el-table-column
            property="selling_price"
            label="Selling Price"
            align="center"
          />

          <!--        Created At-->
          <el-table-column property="created_at" label="Created At" />

          <!--        Edit & Delete-->
          <el-table-column label="Actions">
            <template #default="scope">
              <el-button
                size="mini"
                data-bs-toggle="modal"
                data-bs-target="#modal_update_item"
                @click.prevent="editData = scope.row"
                >Edit</el-button
              >

              <el-button
                size="mini"
                type="danger"
                @click.prevent="itemDelete(scope.row)"
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
              :total="this.itemList.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <AddItemModal></AddItemModal>
    <UpdateItemModal :data="editData"></UpdateItemModal>
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddItemModal from "@/views/getting_started/items/itemsModal/AddItemModal.vue";
import UpdateItemModal from "@/views/getting_started/items/itemsModal/UpdateItemModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "items-listing",
  components: {
    TitleAndButtons,
    AddItemModal,
    UpdateItemModal,
  },
  setup() {
    return {};
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      editData: {},
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      itemList: GETTERS.ITEM.itemList,

    }),
    // Pagination
    paginatedData() {
      return this["itemList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Items Listing", ["Getting Started"]);
    this.loading = true;

    await this.fetchItemList();
    await this.fetchFixedAssetAccountList();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchItemList: ACTIONS.ITEM.FETCH_ITEM_LIST,
      fetchFixedAssetAccountList: ACTIONS.ACCOUNT.FETCH_FIXED_ASSET_ACCOUNT_LIST,
      deleteItem: ACTIONS.ITEM.DELETE_ITEM,
    }),

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    itemDelete(row) {
      Swal.fire({
        title: "Deleting Item",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.itemList.findIndex(
            (item) => item.cus_primary_email === row.cus_primary_email
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            let msg = await this.deleteItem(data);
            if (msg == "success") {
              Swal.fire({
                title: "Item Deleted Successfully!",
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
