<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar position-right click-not-close parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Tạo lịch đẩy tin</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <div>
    </div>
    <vx-card>
        <vs-table :data="transaction">
            <template slot="thead">
                <vs-th>Mã giao dịch</vs-th>
                <vs-th>Số tiền</vs-th>
                <vs-th>Trạng thái</vs-th>
                <vs-th>Phương thức thanh toán</vs-th>
                <vs-th>Ngày tạo giao dịch</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="data[indextr].code">
                        {{data[indextr].code}}
                    </vs-td>
                    <vs-td :data="data[indextr].money">
                        {{data[indextr].money}}
                    </vs-td>
                    <vs-td :data="data[indextr].id">
                        {{data[indextr].status}}
                    </vs-td>
                    <vs-td :data="data[indextr].method">
                        {{data[indextr].method}}
                    </vs-td>
                    <vs-td :data="data[indextr].date">
                      {{data[indextr].date}}
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
    </vx-card>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {
      'transaction': [
        {
          'id': 1,
          'code': '12345',
          'money': '12.000 VNĐ',
          'status': 'Thành công',
          'method': 'ATM Online -BIDV',
          'date': '10/10/2020'
        },
        {
          'id': 2,
          'code': '2332222',
          'money': '12.000 VNĐ',
          'status': 'Thành công',
          'method': 'ATM Online -MB',
          'date': '12/10/2020'
        },
        {
          'id': 3,
          'code': '12345',
          'money': '12.000 VNĐ',
          'status': 'Thất bại',
          'method': 'Chuyển khoản -TECH',
          'date': '11/10/2020'
        },
        {
          'id': 4,
          'code': '535355',
          'money': '12.000 VNĐ',
          'status': 'Thành công',
          'method': 'Chuyển khoản -TECH',
          'date': '10/10/2020'
        }
      ]
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() && this.dataName && this.dataCategory && this.dataPrice > 0
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  }
}
</script>
<style lang="scss">
  @import "@/assets/scss/vuexy/apps/articledetail.scss";
</style>
<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    left: auto;
    position: fixed !important;
    left: 50% !important;
    top: 50% !important;
    width: 70%;
    height: 85%;
    -ms-transform: translate(-50%,-50%) !important;
    -moz-transform: translate(-50%,-50%) !important;
    -webkit-transform: translate(-50%,-50%) !important;
    transform: translate(-50%,-50%) !important;
    max-width: 90vw;
    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}
.vx-card {
    overflow:auto;
    max-height: 700px;
}
.vs-table--thead th {
    background: #e5e7f3;
}
.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
.d-flex {
   width: 70%;
   height: 100px;
   padding-left: 3%;
   padding-top: 1%;
}
li {
   padding-bottom: 5%;
}
</style>
