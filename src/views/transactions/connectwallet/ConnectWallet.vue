<!-- =========================================================================================
  File Name: FormWizardValidation.vue
  Description: Form wizard with validation
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  
  <div class="connect-wallet-container">
    <form-wizard class="class-form-wizard-connect-wallet" step-size="xs" :back-button-text="$t('GoBack')" :next-button-text="$t('GoNext')" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="null" :finishButtonText="$t('Finish')">
      <wizard-step slot-scope="props"
                   slot="step"
                   :tab="props.tab"
                   :transition="props.transition"
                   :index="props.index">
      </wizard-step>

      <tab-content :title="$t('InputPhoneNumber')" class="mb-5" :before-change="validateStep1">

        <!-- tab 1 content -->
        <form data-vv-scope="step-1">
          <br />
          <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <div class="connect-wallet-parent-div-step1">
              <p class="msg-guide1-step1">{{ $t("MsgGuide1Step1") }}</p>
              <br />
              <p class="msg-guide2-step1">{{ $t("MsgGuide2Step1") }}</p>
              <p class="step1-input">
                <vs-input icon-pack="feather" icon="icon-phone" type="text" class="w-full" :placeholder="$t('PhoneNumber')" v-validate="'required|regex:[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]|min:10|max:10'" ref="phone_number" name="phone_number" v-model="phone_number" />
                <span class="text-danger text-sm" v-show="errors.has('step-1.phone_number')">{{ errors.first('step-1.phone_number') }}</span>
              </p>
              <br />
              <p class="msg-guide3-step1">{{ $t("MsgGuide3Step1") }}</p>
            </div>
          </vs-row>
        </form>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content :title="$t('Verification')" class="mb-5" :before-change="validateStep2">
        <form data-vv-scope="step-2">
          <br />
          <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <div class="connect-wallet-parent-div">
              <p class="msg-guide1-step2">{{ $t("MsgGuide1Step2") }} {{ phone_number }}</p>
              <br />
              <p class="msg-guide2-step2"><clock-icon size="1x" class="custom-class"></clock-icon>{{ $t("MsgGuide2Step2") }} <span class="count-down">{{ countDown }} s</span></p>
              <p class="step2-input">
                <v-otp-input ref="otpInput"
                             input-classes="otp-input"
                             separator=""
                             :num-inputs="6"
                             :should-auto-focus="true"
                             input-type="number"
                             :is-input-num="true"
                             @on-change="handleOnChange"
                             @on-complete="handleOnComplete" />
              </p>
              <br />
              <div class="vx-row" v-show="showResend">
                <div class="vx-col sm:w-3/4 w-full mb-2">
                  <span class="msg-guide3-step2">{{ $t("MsgGuide3Step2") }}</span>
                </div>
                <div style="text-align:right" class="vx-col sm:w-1/4 w-full mb-2">
                  <a @click="clickResend" class="msg-resend">{{ $t("ReSend") }}</a>
                </div>
              </div>
            </div>
          </vs-row>
        </form>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content :title="$t('Finish')" class="mb-5" :before-change="validateStep3">
        <form data-vv-scope="step-3">
          <br />
          <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <div class="connect-wallet-parent-div">
              <p class="msg-guide1-step3">
                <img class="img-step3" src="../../../assets/images/icons/success.png" />
              </p>
              <p class="msg-guide1-step3">{{ $t("MsgConnectWalletSuccess") }} {{ phone_number }}</p>
            </div>
          </vs-row>
        </form>
      </tab-content>

      <template slot="footer" slot-scope="props">
        <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div class="connect-wallet-parent-div">
            <p class="div-footer-next">
              <wizard-button class="footer-next-step1" v-if="props.activeTabIndex === 0" @click.native="props.nextTab()" :style="props.fillButtonStyle">{{ $t("ConnectWalletNow") }}</wizard-button>
              <wizard-button class="footer-next-step2" :disabled="disabledNextStep2" v-else-if="props.activeTabIndex === 1" @click.native="props.nextTab()" :style="props.fillButtonStyle">{{ $t("ValidationNow") }}</wizard-button>
            </p>
            <p class="div-footer-back-step2">
              <wizard-button class="footer-back-step2" v-if="props.activeTabIndex === 1" @click.native="props.prevTab()">{{ $t("ChangePhoneNumber") }}</wizard-button>
            </p>
          </div>
        </vs-row>
      </template>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent, WizardStep, WizardButton } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { ClockIcon } from 'vue-feather-icons'
import OtpInput from '@bachdgvn/vue-otp-input'
import moment from 'moment'

// For custom error message
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    phone_number: {
      required: 'Số điện thoại là trường bắt buộc',
      regex: 'Số điện thoại không đúng',
      min: 'Số điện thoại phải gồm 10 kí tự',
      max: 'Số điện thoại phải gồm 10 kí tự'
    }
  }
}

// register custom messages
Validator.localize('vi', dict)

export default {
  data () {
    return {
      dateMoment: moment(60 * 3 * 1000),
      polling: null,
      showResend: false,
      otp: '',
      disabledNextStep2: true
    }
    },
    computed: {
      countDown () {
        return this.dateMoment.format('mm:ss')
      }
    },
    methods: {
      checkDisatbledNextStep2 () {
        if (this.otp.length === 6 && this.dateMoment > 0) {
          this.disabledNextStep2 = false
        } else {
          this.disabledNextStep2 = true
        }
      },
      handleOnComplete (value) {
        this.otp = value
        this.checkDisatbledNextStep2()
        //alert(this.otp)
      },
      handleOnChange (value) {
        this.otp = value
        this.checkDisatbledNextStep2()
      },
      clickResend () {
        this.startInterval()
      },
      startInterval () {
        this.$refs.otpInput.clearInput()
        this.dateMoment = moment(60 * 3 * 1000)
        this.showResend = false

        if (this.polling !== null) {
          clearInterval(this.polling)
        }
        this.polling = setInterval(() => {
          if (this.dateMoment > 0) {
            this.dateMoment = moment(this.dateMoment.subtract(1, 'seconds'))
          } else {
            clearInterval(this.polling)
            this.showResend = true
            this.checkDisatbledNextStep2()
          }
        
      }, 1000)
    },
    validateStep1 () {
      this.startInterval()
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
    validateStep2 () {
      //alert('validateStep2')
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-2').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
    validateStep3 () {
      //alert('validateStep3')
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-3').then(result => {
          if (result) {
            alert('Form submitted!')
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    }
  },
  components: {
    FormWizard,
    TabContent,
    WizardStep,
    WizardButton,
    ClockIcon,
    'v-otp-input': OtpInput

  }
}
</script>
<style lang="scss">
  .class-custom-popup {
    .vs-popup {
                width: 600px !important;
              }
  }
  .class-form-wizard-connect-wallet {
    .wizard-header
  {
    padding-bottom: 0px !important;
    padding-top: 0px !important;
  }
  .wizard-tab-container {
    margin-bottom: 5px !important;
  }
  }
  .text-bold-header-18 {
    font-weight: bold !important;
    font-size: 18px !important;
  }
  .connect-wallet-parent-div-step1 {
    /*background-color: aqua !important;*/
    width: 430px !important;
  }
  .connect-wallet-parent-div {
    /*background-color: aqua !important;*/
    width: 280px !important;
  }
  /*step 1*/
  .msg-guide1-step1 {
    font-size: 14px !important;
    text-align: center !important;
  }
  .msg-guide2-step1 {
    font-size: 14px !important;
    text-align: center !important;
    font-weight: bold !important;
  }
  .msg-guide3-step1 {
    font-size: 12px !important;
    text-align: center !important;
  }
  .step1-input {
    margin-top: 10px;
    width: 280px;
    margin-left: auto;
    margin-right: auto;
  }
  /*step 2*/
  .msg-guide1-step2 {
    font-size: 14px !important;
    text-align: center !important;
    font-weight: bold !important;
  }
  .msg-guide2-step2 {
    font-size: 12px !important;
    text-align: center !important;
  }
  .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 4px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(var(--vs-primary), 1);
    text-align: center;
    font-weight: bold;
    
    color: rgba(var(--vs-primary), 1);
    .error

  {
    border: 1px solid red !important;
  }

  }

  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .step2-input {
    text-align: center !important;
    align-items: center !important;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
  }
  .msg-guide3-step2 {
    font-size: 12px !important;
    margin-top: 10px;
  }
  .msg-resend {
    font-size: 14px !important;
    margin-top: 10px;
    text-align: right;
    font-weight: bold;
    cursor: pointer;
  }
  .count-down {
    font-size: 14px !important;
    
    color: orange;
  }
  .footer-back-step2 {
    text-align: center;
    font-weight: normal !important;
    color: rgba(var(--vs-primary), 1);
    text-decoration: underline;
  }
  .div-footer-back-step2 {
      text-align: center !important;
      padding-top: 10px;
  }
  .div-footer-next {
    text-align: center !important;
    padding-top: 0px;
  }

  /*Step 3*/
  .msg-guide1-step3 {
    font-size: 14px !important;
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
    
  }
  .img-step3 {
    height: 100px;
    width: 100px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>
