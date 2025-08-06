<template>
  <template v-if="!loading">
    <!-- Submit -->
    <TitleAndButtons title="Opening Balance Details">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Go Back-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click="this.$router.back()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
          </span>
          Go Back
        </button>
      </template>
    </TitleAndButtons>

    <!--  <div class="card">-->
    <el-form v-loading="loading" ref="formRef">
      <!-- Initials -->
      <!--    <div class="card-body pt-0">-->
      <el-card class="box-card mb-4">
        <table class="table mb-0">
          <tbody class="">
            <tr class="justify-content-end">
              <!--            Posting Date-->
              <td>
                <label class="required fw-bold mb-1">Posting Date</label>
                <div>
                  <el-form-item size="small" class="mb-0" prop="posting_date">
                    <el-date-picker
                      readonly
                      format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD"
                      v-model="openingBalance.posting_date"
                      type="date"
                      placeholder="Select a Posting date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>

      <!-- Selected Items -->
      <el-card class="box-card mb-4">
        <el-divider>Account List</el-divider>
        <!--        show item-->

        <table class="table table-striped table-cus mb-10 table-hover">
          <thead>
            <tr class="fw-bold fs-4">
              <th class="text-center" scope="col">#</th>
              <th class="" scope="col" style="min-width: 150px">
                Account Head
              </th>
              <th class="text-center" scope="col">Credit Amount</th>
              <th class="text-center" scope="col">Debit Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in openingBalance.opening_entry_details"
              :key="index"
            >
              <!--            INDEX-->
              <th class="align-middle fw-bold fs-5 text-center">
                {{ index + 1 + "." }}
              </th>

              <!--            Name-->
              <td class="fs-5">
                {{ item.chart_of_account_head_name || "-" }}
              </td>

              <!--              Credit-->
              <td class="fw-bold text-center fs-5">
                {{ item.credit_amount? item.credit_amount.toLocaleString( undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,}) : "-" }}
              </td>

              <!--              Debit-->
              <td class="fw-bold text-center fs-5">
                {{ item.debit_amount? item.debit_amount.toLocaleString( undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,}) : "-" }}
              </td>
            </tr>

            <!--            Total-->
            <tr>
              <td class="fw-bold fs-3 text-end align-middle" colspan="2">
                Total:
              </td>

              <td class="text-center">
                <el-form-item
                  prop="total_credit_amount"
                  class="p-0 my-4 item-mod"
                >
                  <span class="fw-bold fs-3">{{
                    openingBalance.total_credit_amount.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  }}</span>
                </el-form-item>
              </td>

              <td class="fw-bold fs-3 text-center">
                <el-form-item
                  class="p-0 my-4 item-mod"
                  prop="total_debit_amount"
                >
                  <span class="fw-bold fs-3">{{
                    openingBalance.total_debit_amount.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  }}</span>
                </el-form-item>
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>
    </el-form>
    <!--  </div>-->
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import store from "@/store";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "OpeningBalanceDetails",
  components: { TitleAndButtons },

  setup() {
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Opening Balance Details", ["Getting Started"]);
    });

    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const route = useRoute();

    const openingBalance = computed(() => {
      return store.getters[GETTERS.ACCOUNT.openingBalanceById];
    });

    async function fetchApis() {
      loading.value = true;
      await store.dispatch(
        ACTIONS.ACCOUNT.FETCH_OPENING_BALANCE_BY_ID,
        route.params.id
      );
      loading.value = false;
    }

    fetchApis();

    return {
      formRef,
      loading,

      openingBalance,
    };
  },
});
</script>

<style>

</style>
