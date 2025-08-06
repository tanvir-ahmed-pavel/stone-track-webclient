<template>
  <div v-if="data">
    <div class="card-body">
      <!--            Body-->
      <!--              Table-->
      <div id="printArea">
        <div class="row">
          <div class="col-6 text-start">
            <div class="">
              <span class="h3"> M/S RAIAN TRADERS</span>
            </div>
            <!--            <img alt="Logo" src="media/logos/light.png" class="h-50px logo">-->
            <div class="">
              Burumari, Patgram, Lalmonirhat <br> Mob: 013 9000 4242
            </div>
          </div>

          <!--          client-->
          <div
            v-if="data.customer"
            class="col-6 text-end"
          >
            <div class="">
              <span class="h3"> {{data.customer.customer_name}} </span>
            </div>
            <div class="">
              {{data.customer.cus_primary_address}} <br>
              Email: {{data.customer.cus_primary_email}} <br>
              Mobile: {{data.customer.cus_primary_mobile_no}}
            </div>
          </div>

          <div class="col-12 text-center py-3">
            <span class="h2">Sales Order</span>
          </div>
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <span class="fw-bolder">SO No. RT {{ data.so_number }}</span>
          </div>

          <div class="col-6 mb-2 text-end">
            <span class="fw-bolder"> Date: {{ data.so_order_date }}</span>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12 mt-2">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Delivery Date</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data.items" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.item_name }}</td>
                  <td>{{ item.delivery_date }}</td>
                  <td>{{ item.order_quantity.toLocaleString()}}</td>
                  <td>৳ {{ item.item_rate.toLocaleString() }}</td>
                  <td>৳ {{ item.total_amount.toLocaleString() }}</td>
                </tr>

<!--                Bottom Part-->
                <tr class="mt-3">
                  <td class="border-0 fw-bold pt-4" colspan="2">
                    {{ "Total Quantity: " }}
                  </td>
                  <td class="border-0 pt-4">
                    {{ data.so_total_order_quantity.toLocaleString() }}
                  </td>
                  <td class="border-0 fw-bold pt-4" colspan="2">
                    {{ "Total: " }}
                  </td>
                  <td class="border-0 pt-4">
                    ৳ {{ data.so_total_amount.toLocaleString() }}
                  </td>
                </tr>

                <tr v-if="data.so_discount_in_percentage">
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="2">
                    {{ "Discount in Percent: " }}
                  </td>
                  <td class="border-0">
                    {{ data.so_discount_in_percentage }} %
                  </td>
                </tr>

                <tr v-if="data.so_discount_in_amount">
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="2">
                    {{ "Discount in Amount: " }}
                  </td>
                  <td class="border-0">
                    ৳ {{ data.so_discount_in_amount.toLocaleString() }}
                  </td>
                </tr>

                <tr>
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="2">
                    {{ "Grand Total: " }}
                  </td>
                  <td class="border-0" >৳ {{ data.so_grand_total.toLocaleString() }} </td>
                </tr>

                <tr>
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="2">
                    {{ "Round Adjustment: " }}
                  </td>
                  <td class="border-0">
                    ৳ {{ data.so_rounding_adjustment.toLocaleString() }}
                  </td>
                </tr>

                <tr>
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="2">
                    {{ "Round Total: " }}
                  </td>
                  <td class="border-0">৳ {{ data.receivable_total.toLocaleString() }} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintComponent",

  data() {
    // Parameters that change depending on the type of dialogue
    return {
      data: undefined,
    };
  },

  methods: {
    resetData() {
      this.data = undefined;
    },

    show(opts = {}) {
      // this.roster = opts.roster;
      this.title = opts.title;
      this.data = opts.data;
      // Return promise so the caller can get results
      return new Promise((resolve) => {
        resolve();
      });
    },

    async print() {
      // Get HTML to print from element
      const prtHtml = document.getElementById("printArea").innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open("", "", "");
      // ${stylesHtml}
      //${prtHtml}
      WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
    ${stylesHtml}
  </head>
  <body>
    ${prtHtml}
  </body>
</html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.onafterprint = function () {
        WinPrint.close();
      };
      this.resetData();
    },
  },
};
</script>

<style scoped lang="scss">
@import "/~bootstrap";
.pagebreak:before {
  content: "";
  display: table-row !important;
}

.container {
  display: flex;
  /*flex-wrap: wrap;*/
}
</style>
