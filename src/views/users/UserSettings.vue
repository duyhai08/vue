<template>
  <div id="data-list-user-setting" class="data-list-container">
    <vs-tabs position="top" class="tabs-shadow-none" id="profile-tabs" v-model="selectedTab" @input="change()">
      <!--<div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">-->
      <!-- GENERAL -->
      <vs-tab key="user-info" icon-pack="feather" icon="icon-user" :label="$t('UserInfo')">
        <div>
          <user-info />
        </div>
      </vs-tab>
      <vs-tab key="change-password" icon-pack="feather" icon="icon-lock" :label="$t('UserChangePassword')">
        <div>
          <change-password />
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import UserInfo from './UserInfo.vue'
import ChangePassword from './ChangePassword.vue'

export default {
  components: {
    UserInfo,
    ChangePassword
  },
  data () {
    return {
      selectedTab: 0
    }
  },
  created () {
    const hash = window.location.hash.replace('#', '')
    if (hash === '0' || hash === '1') {
      this.selectedTab = parseInt(window.location.hash.replace('#', ''))
    }
  },
  methods: {
    change () {
      window.location.hash = this.selectedTab
    }

  },
  watch: {
    $route () {
      this.show = false
      const hash = window.location.hash.replace('#', '')
      if (hash === '0' || hash === '1') {
        this.selectedTab = parseInt(window.location.hash.replace('#', ''))
      } else {
        this.selectedTab = 0
      }
    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<!--<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>-->

<style lang="scss">
  #data-list-user-setting {
    .activeChild {
      background-color: white !important;
      background-color: white !important;
      border-radius: 0.5rem;
    }

    .con-ul-tabs {
      /*background-color: blue;*/
      margin-bottom: -10px !important;
    }

    .vs-tabs--btn {
      height: 50px !important;
      vertical-align: top !important;
    }

    .line-vs-tabs {
      display: none !important;
    }
    .vs-tabs--content {
      padding: 0px !important;
    }
  }
  
</style>
