<template>
  <div>
    <h3>{{ photoinfo.intro }}</h3>
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
      id: this.$route.params.id,
      photoinfo: {}
    }
  },
  created() {
    this.getPhotoInfo()
  },
  methods: {
    getPhotoInfo(){
      this.axios.get('getphodetail', {
        params: {
          'phoId': this.id
        }
      }).then((res) => {
        this.photoinfo = res.data.pho
        console.log(this.photoinfo)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

