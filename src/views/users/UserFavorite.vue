<!-- =========================================================================================
  File Name: DataListThumbView.vue
  Description: Data List - Thumb View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-user-favorite" class="data-list-container">

    <!--<data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />-->

    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" :data="products">

      <template slot="thead">
        <vs-th>{{ $t("PostName") }}</vs-th>
        <vs-th>{{ $t("Price") }}</vs-th>
        <vs-th>{{ $t("Acreage") }}</vs-th>
        <vs-th>{{ $t("WidthRoad") }}</vs-th>
        <vs-th>{{ $t("Facade") }}</vs-th>
        <vs-th>{{ $t("Direction") }}</vs-th>
        <vs-th>{{ $t("UserType") }}</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td class="img-container-large">
              <div class="post__detail-thumbnail">
                <img :src="tr.img" class="product-img" />
              </div>
              <div class="post__detail-content">

                <div class="post-header text-purple ellipsis-2-lines">
                  <span style="color:purple" class="">
                    Cho thuê nhà nguyên căn 80m2 ( 4 phòng ngủ, 1 phòng thờ) LH: 09871****, chính chủ…
                  </span>
                </div>
                <div class="post-body">
                  <span>
                    <map-pin-icon size="1x" class="custom-class"></map-pin-icon>  Quận Đống Đa, Thành phố Hà Nội
                  </span>
                  <br />
                  <div class="d-flex justify-content-between">
                    <vs-row>
                      <vs-col vs-w="4">
                        <calendar-icon size="1x" class="custom-class"></calendar-icon> 20/10/2020
                      </vs-col>
                      <vs-col vs-w="4">
                        <eye-icon size="1x" class="custom-class"></eye-icon> 1234 lượt xem
                      </vs-col>
                      <vs-col vs-w="4">
                        <message-square-icon size="1x" class="custom-class"></message-square-icon> Chat ngay
                      </vs-col>
                    </vs-row>
                  </div>

                </div>
              </div>
            </vs-td>


            <vs-td>
              <p class="">1 tỷ</p>
            </vs-td>

            <vs-td>
              <p class="">100 m2</p>
            </vs-td>

            <vs-td>
              <p class="">6 m</p>
            </vs-td>

            <vs-td>
              <p class="">4 m</p>
            </vs-td>

            <vs-td>
              <p class="">Đông nam</p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <p class="">Môi giới</p>
            </vs-td>

          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { MapPinIcon, CalendarIcon, EyeIcon, MessageSquareIcon } from 'vue-feather-icons'
import DataViewSidebar from '../ui-elements/data-list/DataViewSidebar.vue'
import moduleDataList from '@/store/data-list/moduleDataList.js'

export default {
  components: {
    DataViewSidebar,
    MapPinIcon,
    CalendarIcon,
    EyeIcon,
    MessageSquareIcon
  },
  data () {
    return {
      selected: [],
      // products: [],
      itemsPerPage: 50,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {}
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
#data-list-user-favorite {
  .vs-con-table
  {
    .img-container-large {
      max-width: 50rem;
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
