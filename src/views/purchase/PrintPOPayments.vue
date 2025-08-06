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
              Burumari, Patgram, Lalmonirhat <br />
              Mob: 013 9000 4242
            </div>
          </div>

          <!--          client-->
          <div v-if="data.supplier" class="col-6 text-end">
            <div class="">
              <span class="h3"> {{ data.supplier.supplier_name }} </span>
            </div>
            <div class="">
              {{ data.supplier.supp_primary_address }} <br />
              Email: {{ data.supplier.supp_primary_email }} <br />
              Mobile: {{ data.supplier.supp_primary_mobile_no }}
            </div>
          </div>

          <div class="col-12 text-center py-3">
            <span class="h2">PO Invoice Payments</span>
          </div>
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <span class="fw-bolder"
              >Payments Against (Invoice): {{ data.po_invoice_number }}</span
            >
          </div>

          <div class="col-6 mb-3 text-end">
            <span class="fw-bolder">
               Due Date: {{ data.due_date }}</span
            >
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12 mt-2">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Payment Date</th>
                  <th v-if="data.lc_id" scope="col">Payment Type</th>
                  <th scope="col">Payment Mode / Details</th>
                  <th scope="col">Payment Ref No.</th>
                  <th class="text-center" scope="col">Remarks</th>
                  <th scope="col">Paid Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in data.purchaseOrderPaymentDetails"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.posting_date || "-" }}</td>
                  <td v-if="data.lc_id">{{ item.payment_type || "-" }}</td>
                  <td style="max-width: 170px!important;">{{ item.payment_details_media || "-" }}</td>
                  <td>{{ item.po_payment_number || "-" }}</td>
                  <td style="max-width: 150px!important;" class="text-center">{{ item.payment_note || "-" }}</td>
                  <td>৳ {{ item.paid_amount.toLocaleString() || "-" }}</td>
                </tr>

                <!--                Bottom Part-->
                <tr class="mt-3">
                  <td class="border-0 fw-bold pt-4" :colspan="data.lc_id?4:3"></td>
                  <td class="border-0 fw-bold pt-4" colspan="2">
                    {{ "Total Paid Amount: " }}
                  </td>
                  <td class="border-0 pt-4">
                    ৳ {{ data.tillTotalPaidAmount.toLocaleString() || "-" }}
                  </td>
                </tr>

                <tr>
                  <td class="border-0" :colspan="data.lc_id?4:3"></td>
                  <td class="border-0 fw-bold" colspan="2">
                    {{ "Total Billed Amount: " }}
                  </td>
                  <td class="border-0">
                    ৳ {{ data.payable_total.toLocaleString() || "-" }}
                  </td>
                </tr>

                <tr>
                  <td class="border-0" :colspan="data.lc_id?4:3"></td>
                  <td class="border-0 fw-bold" colspan="2">
                    {{ "Total Payable Amount: " }}
                  </td>
                  <td class="border-0">
                    ৳ {{ data.outstanding_amount.toLocaleString() || "-" }}
                  </td>
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
  name: "PrintPOPayments",

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
