/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/


export default [
  {
    url: null,
    name: 'Dashboard',
    tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/dashboard/analytics',
        name: 'Analytics',
        slug: 'dashboard-analytics',
        i18n: 'Analytics'
      },
      {
        url: '/dashboard/ecommerce',
        name: 'eCommerce',
        slug: 'dashboard-ecommerce',
        i18n: 'eCommerce'
      }
    ]
  },
  {
    header: 'Apps',
    icon: 'PackageIcon',
    i18n: 'Apps',
    items: [
      {
        url: '/apps/article',
        name: 'Article',
        slug: 'article',
        icon: 'CheckSquareIcon',
        i18n: 'Article'
      },
      {
        url: '/apps/chat',
        name: 'Chat',
        slug: 'chat',
        icon: 'MessageSquareIcon',
        i18n: 'Chat'
      },
      {
        url: '/apps/note',
        name: 'Note',
        slug: 'note',
        icon: 'EditIcon',
        i18n: 'Note'
      },
      {
        url: '/apps/calendar/vue-simple-calendar',
        name: 'Calendar',
        slug: 'calendar-simple-calendar',
        icon: 'CalendarIcon',
        tagColor: 'success',
        i18n: 'Calendar'
      },
      {
        url: '/apps/calendar/vue-simple-calendars',
        name: 'Video3D',
        slug: 'calendar-simple-calendar',
        icon: 'PackageIcon',
        tagColor: 'success',
        i18n: 'Video3D'
      },
      {
        url: null,
        name: 'Map',
        icon: 'MapPinIcon',
        i18n: 'Map',
        submenu: [
          {
            url: '/apps/user/user-list',
            name: 'List',
            slug: 'app-user-list',
            i18n: 'List'
          },
          {
            url: '/apps/user/user-view/268',
            name: 'View',
            slug: 'app-user-view',
            i18n: 'View'
          },
          {
            url: '/apps/user/user-edit/268',
            name: 'Edit',
            slug: 'app-user-edit',
            i18n: 'Edit'
          }
        ]
      }
    ]
  },
  {
    header: 'Transactions',
    icon: 'LayersIcon',
    i18n: 'Transactions', 
    items: [
      {
        name: 'transactions-connectwallet',
        icon: 'CreditCardIcon',
        i18n: 'ConnectWalletMeeyPay',
        isPopup: true,
        component: () => import('../../../views/transactions/connectwallet/ConnectWallet.vue')
      },
      {
        url: '/transactions/transactionhistory',
        name: 'TransactionHistory',
        slug: 'transactionhistory',
        icon: 'TrendingDownIcon',
        i18n: 'TransactionHistory'
      },
      {
        url: '/transactions/bankaccounts',
        name: 'Tài khoản ngân hàng',
        icon: 'DollarSignIcon',
        i18n: 'BankAccounts'
      },
      {
        url: '/transactions/accountbalance',
        name: 'Số dư tài khoản',
        icon: 'DollarSignIcon',
        i18n: 'AccountBalance'
      },
      {
        url: null,
        name: 'Balance',
        icon: 'LayoutIcon',
        i18n: 'Balance',
        submenu: [
          {
            url: '/ui-elements/grid/vuesax',
            name: 'Vuesax',
            slug: 'grid-vuesax',
            i18n: 'Vuesax'
          },
          {
            url: '/ui-elements/grid/tailwind',
            name: 'Tailwind',
            slug: 'grid-tailwind',
            i18n: 'Tailwind'
          }
        ]
      },
      {
        url: '/ui-elements/colors',
        name: 'Recharge',
        slug: 'colors',
        icon: 'DropletIcon',
        i18n: 'Recharge'
      },
      {
		url: '/transactions/waitforpayment',
        name: 'WaitingforPayment',
        icon: 'CreditCardIcon',
        i18n: 'WaitingforPayment'
      },
      {
        url: null,
        name: 'ConnectPayment',
        icon: 'ArchiveIcon',
        i18n: 'ConnectPayment',
        submenu: [
          {
            url: '/components/alert',
            name: 'Alert',
            slug: 'component-alert',
            i18n: 'Alert'
          },
          {
            url: '/components/avatar',
            name: 'Avatar',
            slug: 'component-avatar',
            i18n: 'Avatar'
          },
          {
            url: '/components/breadcrumb',
            name: 'Breadcrumb',
            slug: 'component-breadcrumb',
            i18n: 'Breadcrumb'
          },
          {
            url: '/components/button',
            name: 'Button',
            slug: 'component-button',
            i18n: 'Button'
          },
          {
            url: '/components/button-group',
            name: 'Button Group',
            slug: 'component-button-group',
            i18n: 'ButtonGroup'
          },
          {
            url: '/components/chip',
            name: 'Chip',
            slug: 'component-chip',
            i18n: 'Chip'
          },
          {
            url: '/components/collapse',
            name: 'Collapse',
            slug: 'component-collapse',
            i18n: 'Collapse'
          },
          {
            url: '/components/dialogs',
            name: 'Dialogs',
            slug: 'component-dialog',
            i18n: 'Dialogs'
          },
          {
            url: '/components/divider',
            name: 'Divider',
            slug: 'component-divider',
            i18n: 'Divider'
          },
          {
            url: '/components/dropdown',
            name: 'DropDown',
            slug: 'component-drop-down',
            i18n: 'DropDown'
          },
          {
            url: '/components/list',
            name: 'List',
            slug: 'component-list',
            i18n: 'List'
          },
          {
            url: '/components/loading',
            name: 'Loading',
            slug: 'component-loading',
            i18n: 'Loading'
          },
          {
            url: '/components/navbar',
            name: 'Navbar',
            slug: 'component-navbar',
            i18n: 'Navbar'
          },
          {
            url: '/components/notifications',
            name: 'Notifications',
            slug: 'component-notifications',
            i18n: 'Notifications'
          },
          {
            url: '/components/pagination',
            name: 'Pagination',
            slug: 'component-pagination',
            i18n: 'Pagination'
          },
          {
            url: '/components/popup',
            name: 'Popup',
            slug: 'component-popup',
            i18n: 'Popup'
          },
          {
            url: '/components/progress',
            name: 'Progress',
            slug: 'component-progress',
            i18n: 'Progress'
          },
          {
            url: '/components/sidebar',
            name: 'Sidebar',
            slug: 'component-sidebar',
            i18n: 'Sidebar'
          },
          {
            url: '/components/slider',
            name: 'Slider',
            slug: 'component-slider',
            i18n: 'Slider'
          },
          {
            url: '/components/tabs',
            name: 'Tabs',
            slug: 'component-tabs',
            i18n: 'Tabs'
          },
          {
            url: '/components/tooltip',
            name: 'Tooltip',
            slug: 'component-tooltip',
            i18n: 'Tooltip'
          },
          {
            url: '/components/upload',
            name: 'Upload',
            slug: 'component-upload',
            i18n: 'Upload'
          }
        ]
      }
    ]
  },
  {
    header: 'UserManager',
    icon: 'Edit3Icon',
    i18n: 'UserManager',
    items: [
      {
        url: '/users/user-info#0',
        name: 'Thông tin tài khoản',
        icon: 'UserIcon',
        slug: 'users-user-info',
        i18n: 'UserInfo'
      },
      {
        url: '/users/user-info#1',
        name: 'Đổi mật khẩu',
        icon: 'KeyIcon',
        slug: 'users-change-password',
        i18n: 'UserChangePassword'
      },
      {
        url: '/users/favorite',
        name: 'Yêu thích',
        icon: 'StarIcon',
        slug: 'users-favorite',
        i18n: 'UserFavorite'
      },
      {
        url: null,
        name: 'Form Elements',
        icon: 'CopyIcon',
        i18n: 'Profile'
      },
      {
        url: '/forms/form-layouts',
        name: 'Form Layouts',
        icon: 'PackageIcon',
        slug: 'forms-form-layouts',
        i18n: 'User Settings'
      },
      {
        url: '/forms/form-wizard',
        name: 'Form Wizard',
        icon: 'PackageIcon',
        slug: 'extra-component-form-wizard',
        i18n: 'FQA'
      }
    ]
  }
]

