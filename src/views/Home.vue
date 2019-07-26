<template>
  <div
    class="home"
    :class="{ huminTop: allConfig.tpl_pc == 'fumin' }"
    v-title="'首页'"
  >
    <my-kefu></my-kefu>
    <my-top></my-top>
    <my-header></my-header>
    <div class="announcementWrap" v-if="NoticeShow" @click="closeNotice">
      <div class="announcement" @click.stop>
        <!-- <img src="/home/notice-laba.png" alt draggable="false" /> -->
        <!-- <div class="close" @click="closeNotice"></div> -->
        <div class="closeI flexC" @click="closeOneday">
          <i class="iconfont">&#xe60e;</i>
        </div>
        <div class="notice">
          <div class="noticeTitle">{{ siteConfig.picGGTitle }}</div>
          <div class="noticeText" v-html="siteConfig.picGG"></div>
        </div>
      </div>
    </div>
    <div class="banner">
      <el-carousel trigger="click" height="510px">
        <el-carousel-item v-for="(item, i) in banner" :key="i">
          <img
            :src="item.image"
            alt
            draggable="false"
            @click="openLink(item.linkUrl)"
          />
        </el-carousel-item>
      </el-carousel>
      <div class="flexC notice">
        <img src="/home/notices.png" alt draggable="false" />
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
      <div class="timeWrap" v-if="allConfig.tpl_pc != 'fumin'">
        <ul class="w1200 flexB">
          <li class="flexC">
            <div class="left">
              <img class="time" src="/home/time.png" alt draggable="false" />
              <!-- <img class="time1" src="/home/time1.png" alt draggable="false" /> -->
              <div class="text">秒充</div>
              <div class="leftBox">
                <div>
                  <div></div>
                </div>
              </div>
              <div class="rightBox">
                <div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="right">
              <div>
                秒充值
                <span class="firstSpan">{{ time1 }}</span
                >秒
              </div>
              <p>平均存款到账时间</p>
            </div>
          </li>
          <li class="flexC">
            <div class="left">
              <img class="time" src="/home/time.png" alt draggable="false" />
              <div class="text">秒取</div>
              <div class="leftBox">
                <div>
                  <div></div>
                </div>
              </div>
              <div class="rightBox">
                <div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="right">
              <div>
                秒取款
                <span>{{ time2 }}</span
                >秒
              </div>
              <p>平均取款到账时间</p>
            </div>
          </li>
          <li class="flexC">
            <div class="left">
              <img class="time" src="/home/time.png" alt draggable="false" />
              <div class="text">合作</div>
              <div class="leftBox">
                <div>
                  <div></div>
                </div>
              </div>
              <div class="rightBox">
                <div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="right">
              <div>
                合作
                <span>{{ time3 }}</span
                >家
              </div>
              <p>合作支付平台</p>
            </div>
          </li>
          <li class="flexC">
            <div class="left">
              <img class="time" src="/home/time.png" alt draggable="false" />
              <div class="text">在线</div>
              <div class="leftBox">
                <div>
                  <div></div>
                </div>
              </div>
              <div class="rightBox">
                <div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="right">
              <div>
                在线
                <span class="lastSpan">{{ onlineUsers }}</span
                >人
              </div>
              <p>24小时之内登录玩家</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="w1200 common mainTab" v-if="allConfig.tpl_pc == 'fumin'">
        <ul>
          <li
            class
            v-for="(item, i) in menuList"
            :class="{ showImg: currentImg == i }"
            :key="i"
            @mouseenter="changeTab(i)"
          >
            <p>0{{ i + 1 }}</p>
            <div class="left" @click="tab(item.enName, item.name)">
              <p>{{ item.enTitle }}</p>
              <div>{{ item.name }}</div>
            </div>
            <span @click="tab(item.enName, item.name)">开始游戏</span>
            <div class="right">
              <div class="textBox">
                <div class="text1">
                  <h2>{{ item.name }}</h2>
                  <p>{{ item.enName }}</p>
                </div>
                <div class="text2">
                  <div class="textDiv">{{ item.text }}</div>
                  <h6 @click="tab(item.enName, item.name)">立即投注</h6>
                </div>
              </div>
              <img
                v-show="item.enName != 'SLOTS'"
                :class="`${item.enName}bg`"
                class="imgBg"
                :src="item.imgBg"
                alt
                draggable="false"
              />
              <!-- [{CASINObg:item.enName=='CASINO'},] -->
              <img
                :class="item.enName"
                class="img"
                :src="item.img"
                alt
                draggable="false"
              />
            </div>
          </li>
        </ul>
      </div>

      <div class="w1200 common lotteryBox" v-if="allConfig.tpl_pc != 'fumin'">
        <img class="commonImg" src="/home/lottery.png" alt draggable="false" />
        <div class="lottery">
          <div class="leftWrap">
            <div class="left" v-if="AllLottery">
              <div class="top">
                <div class="topHot">
                  <img src="/home/hot.png" alt draggable="false" />
                  <p>热门彩种</p>
                </div>
                <ul>
                  <li
                    class="recommendItem"
                    v-for="(item, i) in AllLottery.recommend[0].list"
                    @click="jumpLottery(item.id)"
                    :key="i"
                  >
                    <img :src="item.img" alt draggable="false" />
                    <p>{{ item.title }}</p>
                  </li>
                </ul>
              </div>
              <div class="bottom">
                <div
                  v-for="(item, i) in AllLottery.list"
                  @click="playGame(item.link)"
                  :key="i"
                >
                  <img :src="item.bigImg" alt draggable="false" />
                </div>
              </div>
            </div>
          </div>
          <div class="right" v-if="changlong">
            <div class="title">
              长龙助手
              <i class="iconfont" @click="showRule">&#xe74c;</i>
            </div>
            <ul class="noChangLongArr" v-if="!changLongArr.length">
              <p>暂无记录</p>
            </ul>
            <ul v-else>
              <li v-for="(item, i) in changLongArr" :key="i">
                <div>
                  <img :src="item.img" alt draggable="false" />
                </div>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>
                    <span>{{ item.actionNo }}</span>
                    <my-Timer
                      :time="
                        item.endTime - parseInt(new Date().getTime() / 1000)
                      "
                      :typeId="item.typeId"
                      @changLongTimeOver="changLongTimeOver"
                    ></my-Timer>
                  </p>
                  <p>
                    <span>{{ item.weiTitle }}</span>
                    <span :class="item.className">{{ item.weiName }}</span>
                    <span>{{ item.weiNum }}期</span>
                  </p>
                </div>
                <div :class="{ disable: disableId.indexOf(item.typeId) >= 0 }">
                  <b
                    v-for="(child, j) in item.items"
                    :key="j"
                    @click="
                      selecting(
                        j,
                        item.id,
                        item.data_ftime,
                        child.actionData,
                        child.bonusProp,
                        item.playedGroupId,
                        item.playedId,
                        item.typeId,
                        item.actionNo,
                        item.endTime
                      )
                    "
                    :class="{
                      onBtn: isOn.indexOf(item.id) >= 0 && isOn.indexOf(j) >= 0
                    }"
                  >
                    <p>{{ child.name }}</p>
                    <span>赔率{{ child.bonusProp }}</span>
                  </b>
                </div>
              </li>
            </ul>
            <div class="footer" v-show="code.actionNum">
              <div>
                <span @click="empty">清空</span>
                <span>共{{ code.actionNum || 0 }}注，</span>
                <span>
                  最高可中{{ (code.beiShu * code.bonusProp).toFixed(2) }}元
                </span>
              </div>
              <div @click="buy">马上投注</div>
              <div v-show="code.actionNum">
                <span>每注金额</span>
                <input type="text" maxlength="7" v-model="code.beiShu" />
                元，请输入要投注的金额
              </div>
            </div>
          </div>
          <div class="right" v-else>
            <div class="title">
              长龙助手说明
              <i class="iconfont" @click="showRule">&#xe60e;</i>
            </div>
            <div class="content-long">
              <p>
                长龙助手是对快3、时时彩、PK10、六合彩特定玩法的“大小单双”
                开奖结果进行跟踪统计，并可进行快捷投注的助手工具；
              </p>
              <p>
                每期出现大、小、单、双的概率为50%，如果连续3期及以上的开奖结果相同，称之为“长龙”，通常会采用倍投的方式进行“砍龙”或“顺龙”。
              </p>
              <h3 class="long-ico">什么是砍龙？</h3>
              <p class="long-tab">
                如连续开5期“单”，可以选择“双”进行投注，这种投注方案称之为“砍龙”；
              </p>
              <h3 class="long-ico">什么是顺龙？</h3>
              <p class="long-tab">
                如连续开5期“单”，继续选择“单”进行投注，这种投注方案称之为“顺龙”；
              </p>
              <h3 class="long-ico">什么是倍投？</h3>
              <p class="long-tab">
                倍投是一种翻倍投注方式，是为了保障能够在“砍龙”或“顺龙”的过程中持续盈利的一种投注方式。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="w1200 jackpot" v-if="allConfig.tpl_pc == 'fumin'">
        <img
          class="jackpotBg jackpotBg2"
          src="/home/jackpotBg2.jpg"
          alt
          draggable="false"
        />
        <!-- <img class="tiger" src="/home/jackpot.png" alt draggable="false" /> -->
        <div v-if="jackpotNum" class="bonus bonus2">
          {{ jackpotNum.jackpot }}
        </div>
      </div>
      <div class="w1200 jackpot" v-else>
        <img
          class="jackpotBg"
          src="/home/jackpotBg.png"
          alt
          draggable="false"
        />
        <img class="tiger" src="/home/jackpot.png" alt draggable="false" />
        <div v-if="jackpotNum" class="bonus">{{ jackpotNum.jackpot }}</div>
      </div>

      <div class="w1200 common">
        <img class="commonImg" src="/home/slots.png" alt draggable="false" />
        <div class="slotsBox">
          <div class="slots" v-if="AllSlots">
            <div
              class="slotsList"
              v-for="(item, i) in AllSlots.list"
              @click="switchSlot(item, i)"
              :key="i"
            >
              <img
                :src="item.img"
                :class="{ bright: slotIndex == i }"
                alt
                draggable="false"
              />
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
              <img class="gameImg" :src="item.img" alt draggable="false" />
              <img
                class="slotHover"
                src="/home/slotHover.png"
                alt
                draggable="false"
              />
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
          <!-- <img src="/home/switch.png" @click="switchItem" alt draggable="false" /> -->
        </div>
      </div>

      <div class="realPersonBox common" v-if="allConfig.tpl_pc != 'fumin'">
        <div class="w1200">
          <img class="liveImg" src="/home/live.png" alt draggable="false" />
          <div class="wrap">
            <div class="realPerson">
              <div class="flexB person" v-if="AllPerson">
                <div
                  v-for="(item, i) in AllPerson.list"
                  @click="playGame(item.link)"
                  :key="i"
                >
                  <img
                    class="beauty"
                    :src="`/home/person${i}.png`"
                    alt
                    draggable="false"
                  />
                  <img
                    class="bg"
                    src="/home/person.png"
                    alt
                    draggable="false"
                  />
                  <p class="title">
                    <span>{{ item.en }}</span>
                    {{ item.title }}
                  </p>
                  <div class="tip">
                    <p v-for="(child, i) in item.list" :key="i">
                      {{ child.title }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flexB" v-if="information">
                <div class="information flexA">
                  <div v-for="(item, i) in information" :key="i" class="flexC">
                    <img :src="`/home/live${i}.png`" alt draggable="false" />
                    <div>
                      <p>{{ item.title }}</p>
                      <div>{{ item.tip }}</div>
                    </div>
                  </div>
                </div>
                <div
                  class="right"
                  @click="tab(AllPerson.enName, AllPerson.list, AllPerson.name)"
                >
                  <p class="flexC">查看更多游戏</p>
                  <div class="flexC">
                    <i class="iconfont">&#xe747;</i>
                  </div>
                </div>
              </div>
            </div>
            <div class="rankingWrap">
              <div class="ranking">
                <ul>
                  <li
                    :class="ifFadein && i == 0 ? 'fade2' : ''"
                    class="flexB"
                    v-for="(item, i) in bonus"
                    :key="i"
                  >
                    <img :src="item.avatar" alt draggable="false" />
                    <div>
                      <div class="flexB right1">
                        <p>中奖</p>
                        <span>{{ item.title }}</span>
                      </div>
                      <div class="line"></div>
                      <div class="flexB right2">
                        <p>{{ item.username }}</p>
                        <div>
                          <span>{{ item.bonus }}</span
                          >元
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="titleBg"></div>
              <div class="title">
                今日累计中奖(元)
                <span>{{ todayBonus.bonus }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w1200 common pokerBox"
        v-if="AllPoker && allConfig.tpl_pc != 'fumin'"
      >
        <div class="left">
          <div class="flexB poker">
            <img src="/home/poker.png" alt draggable="false" />
            <div @click="tab(AllPoker.enName, AllPoker.list, AllPoker.name)">
              更多棋牌游戏
              <i class="iconfont">&#xe748;</i>
            </div>
          </div>
          <div class="leftPoker">
            <marquee
              behavior="alternate"
              width="740"
              loop="-1"
              scrollamount="3"
              onMouseOut="this.start()"
              onMouseOver="this.stop()"
            >
              <div class="poker1">
                <div
                  class="pokerDiv"
                  v-for="(item, i) in AllPoker.list"
                  @click="playGame(item.link)"
                  :key="i"
                >
                  <div class="line"></div>
                  <img
                    class="people"
                    :src="item.bigImg"
                    alt
                    draggable="false"
                  />
                  <img class="bg" :src="item.bigImgBg" alt draggable="false" />
                  <p>{{ item.title }}</p>
                  <div class="flexC">
                    <i class="iconfont">&#xe729;</i>
                    <span>ENTER</span>
                    <i class="iconfont">&#xe729;</i>
                  </div>
                </div>
              </div>
            </marquee>
          </div>
        </div>
        <div class="right">
          <img class="fishBg" :src="ALLFishing.bigImg" alt draggable="false" />
          <img class="text" src="/home/fishText.png" alt draggable="false" />
          <div
            class="rightTop flexE"
            @click="tab(ALLFishing.enName, ALLFishing.list, ALLFishing.name)"
          >
            更多捕鱼游戏
            <i class="iconfont">&#xe748;</i>
          </div>
          <img class="fish" src="/home/fish.png" alt draggable="false" />
          <img class="eyes" src="/home/eyes.png" alt draggable="false" />
        </div>
      </div>

      <div class="w1200 common sportsBox" v-if="allConfig.tpl_pc != 'fumin'">
        <div class="game" v-if="ALLGame">
          <img :src="ALLGame.bigImg" alt draggable="false" />
          <div
            v-for="(item, i) in ALLGame.list"
            @click="playGame(item.link)"
            class="box"
            :class="item.typeKey == 'FanYa' ? 'box2' : 'box1'"
            :key="i"
          ></div>
        </div>
        <div class="sports" v-if="allSports">
          <img :src="allSports.bigImg" alt draggable="false" />
          <div
            v-for="(item, i) in allSports.list"
            @click="playGame(item.link)"
            class="box"
            :class="item.typeKey == 'BBIN' ? 'box4' : 'box3'"
            :key="i"
          ></div>
        </div>
      </div>
    </div>
    <my-playStart></my-playStart>
    <my-foot></my-foot>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  initHome,
  changLongList,
  lotteryBuy,
  exchangeAllToLottery
} from "../api";
import { setInterval } from "timers";

export default {
  name: "home",
  data() {
    return {
      currentImg: 0,
      menuList: [],
      // menuList: [
      //   {
      //     enTitle: "Lottery games",
      //     name: "彩票游戏",
      //     enName: "LOTTERY",
      //     text:
      //       "拥有最齐全的彩票种类，及多个国家（地区）官方即时开奖结果，满足客户全方位需求。彩种包括：六合彩、重庆时时彩、北京快三、......",
      //     img: "/home/tab0.png",
      //     imgBg: "/home/tabBg0.png"
      //   },
      //   {
      //     enTitle: "Live entertainment",
      //     name: "真人视讯",
      //     enName: "CASINO",
      //     text:
      //       "提供真人百家乐、轮盘、骰宝、龙虎斗、二八杠等，美女荷官在线发牌，画面真实高清。在网上体验如同亲临赌场的刺激！",
      //     img: "/home/tab3.png",
      //     imgBg: "/home/tabBg3.png"
      //   },
      //   {
      //     enTitle: "Electronic recreation",
      //     name: "电子游艺",
      //     enName: "SLOTS",
      //     text:
      //       "全球全新电子竞技联盟，拥有多样模式体验，热血竞技尽享快感！海量英雄随心选择，精妙配合默契作战，操作简单易上手，极致还原经典体验。",
      //     img: "/home/tab1.png",
      //     imgBg: "/home/tabBg1.png"
      //   },
      //   {
      //     enTitle: "Sports events",
      //     name: "体育竞技",
      //     enName: "SPORTS",
      //     text:
      //       "拥有健全的体育博彩系统，游戏库中拥有超过50种各类体育走地赛事，涉及足球、篮球、网球等世界主流体育项目，每月提供上万场赛事预播及直播。",
      //     img: "/home/tab2.png",
      //     imgBg: "/home/tabBg2.png"
      //   }
      // ],
      NoticeShow: false,
      siteConfig: [],
      time1: 0,
      time2: 0,
      time3: 0,
      onlineUsers: 0,
      information: [
        { title: "安全", tip: "14年老平台，值得信赖" },
        { title: "多元化", tip: "多元化，更多选择" },
        { title: "体验", tip: "优质的用户体验" }
      ],
      currentSlot: [],
      banner: [],
      notice: [],
      activeIndex: 0,
      slotIndex: 0,
      ifSwitch: false,
      AllLottery: null,
      AllPoker: null,
      AllPerson: null,
      AllSlots: [],
      ALLFishing: null,
      ALLGame: null,
      allSports: null,
      bonus: "",
      todayBonus: "",
      ifFadein: false,
      leaderboard: null,
      lotteryUrl: "/api/auth/sLogin",
      selected: sessionStorage.getItem("ChangLongSelected") || "1",
      changlong: true,
      changLongArr: [],
      changLongArrTimer: null,
      disableId: [],
      code: {
        actionData: "",
        actionNum: "",
        beiShu: "",
        bonusProp: "",
        fanDian: 0,
        mode: 1,
        orderId: "",
        playedGroup: "",
        playedId: "",
        type: "",
        weiShu: 0
      },
      para: {
        actionNo: "",
        kjTime: "",
        type: ""
      },
      isOn: [],
      parameter: {
        pageSize: 20,
        offset: 0,
        status: 0,
        timeType: 0,
        typeId: 0
      },
      lotteryArr: [],
      noData: false,
      loading: false
      // showFooter: false,
    };
  },
  created() {
    let timer = setInterval(() => {
      if (this.time2 < 60) {
        this.time2++;
      }
      if (this.time3 < 90) {
        this.time3++;
      }
    }, 40);
    let timer1 = setInterval(() => {
      if (this.time1 < 6) {
        this.time1++;
      }
      if (this.onlineUsers < 7000) {
        this.onlineUsers += 1000;
        if (this.onlineUsers == 7000) {
          return (this.onlineUsers += Math.floor(
            Math.random() * (3000 - 1) + 1
          ));
        }
      }
    }, 140);
    setTimeout(() => {
      clearInterval(timer);
    }, 3600);
    setTimeout(() => {
      clearInterval(timer1);
    }, 1120);
    this.jackpots();
    this.startboard();
    this.initChangLongList();
    this.clearChangLongArrTimer();
    if (!this.changLongArrTimer) {
      this.changLongArrTimer = setInterval(() => {
        // console.log(this.$route.name,'this.$route.name')
        if (this.$route.name != "HOME") return;
        clearInterval(this.changLongArrTimer);
        this.initChangLongList();
      }, 5000);
    }
    initHome().then(res => {
      console.log(res.data, "res.data--homeInfo");
      if (res.status) {
        this.siteConfig = res.data.siteConfig;
        this.banner = res.data.banner;
        this.menuList = res.data.menuList;
        this.bonus = res.data.bonus;
        this.todayBonus = res.data.todayBonus;
        let notice = " ";
        res.data.notice.forEach(e => {
          notice += "" + e.content;
        });
        this.notice = notice;
        res.data.content.forEach(e => {
          let c = e.classify;
          if (c == "CP") {
            this.AllLottery = e;
          } else if (c == "SX") {
            this.AllPerson = e;
          } else if (c == "DZ") {
            this.AllSlots = e;
            this.currentSlot = e.list[0].list;
          } else if (c == "QP") {
            this.AllPoker = e;
          } else if (c == "BY") {
            this.ALLFishing = e;
          } else if (c == "DJ") {
            this.ALLGame = e;
          } else if (c == "TY") {
            this.allSports = e;
          }
        });
        if (this.$cookies.get("NoticeShow")) {
          console.log(
            Boolean(this.$cookies.get("NoticeShow") * 1),
            "get(NoticeShow)"
          );
          return (this.NoticeShow = Boolean(
            this.$cookies.get("NoticeShow") * 1
          ));
        }
        if (res.data.siteConfig.ispicgg == 1) {
          this.NoticeShow = true;
        }
      }
    });
  },

  computed: {
    ...mapGetters(["jackpotNum", "allConfig"])
  },
  watch: {
    activeIndex(newVal) {
      if (newVal > this.banner.length - 1) {
        this.activeIndex = 0;
      } else if (newVal < 0) {
        this.activeIndex = this.banner.length - 1;
      }
    },
    isOn(newVal) {
      if (newVal.length) {
        this.code.actionNum = 1;
      } else {
        this.code.actionNum = 0;
      }
    },
    selected(newVal) {
      sessionStorage.setItem("ChangLongSelected", newVal);
      if (newVal > 1) {
        console.log(this.parameter);
        this.parameter.offset = 0;
        this.loading = false;
        this.lotteryRecords();
      } else {
        if (!this.changLongArr.length) {
          this.initChangLongList();
        }
      }
    }
  },
  methods: {
    ...mapActions(["jackpots"]),
    openLink(linkUrl) {
      console.log(linkUrl, "linkUrl");
      if (linkUrl.length < 6) return;
      window.open(
        this.linkUrl,
        "_blank",
        "height=800, width=900, top=100, left=100"
      );
      // this.winOpen(this.linkUrl);
    },
    changeTab(i) {
      this.currentImg = i;
    },
    closeNotice() {
      this.NoticeShow = false;
    },
    closeOneday() {
      this.$cookies.set("NoticeShow", 0, 24 - new Date().getHours() + "H");
      console.log(new Date().getHours(), "hour");
      this.NoticeShow = false;
    },
    initChangLongList() {
      changLongList().then(res => {
        if (res.status) {
          // console.log(res.data, "changLongArr");
          this.disableId = [];
          this.changLongArr = res.data;
        }
      });
    },
    clearChangLongArrTimer() {
      clearInterval(this.changLongArrTimer);
      this.changLongArrTimer = null;
    },
    selecting(
      j,
      id,
      data_ftime,
      actionData,
      bonusProp,
      playedGroup,
      playedId,
      typeId,
      actionNo,
      endTime
    ) {
      if (this.disableId.indexOf(typeId) >= 0) {
        this.$message({
          type: "error",
          showClose: true,
          duration: 2000,
          message: "该玩法在封单中哦"
        });
      } else {
        // this.showFooter=true
        if (this.isOn.indexOf(id) >= 0 && this.isOn.indexOf(j) >= 0) {
          this.initData();
          this.isOn = [];
        } else {
          console.log(typeId, "typeId");
          this.isOn = [id, j];
          this.code.actionData = actionData;
          this.code.bonusProp = bonusProp;
          this.code.orderId = parseInt(new Date() - 2147486647 * 623);
          this.code.playedGroup = playedGroup;
          this.code.playedId = playedId;
          this.code.type = typeId;
          this.para.type = typeId;
          this.para.actionNo = actionNo;
          this.para.kjTime = endTime * 1 + data_ftime * 1;
        }
      }
    },
    buy() {
      if (!this.$store.getters.userInfo) {
        return this.$message.error({
          message: "请登录后开始游戏",
          showClose: true,
          duration: 2000,
          center: true
        });
      }
      if (!this.code.beiShu) {
        return this.$message.error({
          message: "请输入投注金额",
          duration: 2000,
          center: true
        });
      }
      let code = [];
      code.push(this.code);
      let buyData = {
        code,
        para: { ...this.para },
        is_combine: 0
      };
      lotteryBuy(buyData).then(res => {
        this.code.actionNum = "";
        if (res.status) {
          // this.popupFlag = true;
          this.isOn = [];
          this.$message({
            type: "success",
            dangerouslyUseHTMLString: true,
            message: res.msg
          });
        } else {
          this.$message({
            type: "error",
            dangerouslyUseHTMLString: true,
            duration: 2000,
            message: res.msg || "投注超时"
          });
        }
      });
    },
    showRule() {
      this.changlong = !this.changlong;
    },
    jumpLottery(gameId) {
      console.log(gameId, "gameId");
      if (!this.$store.getters.userInfo) {
        return this.$message.error({
          message: "请登录后开始游戏",
          showClose: true,
          duration: 2000,
          center: true
        });
      }
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)"
      });
      exchangeAllToLottery().then(res => {
        loading.close();
        console.log(res, "exchangeAllToLottery");
        window.open(this.lotteryUrl + "/gameId/" + gameId);
      });
    },
    changLongTimeOver(typeId) {
      if (this.disableId.indexOf(typeId) <= 0) {
        this.disableId.push(typeId);
      }
      if (this.code.type == typeId) {
        this.initData();
        this.isOn = [];
      }
    },
    empty() {
      this.isOn = [];
      this.initData();
    },
    initData() {
      /* 初始化数据 */
      // this.popupFlag = false;
      this.code = {
        actionData: "",
        actionNum: "",
        beiShu: "",
        bonusProp: "",
        fanDian: 0,
        mode: 1,
        orderId: "",
        playedGroup: "",
        playedId: "",
        type: "",
        weiShu: 0
      };
      this.para = {
        actionNo: "",
        kjTime: "",
        type: ""
      };
    },
    startboard() {
      clearInterval(this.leaderboard);
      this.leaderboard = setInterval(() => {
        // console.log("leaderboardleaderboard");
        if (!this.bonus) return;
        var a = this.bonus.shift();
        var arr = this.bonus.concat(a);
        this.bonus = arr;
        // this.ifFadein = true;
        // setTimeout(() => {
        //   this.ifFadein = false;
        // }, 1480);
      }, 1500);
    },
    switchSlot(item, i) {
      let l = this.AllSlots.list[i];
      if (l.typeKey == "JDB") {
        return this.playGame(l.link);
      }
      this.slotIndex = i;
      this.currentSlot = this.AllSlots.list[i].list;
      // console.log(this.AllSlots.list[i], "this.currentSlot");
    },
    tab(enName, list, name) {
      console.log(
        this.AllPoker,
        this.AllPoker.enName,
        "AllPokerAllPokerAllPoker"
      );
      console.log(enName, list, name, "enName ,list, name,tabtabtabtabtab");
      this.$store.commit("SET_CURRENT_GAME", list);
      this.$router.push({ name: enName });
      if (enName == "CHESS") return;
      this.$store.commit("CHANGE_TITLE", name);
    },
    tabTypeKey(name, list, type, title) {
      if (type == "JDB") return;
      console.log(list, name, type, "list,name1111111111111");
      // this.$store.commit("SET_CURRENT_GAME", list);
      this.$store.commit("CHANGE_TITLE", title);
      this.$router.push({ name: name, params: { typeKey: type } });
    }
  },
  beforeDestroy() {
    this.clearChangLongArrTimer();
    clearInterval(this.leaderboard);
    this.leaderboard = null;
  }
};
</script>

<style scoped lang="scss">
.home {
  padding-top: 42px;
  color: #fff;
  &.huminTop {
    padding-top: 110px;
  }
  .announcementWrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 3001;
    .announcement {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 670px;
      // height: 570px;
      background: rgb(233, 233, 233);
      color: #000;
      border-radius: 10px;
      // .close {
      //   position: absolute;
      //   right: 82px;
      //   width: 70px;
      //   height: 70px;
      //   cursor: pointer;
      // }
      .closeI {
        position: absolute;
        top: -20px;
        right: -20px;
        // background: rgba(255, 255, 255, 0.6);
        background: rgb(233, 233, 233);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        i {
          font-size: 26px;
        }
      }
      .notice {
        // margin-left: 104px;
        width: 100%;
        height: 100%;
        .noticeTitle {
          text-align: center;
          font-size: 20px;
          height: 66px;
          line-height: 66px;
          position: relative;
        }
        img {
          width: 100%;
        }
        .noticeText {
          // width: 400px;
          // margin: auto;
          // width: 100%;
          min-height: 400px;
          // text-indent: 100px;
          overflow-y: scroll;
          line-height: 26px;
          font-size: 16px;
          padding: 0 20px 20px 20px;
          -ms-overflow-style: none;
        }
        .noticeText::-webkit-scrollbar {
          display: none;
        }
      }
      // .notice:hover {
      //   .noticeText::-webkit-scrollbar {
      //     display: block !important;
      //   }
      // }
    }
  }
  .banner {
    position: relative;
    .el-carousel {
      img {
        cursor: pointer;
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
        // height: 37px;
      }
    }
  }
  .content {
    padding-bottom: 30px;
    background: url("/home/bg.png");
    background-size: 100% auto;
    .timeWrap {
      border-bottom: 1px solid #d3d3d3;
      background: #f4f6f9;
      ul {
        padding: 16px 0 14px 0;
        li {
          .left {
            position: relative;
            img {
              width: 108px;
            }
            .time {
              margin-right: 6px;
            }
            .time1 {
              transition: All 0.8s ease-in-out;
              position: absolute;
              left: 0;
              top: 0;
            }
            .text {
              font-size: 18px;
              position: absolute;
              left: 35px;
              top: 41px;
            }
            .leftBox {
              position: absolute;
              width: 54px;
              height: 108px;
              left: 0px;
              top: 0px;
              overflow: hidden;
              > div {
                position: absolute;
                width: 54px;
                height: 108px;
                left: 0px;
                top: 0px;
                overflow: hidden;
                transform-origin: right;
                > div {
                  position: absolute;
                  width: 108px;
                  height: 108px;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  box-sizing: border-box;
                  border-radius: 50%;
                  border: 15px solid rgba(247, 247, 248, 0.8);
                }
              }
            }

            .rightBox {
              position: absolute;
              width: 54px;
              height: 108px;
              left: 54px;
              top: 0px;
              overflow: hidden;
              transform-origin: left;
              > div {
                position: absolute;
                width: 54px;
                height: 108px;
                left: 0;
                top: 0;
                overflow: hidden;
                > div {
                  position: absolute;
                  width: 108px;
                  height: 108px;
                  right: 0;
                  top: 0;
                  overflow: hidden;
                  box-sizing: border-box;
                  border-radius: 50%;
                  border: 15px solid rgba(247, 247, 248, 0.8);
                }
              }
            }
          }
          .right {
            div {
              font-size: 20px;
              color: #000;
              span {
                font-family: "bigFont";
                display: inline-block;
                font-size: 36px;
                color: #f74c6f;
                margin-right: 4px;
                min-width: 42px;
              }
            }

            p {
              color: #999999;
            }
          }
          .firstSpan {
            min-width: 22px !important;
          }
          .lastSpan {
            min-width: 71px !important;
          }
        }
        li:nth-child(1) {
          .leftBox {
            > div {
              transform: rotate(110deg);
              animation: circleRotate1 0.6s linear forwards;
            }
          }
        }
        li:nth-child(2) {
          .leftBox {
            > div {
              transform: rotate(138deg);
              animation: circleRotate2 0.6s linear forwards;
            }
          }
        }
        li:nth-child(3) {
          .leftBox {
            > div {
              transform: rotate(181deg);
              // animation: circleRotate3 0.7s linear forwards;
              animation: circleRotate3 0.7s linear infinite;
              animation-iteration-count: 1;
            }
          }
          .rightBox {
            > div {
              transform-origin: left;
              transform: rotate(115deg);
              // animation: circleRight3 0.7s linear forwards;
              animation: circleRight3 0.7s 0.7s linear infinite both;
              animation-iteration-count: 1;
            }
          }
        }
        li:nth-child(4) {
          .leftBox {
            > div {
              animation: circleRotate4 0.7s linear forwards;
              transform: rotate(181deg);
            }
          }
        }
        @keyframes circleRotate1 {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(110deg);
          }
        }
        @keyframes circleRotate2 {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(138deg);
          }
        }
        @keyframes circleRotate3 {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(181deg);
          }
        }
        @keyframes circleRight3 {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(115deg);
          }
        }
        @keyframes circleRotate4 {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(181deg);
          }
        }
      }
    }
    .common {
      margin-top: 30px;
      .commonImg {
        width: 160px;
        margin-bottom: 12px;
        margin-left: 18px;
      }
    }
    .slotsBox {
      // height: 490px;
      position: relative;
      background: url("/home/slotsBg.png") no-repeat;
      background-size: 100% 100%;
      // > img {
      //   position: absolute;
      //   right: -86px;
      //   bottom: 12px;
      //   height: 195px;
      // }
      // .switch{
      //   margin-left: -1200px;
      // }
      .slots {
        height: 150px;
        display: flex;
        cursor: pointer;
        .slotsList {
          // background: linear-gradient(90deg, #535353, #000000);
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
      margin-top: 60px;
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
      .jackpotBg2 {
        height: 97px;
      }
      .bonus2 {
        left: 580px;
        top: 4px;
      }
    }
    .realPersonBox {
      width: 100%;
      height: 570px;
      background: url("/home/realPersonBg.png") no-repeat;
      .liveImg {
        padding: 30px 0 10px 20px;
      }
      .wrap {
        display: flex;
        .realPerson {
          width: 818px;
          height: 467px;
          padding: 1px 10px 10px 10px;
          background-color: #000000;
          .person {
            flex-wrap: wrap;
            > div {
              cursor: pointer;
              position: relative;
              .bg {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
              }
              .title {
                position: absolute;
                left: 30px;
                top: 30px;
                color: #fac50f;
                font-size: 20px;
                span {
                  font-weight: bold;
                }
              }
              .tip {
                position: absolute;
                left: 30px;
                bottom: 30px;
                p {
                  padding: 4px 14px;
                  background: linear-gradient(#414345, #232526);
                  border-radius: 14px;
                  color: #666666;
                }
                p:first-child {
                  margin-bottom: 10px;
                }
                p:hover {
                  background: linear-gradient(#fc4a1a, #f7b733);
                }
              }
            }
            > div:hover {
              .bg {
                width: 0;
              }
            }
          }
          .information {
            margin-top: 10px;
            width: 544px;
            height: 74px;
            background: #3a3a3a;
            > div {
              img {
                margin-right: 8px;
              }
              > div {
                p {
                  font-size: 16px;
                  margin-bottom: 4px;
                }
                div {
                  color: #666666;
                }
              }
            }
          }
          .right {
            display: flex;
            margin-top: 10px;
            cursor: pointer;
            p {
              color: #d9ac73;
              width: 191px;
              height: 74px;
              font-size: 16px;
              background: #272727;
            }
            div {
              width: 75px;
              height: 74px;
              background-image: linear-gradient(90deg, #966c21, #bf8b49);
              i {
                font-size: 66px;
                color: #d7aa70;
              }
            }
          }
        }
        .rankingWrap {
          position: relative;
          width: 360px;
          height: 478px;
          .ranking {
            background-image: linear-gradient(1deg, #212121, #3a3a3a);
            position: absolute;
            width: 340px;
            height: 428px;
            z-index: 1;
            padding: 50px 0 0 20px;

            ul {
              height: 428px;
              // overflow-y: scroll;
              overflow: hidden;
              // padding-top: -50px;
              .fade2 {
                animation: fadeOut 1s forwards;
                // height: 0;
                // animation-duration:1s;
              }
              li {
                margin-bottom: 10px;
                img {
                  width: 62px;
                  height: 62px;
                  border-radius: 50%;
                  margin-right: 30px;
                }
                .right1,
                .right2 {
                  width: 200px;
                  margin-left: 14px;
                }
                .right1 {
                  margin-bottom: 5px;
                  p {
                    color: #d9ac73;
                  }
                  span {
                    padding: 4px 5px;
                    border-radius: 4px;
                    background-image: linear-gradient(1deg, #d9ac73, #b68c42);
                  }
                }
                .line {
                  width: 240px;
                  height: 1px;
                  margin-bottom: 8px;
                  background-image: linear-gradient(
                    90deg,
                    #474747 0%,
                    #ba8f47 50%,
                    #323232 100%
                  );
                }
                .right2 {
                  color: #808080;
                  font-size: 12px;
                  span {
                    font-family: "bigFont";
                    color: #df451e;
                    font-size: 24px;
                  }
                }
              }
            }
            ul::after {
              position: absolute;
              content: "";
              display: block;
              bottom: -1px;
              height: 30px;
              left: 0;
              background: linear-gradient(transparent, rgba(36, 36, 36, 1));
              right: 0;
              z-index: 10;
              pointer-events: none;
            }
          }
          .ranking:before {
            position: absolute;
            content: "";
            display: block;
            top: 0;
            height: 30px;
            left: 0;
            background: linear-gradient(rgba(36, 36, 36, 1), transparent);
            right: 0;
            z-index: 10;
            pointer-events: none;
          }
          .titleBg {
            position: absolute;
            top: -10px;
            left: 46px;
            width: 270px;
            height: 30px;
            // background: #d9ac73;
            background-image: linear-gradient(1deg, #d9ac73, #b68c42);
            border-radius: 10px;
          }

          .title {
            position: absolute;
            z-index: 1;
            top: -10px;
            left: 60px;
            width: 242px;
            height: 44px;
            line-height: 44px;
            background-image: linear-gradient(1deg, #d9ac73, #b68c42);
            border-radius: 0px 0px 10px 10px;
            color: #966410;
            font-size: 16px;
            text-align: center;
            span {
              font-size: 24px;
              font-family: "bigFont";
              color: #fff;
            }
          }
        }
      }
    }

    .mainTab {
      display: flex;
      margin-top: 40px;
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
          p {
            font-size: 48px;
          }
          .left {
            cursor: pointer;
            width: 118px;
            p {
              font-size: 10px;
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
            cursor: pointer;
          }
          .right {
            display: none;
            position: absolute;
            left: 280px;
            top: 0;
            width: 920px;
            height: 412px;
            // animation: fadeIn 1.5s forwards;
            .textBox {
              position: relative;
              left: 80px;
              top: 100px;
              width: 260px;
              text-align: center;
              color: #000;
              font-size: 14px;
              .text1 {
                animation: leftInUp 1s forwards;
              }
              .text2 {
                animation: leftInDw 1s forwards;
              }
              h2 {
                width: 150px;
                font-size: 32px;
                font-weight: bold;
                margin: 0 auto;
                border-bottom: 1px solid #999999;
              }
              p {
                width: 120px;
                font-size: 14px;
                padding-top: 2px;
                font-family: "Helvetica";
                color: #999999;
                margin: 0 auto;
                border-bottom: 1px solid #999999;
              }
              .textDiv {
                margin: 24px 0;
              }
              h6 {
                color: #777777;
                background: url("/home/textBg.png") no-repeat center;
                background-size: 60% 100%;
                height: 28px;
                line-height: 28px;
                cursor: pointer;
              }
            }
            .img {
              position: absolute;
              left: 402px;
              top: 230px;
            }
            .imgBg {
              position: absolute;
              left: 520px;
              top: 40px;
            }
            .SLOTS {
              top: 0px;
              animation: code_up 1s forwards;
            }
            .SPORTS {
              left: 336px;
              top: 20px;
              animation: topIn 1s forwards;
            }
            .SPORTSbg {
              animation: rightIn 1s forwards;
            }
            .CASINO {
              left: 506px;
              top: 0px;
              animation: rightIn 1s forwards;
            }
            .CASINObg {
              left: 394px;
              top: 60px;
              animation: leftIn 1s forwards;
            }
            .LOTTERY {
              animation: topLeft 1s forwards;
            }
            .LOTTERYbg {
              animation: topRight 1s forwards;
            }
          }
        }
        .showImg {
          // visibility: visible;
          background: #2a994d;
          .right {
            display: block;
          }
        }
      }
      @keyframes leftInUp {
        from {
          opacity: 0;
          transform: translateY(-60px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @-webkit-keyframes leftInDw {
        from {
          opacity: 0;
          transform: translateY(60px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @-webkit-keyframes topLeft {
        0% {
          opacity: 0;
          transform: translate(-200px, 200px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @-webkit-keyframes topRight {
        0% {
          opacity: 0;
          transform: translate(200px, -200px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes code_up {
        from {
          opacity: 0;
          transform: translateY(360px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes leftIn {
        from {
          opacity: 0;
          transform: translateX(-160px);
        }

        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes rightIn {
        from {
          opacity: 0;
          transform: translateX(160px);
        }

        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes topIn {
        from {
          opacity: 0;
          transform: translate(160px, -160px);
        }

        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }

    .lotteryBox {
      .lottery {
        height: 470px;
        display: flex;

        .leftWrap {
          background: url("/home/lotteryBg.png") no-repeat;
          background-size: contain;
          width: 740px;
          .left {
            background: linear-gradient(
              0deg,
              rgba(67, 67, 67, 0.4),
              rgba(0, 0, 0, 0.3)
            );
            height: 440px;
            margin-left: 14px;
            margin-top: 10px;
            .top {
              // overflow-x: scroll;
              position: relative;
              .topHot {
                position: absolute;
                top: 0;
                margin-top: 32px;
                margin-left: 10px;
                img {
                  margin-left: 4px;
                  margin-bottom: 6px;
                }
                p {
                  writing-mode: vertical-rl;
                  font-size: 18px;
                  letter-spacing: 8px;
                }
              }
              ul {
                display: flex;
                width: 702px;
                margin-left: 24px;
                .recommendItem {
                  flex: 1;
                  cursor: pointer;
                  padding: 30px 20px;
                  img {
                    width: 96px;
                    height: 96px;
                    margin: auto;
                  }
                  p {
                    text-align: center;
                    margin-top: 14px;
                  }
                }
              }
            }
            .bottom {
              display: flex;
              > div {
                flex: 1;
                display: flex;
                cursor: pointer;
                // position: relative;
                // p {
                //   position: absolute;
                //   font-size: 24px;
                //   text-align: center;
                //   top: 25px;
                // }
                img {
                  width: 100%;
                  height: 251px;
                }
              }
            }
          }
        }
        .right {
          width: 418px;
          height: 452px;
          padding: 9px 20px 0 20px;
          background: #303030;
          position: relative;

          .title {
            width: 418px;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            text-align: center;
            background: #2b2d37;
            position: relative;
            i {
              position: absolute;
              right: 20px;
              font-size: 20px;
              cursor: pointer;
            }
          }
          .noChangLongArr {
            p {
              text-align: center;
            }
          }
          ul::-webkit-scrollbar {
            display: none;
          }
          ul {
            background: #000;
            padding: 18px 16px 0 16px;
            width: 380px;
            height: 394px;
            overflow-y: scroll;
            li {
              background-color: #2a2c36;
              overflow: hidden;
              margin-bottom: 10px;
              text-align: left;
              box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              position: relative;
              display: flex;
              &:last-child {
                margin-bottom: 65px;
              }
              & > div {
                vertical-align: top;
                overflow: hidden;
                &:nth-child(1) {
                  width: 56px;
                  height: 56px;
                  margin: 10px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                &:nth-child(2) {
                  h3 {
                    font-size: 16px;
                    margin-top: 6px;
                  }
                  p {
                    &:nth-child(2) {
                      margin-bottom: 2px;
                      span {
                        display: inline-block;
                        overflow: hidden;
                        font-size: 12px;
                        &:nth-child(1) {
                          margin-right: 6px;
                        }
                        &:last-child {
                          color: #b8b8b8;
                        }
                      }
                    }
                    &:nth-child(3) {
                      span {
                        display: inline-block;
                        margin-right: 5px;
                        width: 40px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        font-size: 12px;
                        border-radius: 5px;
                        &:nth-child(1) {
                          color: #949494;
                        }
                        &:nth-child(2) {
                          background-color: #01b994;
                        }
                        &:nth-child(3) {
                          background-color: #9901b9;
                        }
                      }
                    }
                  }
                }
                &:nth-child(3) {
                  position: absolute;
                  top: 50%;
                  right: 0;
                  transform: translate(0, -50%);
                  b {
                    border: 1px solid #d9ac73;
                    float: left;
                    width: 48px;
                    height: 67px;
                    text-align: center;
                    border-radius: 10px;
                    margin-right: 10px;
                    vertical-align: middle;
                    font-weight: normal;
                    overflow: hidden;
                    cursor: pointer;
                    p {
                      color: #d9ac73;
                      margin: 6px 0;
                      white-space: nowrap;
                      font-size: 22px;
                    }
                    span {
                      white-space: nowrap;
                      color: #989898;
                      display: block;
                      overflow: hidden;
                      transform: scale(0.95);
                      font-size: 12px;
                    }
                  }
                  b:hover {
                    background: rgb(24, 24, 24);
                  }
                }
              }
              .onBtn {
                background: linear-gradient(to left, #fe9739, #fd6c30);
                color: #fff !important;
                span {
                  color: #fff !important;
                }
                p {
                  color: #fff !important;
                }
              }
              .onBtn:hover {
                background: linear-gradient(
                  to left,
                  #ff8a1c,
                  #ff570f
                ) !important;
              }
              .disable {
                b {
                  border-color: #ccc !important;
                  p {
                    color: #ccc !important;
                  }
                  span {
                    color: #ccc !important;
                  }
                }
              }
            }
          }
          .footer {
            display: flex;
            height: 34px;
            line-height: 34px;
            position: absolute;
            bottom: 0;
            left: 36px;
            div {
              float: left;
              height: 100%;
              &:nth-child(1) {
                flex: 1;
                width: 280px;
                background-color: black;
                span {
                  float: left;
                  color: #fff;
                  &:first-child {
                    color: #ffaf36;
                    font-size: 16px;
                    margin: 0 20px;
                    cursor: pointer;
                  }
                  &:first-child:hover {
                    color: #ffc876;
                  }
                }
              }
              &:nth-child(2) {
                width: 100px;
                text-align: center;
                font-size: 16px;
                background: linear-gradient(to left, #fe9739, #fd6c30);
                color: #fff;
                cursor: pointer;
              }
              &:nth-child(2):hover {
                background: linear-gradient(to left, #ff8b1f, #ff5912);
              }
              &:nth-child(3) {
                position: absolute;
                width: 100%;
                height: 30px;
                line-height: 30px;
                bottom: 34px;
                background-color: #f9f7e9;
                border-top: 1px solid #ededed;
                text-align: left;
                color: #666;
                span {
                  margin-left: 20px;
                }
                input {
                  width: 100px;
                  height: 20px;
                  border: 1px solid #dfdfdf;
                  border-radius: 2px;
                  margin: 0 10px;
                  text-indent: 8px;
                }
              }
            }
          }

          .content-long {
            p {
              margin: 12px 0;
            }
            .long-ico {
              color: #dc001a;
              position: relative;
              padding-left: 40px;
              height: 26px;
              line-height: 26px;
              &:after {
                content: "";
                background-image: url("/home/icon.png");
                background-size: 100% 100%;
                position: absolute;
                left: 0;
                top: 3px;
                width: 26px;
                height: 26px;
              }
            }
          }
        }
      }
    }

    .pokerBox {
      height: 370px;
      display: flex;
      color: #c6b67e;
      .left {
        width: 740px;
        .poker {
          height: 60px;
          padding-right: 10px;
          background: linear-gradient(90deg, #535353, #000000);
          > div {
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            i {
              margin-left: 6px;
            }
          }
        }
        .leftPoker {
          height: 310px;
          background: linear-gradient(120deg, #000000, #414141);
        }
        .poker1 {
          padding: 0 10px;
          // overflow: hidden;
          height: 310px;
          display: flex;
          .pokerDiv {
            padding: 8px 11px;
            text-align: center;
            cursor: pointer;
            position: relative;
            .line {
              position: absolute;
              z-index: 3;
              bottom: 71px;
              left: 17px;
              width: 147px;
              height: 2px;
              background: #e3ad68;
            }
            .people {
              position: absolute;
              bottom: 66px;
              left: 12px;
              height: 230px;
              z-index: 2;
            }
            .bg {
              width: 158px;
              height: 236px;
            }
            p {
              padding-top: 9px;
              font-size: 20px;
            }
          }
          .pokerDiv:hover {
            .people {
              transition: all 0.5s;
              // height: 250px;
              transform: scale(1.1);
            }
          }
        }
      }
      .right {
        width: 458px;
        height: 351px;
        position: relative;
        .fishBg {
          position: absolute;
          top: 0;
          // width: 458px;
        }
        .text {
          position: absolute;
          top: 0;
        }
        .rightTop {
          cursor: pointer;
          color: #c6b67e;
          // color: rgb(214, 214, 214);
          position: absolute;
          right: 0;
          top: 0;
          height: 50px;
          padding-top: 10px;
          i {
            margin: 0 6px;
          }
        }
        .fish {
          position: absolute;
          // right: -25px;
          // top: 66px;
          animation: fishMove 2s linear infinite;
        }
        .eyes {
          // width: 50px;
          position: absolute;
          // top: 170px;
          // right: 118px;
          animation: eyesMove 1.5s linear infinite;
        }
        @keyframes fishMove {
          0% {
            right: -30px;
            top: 68px;
          }
          25% {
            right: -26px;
            top: 68px;
          }
          60% {
            right: -22px;
            top: 68px;
          }
          75% {
            right: -25px;
            top: 68px;
          }
          100% {
            right: -30px;
            top: 68px;
          }
        }
        @keyframes eyesMove {
          0% {
            top: 176px;
            right: 112px;
          }
          15% {
            top: 180px;
            right: 116px;
          }
          30% {
            top: 182px;
            right: 120px;
          }
          45% {
            top: 181px;
            right: 126px;
          }
          60% {
            top: 174px;
            right: 131px;
          }
          75% {
            top: 164px;
            right: 126px;
          }
          90% {
            top: 174px;
            right: 118px;
          }
          100% {
            top: 176px;
            right: 112px;
          }
        }
      }
    }
    .sportsBox {
      display: flex;
      div {
        background-size: 100%;
        // display: flex;
        // align-items: flex-end;
        // justify-content: flex-end;
        // flex-direction: column;
        position: relative;
      }
      .box {
        width: 166px;
        height: 174px;
        position: absolute;
        right: 0;
        cursor: pointer;
      }
      .box1 {
        background: url("/home/djn.png") no-repeat;
        bottom: 174px;
      }
      .box1:hover {
        background: url("/home/djn1.png") no-repeat;
      }
      .box2 {
        background: url("/home/fy.png") no-repeat;
        bottom: 0;
      }
      .box2:hover {
        background: url("/home/fy1.png") no-repeat;
      }
      .box3 {
        background: url("/home/im.png") no-repeat;
        bottom: 174px;
      }
      .box3:hover {
        background: url("/home/im1.png") no-repeat;
      }
      .box4 {
        background: url("/home/bbin.png") no-repeat;
        bottom: 0;
      }
      .box4:hover {
        background: url("/home/bbin1.png") no-repeat;
      }
      .game {
        height: 370px;
        width: 650px;
        margin-right: 10px;
      }
      .sports {
        height: 364px;
        width: 540px;
        margin-top: 7px;
      }
    }
  }
}
</style>
