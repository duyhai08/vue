<template>
  <!-- HORIZONTAL LAYOUT -->
  <div class="vx-col md:w-full w-full mb-base">
    <vx-card no-shadow>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/5 w-full">
          <span>{{ $t("Avatar") }}</span>
        </div>
        <div class="vx-col sm:w-4/5 w-full">
          <vs-avatar size="150px" :src="src_avatar" @click="click_avatar">

          </vs-avatar>
          <p><small>* Nhấp vào ảnh để thay đổi ảnh đại diện</small></p>
          <input type="file" ref="fileInput" @change="change_file" style="display: none" accept="image/x-png,image/jpeg" />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/5 w-full">
          <span>{{ $t("AccountType") }}</span>
        </div>
        <div class="vx-col sm:w-4/5 w-full">
          <span class="w-1/2">{{ user_type }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/5 w-full">
          <span>{{ $t("Gender") }}</span>
        </div>
        <div class="vx-col sm:w-4/5 w-full">
          <vs-radio v-model="gender" vs-value="male" class="mr-4">{{ $t("Male") }}</vs-radio>
          <vs-radio v-model="gender" vs-value="female" class="mr-4">{{ $t("Female") }}</vs-radio>
          <vs-radio v-model="gender" vs-value="other">{{ $t("Other") }}</vs-radio>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/5 w-full">
          <span>{{ $t("Birthday") }}</span>
        </div>
        <div class="vx-col sm:w-4/5 w-full">
          <datepicker v-model="birthday" class="w-1/5" v-validate="'required'" name="birthday" :format="format"></datepicker>
          <!--<flat-pickr v-model="birthday" :config="{ dateFormat: 'd/m/Y' }" class="w-1/5" v-validate="'required'" name="birthday" />-->
          <span class="text-danger text-sm" v-show="errors.has('birthday')">{{ errors.first('birthday') }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/5 w-full">
          <span>{{ $t("DetailInfos") }}</span>
        </div>
        <div class="vx-col sm:w-4/5 w-full">
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-user" type="text" class="w-full" :label-placeholder="$t('FullName')" v-validate="'required'" ref="full_name" name="full_name" v-model="full_name" />
              <span class="text-danger text-sm" v-show="errors.has('full_name')">{{ errors.first('full_name') }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-phone" readonly type="text" class="w-full" :label-placeholder="$t('PhoneNumber')" ref="phone_number" name="phone_number" v-model="phone_number" />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-mail" type="text" class="w-full" label-placeholder="Email" v-validate="'required|email'" ref="email" name="email" v-model="email" />
              <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-map-pin" type="text" class="w-full" :label-placeholder="$t('Address')" v-validate="'required'" ref="address" name="address" v-model="address" />
              <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>
            </div>
          </div>
          <br />
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-facebook" type="text" class="w-full" label-placeholder="Facebook" name="user_facebook" v-model="user_facebook" />
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-globe" type="text" class="w-full" label-placeholder="Zalo" name="user_zalo" v-model="user_zalo" />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-globe" type="text" class="w-full" label-placeholder="Skype" name="user_skype" v-model="user_skype" />
            </div>
          </div>
        </div>
      </div>

      <vs-row vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">
        <div class="flex -mx-2">
          <div class="w-full px-2">
            <vs-button class="w-full" color="warning" type="border" @click="full_name = birthday = email = address = user_facebook = user_zalo = user_skype = ''; gender='male';">{{ $t("Cancel") }}</vs-button>
          </div>
          <div class="w-full px-2">
            <vs-button class="w-full">{{ $t("Save") }}</vs-button>
          </div>
        </div>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
// For custom error message
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    birthday: {
      required: 'Ngày sinh là trường bắt buộc nhập'
    },
    full_name: {
      required: 'Họ và tên là trường bắt buộc nhập'
    },
    address: {
      required: 'Địa chỉ là trường bắt buộc nhập'
    },
    email: {
      required: 'Email là trường bắt buộc nhập',
      email: 'Không đúng định dạng email'
    }
  }
}
// register custom messages
Validator.localize('vi', dict)
export default{
  data () {
    return {
      format: 'dd / MM / yyyy',
      full_name: '',
      birthday: '',
      gender:'male',
      email:'',
      address:'',
      user_facebook : '',
      user_zalo:'',
      user_skype: '',
      phone_number: '',
      user_type: 'Môi giới',
      src_avatar: 'https://i.imgur.com/ezM6SJ5.png'
    }
  },
  methods: {
    click_avatar () {
      //alert('click avatar')
      this.$refs.fileInput.click()
    },
    change_file (e) {
      const files = e.target.files || e.dataTransfer.files
      if (files.length > 0) {
        alert(files[0].name)
      }
      
    }
  },
  components: {
    //ArticleTask,
    Datepicker
  }
}
</script>

