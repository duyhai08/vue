<!-- =========================================================================================
  File Name: DataListThumbView.vue
  Description: Data List - Thumb View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-bank-account" class="data-list-container">

    <vs-popup class="holamundo class-popup-bank-account" :title="$t('AddNewBankAccount')" :active.sync="popupActive">
      <bank-account-info></bank-account-info>
    </vs-popup>

    <div>
      <vs-button @click="clickItem" icon-pack="feather" icon="icon-plus-circle" type="border">
        {{ $t("AddNewBankAccount") }}
      </vs-button>
    </div>
    <!--<data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />-->

    <vs-table ref="table" v-model="selected" :data="datas">

      <template slot="thead">
        <vs-th></vs-th>
        <vs-th>{{ $t("CardInfomation") }}</vs-th>
        <vs-th>{{ $t("Status") }}</vs-th>
        <vs-th>{{ $t("CreateDate") }}</vs-th>
        <vs-th>{{ $t("Action") }}</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="image-container">
              <img v-if="tr.is_default === '1'" src="../../../assets/images/icons/star.svg" class="product-img" />
            </vs-td>
            <vs-td class="img-container-large">
              <div class="post__detail-content">

                <div class="post-header">
                  <span>
                    {{ tr.full_name }}
                  </span>
                </div>
                <div class="post-body">
                  <span>
                    {{ tr.account_number }}
                  </span>
                  <span>
                    {{ tr.branch_name }}
                  </span>
                </div>
              </div>
            </vs-td>

            <vs-td class="status-container">
              <span v-if="tr.status === 'Đã xác thực'" class="class-authorized-bank-account">{{ tr.status }}</span>
              <span v-else class="class-unauthorized-bank-account">{{ tr.status }}</span>
            </vs-td>

            <vs-td class="status-container">
              <p class="">{{ tr.create_date }}</p>
            </vs-td>

            <vs-td>
              <div class="vx-row">
                <div class="vx-col sm:w-full w-full mb-2">
                  <vs-button v-if="tr.is_default === '0'" color="success" type="filled" style="width:170px" @click="openConfirm">{{ $t("SetDefault") }}</vs-button>
                </div>
                <div class="vx-col sm:w-full w-full mb-2">
                  <vs-button color="danger" type="filled" style="width:170px"  @click="openConfirmDelete">{{ $t("Delete") }}</vs-button>
                </div>
              </div>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { MapPinIcon, CalendarIcon, EyeIcon, MessageSquareIcon, PlusCircleIcon   } from 'vue-feather-icons'
import DataViewSidebar from '../../ui-elements/data-list/DataViewSidebar.vue'// '../../ui-elements/data-list/DataViewSidebar.vue'
import moduleDataList from '@/store/data-list/moduleDataList.js'
import datas from './data.json'
import BankAccountInfo from './BankAccountInfo.vue'

export default {
  components: {
    DataViewSidebar,
    MapPinIcon,
    CalendarIcon,
    EyeIcon,
    MessageSquareIcon,
    PlusCircleIcon,
    BankAccountInfo
  },
  data () {
    return {
      datas,
      selected: [],
      // products: [],
      itemsPerPage: 50,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
      popupActive: false
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    products () {
      return this.$store.state.dataList.products
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
    }
  },
    methods: {
      openConfirm () {
        const options = {
          labels: {
            confirm: 'Thông báo',
            confirmOk: 'Đồng ý',
            confirmCancel: 'Hủy'
          }
        }
        this.$awn.confirm('Xác nhận đặt tài khoản này làm tài khoản mặc định khi rút tiền?', this.acceptAlert, null, options)
      },
      openConfirmDelete () {
        const options = {
          labels: {
            confirm: 'Thông báo',
            confirmOk: 'Đồng ý',
            confirmCancel: 'Hủy'
          }
        }
        this.$awn.confirm('Xác nhận thực hiện xóa tài khoản ngân hàng?', this.acceptAlert, null, options)
      },
      clickItem () {
        this.popupActive = true
      },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      this.$store.dispatch('dataList/removeItem', id).catch(err => { console.error(err) })
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    getOrderStatusColor (status) {
      if (status === 'on_hold')   return 'warning'
      if (status === 'delivered') return 'success'
      if (status === 'canceled')  return 'danger'
      return 'primary'
    },
    getPopularityColor (num) {
      if (num > 90)  return 'success'
      if (num > 70)  return 'primary'
      if (num >= 50) return 'warning'
      if (num < 50)  return 'danger'
      return 'primary'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule('dataList', moduleDataList)
      moduleDataList.isRegistered = true
    }
    this.$store.dispatch('dataList/fetchDataListItems')
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">

  #data-list-bank-account {
    .vs-con-table
  {

    .status-container
  {
    max-width: 40rem;
    width: 170px;
  }
  .image-container {
    max-width: 20rem;
    width: 100px;
    text-align: center !important;
  }
  .img-container-large {
      max-width: 70rem;
      width: 350px;
    }
  .class-authorized-bank-account {
    color: green;
    background-color: #D8F6CE;
    border-radius: 10px;
    padding: 3px;
  }
  .class-unauthorized-bank-account {
    color: red;
    background-color: #ffb8aa;
    border-radius: 10px;
    padding: 3px;
  }
    .product-name {
      max-width: 6rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;


      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            &.img-container-large {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: flex-start;
              }

              .product-img {
                height: 110px;
                float: right;
              }
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
