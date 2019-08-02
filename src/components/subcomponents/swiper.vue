<template>
   <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
        <img :src="item.img" alt="" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>

  <!-- 为什么商品评论的 轮播图那么丑 -->
  <!-- 1.首页中的图片 他的宽和高 都使用了100%的宽度 -->
  <!-- 2.在商品详细页面中 轮播图的 图片如果也使用100%，页面不好看 -->
  <!-- 3.商品详细页面中的轮播图期望 高度100%，但是宽度为自适应 -->
  <!-- 5.经过分析 得到原因 首页轮播图和详细页轮播图的分歧点是 宽度一个100%，一个自适应 -->
  


</template>



<script>
export default {
  props: ['lunbotuList', 'isfull'],
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full{
  width: 100%;
}
</style>

