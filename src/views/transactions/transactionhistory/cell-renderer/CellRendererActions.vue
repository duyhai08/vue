<template>
  <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}" >
    <a @click="popupActiveVertical=true" style="text-decoration-line: underline ">Xem chi tiết</a>
    <vs-popup title="CHI TIẾT GIAO DỊCH" :active.sync="popupActiveVertical" class="pop-ver">
      <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 box-pop">
        <div class="title-trans">Rút tiền từ TKKM1</div>
        <div class="money-trans font-bold">-1.000.000.000đ</div>
      </div>
      <div class="">
        <div class="d-flex justify-content mb-2">
          <span class="tag vertical-auto text-gray-text-3 info-block tilles-detail">Kết quả giao dịch</span>
          <span>
            <button class="btn-complete text-white  round">
              Thành công
            </button>
          </span>
        </div>
        <vs-divider></vs-divider>
        <div class="d-flex justify-content mb-2">
          <span>Mã giao dịch:</span>
          <span>202008121212456890</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span>Thời gian:</span>
          <span>08/08/2020 08:00</span>
        </div>
      </div>
      <vs-divider></vs-divider>
      <div class="">
        <div class="d-flex justify-content mb-2">
          <span class="tag vertical-auto text-gray-text-3 info-block tilles-detail">Người thanh toán</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span class="vertical-auto">Họ và tên:</span>
          <span class="tag text-gray-text-3 vertical-auto">Nguyễn Tuấn Anh</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span>Điện thoại:</span>
          <span>0972 828 929</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span>Email:</span>
          <span>abcd@gmail.com</span>
        </div>
      </div>
      <vs-divider></vs-divider>
      <div class="">
        <div class="d-flex justify-content mb-2">
          <span class="tag vertical-auto text-gray-text-3 info-block tilles-detail">Thông tin thêm</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span class="vertical-auto">Tài khoản nguồn:</span>
          <span class="tag text-gray-text-3 vertical-auto">TKKM1</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span>Tài khoản nhận:</span>
          <span>MBBank, ******8484</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span>Phí giao dịch:</span>
          <span>10.000 đ</span>
        </div>
        <div class="d-flex justify-content mb-2">
          <span>Số tiền chuyển vào TK:</span>
          <span>9.000.000 đ</span>
        </div>
      </div>
      <vs-divider></vs-divider>
      <vx-timeline :data="timelineData" />
      <div v-if="showPay==true" class="footer-action">
        <button class="btn-pay text-white  round btn-payment">
          Chọn phương thức thanh toán khác
        </button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
  import VxTimeline from '@/components/timeline/VxTimeline'
  export default {
  data () {
      return {
        popupActive: false,
        popupActiveVertical: false,
        timelineData: [
          {
            color: 'success',
            icon: 'CircleIcon',
            title: 'Rút tiền thành công',
            desc: '990.000đ đã được chuyển thành công vào MBBank',
            time: '13/08/2020 12:00'
          },
          {
            color: 'black',
            icon: 'CircleIcon',
            title: 'Yêu cầu rút tiền đang được xử lý',
            desc: 'Yêu cầu rút tiền đã được chuyển đến ngân hàng MBBank để xử lý',
            time: '12/08/2020 12:00'
          },
          {
            color: 'black',
            icon: 'CircleIcon',
            title: 'Yêu cầu rút tiền đã được tạo',
            desc: '1.000.000đ vừa được rút từ TKKM1 của bạn',
            time: '12/08/2020 12:00'
          }
        ]
      }
  },
  components: {
      VxTimeline
    },
  name: 'CellRendererActions',
  methods: {
  }
}
</script>
<style lang="scss">
.pop-ver {
    .vs-popup {
				min-width: 500px !important;
				width: 500px !important;
     }
  }
  .con-vs-popup .vs-popup--content {
    font-size: 14px !important;
    padding: 2rem;
    padding-top: 1rem !important;
  }
  .tilles-detail {
    font-size: 16px !important;
    color: #1a4bb7;
    padding-bottom: 5px;
    font-weight: bold;
  }
  .d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
  }

  .justify-content {
    -ms-flex-pack: justify !important;
    justify-content: space-between !important;
  }
  .btn-complete {
    display: inline-block;
    background-color: #ffb800 !important;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 12px;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .width50-right {
    min-width: 43%;
  }
  .width50 {
    min-width: 45%;
  }
  .money-detail {
    font-size: 16px !important;
  }
  .money-trans {
    font-size: 18px !important;
  }
  .box-pop {
    text-align: center;
    bottom: 12px !important;
    background: #f0f0f0;
  }
  .title-trans {
    margin-bottom: 10px;
  }
</style>
