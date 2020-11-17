<template>
  <div class="vx-row">

    <!-- HORIZONTAL LAYOUT -->
    <div class="vx-col md:w-full w-full mb-base">
      <vx-card no-shadow>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/4 w-full">
            <span>{{ $t("CurrentPassword") }}</span>
          </div>
          <div class="vx-col sm:w-3/4 w-full">
            <vs-input type="password" icon-pack="feather" icon="icon-lock" :placeholder="$t('CurrentPassword')" class="w-1/2" v-validate="'required'" ref="current_password" name="current_password" v-model="current_password" />
            <span class="text-danger text-sm" v-show="errors.has('current_password')">{{ errors.first('current_password') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/4 w-full">
            <span>{{ $t("NewPassword") }}</span>
          </div>
          <div class="vx-col sm:w-3/4 w-full">
            <vs-input type="password" icon-pack="feather" icon="icon-lock" :placeholder="$t('NewPassword')" class="w-1/2" v-validate="'required|min:6'" ref="password" name="password" v-model="password" />
            <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/4 w-full">
            <span>{{ $t("ReInputPassword") }}</span>
          </div>
          <div class="vx-col sm:w-3/4 w-full">
            <vs-input type="password" icon-pack="feather" icon="icon-repeat" :placeholder="$t('ReInputPassword')" class="w-1/2" v-validate="'required|min:6|confirmed:password'" data-vv-as="password" name="confirm_password" v-model="confirm_password" />
            <span class="text-danger text-sm" v-show="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-3/4 w-full ml-auto">
            <vs-row vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
              <div class="flex -mx-2">
                <div class="w-full px-2">
                  <vs-button class="w-full" color="warning" type="border" @click="full_name = birthday = email = address = user_facebook = user_zalo = user_skype = ''; gender='male';">{{ $t("Cancel") }}</vs-button>
                </div>
                <div class="w-full px-2">
                  <vs-button class="w-full">{{ $t("Save") }}</vs-button>
                </div>
              </div>
            </vs-row>
          </div>
        </div>

      </vx-card>
    </div>
  </div>
</template>

<script>
// For custom error message
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    current_password: {
      required: 'Mật khẩu hiện tại là trường bắt buộc nhập'
    },
    password: {
      required: 'Mật khẩu mới là trường bắt buộc nhập',
      min: 'Phải nhập tối thiểu 6 kí tự'
    },
    confirm_password: {
      required: 'Mật khẩu mới là trường bắt buộc nhập',
      min: 'Phải nhập tối thiểu 6 kí tự',
      confirmed: 'Mật khẩu mới và Mật khẩu xác thực đang không trùng khớp'
    }
  }
}
// register custom messages
Validator.localize('vi', dict)
export default{
  data () {
    return {
      current_password: '',
      password: '',
      confirm_password: ''
    }
  }
}
</script>
