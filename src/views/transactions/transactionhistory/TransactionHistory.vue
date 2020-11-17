<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-user-list">

    <vx-card ref="filterCard" title="Ngày đăng bài" class="user-list-filters mb-8"  @refresh="resetColFilters" @remove="resetColFilters">
      <div class="vx-row firt-row">
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <datepicker  :format="format" class="inline fromDate" v-model="fromDate" placeholder="Từ ngày" @on-change="onFromChange" />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <datepicker :format="format"  class="inline toDate" v-model="toDate" placeholder="Đến ngày" @on-change="onToChange" />
        </div>
        <div class="vx-col md:w-3/6 sm:w-1/2 w-full">
          <vx-input-group>
            <vs-input class="txtSearch" v-model="input2" />
            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button icon-pack="feather" icon="icon-search" color="primary">Tìm kiếm</vs-button>
              </div>
            </template>
          </vx-input-group>
        </div>
      </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
            <v-select :options="roleOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="roleFilter" class="mb-4 md:mb-0" />
          </div>
          <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
            <v-select :options="statusOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="statusFilter" class="mb-4 md:mb-0" />
          </div>
          <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
            <v-select :options="isVerifiedOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="isVerifiedFilter" class="mb-4 sm:mb-0" />
          </div>
          <!--<div class="vx-col md:w-1/6 sm:w-1/2 w-full cursor">
              <vs-dropdown vs-trigger-click class="cursor-pointer">
                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ usersData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : usersData.length }} of {{ usersData.length }}</span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>-->
                <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                <!--<vs-dropdown-menu>

                  <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                    <span>25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                    <span>30</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
          </div>-->
        </div>
    </vx-card>
    <div class="vx-card p-6">
      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />
    </div>
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker'

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
  import CellRendererStatus from './cell-renderer/CellRendererStatus.vue'
  import CellRendererActions from './cell-renderer/CellRendererActions.vue'
export default {
  components: {
    AgGridVue,
    vSelect,
    Datepicker,
    CellRendererStatus,
    CellRendererActions
  },
  data () {
    return {
      format: 'dd/MM/yyyy',
      fromDate: null,
      toDate: null,
      configFromdateTimePicker: {
        maxDate: null
      },
      configTodateTimePicker: {
        minDate: null
      },
      // Filter Options
      roleFilter: { label: 'Loại giao dịch', value: 'all' },
      roleOptions: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Nạp tiền', value: 'admin' },
        { label: 'Chuyển tiền', value: 'user' },
        { label: 'Thanh toán', value: 'staff' },
        { label: 'Nhận chuyển tiền', value: 'staff' },
        { label: 'Hoàn tiền', value: 'staff' },
        { label: 'Trả thưởng', value: 'staff' },
        { label: 'Rút tiền', value: 'staff' }
      ],

      statusFilter: { label: 'Phương thức', value: 'all' },
      statusOptions: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Chuyển khoản', value: 'active' },
        { label: 'Thẻ/TK nội địa', value: 'deactivated' },
        { label: 'TK Meey', value: 'blocked' }
      ],

      isVerifiedFilter: { label: 'Trạng thái', value: 'all' },
      isVerifiedOptions: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Thành công', value: 'yes' },
        { label: 'Đang xử lý', value: 'no' },
        { label: 'Chờ xác nhận', value: 'no' },
        { label: 'Thất bại', value: 'no' }
      ],
      searchQuery: '',

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        //sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Thời gian',
          field: 'id',
          minWidth: 150,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },
        {
          headerName: 'Loại giao dịch',
          field: 'username',
          filter: true,
          minWidth: 200
        },
        {
          headerName: 'Phương thức thanh toán',
          field: 'name',
          filter: true,
          minWidth: 200
        },
        {
          headerName: 'Số tiền',
          field: 'department',
          filter: true,
          minWidth: 150
        },
        {
          headerName: 'Tình trạng',
          field: 'status',
          filter: true,
          minWidth: 150,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: '',
          field: 'transactions',
          minWidth: 150,
          cellRendererFramework: 'CellRendererActions'
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererStatus,
        CellRendererActions
      }
    }
  },
  watch: {
    roleFilter (obj) {
      this.setColumnFilter('role', obj.value)
    },
    statusFilter (obj) {
      this.setColumnFilter('status', obj.value)
    },
    isVerifiedFilter (obj) {
      const val = obj.value === 'all' ? 'all' : obj.value === 'yes' ? 'true' : 'false'
      this.setColumnFilter('is_verified', val)
    }
  },
  computed: {
    usersData () {
      return this.$store.state.userManagement.users
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 20
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
    }
  },
  methods: {
    setColumnFilter (column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if (val !== 'all') {
        modelObj = { type: 'equals', filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    resetColFilters () {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null)
      this.gridApi.onFilterChanged()

      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = { label: 'All', value: 'all' }

      this.$refs.filterCard.removeRefreshAnimation()
    },
    onFromChange (selectedDates, dateStr) {
      this.$set(this.configTodateTimePicker, 'minDate', dateStr)
    },
    onToChange (selectedDates, dateStr) {
      this.$set(this.configFromdateTimePicker, 'maxDate', dateStr)
    },
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.gridApi.sizeColumnsToFit()
    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    //if (this.$vs.rtl) {
    //  const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
    //  header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    //}
    },
  beforeDestroy () {
    this.gridApi = {}
    this.gridOptions = {}
  },
  created () {
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.$store.dispatch('userManagement/fetchUsers').catch(err => { console.error(err) })
  }
}
</script>
<style lang="scss">
  @import "@/assets/scss/vuexy/transactions/transactionhistory.scss";
</style>
