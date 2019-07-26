<template>
  <div id="app" v-title="''">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      timer: null,
      jackpotTimer: null
    };
  },
  beforeCreate() {
    if (sessionStorage.getItem("nowUserAgent") == null) {
      if (
        window.navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        sessionStorage.setItem("nowUserAgent", "移动");
      } else {
        sessionStorage.setItem("nowUserAgent", "PC");
      }
    }
  },
  created() {
    //所有系统设置
    this.$store.dispatch("getSettings");
    //导航栏列表
    this.$store.dispatch("navigations");
    //额度转换游戏列表
    this.$store.dispatch("thirdGameLists");
    //游戏记录游戏列表
    this.$store.dispatch("recordGameList");
    // 检查登录状态
    this.$store.dispatch("userDetails");
    // 检查登录状态
    this.$store.dispatch("getInitHome");
    // if (this.userInfo) {
    //   this.timer = setInterval(() => {
    //     // console.log("持续请求用户信息");
    //     this.$store.dispatch("userDetails");
    //   }, 10000);
    // }
    this.jackpotRun();
  },

  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.jackpotTimer);
  },
  watch: {
    userInfo(newVal) {
      // console.log(newVal, this.timer, "APP==========");
      if (newVal) {
        if (!this.timer) {
          this.timer = setInterval(() => {
            // console.log("持续请求用户信息", "watch");
            this.$store.dispatch("userDetails");
          }, 10000);
        }
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    $route(val) {
      // console.log(val, "jackpotRunval11111111");
      if (val.name === "HOME") {
        this.jackpotRun();
      } else {
        clearInterval(this.jackpotTimer);
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["navigations"]),
    jackpotRun() {
      clearInterval(this.jackpotTimer);
      this.jackpotTimer = setInterval(() => {
        this.$store.dispatch("jackpots");
      }, 6000);
    }
  }
};
</script>
