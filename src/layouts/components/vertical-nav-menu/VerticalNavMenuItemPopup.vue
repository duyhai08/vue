<!-- =========================================================================================
    File Name: VerticalNavMenuItem.vue
    Description: Vertical NavMenu item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VerticalNavMenuItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    v-if="canSee"
    class="vs-sidebar--item"
    :class="[
      {'vs-sidebar-item-active'            : activeLink},
      {'disabled-item pointer-events-none' : isDisabled}
    ]" @click="clickItem" style="cursor:pointer">

      <a tabindex="-1">
        <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
        <feather-icon v-else :class="{'w-3 h-3': iconSmall}" :icon="icon" />
        <slot />
      </a>

      <vs-popup class="holamundo class-custom-popup" :title="formName" :active.sync="popupActive">
        <component :is="componentTemp"></component>
      </vs-popup>

  </div>
</template>

<script>
  export default {
    name: 'v-nav-menu-item-popup',
    data () {
      return {
        popupActive: false
      }
    },
  props: {
    icon        : { type: String,                 default: ''               },
    iconSmall   : { type: Boolean,                default: false            },
    iconPack    : { type: String,                 default: 'material-icons' },
    href        : { type: [String, null],         default: '#'              },
    to          : { type: [String, Object, null], default: null             },
    slug        : { type: String,                 default: null             },
    index       : { type: [String, Number],       default: null             },
    featherIcon : { type: Boolean,                default: true             },
    target      : { type: String,                 default: '_self'          },
    isDisabled  : { type: Boolean,                default: false            },
    formName    : { type: String,                 default: ''               },
    componentTemp: { type: Function,                default: null              }
    },
    methods: {
      clickItem () {
        this.popupActive = true
      }
    },
    computed: {
      canSee () {
        this.$acl.check(this.$store.state.AppActiveUser.userRole)
        return this.to ? this.$acl.check(this.$router.match(this.to).meta.rule) : true
      },
      activeLink () {
        return !!((this.to === this.$route.path || this.$route.meta.parent === this.slug) && this.to)
      }
  }
}

</script>

