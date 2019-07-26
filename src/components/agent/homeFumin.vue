<template>
  <div class="homeFumin" v-title="'首页'">
    <div class="banner">
      <el-carousel trigger="click" height="510px">
        <el-carousel-item v-for="(item, i) in banner" :key="i">
          <img :src="item.image" alt draggable="false" />
        </el-carousel-item>
      </el-carousel>
      <div class="flexC notice">
        <img src="/home/notices.png" alt />
        <marquee
          behavior="scroll"
          width="1086"
          loop="-1"
          scrollamount="8"
          onMouseOut="this.start()"
          onMouseOver="this.stop()"
          >{{ notice }}</marquee
        >
      </div>
    </div>
    <div class="content">
      <div class="w1200 common mainTab">
        <ul id="tabUl">
          <li
            class
            v-for="(item, i) in menuList"
            :class="{ showImg: currentImg == i }"
            :key="i"
            @mouseenter="changeTab(i)"
            @click="tab(item.enName, item.name)"
          >
            <p>0{{ i + 1 }}</p>
            <div>
              <p>{{ item.enTitle }}</p>
              <div>{{ item.name }}</div>
            </div>
            <span>开始游戏</span>
            <img :src="item.img" alt />
          </li>
        </ul>
      </div>

      <div class="w1200 jackpot">
        <img class="jackpotBg" src="/home/jackpotBg1.png" alt />
        <img class="tiger" src="/home/jackpot.png" alt />
        <div v-if="jackpotNum" class="bonus">{{ jackpotNum.jackpot }}</div>
      </div>

      <div class="w1200 common">
        <img class="commonImg" src="/home/slots.png" alt />
        <div class="slotsBox">
          <div class="slots" v-if="AllSlots">
            <div
              class="slotsList"
              v-for="(item, i) in AllSlots.list"
              @click="switchSlot(item, i)"
              :key="i"
            >
              <img :src="item.img" :class="{ bright: slotIndex == i }" alt />
              <div class="title">
                {{ item.title }}
                <div
                  @click="
                    tabTypeKey(
                      AllSlots.enName,
                      AllSlots.list,
                      item.typeKey,
                      item.title
                    )
                  "
                  class="more flexC"
                >
                  更多游戏
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="currentSlot.length"
            class="slot"
            :class="{ switch: ifSwitch }"
          >
            <div
              class="slotItem"
              v-for="(item, i) in currentSlot"
              @click="playGame(item.link)"
              :key="i"
            >
              <img class="gameImg" :src="item.img" alt />
              <img class="slotHover" src="/home/slotHover.png" alt />
              <div class="text">
                <p class="title">{{ item.title }}</p>
                <p class="star">
                  <span>推荐指数</span>
                  <i v-for="i in item.star" class="iconfont" :key="i"
                    >&#xe72c;</i
                  >
                  <i v-if="5 - item.star == 1" class="iconfont">&#xe72b;</i>
                </p>
              </div>
              <div class="com left"></div>
              <div class="com top"></div>
              <div class="com right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-playStart></my-playStart>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      currentImg: 0,
      menuList: [],
      NoticeShow: false,
      siteConfig: [],
      onlineUsers: 0,
      currentSlot: [],
      banner: [],
      notice: [],
      slotIndex: 0,
      ifSwitch: false,
      AllLottery: null,
      AllSlots: [],
      ALLGame: null,
      bonus: "",
      ifFadein: false,
      leaderboard: null,
      lotteryUrl: "/api/auth/sLogin",
      changlong: true,
      changLongArr: [],
      changLongArrTimer: null,
      disableId: [],
      para: {
        actionNo: "",
        kjTime: "",
        type: ""
      }
    };
  },
  created() {
    this.jackpots();
  },
  computed: {
    ...mapGetters(["jackpotNum", "allConfig"])
  },
  methods: {
    ...mapActions(["jackpots"]),
    changeTab(i) {
      this.currentImg = i;
    },
    showRule() {
      this.changlong = !this.changlong;
    },
    switchSlot(item, i) {
      let l = this.AllSlots.list[i];
      if (l.typeKey == "JDB") {
        return this.playGame(l.link);
      }
      this.slotIndex = i;
      this.currentSlot = this.AllSlots.list[i].list;
    },
    tab(enName, list, name) {
      this.$router.push({ name: enName });
      if (enName == "CHESS") return;
      this.$store.commit("CHANGE_TITLE", name);
    },
    tabTypeKey(name, list, type, title) {
      if (type == "JDB") return;
      this.$store.commit("CHANGE_TITLE", title);
      this.$router.push({ name: name, params: { typeKey: type } });
    }
  }
};
</script>

<style scoped lang="scss">
.homeFumin {
  padding-top: 68px;
  .banner {
    position: relative;
    .el-carousel {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .notice {
      position: absolute;
      width: 100%;
      z-index: 10;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      height: 42px;
      line-height: 42px;
      .van-notice-bar {
        margin-left: 86px;
        width: 500px;
        padding: 0;
      }
      img {
        margin-right: 20px;
        width: 26px;
      }
    }
  }
  .content {
    padding-bottom: 30px;
    background: url("/home/bg.png");
    background-size: 100% auto;
    .common {
      margin-top: 30px;
      .commonImg {
        width: 160px;
        margin-bottom: 12px;
        margin-left: 18px;
      }
    }
    .slotsBox {
      position: relative;
      background: url("/home/slotsBg.png") no-repeat;
      background-size: 100% 100%;

      .slots {
        height: 150px;
        display: flex;
        cursor: pointer;
        .slotsList {
          background: rgba(3, 15, 27, 0.8);
          border-right: 1px solid #2b2112;
          border-bottom: 1px solid #2b2112;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 0;
          img {
            width: 72px;
            height: 72px;
            margin: 10px 0;
            filter: grayscale(100%);
          }
          .bright {
            filter: none;
          }
          .title {
            text-align: center;
            color: #fff;
            position: relative;
            .more {
              visibility: hidden;
              width: 100px;
              height: 26px;
              border-radius: 13px;
              position: absolute;
              left: 50%;
              top: 66%;
              transform: translate(-50%, -50%);
              background-image: linear-gradient(1deg, #f37335 0%, #fdc830 100%);
            }
          }
        }
        .slotsList:hover {
          background: linear-gradient(
            rgba(28, 20, 9, 0.5),
            rgba(191, 138, 60, 0.4)
          );
          img {
            filter: none;
          }
          .more {
            visibility: visible;
          }
        }
      }
      .slot {
        display: flex;
        overflow: hidden;
        padding-left: 8px;
        .slotItem {
          margin: 10px 10px 10px 10px;
          position: relative;
          cursor: pointer;
          .gameImg {
            width: 216px;
            height: 218px;
            filter: grayscale(100%);
          }
          .slotHover {
            position: absolute;
            top: 0;
            height: 0;
          }
          .text {
            background: #242424;
            p {
              padding-left: 8px;
            }
            .title {
              height: 50px;
              line-height: 50px;
              font-size: 19px;
            }
            .star {
              padding-bottom: 10px;
              color: #999;
              span {
                margin-right: 8px;
              }
              i {
                font-size: 20px;
              }
            }
          }
          .com {
            position: absolute;
            top: 0;
            visibility: hidden;
          }
          .left {
            left: 0;
            width: 4px;
            height: 218px;
            background: linear-gradient(#fe4b1a 0%, #f8aa30 100%);
          }
          .top {
            width: 100%;
            height: 4px;
            background: #fe4b1a;
          }
          .right {
            right: 0;
            width: 4px;
            height: 218px;
            background: linear-gradient(#fe4b1a 0%, #f8aa30 100%);
          }
        }
        .slotItem:hover {
          img {
            filter: none;
          }
          .slotHover {
            width: 216px;
            height: 218px;
          }
          .text {
            background-image: linear-gradient(1deg, #f37335 0%, #fdc830 100%);
            p {
              color: #fff;
            }
          }
          div {
            visibility: visible;
          }
        }
      }
    }
    .jackpot {
      position: relative;
      margin-top: 30px;
      .jackpotBg {
        width: 100%;
        height: 140px;
      }
      .tiger {
        position: absolute;
        right: -40px;
        top: -18px;
      }
      .bonus {
        position: absolute;
        left: 480px;
        top: 20px;
        font-family: "bigFont";
        font-size: 76px;
        color: #c4c4c4;
      }
    }

    .mainTab {
      display: flex;
      margin-top: 100px;
      ul {
        position: relative;
        width: 1200px;
        height: 412px;

        li {
          background: rgba(0, 0, 0, 0.8);
          width: 280px;
          height: 102px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid rgb(95, 95, 95);
          cursor: pointer;
          p {
            font-size: 48px;
          }
          > div {
            width: 110px;
            p {
              font-size: 12px;
            }
            > div {
              font-size: 20px;
            }
          }
          span {
            width: 64px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border: 1px solid #fff;
          }
          img {
            display: none;
            position: absolute;
            left: 280px;
            top: -97px;
            width: 920px;
            height: 561px;
            animation: fadeIn 1.5s forwards;
          }
        }
        .showImg {
          background: #2a994d;
          img {
            display: block;
          }
        }
      }
    }
  }
}
</style>
