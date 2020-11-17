<!-- =========================================================================================
  File Name: note.vue
  Description: note Application to keep you ahead of time
  ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div id="note-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <vs-sidebar class="items-no-padding" parent="#note-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
      <!--<note-add-new />-->
      <component :is="scrollbarTag" class="note-scroll-area" :settings="settings" :key="$vs.rtl">
        <note-filters @closeSidebar="toggleArticleSidebar"></note-filters>
      </component>
    </vs-sidebar>
    <div :class="{'sidebar-spacer': clickNotClose}" class=" border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light">
      <vx-card ref="filterCard" title="Tìm kiếm" class="user-list-filters mb-8" actionButtons @refresh="resetColFilters" @remove="resetColFilters">
        <vx-input-group class="mb-base">
          <vs-input class="txtSearch" />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button icon-pack="feather" icon="icon-search" color="primary">Tìm kiếm</vs-button>
            </div>
          </template>
        </vx-input-group>
      </vx-card>
      <div id="data-list-thumb-view" class="data-list-container">
        <vs-table ref="table"  v-model="selected" pagination :max-items="itemsPerPage" :data="products">
          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  <div class="post__detail-content">
                    <div class="title-grid">
                      <label> Cần liên hệ với khách hàng sớm</label>
                    </div>
                    <div>
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
                            </ul>
                          </div>
                          <div class="width-50-right">
                            <ul>
                              <li>Hướng: Đông Nam</li>
                            </ul>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between">
                          <div class="width-50">
                            <ul>
                              <li>Diện tích: 50m2</li>
                              <li>Giá: 320 triệu</li>
                            </ul>
                          </div>
                          <div class="width-50-right">
                            <ul>
                              <li>Đường rộng: 3m</li>
                              <li>Nhu cầu: Mua bán nhà đất</li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
    </div>

    <!-- EDIT note DIALOG -->
    <note-edit :displayPrompt="displayPrompt" :taskId="taskIdToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></note-edit>
  </div>
</template>

<script>
import { MapPinIcon, EyeIcon, MessageCircleIcon, MoreVerticalIcon} from 'vue-feather-icons'
import moduleArticle from '@/store/article/moduleArticle.js'
import NoteFilters from './NoteFilters.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleDataList from '@/store/data-list/moduleDataList.js'
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
      this.$store.dispatch('note/fetchTasks', { filter })
      this.$store.commit('note/UPDATE_TODO_FILTER', filter)
    },
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    note () { return this.$store.state.note.articleArray },
    articleFilter () { return this.$route.params.filter },
    taskList () { return this.$store.getters['note/queriedTasks'] },
    searchQuery: {
      get () { return this.$store.state.note.articleSearchQuery },
      set (val) { this.$store.dispatch('note/setArticleSearchQuery', val) }
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
    }
  },
  components: {
    NoteFilters,
    VuePerfectScrollbar,
    MapPinIcon,
    EyeIcon,
    MessageCircleIcon,
    MoreVerticalIcon
  },
  created () {
    debugger
    this.$store.registerModule('note', moduleArticle)
    this.setSidebarWidth()
    const filter = this.$route.params.filter
    // Fetch Tasks
    this.$store.dispatch('note/fetchTasks', { filter })
    this.$store.commit('note/UPDATE_TODO_FILTER', filter)
    // Fetch Tags
    this.$store.dispatch('note/fetchTags')
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
    this.$store.unregisterModule('note')
  },
  mounted () {
    this.$store.dispatch('note/setArticleSearchQuery', '')
    this.isMounted = true
  }
}
</script>


<style lang="scss">
  @import "@/assets/scss/vuexy/apps/note.scss";
</style>
