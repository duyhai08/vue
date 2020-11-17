<!-- =========================================================================================
  File Name: Article.vue
  Description: Article Application to keep you ahead of time
  ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div id="article-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <vs-sidebar class="items-no-padding" parent="#article-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
      <!--<article-add-new />-->
      <component :is="scrollbarTag" class="article-scroll-area" :settings="settings" :key="$vs.rtl">
        <article-filters @closeSidebar="toggleArticleSidebar"></article-filters>
      </component>
    </vs-sidebar>
    <div :class="{'sidebar-spacer': clickNotClose}" class=" border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light">
      <vx-card ref="filterCard" title="Ngày đăng bài" class="user-list-filters mb-8"  @refresh="resetColFilters" @remove="resetColFilters">
        <datepicker :format="format"  :config="{ configFromdateTimePicker }" class="inline fromDate" v-model="fromDate" placeholder="Từ ngày" @on-change="onFromChange" />
        <datepicker :format="format"  :config="{ configTodateTimePicker }" class="inline toDate" v-model="toDate" placeholder="Đến ngày" @on-change="onToChange" />
        <vx-input-group class="mb-base">
          <vs-input  class="txtSearch" />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button  icon-pack="feather" icon="icon-search" color="primary">Tìm kiếm</vs-button>
            </div>
          </template>
        </vx-input-group>
      </vx-card>
      <div id="data-list-thumb-view" class="data-list-container">
        <!--<data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />-->
        <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" :data="products">
          <template slot="thead">
            <vs-th>Tin đăng</vs-th>
            <vs-th sort-key="name">Loại hình</vs-th>
            <vs-th sort-key="category">Tình trạng</vs-th>
            <vs-th>Thao tác</vs-th>
          </template>

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

                <vs-td class="td-type">
                  <ul>
                    <li class="mb-2">
                      <button type="button" :class="changeClassButton(tr.id)" class="btn btn-sm btn-type text-white">
                        <lable v-if="tr.id==100">VIP 1</lable>
                        <lable v-else-if="tr.id==99">VIP 2</lable>
                        <lable v-else-if="tr.id==98">VIP 3</lable>
                        <lable v-else-if="tr.id<98">Thường</lable>
                      </button>
                    </li>
                    <li>
                      <eye-icon size="1x" class="custom-class"></eye-icon>
                      <h3 class="inline">2.7 K</h3>
                    </li>
                    <li>
                      <span class="text-light-default text-icon lbl-view"> Lượt view</span>
                    </li>
                    <li class="chat">
                      <message-circle-icon size="1x" class="custom-class"></message-circle-icon>
                      <span class="text-light-default text-icon"> <a href="/apps/chat">1520 lượt chat</a></span>
                    </li>
                  </ul>
                </vs-td>

                <vs-td class="td-status">
                  <ul class="td3">
                    <li class="mb-2">
                      <button type="button" :class="changeTypePost(tr.id)" class="btn btn-sm btn-status">
                        <lable v-if="tr.id==100" class="post-body">Tin đă đăng</lable>
                        <lable v-if="tr.id==99" class="post-body">Tin nháp</lable>
                        <lable v-if="tr.id==98" class="post-body">Tin chưa đăng</lable>
                        <lable v-if="tr.id==97" class="post-body">Tin hết hạn</lable>
                      </button>
                    </li>
                    <li class="text-light-default italic pending-pay">Đang chờ xác nhận thanh toán <a href="/apps/chat">- 39753648785</a></li>
                    <li class="text-light-default italic">Ngày đăng tin: 20/03/2020</li>
                    <li class="text-light-default italic">Tin vip 1 - 7 ngày</li>
                    <li class="text-light-default italic">Up tin thường (30 lượt)</li>
                  </ul>
                </vs-td>
                <vs-td class="lst-btn-detail">
                  <vs-dropdown class="cursor-pointer flex" vs-custom-content>
                    <feather-icon icon="MoreVerticalIcon" svgClasses="h-5 w-5 more-select" />
                    <vs-dropdown-menu style="z-index: 200001">
                      <vs-dropdown-item class="lst-click">
                        <ul>
                          <li>
                            <a :href="$router.resolve({name: 'article-detail', params: { articleId: tr.id }}).href" class="flex items-center text-sm">
                              <feather-icon icon="EditIcon" svgClasses="w-5 h-5" />
                              <span class="ml-2">Sửa</span>
                            </a>
                          </li>
                          <li>
                            <a :href="$router.resolve({name: 'article-detail', params: { articleId: tr.id }}).href" class="flex items-center text-sm">
                              <feather-icon icon="ArrowUpCircleIcon" svgClasses="w-5 h-5" />
                              <span class="ml-2">Mua up tin</span>
                            </a>
                          </li>
                          <li>
                            <a :href="$router.resolve({name: 'article-detail', params: { articleId: tr.id }}).href" class="flex items-center text-sm">
                              <feather-icon icon="CheckCircleIcon" svgClasses="w-5 h-5" />
                              <span class="ml-2">Mua tin VIP</span>
                            </a>
                          </li>
                          <li>
                            <a :href="$router.resolve({name: 'article-detail', params: { articleId: tr.id }}).href" class="flex items-center text-sm">
                              <feather-icon icon="ArrowDownCircleIcon" svgClasses="w-5 h-5" />
                              <span class="ml-2">Hạ tin</span>
                            </a>
                          </li>
                          <li>
                            <a :href="$router.resolve({name: 'article-detail', params: { articleId: tr.id }}).href" class="flex items-center text-sm">
                              <feather-icon icon="InfoIcon" svgClasses="w-5 h-5" />
                              <span class="ml-2">Xem chi tiết</span>
                            </a>
                          </li>
                        </ul>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
    </div>

    <!-- EDIT article DIALOG -->
    <article-edit :displayPrompt="displayPrompt" :taskId="taskIdToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></article-edit>
  </div>
</template>

<script>
import { MapPinIcon, EyeIcon, MessageCircleIcon, MoreVerticalIcon} from 'vue-feather-icons'
import Datepicker from 'vuejs-datepicker'
import moduleArticle from '@/store/article/moduleArticle.js'
import ArticleFilters from './ArticleFilters.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleDataList from '@/store/data-list/moduleDataList.js'
//import DataViewSidebar from './ArticleDetail.vue'
export default {
  data () {
    return {
      format: 'dd/MM/yyyy',
      currFilter: '',
      clickNotClose: true,
      displayPrompt: false,
      taskIdToEdit: 0,
      isSidebarActive: true,
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
      sidebarData: {}
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
    changeClassButton (value) {
      return {
        'btn-type-vip1': value > 99,
        'btn-type-vip2': value >= 98 && value <= 99,
        'btn-type-vip3': value >= 97 && value <= 98,
        'btn-type-normal': value <= 97
      }
    },
    changeTypePost (value) {
      return {
        'btn-type-post': value > 99,
        'btn-type-drap': value >= 98 && value <= 99,
        'btn-type-not-post': value >= 97 && value <= 98,
        'btn-type-expired': value > 96 && value <= 97,
        'btn-type-default': value < 96
      }
    }
  },
  components: {
    //ArticleTask,
    ArticleFilters,
    VuePerfectScrollbar,
    Datepicker,
    MapPinIcon,
    EyeIcon,
    MessageCircleIcon,
    MoreVerticalIcon
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
    this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
  },
  mounted () {
    this.$store.dispatch('article/setArticleSearchQuery', '')
    this.isMounted = true
    this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
  }
}
</script>


<style lang="scss">
  @import "@/assets/scss/vuexy/apps/article.scss";
</style>
