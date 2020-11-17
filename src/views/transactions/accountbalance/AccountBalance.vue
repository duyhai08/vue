<template>

  <div id="data-list-account-balance" class="data-list-container">
    <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">
      <!--<div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">-->
      <!-- GENERAL -->
      <vs-tab icon-pack="feather" icon="icon-star" :label="!isSmallerScreen ? $t('PrimaryAccount') : ''">
        <div>
          <account-balance-general />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-award" :label="!isSmallerScreen ? $t('PromotionAccount1') : ''">
        <div>
          <account-balance-general />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-award" :label="!isSmallerScreen ? $t('PromotionAccount2') : ''">
        <div>
          <account-balance-general />
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import AccountBalanceGeneral from './AccountBalanceGeneral.vue'

export default {
  components: {
    AccountBalanceGeneral
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
  #data-list-account-balance {
    background-color: white;
    height: auto;
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    display: flex;
    .activeChild

  {
    background-color: #D6E2FF !important;
  }

  .con-ul-tabs {
    /*background-color: blue;*/
    margin-bottom: -10px !important;
    width: 290px !important;
    border-right: 0.5px solid #d2d2d2;
    height: 100%;
  }

  .vs-tabs--btn {
    height: 50px !important;
  }

  .line-vs-tabs {
    display: none !important;
  }
  }
</style>
