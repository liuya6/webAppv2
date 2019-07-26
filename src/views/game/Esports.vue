<template>
  <div class="chess" v-title="'电竞'">
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <div class="content">
      <div class="wrap">
        <ul v-if="homeToEsports.length">
          <li class="esp1">
            <div class="start" @click="playGame(homeToEsports[0].link)"></div>
            <div class="img">
              <img class="logo" src="/images/esports/esports6.png" alt />
            </div>
            <div class="info">
              <span class="tit">{{ homeToEsports[0].title }}</span>
              <span class="tit1">20+款超人气游戏，S系列，T系列等</span>
              <span class="tit1">全球顶尖赛事覆盖</span>
              <span class="tit1">专业的赔率数据，结算赛果数据</span>
            </div>
            <img class="logoBg" src="/images/esports/logoBg.png" alt />
          </li>
          <li class="esp2">
            <div class="start" @click="playGame(homeToEsports[1].link)"></div>
            <div class="img">
              <img class="logo" src="/images/esports/esports7.png" alt />
            </div>
            <div class="info IM">
              <span class="tit">{{ homeToEsports[1].title }}</span>
              <span class="tit1">赛事分析与队伍统计数据</span>
              <span class="tit1">时时更新的战况记录</span>
              <span class="tit1">赛事直播，方便即时滚球投注</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BY",
  data() {
    return {
      fishList: [],
      searchGameTitle: ""
    };
  },
  created() {
    console.log(this.homeToEsports, "homeToEsports");
  },
  computed: {
    ...mapGetters(["homeToEsports"])
  },
  methods: {
    // linkTo() {}
  }
};
</script>

<style scoped lang="scss">
.chess {
  color: #fff;
  .content {
    position: relative;
    margin-top: 42px;
    background: url("/images/esports/esports1.png") no-repeat 0 0 #1e2125;
    height: 860px;
    width: 100%;
    .wrap {
      width: 860px;
      margin: auto;
      padding-top: 150px;
      li {
        float: left;
        width: 404px;
        height: 537px;
        position: relative;
      }
      .esp1 {
        background: url("/images/esports/esports2.png") no-repeat;
        .logoBg {
          position: absolute;
          width: 1190px;
          left: -159px;
          bottom: -167px;
        }
      }
      .esp2 {
        float: right;
        background: url("/images/esports/esports3.png") no-repeat;
      }
      .start {
        position: absolute;
        background: url("/images/esports/esports4.png") no-repeat;
        width: 206px;
        height: 57px;
        bottom: 52px;
        left: 102px;
        cursor: pointer;
        z-index: 1;
      }
      .start:hover {
        background: url("/images/esports/esports5.png") no-repeat;
      }
      .logo {
        position: absolute;
        bottom: -114px;
        left: 55px;
      }
      .info {
        position: absolute;
        bottom: 0;
        left: -215px;
        width: 250px;
        line-height: 33px;
        span {
          display: block;
          float: left;
          width: 100%;
          text-align: right;
        }
        .tit {
          font-size: 16px;
          font-weight: 600;
        }
        .tit1 {
          font-size: 14px;
          color: #80858a;
        }
      }
      .IM {
        right: -210px;
        left: inherit;
        span {
          text-align: left;
        }
      }
    }
  }
}
</style>
