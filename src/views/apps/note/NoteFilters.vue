<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new note component
========================================================================================== -->


<template>
  <div class="note__filters-container">

    <!-- starred -->
    <div class="px-6 pb-2 pt-6">
      <vs-button icon-pack="feather" icon="icon-plus-circle" @click="activePrompt = true" class="w-full">Thêm ghi chú</vs-button>
      </div>
      <div class="px-6 py-4">
        <template v-for="filter in noteFilters">
          <router-link tag="span" class="flex mt-6 cursor-pointer" :class="{'text-primary': noteFilter == filter.filter}" :to="`${baseUrl}/${filter.filter}`" :key="filter.filter">
            <feather-icon :icon="filter.icon" :svgClasses="[{'text-primary stroke-current': noteFilter == filter.filter}, 'h-6 w-6']"></feather-icon>
            <span class="ml-3">{{ filter.filterName }}</span>
          </router-link>
        </template>
      </div>
      <vs-divider></vs-divider>

      <div class="px-6 py-4">
        <h5>Phân loại</h5>
        <div class="note__lables-list">
          <router-link tag="span" class="note__label flex items-center mt-6 cursor-pointer" v-for="(tag, index) in taskTags" :key="index" :to="`${baseUrl}/${tag.value}`">
            <div class="ml-1 h-3 w-3 rounded-full mr-4" :class="'border-2 border-solid border-' + tag.color" />
            <span class="" :class="{'text-primary': noteFilter == tag.value}">{{ tag.text }}</span>
          </router-link>
        </div>
      </div>

    </div>
</template>

<script>

export default{
  data () {
    return {
      noteFilters: [
        { filterName: 'Tất cả ghi chú', filter: 'all', icon: 'LayersIcon' },
        { filterName: 'Tin đã đăng', filter: 'starred', icon: 'StarIcon' },
        { filterName: 'Tin chưa đăng', filter: 'not', icon: 'FileIcon' },
        { filterName: 'Tin có đơn hàng chưa thanh toán', filter: 'important', icon: 'InfoIcon' },
        { filterName: 'Tin nháp', filter: 'trashed', icon: 'FileTextIcon' },
        { filterName: 'Tin hết hạn', filter: 'trasheds', icon: 'XIcon' }
      ]
    }
  },
  computed: {
    taskTags () {
      return this.$store.state.note.taskTags
    },
    noteFilter () {
      return this.$route.params.filter
    },
    baseUrl () {
      const path = this.$route.path
      return path.slice(0, path.lastIndexOf('/'))
    }
  }
}
</script>
