<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="article-detail">
    <!-- Component: Detail Arcticle-->
    <vx-card>
      <!-- Component: Property-->
      <div class="mb-8-detail">
        <div class="img-container-detail">
          <div class="tag-vip-detail">
            <img v-if="user_data==100" src="../../../assets/images/icons/vip-1.svg">
            <img v-else-if="user_data==99" src="../../../assets/images/icons/vip-2.svg" />
            <img v-else-if="user_data==98" src="../../../assets/images/icons/vip-3.svg" />
            <img v-else-if="user_data<98" src="../../../assets/images/icons/normal.svg" />
          </div>
          <div class="post__detail-thumbnail-detail">
            <img class="imgicon" src="../../../assets/images/icons/anhnha.jpg" />

          </div>
          <div class="post__detail-content">

            <div :class="changeClass(user_data)">
              <span class="head">
                Cho thuê nhà nguyên căn 80m2 ( 4 phòng ngủ, 1 phòng
                thờ) hẻm
                thông, xe hơi, LH: 09871****, chính chủ…
              </span>
            </div>
            <div class="post-body">
              <span>
                <map-pin-icon size="1.5x" class="custom-class"></map-pin-icon> <span class="text-light-default text-icon">
                  Quận Đống Đa, Thành phố Hà Nội
                </span>
              </span>
              <div class="d-flex justify-content-between">
                <div class="width-50">
                  <ul>
                    <li>Mã tin đăng: 123456</li>
                    <li>Diện tích: 50m2</li>
                    <li>Giá: 320 triệu</li>
                    <li><a href="/"><b>Xem bài đăng</b></a></li>
                  </ul>
                </div>
                <div class="width-50">
                  <ul>
                    <li>Hướng: Đông Nam</li>
                    <li>Đường rộng: 3m</li>
                    <li>Nhu cầu: Mua bán nhà đất</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="infoview">
          <ul>
            <li class="mb-2">
              <button type="button" :class="changeClassButton(user_data)"
                      class="btn btn-sm btn-type text-white">
                <lable v-if="user_data==100">VIP 1</lable>
                <lable v-else-if="user_data==99">VIP 2</lable>
                <lable v-else-if="user_data==98">VIP 3</lable>
                <lable v-else-if="user_data<98">Thường</lable>
              </button>
            </li>
            <li>
              <eye-icon size="1x" class="custom-class"></eye-icon>
              <h3 class="inline">2.7 K</h3>
            </li>
            <li>
              <span class="text-light-default text-icon lbl-view-detail"> Lượt xem</span>
            </li>
            <li>
              <message-circle-icon size="1x" class="custom-class"></message-circle-icon>
              <span class="text-light-default text-icon"><a href="/apps/chat">20 lượt chat</a></span>
            </li>
          </ul>
        </div>
        <vs-td class="lst-action">
          <vs-dropdown class="cursor-pointer flex" vs-custom-content>
            <feather-icon icon="MoreVerticalIcon" svgClasses="h-5 w-5 more-select" />
            <vs-dropdown-menu style="z-index: 200001">
              <vs-dropdown-item class="lst-click" @click.stop :key="index">
                <ul>
                  <li>
                    <a  class="flex items-center text-sm">
                      <feather-icon icon="EditIcon" svgClasses="w-5 h-5" />
                      <span class="ml-2">Sửa</span>
                    </a>
                  </li>
                  <li>
                    <a  class="flex items-center text-sm">
                      <feather-icon icon="ArrowUpCircleIcon" svgClasses="w-5 h-5" />
                      <span class="ml-2">Mua up tin</span>
                    </a>
                  </li>
                  <li>
                    <a class="flex items-center text-sm">
                      <feather-icon icon="CheckCircleIcon" svgClasses="w-5 h-5" />
                      <span class="ml-2">Mua tin VIP</span>
                    </a>
                  </li>
                  <li>
                    <a class="flex items-center text-sm">
                      <feather-icon icon="ArrowDownCircleIcon" svgClasses="w-5 h-5" />
                      <span class="ml-2">Hạ tin</span>
                    </a>
                  </li>
                  <li>
                    <a class="flex items-center text-sm">
                      <feather-icon icon="InfoIcon" svgClasses="w-5 h-5" />
                      <span class="ml-2">Xem chi tiết</span>
                    </a>
                  </li>
                </ul>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </vs-td>
      </div>

      <!-- Component: Detail Transaction-->
      <div class="mt-base">
        <div slot="no-body">
          <vs-collapse accordion :type="type"  >

            <vs-collapse-item >
              <div slot="header" class="lbl-order-id">Mã đơn hàng: <a  @click="popupActive=true">123456</a></div>
              <vs-collapse>

                <div open>

                  <div slot="header" class="head-collapse-item">
                    <div class="newfeed">
                      <img class="iconvip" src="../../../assets/images/icons/subscription-up.svg" />
                      <label class="lbl-text-vip">Gói đẩy tin 7 ngày (28 lượt)</label>
                    </div>
                    <div class="process">
                      <label class="tille">50%</label>
                      <vs-progress class="nav-process" :height="6" :percent="50" color="primary"></vs-progress>
                    </div>
                    <div class="status-process">
                      <div class="w-part-process">Đang thực hiện</div>
                    </div>

                  </div>
                  <vs-table :data="updetail">
                    <template slot="thead">
                      <vs-th>Tổng số ngày đã chọn</vs-th>
                      <vs-th>Ngày bắt đầu</vs-th>
                      <vs-th>Tổng số lượt đẩy tin</vs-th>
                      <vs-th>Tổng số lượt đã thực hiện</vs-th>
                      <vs-th>Còn lại</vs-th>
                      <vs-th>Dự kiến kết thúc</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].date">
                          {{data[indextr].date}}
                        </vs-td>
                        <vs-td :data="data[indextr].date-start">
                          {{data[indextr].date-start}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalup">
                          {{data[indextr].totalup}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalup">
                          {{data[indextr].totalup}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalnow">
                          {{data[indextr].totalnow}}
                        </vs-td>
                        <vs-td :data="data[indextr].email">
                          {{data[indextr].date-start}}
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>

                <div open>

                  <div slot="header" class="head-collapse-item">
                    <div class="newfeed">
                      <img class="iconvip" src="../../../assets/images/icons/vip-1.svg" />
                      <label class="lbl-text-vip">Gói tin VIP 1-7 ngày</label>
                    </div>
                    <div class="process">
                      <label class="tille">100%</label>
                      <vs-progress class="nav-process" :height="4" :percent="100" color="primary"></vs-progress>
                    </div>
                    <div class="status-process">
                      <div class="w-part">Hoàn thành</div>
                    </div>
                  </div>
                  <vs-table :data="updetail">
                    <template slot="thead">
                      <vs-th>Tổng số ngày đã chọn</vs-th>
                      <vs-th>Ngày bắt đầu</vs-th>
                      <vs-th>Số ngày đã thực hiện</vs-th>
                      <vs-th>Số ngày còn lại</vs-th>
                      <vs-th>Dự kiến kết thúc</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].date">
                          {{data[indextr].date}}
                        </vs-td>
                        <vs-td :data="data[indextr].date-start">
                          {{data[indextr].date-start}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalup">
                          {{data[indextr].totalup}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalnow">
                          {{data[indextr].totalnow}}
                        </vs-td>
                        <vs-td :data="data[indextr].email">
                          {{data[indextr].date-start}}
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </vs-collapse>
            </vs-collapse-item>

            <vs-collapse-item>
              <div slot="header" class="lbl-order-id">Mã đơn hàng: <a @click="popupActive=true">23322222</a></div>
              <vs-collapse class="collapse-main">

                <div open>

                  <div slot="header" class="head-collapse-item">
                    <div class="newfeed">
                      <img class="iconvip" src="../../../assets/images/icons/subscription-up.svg" />
                      <label class="lbl-text-vip">Gói đẩy tin 7 ngày (28 lượt)</label>
                    </div>
                    <div class="process">
                      <label class="tille">70%</label>
                      <vs-progress class="nav-process" :height="4" :percent="70" color="primary"></vs-progress>
                    </div>
                    <div class="status-process">
                      <div class="w-part-process">Đang thực hiện</div>
                    </div>

                  </div>
                  <vs-table :data="updetail">
                    <template slot="thead">
                      <vs-th>Tổng số ngày đã chọn</vs-th>
                      <vs-th>Ngày bắt đầu</vs-th>
                      <vs-th>Tổng số lượt đẩy tin</vs-th>
                      <vs-th>Tổng số lượt đã thực hiện</vs-th>
                      <vs-th>Còn lại</vs-th>
                      <vs-th>Dự kiến kết thúc</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].date">
                          {{data[indextr].date}}
                        </vs-td>
                        <vs-td :data="data[indextr].date-start">
                          {{data[indextr].date-start}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalup">
                          {{data[indextr].totalup}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalup">
                          {{data[indextr].totalup}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalnow">
                          {{data[indextr].totalnow}}
                        </vs-td>
                        <vs-td :data="data[indextr].email">
                          {{data[indextr].date-start}}
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>

                <div open>

                  <div slot="header" class="head-collapse-item">
                    <div class="newfeed">
                      <img class="iconvip" src="../../../assets/images/icons/vip-1.svg" />
                      <label class="lbl-text-vip">Gói tin VIP 1-7 ngày</label>
                    </div>
                    <div class="process">
                      <label class="tille">100%</label>
                      <vs-progress class="nav-process" :height="4" :percent="100" color="primary"></vs-progress>
                    </div>
                    <div class="status-process">
                      <div class="w-part">Hoàn thành</div>
                    </div>
                  </div>
                  <vs-table :data="updetail">
                    <template slot="thead">
                      <vs-th>Tổng số ngày đã chọn</vs-th>
                      <vs-th>Ngày bắt đầu</vs-th>
                      <vs-th>Số ngày đã thực hiện</vs-th>
                      <vs-th>Số ngày còn lại</vs-th>
                      <vs-th>Dự kiến kết thúc</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].date">
                          {{data[indextr].date}}
                        </vs-td>
                        <vs-td :data="data[indextr].date-start">
                          {{data[indextr].date-start}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalup">
                          {{data[indextr].totalup}}
                        </vs-td>
                        <vs-td :data="data[indextr].totalnow">
                          {{data[indextr].totalnow}}
                        </vs-td>
                        <vs-td :data="data[indextr].email">
                          {{data[indextr].date-start}}
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </vs-collapse>
            </vs-collapse-item>
          </vs-collapse>
        </div>
        <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
      </div>

      <vs-popup title="THÔNG TIN THANH TOÁN CỦA ĐƠN HÀNG" :active.sync="popupActive">
        <div class="vx-row">
          <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
            Mã đơn hàng: <b>172722882d</b>
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
            Trạng thái đơn hàng: <a><b>Đang xử lý</b></a>
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/2 w-full ">
            Trạng thái thanh toán: <a><b>Thanh toán 1 phần</b></a>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
            Lý do: Khách hàng hủy
          </div>
          <div class="vx-col md:w-1/3 sm:w-1/2 w-full ">
          </div>
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
      </vs-popup>
    </vx-card>
  </div>
</template>

<script>
// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import DataViewSidebar from './ArticleDetailUp.vue'
import { MapPinIcon, EyeIcon, MessageCircleIcon, MoreVerticalIcon  } from 'vue-feather-icons'

export default {
  components: {
    DataViewSidebar,
    MapPinIcon,
    EyeIcon,
    MessageCircleIcon,
    MoreVerticalIcon
  },
  data () {
    return {
      type: 'border',
      user_data: null,
      user_not_found: false,
      activeTab: 0,
      addNewDataSidebar: false,
      sidebarData: {},
      popupActive: false,
      updetail: [
        {
          'id': 1,
          'date': '7 ngày',
          'date-start': '20/10/2020',
          'totalup': '28 lượt',
          'totalnow': '0 lượt'
        },
        {
          'id': 2,
          'date': '7 ngày',
          'date-start': '20/10/2020',
          'totalup': '28 lượt',
          'totalnow': '0 lượt'
        },
        {
          'id': 3,
          'date': '8 ngày',
          'date-start': '21/10/2020',
          'totalup': '26 lượt',
          'totalnow': '0 lượt'
        }
      ],
      transaction : [
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
  watch: {
    activeTab () {
      this.fetch_user_data(this.$route.params.articleId)
    }
  },
  methods: {
    fetch_user_data (articleId) {
      debugger
      this.$store.dispatch('userManagement/fetchUser', articleId)
        .then(res => { this.user_data = res.data })
        .catch(err => {
          if (err.response.status === 404) {
            this.user_not_found = true
            this.user_data = articleId
            return
          }
          console.error(err) 
        })
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    editData (data) {
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    changeClass (value) {
      return {
        'head-vip1': value > 99,
        'head-vip2': value >= 98 && value <= 99,
        'head-vip3': value >= 97 && value <= 98,
        'head-normal': value <= 97
      }
    },
    changeClassButton (value) {
      return {
        'btn-type-vip1': value > 99,
        'btn-type-vip2': value >= 98 && value <= 99,
        'btn-type-vip3': value >= 97 && value <= 98,
        'btn-type-normal': value <= 97
      }
    }
  },
  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.fetch_user_data(this.$route.params.articleId)
  }
}

</script>
<style lang="scss">
  @import "@/assets/scss/vuexy/apps/articledetail.scss";
</style>
