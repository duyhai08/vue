<template>
    <button class=" btn-sm text-white btn-type-color" :class="chipColor(params.value)">
      <span>{{ params.value }}</span>
    </button>
</template>

<script>
export default {
  name: 'CellRendererStatus',
  computed: {
    chipColor () {
      return (value) => {
        if (value === 'active') return 'success'
        else if (value === 'blocked') return 'danger'
        else if (value === 'deactivated') return 'warning'
        else return 'primary'
      }
    }
  }
}
</script>

<style lang="scss" scpoped>
  .success {
    background: #63d417;
  }
  .warning {
    background: #ffb800;
  }
  .danger {
    background: #ffb800;
  }
  .btn-type-color {
    width: 100px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    display: inline-block;
    text-align: center;
    border: 1px solid transparent;
    font-size: 14px;
    line-height: 1.5;
    border-radius: .25rem;
  }
</style>
