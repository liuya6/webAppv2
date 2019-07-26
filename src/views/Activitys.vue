<template>
  <div class="Activity" v-title="'活动'">
    <div>
      <my-kefu></my-kefu>
    </div>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div
      class="content"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="main w1200">
        <ul class="Tab">
          <li
            :class="{ active: selectIndex == i }"
            v-for="(nav, i) in allConfig.activityNavList"
            @click="tab(i, nav.type)"
            :key="i"
          >
            {{ nav.name }}
            <div
              v-if="i != allConfig.activityNavList.length - 1"
              class="line"
            ></div>
          </li>
        </ul>
        <ul class="maincontent" v-if="activityArr.length">
          <li
            v-for="(item, i) in activityArr"
            :key="i"
            @mouseover.stop="chose(i)"
            @mouseleave="mouseOut(i)"
            @click="handleShow(i)"
          >
            <div
              :class="{
                shadowEnd: item.endTime > 0 && item.endTime <= newDate
              }"
            ></div>
            <img
              class="rightImg"
              v-if="item.endTime == 0"
              src="/images/new/always.png"
              alt
            />
            <img
              class="rightImg"
              v-else-if="item.startTime > newDate"
              src="/images/new/soon.png"
              alt
            />
            <img
              class="rightImg"
              v-else-if="item.endTime > 0 && item.endTime >= newDate"
              src="/images/new/now.png"
              alt
            />
            <img class="rightImg" v-else src="/images/new/end.png" alt />
            <!-- <img class="rightImg" :src="changeSrc(item)" alt /> -->
            <img class="banner" :src="item.image" :alt="item.title" />
            <div class="shadow" v-show="selectValue == i">
              <span class="details flexA">查看详情</span>
              <div class="time" v-if="item.startTime > newDate">
                距离活动开始：
                <activityTimer :time="item.startTime - newDate"></activityTimer>
              </div>
              <div
                class="time"
                v-else-if="item.endTime > 0 && item.endTime >= newDate"
              >
                距离活动结束：
                <activityTimer :time="item.endTime - newDate"></activityTimer>
              </div>
            </div>
            <template>
              <div
                class="activityDetail"
                @click="stop"
                :class="[i === showTarget ? 'show1' : 'hide1']"
              >
                <div v-html="item.content">{{ item.content }}</div>
              </div>
            </template>
          </li>
        </ul>
        <ul class="maincontent noData" v-else>
          <!-- <img src="/images/noData.png" alt="暂无数据" draggable="false"> -->
          <p>暂无记录</p>
        </ul>
        <div class="btm" v-show="total">
          <div class="btm-page">
            <span @click="firstPage(1)">首页</span>
            <el-pagination
              class="activityPage"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="parameter.pageSize"
              @current-change="handleCurrentChange"
              :current-page="parameter.page"
            ></el-pagination>
            <span
              @click="firstPage(Math.ceil(total / parameter.pageSize))"
              style="margin-right: 10px;"
              >尾页</span
            >
            <span>共{{ Math.ceil(total / parameter.pageSize) }}页</span>
          </div>
        </div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { activity, appllyActivity } from "../api";
import { mapGetters } from "vuex";
export default {
  name: "activitys",
  data() {
    return {
      newDate: "",
      selectIndex: 0,
      selectValue: 0,
      activityArr: [],
      showTarget: "",
      loading: false,
      parameter: {
        type: "",
        page: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  created() {
    this.init();
  },
  updated() {
    let that = this;
    let id;
    let ApplyBtn = document.querySelectorAll(".apply");
    for (let i = 0; i < ApplyBtn.length; i++) {
      let ApplyBtnOne = ApplyBtn[i];
      ApplyBtnOne.onclick = function() {
        id = this.getAttribute("id");
        if (!id) {
          id = this.getAttribute("data-id");
        }
        that.getApplication(id);
      };
    }
  },
  computed: {
    ...mapGetters(["allConfig"])
  },
  methods: {
    changeSrc(item) {
      console.log(item, "item");
      if (item.endTime == 0) {
        return "/home/always.png";
      } else if (item.startTime > this.newDate) {
        return "/home/soon.png";
      } else if (item.endTime > 0 && item.endTime >= this.newDate) {
        return "/home/now.png";
      } else {
        return "/home/end.png";
      }
    },
    init() {
      this.newDate = parseInt(new Date().getTime() / 1000);
      this.loading = true;
      console.log(this.parameter, "活动参数");
      activity(this.parameter).then(res => {
        if (res.status) {
          // console.log(
          //   res.data,
          //   "活动列表！！！！！！！！！！！！！！！！！！！！！！！！"
          // );
          this.loading = false;
          this.activityArr = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    tab(index, Type) {
      this.selectIndex = index;
      this.loading = true;
      console.log(index, Type, "1111111111");
      this.parameter.type = Type;
      this.parameter.page = 1;
      this.init();
    },
    handleCurrentChange(page) {
      this.parameter.page = page;
      this.init();
    },
    firstPage(num) {
      this.parameter.page = num;
      this.init();
    },
    chose(index) {
      this.selectValue = index;
    },
    mouseOut() {
      this.selectValue = -1;
    },
    handleShow(index) {
      this.showTarget = this.showTarget === index ? "" : index;
    },
    stop(event) {
      event.stopPropagation();
    },
    getApplication(id) {
      appllyActivity({ articleId: id })
        .then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
          this.$message.error("活动申请失败");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 42px;
  padding-top: 42px;
  background: url("/images/activitybg.png") no-repeat #0b0117;
  .main {
    ul.Tab {
      width: 1100px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 16px;
      display: flex;
      flex-direction: row;
      background: rgba(255, 255, 255, 0.2);
      margin: 32px auto;
      border-radius: 12px;
      overflow: hidden;
      li {
        flex: 1;
        text-align: center;
        cursor: pointer;
        position: relative;
        .line {
          position: absolute;
          top: 16px;
          right: 0;
          height: 20px;
          width: 1px;
          background: rgba(255, 255, 255, 0.3);
        }
      }
      li.active {
        color: #fea24d;
        background: #fff;
      }
      li:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    }
    ul.maincontent {
      width: 1100px;
      min-height: 500px;
      overflow: hidden;
      margin: 0 auto;
      li {
        margin-bottom: 19px;
        // padding: 10px;
        // border: 1px solid #f2f2f2;
        // background-color: #fff;
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        .shadowEnd {
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 160px;
        }
        .rightImg {
          position: absolute;
          right: 0;
          width: 80px;
        }
        .banner {
          display: inline-block;
          width: 100%;
          height: 160px;
        }
        div.shadow {
          width: 100%;
          height: 160px;
          text-align: center;
          // line-height: 80px;
          color: #fff;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          .details {
            cursor: pointer;
            display: inline-block;
            width: 130px;
            background: -webkit-linear-gradient(
              #fdc830,
              #f37335
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #fdc830,
              #f37335
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              #fdc830,
              #f37335
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(#fdc830, #f37335); /* 标准的语法 */
            text-align: center;
            height: 36px;
            color: #fff;
            line-height: 36px;
            font-size: 17px;
            border-radius: 5px;
          }
          .time {
            color: #fff;
            font-size: 24px;
            letter-spacing: 1px;
            margin-top: 20px;
          }
        }
        .activityDetail {
          padding: 20px;
          padding-top: 0;
          background: #fff;
          overflow: hidden;
          .application {
            width: 97%;
            height: 50px;
            display: block;
            line-height: 50px;
            margin: 20px auto;
            background: red;
            color: #fff;
            border: 0;
            outline: none;
          }
          .gray {
            background: gray;
          }
        }
        .hide1 {
          max-height: 0;
          padding: 0;
        }
        .show1 {
          // transition: 1s;
          // max-height: 3340px;
        }
      }
    }
    .noData {
      position: relative;
      img {
        margin: 0 auto;
      }
      p {
        margin-top: 50px;
        text-align: center;
        font-size: 16px;
      }
    }
  }

  .btm {
    height: 68px;
    overflow: hidden;
    text-align: center;
    .btm-page {
      display: inline-block;
      overflow: hidden;
    }
    span {
      float: left;
      line-height: 32px;
      font-size: 16px;
      color: #6a6a6a;
      cursor: pointer;
    }
    .activityPage {
      float: left;
    }
  }
}
</style>
