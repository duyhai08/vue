<template>

  <div class="account-balance-container">
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <p class="text-bold-header">{{ $t("BalanceInformation") }}</p>
      </div>
      <div style="text-align:right" class="vx-col sm:w-1/2 w-full mb-2">
        <p class="text-small-header">{{ $t("BalanceUnit") }}</p>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col md:w-full w-full mb-base">
        <vx-card class="card-balance" no-shadow>
          <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <div>
                <span>{{ $t("TotalBalance") }}</span>
              </div>
              <div>
                <p class="balance-number">{{ total_balance }}</p>
              </div>
            </div>
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <div>
                <span>{{ $t("AvalibleBalance") }}</span>
              </div>
              <div>
                <p class="balance-number">{{ avalible_balance }}</p>
              </div>
            </div>
            <div class="vx-col sm:w-1/3 w-full mb-2">
              <div>
                <span>{{ $t("FreezeBalance") }}</span>
              </div>
              <div>
                <p class="balance-number" style="color: #a0a0a0">{{ freeze_balance }}</p>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <p class="text-bold-header">{{ $t("RecentTransactions") }}</p>
      </div>
      <div style="text-align: right; cursor: pointer" class="vx-col sm:w-1/2 w-full mb-2">
        <a @click="show_all">{{ $t("AllTransactions") }}</a>
      </div>
    </div>
    <ag-grid-vue ref="agGridTable"
                 :gridOptions="gridOptions"
                 class="ag-theme-material w-100 my-4 ag-grid-table account-balance-grid"
                 :columnDefs="columnDefs"
                 :defaultColDef="defaultColDef"
                 :rowData="datas"
                 colResizeDefault="shift"
                 :animateRows="true"
                 :floatingFilter="false"
                 :pagination="true"
                 :paginationPageSize="paginationPageSize"
                 :suppressPaginationPanel="true">
    </ag-grid-vue>
    <!--<vs-pagination :total="totalPages"
                   :max="maxPageNumbers"
                   v-model="currentPage" />-->
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import contacts from './data.json'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

  export default {
  components: {
    AgGridVue
  },
  data () {
      return {
        // products: [],
        isMounted: false,
        total_balance: '10.000.000',
        avalible_balance: '7.000.000',
        freeze_balance: '3.000.000',
        searchQuery: '',
        gridOptions: {},
        maxPageNumbers: 7,
        gridApi: null,
        defaultColDef: {
          sortable: false,
          editable: false,
          resizable: true,
          suppressMenu: true
        },
        columnDefs: [
          {
            headerName: 'Thời gian',
            field: 'date_time',
            width: 150,
            cellStyle () {
              return { 'padding-left': '10px' }
            }
            //filter: true,
            //checkboxSelection: true,
            //headerCheckboxSelectionFilteredOnly: true,
            //headerCheckboxSelection: true
          },
          {
            headerName: 'Loại giao dịch',
            field: 'transaction_type',
            width: 175,
            cellStyle () {
              return { 'padding-left': '10px' }
            }
          },
          {
            headerName: 'Phương thức thanh toán',
            field: 'payment_method',
            width: 215,
            headerClass () {
              return { 'word- wrap': 'break-word' }
            },
            cellStyle () {
              return { 'padding-left': '10px' }
            }
          },
          {
            headerName: 'Số tiền (VNĐ)',
            field: 'amount',
            width: 125,
            cellStyle () {
              return { 'text-align': 'left', 'padding-left': '10px' }
            }
          },
          {
            headerName: 'Trạng thái',
            field: 'status',
            width: 120,
            cellStyle (params) {
              if (params.value === 'Thành công') {
                return { 'color': 'green', 'padding-left': '10px' }
              } else if (params.value === 'Thất bại') {
                return { 'color': 'red', 'padding-left': '10px' }
              } else {
                return { 'color': 'black', 'padding-left': '10px' }
              }
            }
          }
        ],
        contacts,
        datas: []
    }
  },
  computed: {
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 50
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
    getdefaultdata () {
      return contacts.slice(0, 5)
    }
    },
    methods: {
      updateSearchQuery (val) {
        this.gridApi.setQuickFilter(val)
      },
      show_all () {
        this.datas = contacts
      }
    },
    mounted () {
      this.isMounted = true
      this.gridApi = this.gridOptions.api
      this.datas = contacts.slice(0, 5)
      this.gridOptions.api.sizeColumnsToFit()
      /* =================================================================
        NOTE:
        Header is not aligned properly in RTL version of agGrid table.
        However, we given fix to this issue. If you want more robust solution please contact them at gitHub
      ================================================================= */
      //if (this.$vs.rtl) {
      //  const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      //  header.style.left = `-${String(Number(header.style.transform.slice(11, -3)) + 9)}px`
      //}
    }
}
</script>
<style lang="scss">
  .text-bold-header {
    font-weight: bold;
    /*padding-left: 10px;*/
    font-size: 14px;
  }
  /*.text-small-header {
    font-size:14px;
    font-style:oblique;
  }*/
  .balance-number {
    color: #1a4bb7;
    font-size: 18px;
    font-weight: bold;
  }

  .card-balance {
    background-color: #f7f7f7;
  }

  .account-balance-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  /*.ag-grid-table {
    
  }*/

  .account-balance-grid {
    margin-top: 0px !important;
    min-height: 300px !important;
    border: 0.5px solid #d2d2d2 !important;
    border-radius: 0.5rem !important;
    .ag-header-cell-label .ag-header-cell-text

  {
    white-space: pre-wrap !important;
  }

  .ag-header-cell {
    padding-left: 10px !important;
    padding-right: 0px !important;
  }

  .ag-header {
    background-color: #f7f7f7 !important;
    min-height: 50px !important;
    height: 50px !important;
  }

  .ag-header-row {
    min-height: 50px !important;
    height: 50px !important;
  }

  .ag-row:last-child {
    border-style: none !important;
    border-top: 0.5px solid #e2e2e2 !important;
  }
  }
  
</style>

