<template>
  <!-- Submit -->
  <TitleAndButtons title="Crushing Stone">
    <!--    Buttons-->
    <template v-slot:buttons>
      <button
        type="button"
        class="btn btn-sm btn-flex btn-danger me-3"
        @click="resetForm"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
        </span>
        Reset
      </button>

      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        @click.prevent="crushingData"
      >
        <span v-if="!loading" class="indicator-label">
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
        </span>
        <span v-if="loading" class="indicator-progress">
          Please wait...<span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span
        ></span>
        Submit
      </button>
    </template>
  </TitleAndButtons>

  <!--  <div class="card">-->
  <el-form :model="form" :rules="rules" ref="formRef" v-loading="loading">
    <!-- Initials -->

    <!-- Selected Items -->
    <el-card class="box-card mb-4">
      <el-divider>Crushing Raw Stone</el-divider>

      <div class="row">
        <div class="col-4">
          <el-form-item>
            <el-card class="btn-light mod-btn-style">
              <div class="row">
                <div class="col-5">
                  <el-form-item> LC No: </el-form-item>
                </div>

                <div class="col-7">
                  <el-form-item class="mb-0" prop="lc_id">
                    <el-select
                      v-model="lc_id"
                      filterable
                      placeholder="Select an LC"
                      size="small"
                      clearable
                      @change="loadItems(lc_id)"
                    >
                      <el-option
                        v-for="lc in crushingLcList"
                        :key="lc.id"
                        :label="lc.lc_number"
                        :value="lc.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col-5">
                  <el-form-item> Raw Item: </el-form-item>
                </div>

                <div class="col-7">
                  <el-form-item class="mb-0" prop="raw_item_index">
                    <el-select
                      v-model="raw_item_index"
                      filterable
                      placeholder="Select an Item"
                      size="small"
                      @change="setValue(raw_item_index)"
                    >
                      <el-option
                        v-for="(item, index) in itemListForCrushing"
                        :key="item.id"
                        :label="item.item_name"
                        :value="index"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </div>

        <div class="col-4">
          <el-form-item>
            <el-card class="btn-light mod-btn-style">
              <div class="row">
                <div class="col-5">
                  <el-form-item>Crushing Date: </el-form-item>
                </div>

                <div class="col-7">
                  <el-form-item class="mb-0" prop="crushing_date">
                    <el-date-picker
                      v-model="crushing_date"
                      type="date"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      style="width: 190px"
                      placeholder="Select Crushing date"
                      size="small"
                    />
                  </el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col-5">
                  <el-form-item>Crushing Qty: </el-form-item>
                </div>

                <div class="col-7">
                  <el-form-item class="mb-0" prop="crushed_quantity">
                    <el-input
                      v-model="crushed_quantity"
                      :input-style="{ 'text-align': 'right', width: '100%' }"
                      size="small"
                      @input="cal2c"
                    />
                  </el-form-item>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </div>

        <div class="col-4">
          <el-form-item>
            <el-card class="btn-light mod-btn-style">
              <div class="row">
                <div class="col-6">
                  <el-form-item>Stone Cost/MT: </el-form-item>
                </div>

                <div class="col-6">
                  <el-form-item class="mb-0" prop="stone_cost">
                    <el-input
                      v-model="stone_cost"
                      :input-style="{ 'text-align': 'right', width: '100%' }"
                      size="small"
                      @input="cal2c"
                    />
                  </el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <el-form-item>Crushing Cost/MT: </el-form-item>
                </div>

                <div class="col-6">
                  <el-form-item class="mb-0" prop="fixed_cost">
                    <el-input
                      v-model="fixed_cost"
                      :input-style="{ 'text-align': 'right', width: '100%' }"
                      size="small"
                      @input="cal2c"
                    />
                  </el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <el-form-item>Total Cost: </el-form-item>
                </div>

                <div class="col-6">
                  <el-form-item class="mb-0" prop="total_2cost">
                    <el-input
                      v-model="total_2cost"
                      :input-style="{ 'text-align': 'right', width: '100%' }"
                      size="small"
                      readonly
                    />
                  </el-form-item>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </div>
      </div>
    </el-card>

    <el-card class="box-card mb-4">
      <el-divider>Crushing Items</el-divider>
      <div style="min-height: 50px; position: relative; overflow: auto">
        <table class="table">
          <thead>
            <tr class="border-bottom-2 fw-bold fs-7">
              <th scope="col" style="width: 3px">No.</th>
              <th scope="col" style="width: 150px; text-align: center">
                Crushing Stone
              </th>

              <th
                class="required"
                scope="col"
                style="width: 50px; text-align: center; background: #ccebf1"
              >
                Proportion
              </th>
              <th
                scope="col"
                style="width: 50px; text-align: center; background: #daf3f8"
              >
                In Percentage %
              </th>

              <th
                scope="col"
                style="width: 50px; text-align: center; background: #eefcff"
              >
                Qty/MT
              </th>
              <th
                scope="col"
                style="width: 50px; text-align: center; background: #eefcff"
              >
                Qty/CFT
              </th>

              <th
                class="required"
                scope="col"
                style="width: 50px; text-align: center; background: #dbe4d8"
              >
                P. Price/MT
              </th>
              <th
                class="required"
                scope="col"
                style="width: 50px; text-align: center; background: #e3ecaa"
              >
                P. Price/CFT
              </th>

              <th
                class="required"
                scope="col"
                style="width: 50px; text-align: center; background: #e6e5da"
              >
                S. Price/MT
              </th>
              <th
                class="required"
                scope="col"
                style="width: 50px; text-align: center; background: #f6f7f7"
              >
                S. Price/CFT
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in crushingItems" :key="index">
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-6" scope="row">
                {{ index + 1 }}.
              </th>

              <td>
                <el-input
                  v-model="item.item_name"
                  :input-style="{ 'text-align': 'right', width: '100%' }"
                  size="small"
                  readonly
                />
              </td>

              <td>
                <el-input
                  v-model="item.crushing_proportion"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#ccebf1',
                  }"
                  size="small"
                  @input="calc"
                />
              </td>

              <td>
                <el-input
                  v-model="item.crushing_proportion_in_percentage"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#daf3f8',
                  }"
                  size="small"
                  readonly
                />
              </td>

              <td>
                <el-input
                  v-model="item.quantity_in_MT"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#eefcff',
                  }"
                  size="small"
                  readonly
                />
              </td>

              <td>
                <el-input
                  v-model="item.quantity_in_CFT"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#eefcff',
                  }"
                  size="small"
                  readonly
                />
              </td>

              <td>
                <el-input
                  v-model="item.purchase_price_per_MT"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#dbe4d8',
                  }"
                  size="small"
                  @input="calc"
                />
              </td>

              <td>
                <el-input
                  v-model="item.purchase_price_per_CFT"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#e3ecaa',
                  }"
                  size="small"
                  @input="calc"
                />
              </td>

              <td>
                <el-input
                  v-model="item.sales_price_per_MT"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#e6e5da',
                  }"
                  size="small"
                  @input="calc"
                />
              </td>

              <td>
                <el-input
                  v-model="item.sales_price_per_CFT"
                  :input-style="{
                    'text-align': 'right',
                    width: '100%',
                    background: '#f6f7f7',
                  }"
                  size="small"
                  @input="calc"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <table class="table">
        <thead style="visibility: collapse">
          <tr class="border-bottom-2 fw-bold fs-7">
            <th scope="col" style="width: 3px; color: white">No.</th>
            <th
              scope="col"
              style="width: 150px; text-align: center; color: white"
            >
              Crushing Stone
            </th>

            <th
              class="required"
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              Proportion
            </th>
            <th
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              In Percentage %
            </th>

            <th
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              Qty/MT
            </th>
            <th
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              Qty/CFT
            </th>

            <th
              class="required"
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              P. Price/MT
            </th>
            <th
              class="required"
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              S. Price/MT
            </th>

            <th
              class="required"
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              P. Price/CFT
            </th>
            <th
              class="required"
              scope="col"
              style="width: 50px; text-align: center; color: white"
            >
              S. Price/CFT
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th class="align-middle fw-bold fs-6" scope="row"></th>

            <td>
              <el-input
                v-model="total_for_all"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#facc28',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_proportion"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#ccebf1',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_proportion_in_percentage"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#daf3f8',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_in_MT"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#eefcff',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_in_CFT"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#eefcff',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_purchase_price_in_MT"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#dbe4d8',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_purchase_price_in_CFT"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#e3ecaa',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_sales_price_in_MT"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#e6e5da',
                }"
                size="small"
                readonly
              />
            </td>

            <td>
              <el-input
                v-model="total_sales_price_in_CFT"
                class="fw-bold fs-5"
                :input-style="{
                  'text-align': 'right',
                  width: '100%',
                  background: '#f6f7f7',
                }"
                size="small"
                readonly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </el-card>

    <!--    </div>-->
  </el-form>
  <!--  </div>-->
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "purchase-order-receive",
  components: { TitleAndButtons },

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);

    return {
      formRef,
      loading,
    };
  },

  data() {
    return {
      lc_id: "",
      crushing_date: new Date().toISOString().substr(0, 10),
      raw_item_index: "",
      raw_item_id: "",
      crushed_quantity: 0,

      stone_cost: 0,
      fixed_cost: 115,
      total_2cost: "0",
      total_cost: 0,

      total_for_all: "Total:",

      total_proportion: 0,
      total_proportion_in_percentage: 0,
      total_in_MT: 0,
      total_in_CFT: 0,
      total_purchase_price_in_MT: 0,
      total_purchase_price_in_CFT: 0,
      total_sales_price_in_MT: 0,
      total_sales_price_in_CFT: 0,
    };
  },

  computed: {
    ...mapGetters({
      crushingLcList: GETTERS.LC.crushingLcList,

      piDetailsById: GETTERS.PURCHASE.piDetailsById,
      bankAccountList: GETTERS.ACCOUNT.bankAccountList,
      paymentModes: GETTERS.PURCHASE.paymentModes,
      itemListForCrushing: GETTERS.CRUSHING.itemListForCrushing,
      crushingItems: GETTERS.CRUSHING.crushingItemList,
      crushingStoneCost: GETTERS.CRUSHING.crushingStoneCost,
    }),
  },

  created() {
    this.fetchCrushingItemList();
    this.fetchCrushingLcList();
    this.fetchItemListForCrushing(0);
    this.cal2c();

    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Crushing Stone", ["Buying"]);
  },

  methods: {
    ...mapActions({
      fetchPiDetailsById: ACTIONS.PURCHASE.FETCH_PI_DETAILS_BY_ID,
      fetchCrushingLcList: ACTIONS.LC.FETCH_CRUSHING_LC_LIST,
      fetchItemListForCrushing: ACTIONS.CRUSHING.FETCH_ITEMS_LIST_FOR_CRUSHING,
      fetchCrushingStoneCost: ACTIONS.CRUSHING.FETCH_CRUSHING_STONE_COST,
      fetchCrushingItemList: ACTIONS.CRUSHING.FETCH_CRUSHING_ITEM_LIST,
      crushingDataSave: ACTIONS.CRUSHING.SAVE_CRUSHING_DATA,
    }),

    clear() {
      this.fetchCrushingItemList();

      this.lc_id = "";
      this.crushing_date = new Date().toISOString().substr(0, 10);
      this.raw_item_index = "";
      this.raw_item_id = "";
      this.crushed_quantity = 0;

      this.stone_cost = 0;
      this.fixed_cost = 115;
      this.total_2cost = "0";
      this.total_cost = 0;

      this.total_for_all = "Total =";

      this.total_proportion = 0;
      this.total_proportion_in_percentage = 0;
      this.total_in_MT = 0;
      this.total_in_CFT = 0;
      this.total_purchase_price_in_MT = 0;
      this.total_purchase_price_in_CFT = 0;
      this.total_sales_price_in_MT = 0;
      this.total_sales_price_in_CFT = 0;
    },

    resetForm() {
      Swal.fire({
        title: "Resetting",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          this.clear();
        }
      });
    },

    setValue(raw_item_index) {
      var id =
        this.lc_id.toString() +
        "/" +
        this.itemListForCrushing[this.raw_item_index].id.toString();
        this.fetchCrushingStoneCost(id);

      this.crushed_quantity =
        this.itemListForCrushing[raw_item_index].quantity_in_stock;
      this.raw_item_id = this.itemListForCrushing[this.raw_item_index].id;
      this.stone_cost = this.crushingStoneCost.final_rate;

      this.cal2c();
    },

    cal2c() {
      this.total_cost = Number(
        (Number(this.stone_cost) + Number(this.fixed_cost)) *
          Number(this.crushed_quantity)
      );
      this.total_2cost = Number(this.total_cost).toLocaleString("en-us");
    },

    calc() {
      this.total_proportion = 0;
      for (var i = 0; this.crushingItems.length > i; i++) {
        this.total_proportion += Number(
          this.crushingItems[i].crushing_proportion
        );
      }

      this.total_proportion_in_percentage = 0;
      this.total_in_MT = 0;
      this.total_in_CFT = 0;

      this.total_purchase_price_in_MT = 0;
      this.total_purchase_price_in_CFT = 0;

      this.total_sales_price_in_MT = 0;
      this.total_sales_price_in_CFT = 0;

      if (this.total_proportion > 0) {
        for (var j = 0; this.crushingItems.length > j; j++) {
          this.crushingItems[j].crushing_proportion_in_percentage = Number(
            (
              (100 * Number(this.crushingItems[j].crushing_proportion)) /
              this.total_proportion
            ).toFixed(3)
          );

          this.total_proportion_in_percentage += Number(
            this.crushingItems[j].crushing_proportion_in_percentage.toFixed(3)
          );

          this.crushingItems[j].quantity_in_MT =
            (Number(this.crushed_quantity) *
              Number(this.crushingItems[j].crushing_proportion_in_percentage)) /
            100;
          this.crushingItems[j].quantity_in_CFT =
            Number(this.crushed_quantity) *
            Number(this.crushingItems[j].crushing_proportion);

          this.total_in_MT += Number(
            this.crushingItems[j].quantity_in_MT.toFixed(3)
          );
          this.total_in_CFT += Number(
            this.crushingItems[j].quantity_in_CFT.toFixed(3)
          );

          this.total_purchase_price_in_MT += Number(
            this.crushingItems[j].purchase_price_per_MT
          );
          this.total_purchase_price_in_CFT += Number(
            this.crushingItems[j].purchase_price_per_CFT
          );

          this.total_sales_price_in_MT += Number(
            this.crushingItems[j].sales_price_per_MT
          );
          this.total_sales_price_in_CFT += Number(
            this.crushingItems[j].sales_price_per_CFT
          );
        }
      }
    },

    async loadItems(lc_id) {
      if(lc_id) {
        await this.fetchItemListForCrushing(lc_id);
      }
      this.raw_item_index = "";
      this.crushed_quantity = 0;
      this.stone_cost = 0;
      this.cal2c();
    },

    showErrorMsg(errorMsg) {
      Swal.fire({
        text: errorMsg,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
      return false;
    },

    crushingData() {
      if (
        this.raw_item_index == "" ||
        this.crushed_quantity <= 0 ||
        this.stone_cost <= 0 ||
        this.fixed_cost <= 0
      ) {
        var errorMsg = "Please fill up all required field values!";
        this.showErrorMsg(errorMsg);
      } else {
        Swal.fire({
          title: "Saving Crushing Data",
          text: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              this._crushingData();
            }, 2000);
          }
        });
      }
    },

    async _crushingData() {
      this.loading = true;

      const data = JSON.parse(
        JSON.stringify({
          lc_id: this.lc_id,
          crushing_date: this.crushing_date,
          raw_item_id: this.raw_item_id,
          crushed_quantity: this.crushed_quantity,
          stone_cost: this.stone_cost,
          fixed_cost: this.fixed_cost,
          total_cost: this.total_cost,
          total_proportion: this.total_proportion,
          total_proportion_in_percentage: this.total_proportion_in_percentage,
          total_in_MT: this.total_in_MT,
          total_in_CFT: this.total_in_CFT,
          total_purchase_price_in_MT: this.total_purchase_price_in_MT,
          total_purchase_price_in_CFT: this.total_purchase_price_in_CFT,
          total_sales_price_in_MT: this.total_sales_price_in_MT,
          total_sales_price_in_CFT: this.total_sales_price_in_CFT,
          crushingItems: this.crushingItems,
        })
      );

      // var msg = ""

      var msg = await this.crushingDataSave(data);

      this.loading = false;

      if (msg.length > 0) {
        Swal.fire({
          text: "Crushing Data Saved successfully!",
          icon: "success",
          buttonsStyling: true,
          confirmButtonText: "Ok",
        }).then(() => {
          this.clear();
        });
      } else {
        var errorMsg =
          "Sorry, looks like there are some errors detected, please try again.";
        this.showErrorMsg(errorMsg);
      }
    },
  },
});
</script>

<style scoped>
.mod-btn-style {
  text-align: left;
  font-weight: 100;
  /* background-color: gray; */
  border-color: gray;
  width: 100%;
  padding-left: 12px;
}
</style>
