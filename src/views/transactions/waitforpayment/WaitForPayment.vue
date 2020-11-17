<!-- =========================================================================================
  File Name: Article.vue
  Description: Article Application to keep you ahead of time
  ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div id="waitforpayment-app" class="waitforpayment-app">
    <vs-tabs>
      <vs-tab icon-pack="feather" icon="icon-shopping-cart" label="Chờ thanh toán">

        <div class=" border border-r-0 border-b-0 border-t-0  d-theme-border-grey-light">
          <vx-card ref="filterCard" title="Ngày đăng bài" class="user-list-filters mb-8"  @refresh="resetColFilters" @remove="resetColFilters">
            <datepicker :format="format" :config="configFromdateTimePicker" class="inline fromDate" v-model="fromDate" placeholder="Từ ngày" @on-change="onFromChange" />
            <datepicker :format="format" :config="configTodateTimePicker" class="inline toDate" v-model="toDate" placeholder="Đến ngày" @on-change="onToChange" />
            <vx-input-group class="mb-base">
              <vs-input class="txtSearch" v-model="input2" />
              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button icon-pack="feather" icon="icon-search" color="primary">Tìm kiếm</vs-button>
                </div>
              </template>
            </vx-input-group>
          </vx-card>
          <div id="data-list-thumb-view" class="data-list-container">
            <!--<data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />-->
            <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" :data="products">
              <template slot-scope="{data}">
                <tbody>
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                    <vs-td class="img-container">
                      <div class="tag-vip">
                        <img v-if="tr.id==100" src="../../../assets/images/icons/vip-1.svg">
                        <img v-else-if="tr.id==99" src="../../../assets/images/icons/vip-2.svg" />
                        <img v-else-if="tr.id==98" src="../../../assets/images/icons/vip-3.svg" />
                        <img v-else-if="tr.id<98" src="../../../assets/images/icons/normal.svg" />
                      </div>
                      <div class="post__detail-thumbnail">
                        <img class="imgicon" src="../../../assets/images/icons/anhnha.jpg" />
                      </div>
                      <div class="post__detail-content">

                        <div :class="changeClass(tr.id)">
                          <span class="head">
                            Cho thuê nhà nguyên căn 80m2 ( 4 phòng ngủ, 1 phòng
                            thờ) hẻm
                            thông, xe hơi, LH: 09871****, chính chủ…
                          </span>
                        </div>
                        <div class="post-body">
                          <span class="location">
                            <map-pin-icon size="1.5x" class="custom-class"></map-pin-icon>  Quận Đống Đa, Thành phố Hà Nội
                          </span>
                          <div class="d-flex justify-content-between">
                            <div class="width-50">
                              <ul>
                                <li>Mã tin đăng: <a href="#">123456</a></li>
                                <li>Diện tích: 50m2</li>
                                <li>Giá: 320 triệu</li>
                              </ul>
                            </div>
                            <!--<div class="verticalLine">
                      </div>-->
                            <div class="width-50-right">
                              <ul>
                                <li>Hướng: Đông Nam</li>
                                <li>Đường rộng: 3m</li>
                                <li>Nhu cầu: Mua bán nhà đất</li>
                              </ul>
                            </div>
                          </div>

                        </div>
                      </div>
                    </vs-td>

                    <vs-td class="status-grid">
                      <div class="box border-sm">
                        <div class="box-body">
                          <div class="d-flex justify-content-between mb-2">
                            <span class="tag vertical-auto text-gray-text-3 info-block"></span>
                            <span>
                              <button class="btn btn-label-pending text-white  round">
                                Chờ xác
                                nhận
                              </button>
                            </span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto font-bold">Số tiền cần thanh toán:</span>
                            <span class="tag text-gray-text-3 vertical-auto font-bold money">266.000 đ</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto font-bold">Số tiền đã thanh toán:</span>
                            <span class="tag text-gray-text-3 vertical-auto font-bold money">200.000 đ</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto font-bold">Số tiền còn lại:</span>
                            <span class="tag text-gray-text-3 vertical-auto font-bold money">66.000 đ</span>
                          </div>
                          <!--<div class="d-flex justify-content-between mb-2">
                            <span>Phương thức thanh toán:</span>
                            <span>Chuyển khoản ACB</span>
                          </div>-->
                          <div class="d-flex justify-content-between mb-2">
                            <span>Mã đơn hàng:</span>
                            <span>OLDERRQ123</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto">Mô tả:</span>
                            <span>Tin VIP - Gói 15 ngày</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto"></span>
                            <span>Gói đẩy tin 7 ngày</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span></span>
                            <span><a @click="popupActive=true,showPay=false" class="underline">Xem chi tiết và hướng dẫn</a></span>
                          </div>
                        </div>
                      </div>
                    </vs-td>

                    <vs-td class="action">
                      <button class="btn btn-lg btn-blue text-white mb-1"  @click="popupActive=true,showPay=true">Thanh toán ngay</button>
                      <div class="cancel-transaction underline"> <a  @click="openConfirm()">Huỷ giao dịch</a></div>
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </div>
        <vs-popup class="pop" title="THÔNG TIN CHỜ THANH TOÁN" :active.sync="popupActive">
          <div class="d-flex justify-content-between">
            <div class="width-50">
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Thông tin tin đăng</span>
                  <span>
                    <button class="btn-pay text-white  round">
                      Chờ xác nhận
                    </button>
                  </span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Số tiền cần thanh toán:</span>
                  <span class="tag text-gray-text-3 vertical-auto font-bold money-detail">266.000 đ</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Phương thức thanh toán:</span>
                  <span>Chuyển khoản ACB</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Mã đơn hàng:</span>
                  <span>OLDERRQ123</span>
                </div>
              </div>
              <vs-divider></vs-divider>
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Hướng dẫn thanh toán</span>
                </div>
                <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm tips">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="w3">Số TK :</span>
                    <span class="po-left">08459894998</span>
                    <copy-icon size="1.5x" class="custom-class"></copy-icon>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="w3">Chủ TK :</span>
                    <span class="w7">Công Ty Cổ Phần Tập Đoàn MeeyLand</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="w3">Ngân hàng:</span>
                    <span class="w7">Á Châu ACB, Chi nhánh Hoàng Cầu, Q.Đống Đa, Hà Nội</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2 content-transaction">
                    <span>Nội dung chuyển khoản:</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>HN1234-0943561122-OLDERRQ123</span>
                    <copy-icon size="1.5x" class="custom-class"></copy-icon>
                  </div>
                </div>
                <div class="d-flex justify-content-between mb-2 txt-note">
                  <span><i>* Để giao dịch được xử lý nhanh chóng, vui lòng ghi rõ nội dung <br> chuyển khoản như trên khi chuyển tiền/ nộp tiền vào ngân hàng.</i></span>
                </div>
              </div>
            </div>
            <div class="width-50-right">
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Người thanh toán</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Họ và tên:</span>
                  <span class="tag text-gray-text-3 vertical-auto">Nguyễn Tuấn Anh</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Điện thoại:</span>
                  <span>0972 828 929</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Email:</span>
                  <span>abcd@gmail.com</span>
                </div>
              </div>
              <vs-divider></vs-divider>
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Thông tin gói đăng tin</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Mã tin đăng:</span>
                  <span class="tag text-gray-text-3 vertical-auto"><a href="/">HN1234</a></span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Mã tin đăng:</span>
                  <span>Tin VIP 1</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Số ngày đăng tin:</span>
                  <span>7 ngày</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày đăng bài:</span>
                  <span>01/04/2020 07:00</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày kết thúc:</span>
                  <span>08/04/2020 07:00</span>
                </div>
              </div>
              <vs-divider></vs-divider>
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Thông tin gói đẩy tin</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Số ngày up tin:</span>
                  <span>6 ngày</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Số lượt:</span>
                  <span>23</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày up tin:</span>
                  <span>01/04/2020 07:00</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày kết thúc:</span>
                  <span>08/04/2020 07:00</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showPay==true" class="footer-action">
            <button  class="btn-pay text-white  round btn-payment">
              Chọn phương thức thanh toán khác
            </button>
          </div>
        </vs-popup>
          <!-- EDIT article DIALOG -->
          <article-edit :displayPrompt="displayPrompt" :taskId="taskIdToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></article-edit>
      </vs-tab>
      <vs-tab label="Chờ nạp tiền" icon-pack="feather" icon="icon-book">
        <div class=" border border-r-0 border-b-0 border-t-0  d-theme-border-grey-light">
          <vx-card ref="filterCard" title="Ngày đăng bài" class="user-list-filters mb-8"  @refresh="resetColFilters" @remove="resetColFilters">
            <datepicker :format="format" :config="configFromdateTimePicker" class="inline fromDate" v-model="fromDate" placeholder="Từ ngày" @on-change="onFromChange" />
            <datepicker :format="format" :config="configTodateTimePicker" class="inline toDate" v-model="toDate" placeholder="Đến ngày" @on-change="onToChange" />
            <vx-input-group class="mb-base">
              <vs-input class="txtSearch" v-model="input2" />
              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button icon-pack="feather" icon="icon-search" color="primary">Tìm kiếm</vs-button>
                </div>
              </template>
            </vx-input-group>
          </vx-card>
          <div id="data-list-thumb-view-pay" class="data-list-container">
            <!--<data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />-->
            <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" :data="products">
              <template slot-scope="{data}">
                <tbody>
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td class="info-pay">
                      <div class="box border-sm">
                        <div class="box-body">
                          <div class="d-flex justify-content-between mb-2">
                            <span class="tag vertical-auto text-gray-text-3 info-block"></span>
                            <span>
                              <button class="btn btn-label-pending text-white  round">
                                Chờ xác nhận
                              </button>
                            </span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto font-bold">Số tiền cần thanh toán:</span>
                            <span class="tag text-gray-text-3 vertical-auto font-bold money">266.000 đ</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span>Tài khoản nhận tiền:</span>
                            <span>Tài khoản chính</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span>Phương thức thanh toán:</span>
                            <span>Chuyển khoản ngân hàng- BIDV</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto">Mã giao dịch:</span>
                            <span>123322222</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="vertical-auto">Thời gian:</span>
                            <span>12/01/2020 08:00</span>
                          </div>
                        </div>
                      </div>
                    </vs-td>
                    <vs-td>
                      <div class="mb-2 guide">
                        <span class="tag vertical-auto text-gray-text-3 info-block tille-detail title-grid">Hướng dẫn thanh toán</span>
                      </div>
                      <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 tips">
                        <div class="d-flex justify-content-between mb-2">
                          <span class="w3">Số tài khoản :</span>
                          <span class="po-left">19134962556032</span>
                          <copy-icon size="1.5x" class="custom-class"></copy-icon>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                          <span class="w3">Chủ sở hữu :</span>
                          <span class="w7">Công Ty Cổ Phần Tập Đoàn MeeyLand</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                          <span class="w3">Ngân hàng:</span>
                          <span class="w7">Ngân hàng Techcombank, Chi nhánh Đông Đô</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2 content-transaction">
                          <span>Nội dung chuyển khoản:</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                          <span>HN1234-0943561122-OLDERRQ123</span>
                          <copy-icon size="1.5x" class="custom-class"></copy-icon>
                        </div>
                      </div>
                    </vs-td>
                    <vs-td class="action">
                      <button class="btn btn-lg btn-blue text-white mb-1" @click="popupActive=true,showPay=true">Thanh toán ngay</button>
                      <div class="cancel-transaction underline"> <a @click="openConfirm()">Huỷ giao dịch</a></div>
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </div>
        <vs-popup class="pop" title="THÔNG TIN CHỜ THANH TOÁN" :active.sync="popupActive">
          <div class="d-flex justify-content-between">
            <div class="width-50">
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Thông tin tin đăng</span>
                  <span>
                    <button class="btn-pay text-white  round">
                      Chờ xác nhận
                    </button>
                  </span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Số tiền cần thanh toán:</span>
                  <span class="tag text-gray-text-3 vertical-auto font-bold money-detail">266.000 đ</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Phương thức thanh toán:</span>
                  <span>Chuyển khoản ACB</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Mã đơn hàng:</span>
                  <span>OLDERRQ123</span>
                </div>
              </div>
              <vs-divider></vs-divider>
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Hướng dẫn thanh toán</span>
                </div>
                <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm tips">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="w3">Số TK :</span>
                    <span class="po-left">08459894998</span>
                    <copy-icon size="1.5x" class="custom-class"></copy-icon>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="w3">Chủ TK :</span>
                    <span class="w7">Công Ty Cổ Phần Tập Đoàn MeeyLand</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="w3">Ngân hàng:</span>
                    <span class="w7">Á Châu ACB, Chi nhánh Hoàng Cầu, Q.Đống Đa, Hà Nội</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2 content-transaction">
                    <span>Nội dung chuyển khoản:</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>HN1234-0943561122-OLDERRQ123</span>
                    <copy-icon size="1.5x" class="custom-class"></copy-icon>
                  </div>
                </div>
                <div class="d-flex justify-content-between mb-2 txt-note">
                  <span><i>* Để giao dịch được xử lý nhanh chóng, vui lòng ghi rõ nội dung <br> chuyển khoản như trên khi chuyển tiền/ nộp tiền vào ngân hàng.</i></span>
                </div>
              </div>
            </div>
            <div class="width-50-right">
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Người thanh toán</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Họ và tên:</span>
                  <span class="tag text-gray-text-3 vertical-auto">Nguyễn Tuấn Anh</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Điện thoại:</span>
                  <span>0972 828 929</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Email:</span>
                  <span>abcd@gmail.com</span>
                </div>
              </div>
              <vs-divider></vs-divider>
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Thông tin gói đăng tin</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Mã tin đăng:</span>
                  <span class="tag text-gray-text-3 vertical-auto"><a href="/">HN1234</a></span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Mã tin đăng:</span>
                  <span>Tin VIP 1</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Số ngày đăng tin:</span>
                  <span>7 ngày</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày đăng bài:</span>
                  <span>01/04/2020 07:00</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày kết thúc:</span>
                  <span>08/04/2020 07:00</span>
                </div>
              </div>
              <vs-divider></vs-divider>
              <div class="">
                <div class="d-flex justify-content-between mb-2">
                  <span class="tag vertical-auto text-gray-text-3 info-block tille-detail">Thông tin gói đẩy tin</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="vertical-auto">Số ngày up tin:</span>
                  <span>6 ngày</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Số lượt:</span>
                  <span>23</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày up tin:</span>
                  <span>01/04/2020 07:00</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Ngày kết thúc:</span>
                  <span>08/04/2020 07:00</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showPay==true" class="footer-action">
            <button class="btn-pay text-white  round btn-payment">
              Chọn phương thức thanh toán khác
            </button>
          </div>
        </vs-popup>
        <!-- EDIT article DIALOG -->
        <article-edit :displayPrompt="displayPrompt" :taskId="taskIdToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></article-edit>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
  import { MapPinIcon, EyeIcon, MessageCircleIcon, MoreVerticalIcon, CopyIcon} from 'vue-feather-icons'
import Datepicker from 'vuejs-datepicker'
import moduleArticle from '@/store/article/moduleArticle.js'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleDataList from '@/store/data-list/moduleDataList.js'
//import DataViewSidebar from './ArticleDetail.vue'
export default {
  data () {
    return {
      format: 'dd/MM/yyyy',
      showPay: false,
      currFilter: '',
      clickNotClose: true,
      displayPrompt: false,
      taskIdToEdit: 0,
      isSidebarActive: true,
      popupActive: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30
      },
      fromDate: null,
      toDate: null,
      configFromdateTimePicker: {
        maxDate: null
      },
      configTodateTimePicker: {
        minDate: null
      },
      selected: [],
      // products: [],
      itemsPerPage: 10,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
      activeConfirm: false
    }
  },
  watch: {
    articleFilter () {
      const scroll_el = this.$refs.taskListPS.$el || this.$refs.taskListPS
      scroll_el.scrollTop = 0
      this.toggleArticleSidebar()
      // Fetch Tasks
      const filter = this.$route.params.filter
      this.$store.dispatch('article/fetchTasks', { filter })
      this.$store.commit('article/UPDATE_TODO_FILTER', filter)
    },
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    article () { return this.$store.state.article.articleArray },
    articleFilter () { return this.$route.params.filter },
    taskList () { return this.$store.getters['article/queriedTasks'] },
    searchQuery: {
      get () { return this.$store.state.article.articleSearchQuery },
      set (val) { this.$store.dispatch('article/setArticleSearchQuery', val) }
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    windowWidth () { return this.$store.state.windowWidth },
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
    showDisplayPrompt (itemId) {
      this.taskIdToEdit = itemId
      this.displayPrompt = true
    },
    hidePrompt () {
      this.displayPrompt = false
    },
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isSidebarActive = this.clickNotClose = false
      } else {
        this.isSidebarActive = this.clickNotClose = true
      }
    },
    toggleArticleSidebar (value = false) {
      if (!value && this.clickNotClose) return
      this.isSidebarActive = value
    },
    onFromChange (selectedDates, dateStr) {
      this.$set(this.configTodateTimePicker, 'minDate', dateStr)
    },
    onToChange (selectedDates, dateStr) {
      this.$set(this.configFromdateTimePicker, 'maxDate', dateStr)
    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      this.$store.dispatch('dataList/removeItem', id).catch(err => { console.error(err) })
    },
    editData (data) {
      debugger
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    getOrderStatusColor (status) {
      if (status === 'on_hold') return 'warning'
      if (status === 'delivered') return 'success'
      if (status === 'canceled') return 'danger'
      return 'primary'
    },
    getPopularityColor (num) {
      if (num > 90) return 'success'
      if (num > 70) return 'primary'
      if (num >= 50) return 'warning'
      if (num < 50) return 'danger'
      return 'primary'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    resetColFilters () {
      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }
      this.$refs.filterCard.removeRefreshAnimation()
    },
    changeClass (value) {
      return {
        'head-vip1': value > 99,
        'head-vip2': value >= 98 && value <= 99,
        'head-vip3': value >= 97 && value <= 98,
        'head-normal': value <= 97
      }
    },
    openConfirm () {
      const options = {
        labels: {
          confirm: 'Thông báo',
          confirmOk: 'Đồng ý',
          confirmCancel: 'Hủy'
        }
      }
      this.$awn.confirm('Xác nhận thực hiện hủy giao dịch này?', this.acceptAlert, null, options)
    },
    acceptAlert () {
      const options = {
        labels: {
          confirm: 'Thông báo',
          confirmOk: 'Đồng ý',
          confirmCancel: 'Hủy'
        }
      }
      this.$awn.confirm('Bạn có đồng ý đăng tin này không?', null, null, options)
    }
  },
  components: {
    //ArticleTask,
    VuePerfectScrollbar,
    Datepicker,
    MapPinIcon,
    EyeIcon,
    MessageCircleIcon,
    MoreVerticalIcon,
    CopyIcon
    //DataViewSidebar
  },
  created () {
    debugger
    this.$store.registerModule('article', moduleArticle)
    this.setSidebarWidth()
    const filter = this.$route.params.filter
    // Fetch Tasks
    this.$store.dispatch('article/fetchTasks', { filter })
    this.$store.commit('article/UPDATE_TODO_FILTER', filter)
    // Fetch Tags
    this.$store.dispatch('article/fetchTags')
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule('dataList', moduleDataList)
      moduleDataList.isRegistered = true
    }
    this.$store.dispatch('dataList/fetchDataListItems')
  },
  beforeUpdate () {
    this.currFilter = this.$route.params.filter
  },
  beforeDestroy () {
    this.$store.unregisterModule('article')
  },
  mounted () {
    this.$store.dispatch('article/setArticleSearchQuery', '')
    this.isMounted = true
  }
}
</script>

<style lang="scss">
  .pop {
    .vs-popup {
				min-width: 900px !important;
     }
  }
  @import "@/assets/scss/vuexy/transactions/waitforpayment.scss";
</style>
