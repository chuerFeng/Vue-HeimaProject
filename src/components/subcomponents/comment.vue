<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea v-model='msg' id="" placeholder="请输入想要评论的内容(最多120字)" cols="30" rows="10" maxlength="120"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item._id">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.username }}&nbsp;&nbsp;发表时间：{{ item.comDate | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" @click=getMore>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: ''
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.axios.get('/getcomments/'+ this.id,{
        params: {          
          pageindex : this.pageIndex
        }
      })
      .then((res) => {        
        if (res.data.status === 0) {
          // this.comments = res.data.message
          // console.log(res);
          
          this.comments = this.comments.concat(res.data.message)
        } else{
          Toast('没有更多评论了')
        }
      }).catch((err) => {

        console.log(err);        
      })
    },

    getMore(){
      this.pageIndex++;
      this.getComments()
    },
    postComment(){
      if (this.msg.trim().length === 0) {
        Toast('评论不能为空')
        return
      }

      console.log(this.msg);
      

      this.axios
        .post("/postcomment/" + this.id, {
          content: this.msg.trim()          
        })
        .then((result) => {          
          if (result.data.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
          Toast('发表评论成功')
        })
        .catch((err) => {
          Toast('发表评论失败')
        })
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  margin-top: 50px;
  // text-align: center;
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;

    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
