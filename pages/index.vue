<template>
  <a-layout 
    :style="{ background: '#fff' }"
  >
    <a-layout-header 
      :style="{ padding: '0', background: '#fff' }"
    >
      <!-- TODO: Place logo -->
    </a-layout-header>
    <a-layout-content
      :style="{ margin: '0 16px', padding: '24px', background: '#fff', minHeight: '90vh' }"
    >
      <div class="container">
        <a-row :gutter="16">
          <a-col class="row" :span="12">
            <div class="box">
              col-12
            </div>
          </a-col>
          <a-col class="row" :span="12">
            <div class="box">
              col-12
            </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>

export default {
}
</script>

<style scoped>
.container >>> .ant-row > div {
  background: transparent;
  border: 0;
}
</style>
