<template>
  <div v-if="data">
    <div class="card-body">
      <!--            Body-->
      <!--              Table-->
      <div id="printArea">
        <div class="d-flex flex-wrap ">
          <div v-for="(item, index) in data.items" :key="index" :class="`mx-3 ${((index+1)%3==0)?'':''}`" style="width: 490px; min-height: 100vh">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-center align-items-center"
              >
                <div class="me-4">
                  <h1>Logo</h1>
                </div>
                <div class="">
                  <div class="">
                    <span class="display-6"> M/S RAIAN TRADERS</span>
                  </div>
                  <!--            <img alt="Logo" src="media/logos/light.png" class="h-50px logo">-->
                  <div class="text-center">
                    Burumari, Patgram, Lalmonirhat | Mob: 013 9000 4242
                  </div>
                </div>
              </div>
              <div class="col-12 text-center py-3">
                <span class="h2">Delivery Chalan</span>
              </div>
            </div>

            <div class="row">
              <div class="col-6 mb-3">
                <span class="fw-bolder"
                  >Chalan No. RT {{ item.chalan_no }}</span
                >
              </div>

              <div class="col-6 mb-2 text-end">
                <span class="fw-bolder"> Date: {{ item.delivery_date }}</span>
              </div>

              <div class="col-12 mb-2">
                Delivery Place & Address:
                <span class="fw-bold">{{
                  data.so_details.project_location
                }}</span>
              </div>

              <div class="col-12 mb-2">
                Delivery Contact No:
                <span class="fw-bold">0123456789</span>
              </div>

              <div class="col-6 mb-2">
                Truck Reg No:
                <span class="fw-bold">{{ item.license_plate }}</span>
              </div>

              <div class="col-6 mb-2">
                Driver Contact No:
                <span class="fw-bold">0175623665544</span>
              </div>
            </div>

            <div class="row mt-3">
              <div class="d-flex justify-content-center col-12">
                <div style="width: 90px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">L</span>
                </div>

                <div class="text-center p-2">X</div>

                <div style="width: 90px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">W</span>
                </div>

                <div class="text-center p-2">X</div>

                <div style="width: 90px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">H</span>
                </div>

                <div class="text-center p-2">=</div>

                <div style="width: 150px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">CFT</span>
                </div>
              </div>

              <div class="col-12 mt-2">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Description</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ item.item_name }}</td>
                      <td>{{ item.delivered_quantity }}</td>
                      <td>{{ item.item_rate }}</td>
                      <td>{{ item.total_amount.toLocaleString() }} Taka</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-12">
                <ul class="list-unstyled">
                  <li>
                    <span class="fw-bold">Terms: </span>
                    <ul>
                      <li>
                        উপরে বর্ণিত
                        ...........................................................................
                        মালামাল বুঝিয়া পাইলাম। গ্রহনকৃত মালামাল ডেলিভারির
                        ক্ষেত্রে সর্বচ্চ ................................. ইঞ্চি
                        সংকোচন গ্রহনযোগ্য।
                      </li>
                      <li>
                        গ্রহনযোগ্য মালামাল সর্বোচ্চ দুই কার্যদিবসের মধ্যে
                        প্রাপকের কাছে সরবারহ করতে হবে।
                      </li>
                      <li>
                        উপরোক্ত শর্ত ভাঙলে জরিমানা এবং ডেলিভারি পূর্বে মালামালের
                        পরিমাণ কন ক্ষতির ক্ষেত্রে ক্ষতিপূরণের দায়ভার আমি
                        .................................... বহন করব।
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div class="col-12 mt-3 text-center">
                <span class="fw-light fs-3">For Customer Use Only</span>
              </div>
              <div class="d-flex justify-content-center col-12 mx-1">
                <div style="width: 90px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">L</span>
                </div>

                <div class="text-center p-2">X</div>

                <div style="width: 90px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">W</span>
                </div>

                <div class="text-center p-2">X</div>

                <div style="width: 90px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">H</span>
                </div>

                <div class="text-center p-2">=</div>

                <div style="width: 150px" class="border border-dark text-center p-2">
                  <span style="color: #eaeaea">CFT</span>
                </div>
              </div>

              <div class="col-12 mt-3">
                <span class="fw-light"
                  >Received By
                  ...........................................................................</span
                >
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintModal",

  data() {
    // Parameters that change depending on the type of dialogue
    return {
      roster: undefined, // Main content
      title: undefined,
      data: undefined,
    };
  },

  methods: {
    resetData() {
      this.roster = undefined;
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
      // @page {
      //   size: A4 landscape;
      // }
      WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
    <style>

    </style>
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
  display: table-row!important;
}

.container {
  display: flex;
  /*flex-wrap: wrap;*/
}
</style>
