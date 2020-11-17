<template>
  <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
    <div class="bank-acc-info-div-parent-container">
      <p class="bank-acc-info-row">
        <span>{{ $t("AccountNumber") }}</span>
        <vs-input type="text" v-validate="'required|numeric'" ref="account_number" name="account_number" v-model="account_number" class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('account_number')">{{ errors.first('account_number') }}</span>
      </p>
      <p class="bank-acc-info-row">
        <span>{{ $t("AccountOwner") }}</span>
        <vs-input type="text" v-validate="'required'" ref="full_name" name="full_name" v-model="full_name" class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('full_name')">{{ errors.first('full_name') }}</span>
      </p>
      <p class="bank-acc-info-row">
        <span>{{ $t("BankName") }}</span>
        <v-select label="bankName" :options="banks" v-validate="'required'" ref="bank_name" name="bank_name" v-model="bank_name" class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('bank_name')">{{ errors.first('bank_name') }}</span>
      </p>
      <p class="bank-acc-info-row">
        <span>{{ $t("ProviceName") }}</span>
        <v-select label="proviceName" :options="provices" v-validate="'required'" ref="provice_name" name="provice_name" v-model="provice_name" class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('provice_name')">{{ errors.first('provice_name') }}</span>
      </p>
      <p class="bank-acc-info-row">
        <span>{{ $t("BrancheName") }}</span>
        <vs-input type="text" v-validate="'required'" ref="branche" name="branche" v-model="branche" class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('branche')">{{ errors.first('branche') }}</span>
      </p>

      <vs-row vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12" class="bank-acc-info-row">
        <div class="flex -mx-2">
          <div class="w-full px-2">
            <vs-button color="warning" type="border" class="w-full" @click="full_name = account_number = branche = bank_name = provice_name = '';">{{ $t("Cancel") }}</vs-button>
          </div>
          <div class="w-full px-2">
            <vs-button class="w-full">{{ $t("Save") }}</vs-button>
          </div>
        </div>
      </vs-row>
    </div>
  </vs-row>
</template>

<script>
//import Datepicker from 'vuejs-datepicker'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    account_number: {
      required: 'Số tài khoản là trường bắt buộc nhập',
      numeric: 'Chỉ được phép nhập kí tự số'
    },
    full_name: {
      required: 'Họ tên chủ tài khoản là trường bắt buộc nhập'
    },
    bank_name: {
      required: 'Ngân hàng là trường bắt buộc nhập'
    },
    provice_name: {
      required: 'Tỉnh/Thành phố là trường bắt buộc nhập'
    },
    branche: {
      required: 'Chi nhánh là trường bắt buộc nhập'
    }
  }
}
// register custom messages
Validator.localize('vi', dict)
export default{
  data () {
    return {
      full_name: '',
      account_number: '',
      branche:'',
      bank_name:'',
      provice_name : '',
      banks: [
        {
          bankCode: 'VCB',
          bankName: 'Vietcombank'
        },
        {
          bankCode: 'TCB',
          bankName: 'Techcombank'
        },
        {
          bankCode: 'OTHER',
          bankName: 'Khác'
        }
      ],
      provices: [
        {
          proviceCode: 'HN',
          proviceName: 'Hà nội'
        },
        {
          proviceCode: 'HCM',
          proviceName: 'Hồ Chí Minh'
        },
        {
          proviceCode: 'OTHER',
          proviceName: 'Khác'
        }
      ]
    }
  },
  components: {
    //ArticleTask,
    flatPickr,
    'v-select': vSelect
  }
}
</script>

<style lang="scss">
  .bank-acc-info-div-parent-container
  {
    width: 300px;
  }
  .bank-acc-info-row {
    margin-top: 20px;
  }
  .class-popup-bank-account {
    .vs-popup
    {
      width: 400px !important;
    }
  }
</style>
