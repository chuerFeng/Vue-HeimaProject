<template>
  <div>
    <h3>标题</h3>
    <p class="subtitle">
      <span>发表时间</span>
      <span>点击次数：0</span>
    </p>
    <hr>

    <!-- 缩略图区域 -->

    <!-- 图片内容区域 -->
    <div class="content">

    </div>

  </div>  
</template>


<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    getPhotoInfo(){
      // this.axios.
    }
  },
}
</script>

<style lang="scss" scoped>

</style>

