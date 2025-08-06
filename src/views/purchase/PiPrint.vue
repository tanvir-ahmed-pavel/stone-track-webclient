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
            v-if="data.supplier"
            class="col-6 text-end"
          >
            <div class="">
              <span class="h3"> {{data.supplier.supplier_name}} </span>
            </div>
            <div class="">
              {{data.supplier.supp_primary_address}} <br>
              Email: {{data.supplier.supp_primary_email}} <br>
              Mobile: {{data.supplier.supp_primary_mobile_no}}
            </div>
          </div>

          <div class="col-12 text-center py-3">
            <span class="h2">PO Invoice</span>
          </div>
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <span class="fw-bolder">PO Invoice No. RT {{ data.po_invoice_number }}</span>
          </div>

          <div class="col-6 mb-2 text-end">
            <span class="fw-bolder"> Date: {{ data.due_date }}</span>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12 mt-2">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data.items" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.item_name }}</td>
                  <td>{{ item.accepted_quantity.toLocaleString()}}</td>
                  <td>৳ {{ item.item_rate.toLocaleString() }}</td>
                  <td>৳ {{ item.total_amount.toLocaleString() }}</td>
                </tr>

<!--                Bottom Part-->
                <tr class="mt-3">
                  <td class="border-0 fw-bold pt-4" colspan="2">
                    {{ "Total Quantity: " }}
                  </td>
                  <td class="border-0 pt-4">
                    {{ data.total_accepted_quantity.toLocaleString() }}
                  </td>
                  <td class="border-0 fw-bold pt-4" colspan="1">
                    {{ "Total: " }}
                  </td>
                  <td class="border-0 pt-4">
                    ৳ {{ data.pi_total_amount.toLocaleString() }}
                  </td>
                </tr>

                <tr v-if="data.pi_discount_in_percentage">
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="1">
                    {{ "Discount in Percent: " }}
                  </td>
                  <td class="border-0">
                    {{ data.pi_discount_in_percentage }} %
                  </td>
                </tr>

                <tr v-if="data.pi_discount_in_amount">
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="1">
                    {{ "Discount in Amount: " }}
                  </td>
                  <td class="border-0">
                    ৳ {{ data.pi_discount_in_amount.toLocaleString() }}
                  </td>
                </tr>

                <tr>
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="1">
                    {{ "Grand Total: " }}
                  </td>
                  <td class="border-0" >৳ {{ data.pi_grand_total.toLocaleString() }} </td>
                </tr>

                <tr>
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="1">
                    {{ "Round Adjustment: " }}
                  </td>
                  <td class="border-0">
                    ৳ {{ data.pi_rounding_adjustment.toLocaleString() }}
                  </td>
                </tr>

                <tr>
                  <td class="border-0" colspan="3"></td>
                  <td class="border-0 fw-bold" colspan="1">
                    {{ "Round Total: " }}
                  </td>
                  <td class="border-0">৳ {{ data.pi_payable_total.toLocaleString() }} </td>
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
  name: "PiPrint",

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
