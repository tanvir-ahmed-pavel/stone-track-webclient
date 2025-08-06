<template>
  <!--  Title and Buttons-->
  <TitleAndButtons title="Driver Listing">
    <!--    Buttons-->
    <template v-slot:buttons>
      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal_add_driver"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
        </span>
        Add Driver
      </button>
    </template>
  </TitleAndButtons>

  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title"></div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar"></div>
      <!--end::Card toolbar-->
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
                <p>
                  <b>Created By: </b>
                  {{ props.row.created_by }}
                </p>
              </div>
              <!--              Column-2-->
              <div class="col-md">
                <p>
                  <b>License Number: </b>
                  {{ props.row.license_number }}
                </p>
                <p>
                  <b>License Issue Location: </b>
                  {{ props.row.issued_location }}
                </p>
              </div>
              <!--              Column-3-->
              <div class="col-md">
                <p>
                  <b>License Issue Date: </b>
                  {{ props.row.issuing_date }}
                </p>
                <p>
                  <b>License Expiry Date: </b>
                  {{ props.row.expiry_date }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- Name-->
        <el-table-column property="driver_name" label="Driver Name" />

        <!--Mobile-->
        <el-table-column property="driver_mobile_no" label="Driver Mobile" />

        <!--        Status-->
        <el-table-column label="Driver Status">
          <template #default="scope">
            {{ scope.row.driver_status ? "Enabled" : "Disabled" }}
          </template>
        </el-table-column>

        <!--        Created At-->
        <el-table-column property="created_at" label="Created At" width="200" />

        <!--        Edit & Delete-->
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button
              size="mini"
              data-bs-toggle="modal"
              data-bs-target="#modal_update_driver"
              @click.prevent="editData = scope.row"
              >Edit</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click.prevent="driverDelete(scope.row)"
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
            :total="this.driverList.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>

  <!--  Calling Modal-->
  <AddDriverModal></AddDriverModal>
  <UpdateDriverModal :data="editData"></UpdateDriverModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddDriverModal from "@/views/getting_started/drivers/driversModal/AddDriverModal.vue";
import UpdateDriverModal from "@/views/getting_started/drivers/driversModal/UpdateDriverModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "drivers-listing",
  components: {
    TitleAndButtons,
    AddDriverModal,
    UpdateDriverModal,
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
      driverList: GETTERS.DRIVER.driverList,
    }),
    // Pagination
    paginatedData() {
      return this["driverList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  created() {
    this.fetchDriverList();
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Driver Listing", ["Getting Started"]);
  },

  methods: {
    ...mapActions({
      fetchDriverList: ACTIONS.DRIVER.FETCH_DRIVER_LIST,
      loadDriver: ACTIONS.DRIVER.LOAD_DRIVER,
      deleteDriver: ACTIONS.DRIVER.DELETE_DRIVER,
    }),

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    editDriver(row) {
      this.loadDriver(row);
    },

    driverDelete(row) {
      Swal.fire({
        title: "Deleting Driver Account",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.driverList.findIndex(
            (driver) => driver.cus_primary_email === row.cus_primary_email
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            var msg = await this.deleteDriver(data);
            if (msg == "success") {
              Swal.fire({
                title: "Driver Account Deleted Successfully!",
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
