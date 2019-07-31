<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll" >
          <a v-for="(item, i) in cates" :key="i" :class="['mui-control-item', i==0?'mui-active':'']" @click="getPhotoListByCateId(item)" >
            {{ item }}
          </a>
        </div>
      </div>

    </div>

    <!-- 图片列表 -->
    <div>
      <ul class="photo-list">
        <li v-for="(item, i) in list" :key="i"> 
          <router-link tag="div" class="imgWrap" v-for="(poh, j) in item.phos" :key="j"  :to="'/home/photoinfo/'+ item.phoId">
            <img  v-lazy="poh">
            <span style="position: absolute; bottom:0">{{ item.intro }}</span>   
          </router-link>         
        </li>
      </ul>
    </div>

  </div>      
</template>

<script>
import { Toast } from 'mint-ui'
import mui from '../../lib/mui/js/mui.js'
export default {
  data() {
    return {
      cates: [], // 分类列表
      list: [],   // 图片列表
    }
  },
  created() {
    this.getphotypes()    
    this.getPhotoListByCateId('', 1)
  },
  mounted() {    
    // 当页面的dom渲染好后放到页面中，会执行这个钩子函数
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getphotypes(){
      this.axios.get('getphotypes').then( res => {
        if (res.data.status === 1) {
          res.data.types.unshift('全部')
          this.cates = res.data.types          
        }
      })
    },

    getPhotoListByCateId(type='', cateId='1'){
      if (type === '全部') { type = ''}
      this.axios.get('getpho', {
        params: {
          'type': type,
          'pageIdx': cateId
        }
      })
      .then( res => {
        // console.log(res);
        if (res.data.status === 1) {
          this.list = res.data.phos

          console.log(this.list);
        }else{
          Toast('没有更多数据了...')
        }
      })  
    }
  }
}
</script>


<style lang="scss" scoped>
  * { touch-action: pan-y; } 

  

  .photo-list{
    list-style: none;
    margin: 0;
    padding: 0;

    li{ margin: 0 8px;}

    img[lazy=loading] {
      width: 80%;
      height: 200px;
      margin: auto;
    }
    img {
      display: inline-block;
      width: 100%;
      vertical-align: bottom;
      border-radius: 5px;
      margin: 10px auto 0px;
      box-shadow: 0 1px 5px #666;
    }

    .mui-scroll{
      margin: 8px;
    }

    .imgWrap{
      position: relative;
    }
    span{
      position: absolute;
      bottom: 5px;
      display: block;
      width: 100%;
      padding: 30px 10px ;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      word-wrap: break-word;
      background-color: #6666;
    }
  }


  
  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
    border-bottom: 0;
  }

  
</style>
