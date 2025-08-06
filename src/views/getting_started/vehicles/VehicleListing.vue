<template>
  <!--  Title and Buttons-->
  <TitleAndButtons title="Vehicle Listing">
    <!--    Buttons-->
    <template v-slot:buttons>
      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal_add_vehicle"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
        </span>
        Add Vehicle
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
                <p>
                  <b>Fuel Type: </b>
                  {{ props.row.fuel_type }}
                </p>
              </div>
              <!--              Column-2-->
              <div class="col-md">
                <p>
                  <b>Vehicle Status: </b>
                  {{ props.row.vehicle_status ? "Enabled" : "Disabled" }}
                </p>
              </div>
              <!--              Column-3-->
              <div class="col-md">
                <p>
                  <b>Created By: </b>
                  {{ props.row.created_by }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- Mark-->
        <el-table-column property="mark" label="Mark" />

        <!--Model-->
        <el-table-column property="model" label="Model" />

        <!-- License Plate -->
        <el-table-column
          property="license_plate"
          label="License Plate"
          align="center"
        />

        <!--        Driver-->
        <el-table-column label="Driver">
          <template #default="scope">
            {{ scope.row.driver_name }}
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
              data-bs-target="#modal_update_vehicle"
              @click.prevent="editData = scope.row"
              >Edit</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click.prevent="vehicleDelete(scope.row)"
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
            :total="this.vehicleList.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>

  <!--  Calling Modal-->
  <AddVehicleModal></AddVehicleModal>
  <UpdateVehicleModal :data="editData"></UpdateVehicleModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddVehicleModal from "@/views/getting_started/vehicles/vehiclesModal/AddVehicleModal.vue";
import UpdateVehicleModal from "@/views/getting_started/vehicles/vehiclesModal/UpdateVehicleModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "vehicles-listing",
  components: {
    TitleAndButtons,
    AddVehicleModal,
    UpdateVehicleModal,
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
      vehicleList: GETTERS.VEHICLE.vehicleList,
    }),
    // Pagination
    paginatedData() {
      return this["vehicleList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  created() {
    this.fetchVehicleList();
    this.fetchDriverList();
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Vehicle Listing", ["Getting Started"]);
  },

  methods: {
    ...mapActions({
      fetchVehicleList: ACTIONS.VEHICLE.FETCH_VEHICLE_LIST,
      loadVehicle: ACTIONS.VEHICLE.LOAD_VEHICLE,
      deleteVehicle: ACTIONS.VEHICLE.DELETE_VEHICLE,
      fetchDriverList: ACTIONS.DRIVER.FETCH_DRIVER_LIST,
    }),

    // Pagination

    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    vehicleDelete(row) {
      Swal.fire({
        title: "Deleting Vehicle Account",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.vehicleList.findIndex(
            (vehicle) => vehicle.cus_primary_email === row.cus_primary_email
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            var msg = await this.deleteVehicle(data);
            if (msg == "success") {
              Swal.fire({
                title: "Vehicle Account Deleted Successfully!",
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
