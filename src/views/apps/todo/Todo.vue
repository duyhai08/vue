<!-- =========================================================================================
  File Name: Todo.vue
  Description: Todo Application to keep you ahead of time
  ----------------------------------------------------------------------------------------
========================================================================================== -->


<template>
  <div id="todo-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <vs-sidebar class="items-no-padding" parent="#todo-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">

      <!--<todo-add-new />-->

      <component :is="scrollbarTag" class="todo-scroll-area" :settings="settings" :key="$vs.rtl">
        <todo-filters @closeSidebar="toggleTodoSidebar"></todo-filters>
      </component>

    </vs-sidebar>
    <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content">
      <div class="flex justify-between items-end flex-grow">
          <p>
            Ngày đăng bài
          </p>
        <vs-dropdown vs-custom-content vs-trigger-click>
          <a class="flex items-center" href.prevent>
            <span>Nâng cao</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4 ml-1" />
          </a>

          <vs-dropdown-menu class="dropdown-login">

            <h3 class="mb-0">Login</h3>

            <vs-input type="email" label-placeholder="Email"  />

            <vs-input type="password" label-placeholder="Password"  />

            <vs-button width="100%" color="success" type="gradient" class="mt-4 w-full">Tìm</vs-button>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <div class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">

        <!-- TOGGLE SIDEBAR BUTTON -->
        <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />
        <!-- SEARCH BAR -->

        <div class="filter">
          <div>
            <flat-pickr :config="configFromdateTimePicker" class="inline fromDate" v-model="fromDate" placeholder="Từ ngày" @on-change="onFromChange" />
            <flat-pickr :config="configTodateTimePicker" class="inline toDate" v-model="toDate" placeholder="Đến ngày" @on-change="onToChange" />
          </div>
        </div>
        <vs-input placeholder="Nhập tìm kiếm" v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full" />
        <vs-button @click="activePrompt = true" class="btnFilter">Tìm kiếm</vs-button>
      </div>
      <div id="data-list-thumb-view" class="data-list-container">

        <!--<data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />-->

        <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage"  :data="products">
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
                    <img src="../../../assets/images/icons/vip-1.svg" />
                  </div>
                  <div class="post__detail-thumbnail">
                    <img :src="tr.img" class="product-img" />
                  </div>
                    <div class="post__detail-content">

                      <div class="post-header text-purple ellipsis-2-lines">
                        <span class="">
                          Cho thuê nhà nguyên căn 80m2 ( 4 phòng ngủ, 1 phòng
                          thờ) hẻm
                          thông, xe hơi, LH: 09871****, chính chủ…
                        </span>
                      </div>
                      <div class="post-body">
                        <span>
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
                </vs-td>

                <vs-td>
                  <ul>
                    <li class="mb-2">
                      <button type="button"
                              class="btn btn-sm btn-purple text-white">
                        VIP1
                      </button>
                    </li>
                    <li>
                      <h5>2.7 K</h5>
                    </li>
                    <li>
                      <eye-icon size="1x" class="custom-class"></eye-icon>
                      <span class="text-light-default"> Lượt view</span>
                    </li>
                    <li>
                      <span class="text-loss">-5</span><span class="text-light-default">
                        %
                        trong 7 ngày
                      </span>
                    </li>
                    <li>
                      <message-circle-icon size="1x" class="custom-class"></message-circle-icon>
                      <span class="text-light-default"> 20 lượt chat</span>
                    </li>
                  </ul>
                </vs-td>

                <vs-td>
                  <ul>
                    <li>Bắt đầu: 20/03/2020</li>
                    <li>Kết thúc: 27/04/2020</li>
                    <li><img src="" alt=""> Run</li>
                  </ul>
                </vs-td>
                <vs-td class="whitespace-no-wrap">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />
                </vs-td>

              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>

    </div>

    <!-- EDIT TODO DIALOG -->
    <todo-edit :displayPrompt="displayPrompt" :taskId="taskIdToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></todo-edit>
  </div>
</template>

<script>
import { MapPinIcon } from 'vue-feather-icons'
import { EyeIcon } from 'vue-feather-icons'
import { MessageCircleIcon } from 'vue-feather-icons'

import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moduleTodo from '@/store/todo/moduleTodo.js'
//import TodoAddNew from './TodoAddNew.vue'
import TodoTask from './TodoTask.vue'
import TodoFilters from './TodoFilters.vue'
import TodoEdit from './TodoEdit.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
//import DataViewSidebar from '../DataViewSidebar.vue'
import moduleDataList from '@/store/data-list/moduleDataList.js'
export default {
  data () {
    return {
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
      itemsPerPage: 4,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {}
    }
  },
  watch: {
    todoFilter () {
      const scroll_el = this.$refs.taskListPS.$el || this.$refs.taskListPS
      scroll_el.scrollTop = 0

      this.toggleTodoSidebar()

      // Fetch Tasks
      const filter = this.$route.params.filter
      this.$store.dispatch('todo/fetchTasks', { filter })
      this.$store.commit('todo/UPDATE_TODO_FILTER', filter)
    },
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    todo () { return this.$store.state.todo.todoArray },
    todoFilter () { return this.$route.params.filter },
    taskList () { return this.$store.getters['todo/queriedTasks'] },
    searchQuery: {
      get () { return this.$store.state.todo.todoSearchQuery },
      set (val) { this.$store.dispatch('todo/setTodoSearchQuery', val) }
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
    toggleTodoSidebar (value = false) {
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
    }

  },
  components: {
    // DataViewSidebar,
    //TodoAddNew,
    TodoTask,
    TodoFilters,
    TodoEdit,
    VuePerfectScrollbar,
    flatPickr,
    MapPinIcon,
    EyeIcon,
    MessageCircleIcon
  },
  created () {
    this.$store.registerModule('todo', moduleTodo)
    this.setSidebarWidth()

    const filter = this.$route.params.filter

    // Fetch Tasks
    this.$store.dispatch('todo/fetchTasks', { filter })
    this.$store.commit('todo/UPDATE_TODO_FILTER', filter)

    // Fetch Tags
    this.$store.dispatch('todo/fetchTags')
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
    this.$store.unregisterModule('todo')
  },
  mounted () {
    this.$store.dispatch('todo/setTodoSearchQuery', '')
    this.isMounted = true

  }
}

</script>


<style lang="scss">
  @import "@/assets/scss/vuexy/apps/todo.scss";
</style>
<style lang="scss">
  #data-list-thumb-view {
    .vs-con-table

  {
    .product-name

  {
    max-width: 23rem;
  }

  .vs-table--header {
    display: flex;
    flex-wrap: wrap-reverse;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    > span

  {
    display: flex;
    flex-grow: 1;
  }

  .vs-table--search {
    padding-top: 0;
    .vs-table--search-input

  {
    padding: 0.9rem 2.5rem;
    font-size: 1rem;
    &+i

  {
    left: 1rem;
  }

  &:focus + i {
    left: 1rem;
  }

  }
  }
  }

  .vs-table {
    border-collapse: separate;
    border-spacing: 0 1.3rem;
    padding: 0 1rem;
    tr

  {
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
    td

  {
    padding: 10px;
    &:first-child

  {
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
  }

  &:last-child {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }

  &.img-container {
    // width: 1rem;
    // background: #fff;
    span

  {
    display: flex;
    justify-content: flex-start;
  }

  .product-img {
    height: 110px;
  }

  }
  }

  td.td-check {
    padding: 20px !important;
  }

  }
  }

  .vs-table--thead {
    th

  {
    padding-top: 0;
    padding-bottom: 0;
    .vs-table-text

  {
    text-transform: uppercase;
    font-weight: 600;
  }

  }

  th.td-check {
    padding: 0 15px !important;
  }

  tr {
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
