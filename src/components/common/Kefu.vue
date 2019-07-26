<template>
  <div>
    <div v-if="allConfig.tpl_pc == 'fumin'">
      <div class="huminWrapper">
        <ul>
          <li :class="{ marginLeft0: ifOpen }" @click="service" class="flexA">
            <i class="iconfont">&#xe752;</i>
            <p>在线客服</p>
          </li>
          <li :class="{ marginLeft0: ifOpen }" class="flexA" @click="qq">
            <!-- <a
              :href="'tencent://message/?uin=<?='+allConfig.qqkefuGG+'?>&amp;Site=%E5%BD%A916&amp;Menu=yes'"
            >-->
            <i class="iconfont">&#xe751;</i>
            <p>QQ客服</p>
          </li>
          <li
            :class="{ marginLeft0: ifOpen }"
            @click="registerFrees"
            class="flexA"
          >
            <i class="iconfont">&#xe753;</i>
            <p>免费试玩</p>
          </li>
        </ul>
        <div class="wrap" :class="{ marginLeft0: ifOpen }">
          <div class="flexS">
            <i class="iconfont">&#xe754;</i>
            <img
              v-if="homeInfo.length != 0"
              :src="
                homeInfo.siteConfig.iphoneErweima ||
                  homeInfo.siteConfig.androidErweima
              "
              alt="APP下载二维码"
              draggable="false"
            />
          </div>
          <p>下载APP</p>
        </div>
        <img
          class="open"
          :src="ifOpen ? '/home/collapse.png' : '/home/open.png'"
          @click="shrink"
          alt
        />
      </div>
    </div>
    <div
      v-else
      class="CodeWrapper"
      style="top:350px"
      :class="{ aboutWrapper: routeAbout }"
    >
      <div class="QR-code">
        <img
          v-if="homeInfo.length != 0"
          :class="{ show: index == 0 }"
          :src="src || homeInfo.siteConfig.iphoneErweima"
          alt="APP下载二维码"
          draggable="false"
        />
        <img
          v-if="homeInfo.length != 0"
          :class="{ show: index == 1 }"
          :src="src"
          alt="APP下载二维码"
          draggable="false"
        />
      </div>
      <img class="scanning" src="/home/scanning.png" alt />
      <a
        v-if="homeInfo.length != 0"
        :class="{ active: index == 0 }"
        @click="changeImg(homeInfo.siteConfig.iphoneErweima, 0)"
        class="ios botton"
        >IOS</a
      >
      <a
        v-if="homeInfo.length != 0"
        :class="{ active: index == 1 }"
        @click="changeImg(homeInfo.siteConfig.androidErweima, 1)"
        class="android botton"
        >Android</a
      >
      <a v-if="homeInfo.length != 0" @click="service" class="service"
        >联系客服</a
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { registerFree } from "../../api";
export default {
  name: "my-Kefu",
  data() {
    return {
      src: "",
      index: "",
      ifOpen: false,
      freePlay: false,
      href: "",
      routeAbout: false
    };
  },
  props: ["kefuOnline"],
  created() {
    if (this.allConfig.tpl_pc == "fumin") return;
    if (this.$route.name == "about") {
      this.routeAbout = true;
    } else {
      this.$nextTick(() => {
        let wrapper = document.getElementsByClassName("CodeWrapper")[0];
        // console.log(wrapper, "wrapper");
        window.addEventListener("scroll", () => {
          let scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
          wrapper.style.top = scrollTop + 300 + "px";
        });
      });
    }
  },
  methods: {
    changeImg(src, i) {
      if (this.index == i) return;
      // this.$router.push({name:'download'})
      this.src = src;
      this.index = i;
    },
    service() {
      window.open(
        this.homeInfo.siteConfig.kefuGG,
        "_blank",
        "height=700, width=1200, top=100, left=100"
      );
    },
    qq() {
      let qq = this.allConfig.qqkefuGG;
      window.open(
        "https://jlwz.cn/qq/?qq=" + qq,
        // "http://wpa.qq.com/msgrd?v=3&uin=" + qq,
        // "tencent://message/?uin="+qq+"&Site=sc.chinaz.com&Menu=yes",
        "_blank",
        "height=700, width=1200, top=100, left=100"
      );
    },
    shrink() {
      this.ifOpen = !this.ifOpen;
    },
    registerFrees() {
      if (this.userInfo.parentId == 312) {
        this.$message({
          type: "error",
          showClose: true,
          message: "当前已是试玩状态"
        });
        return;
      }
      registerFree().then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.$store.commit("SET_USER_INFO", res.data);
          this.freePlay = true;
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg
        });
      });
    }
  },
  computed: {
    ...mapGetters(["homeInfo", "allConfig", "userInfo"])
  }
};
</script>
<style lang="scss" scoped>
.huminWrapper {
  position: fixed;
  width: 188px;
  height: 195px;
  top: 230px;
  right: 0;
  transition: 0.2s ease-out;
  z-index: 20;
  color: #f3c666;
  ul {
    li {
      // position: absolute;
      // right: -126px;
      width: 188px;
      height: 64px;
      padding-bottom: 1px;
      background: url("/home/kefuBg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-left: 126px;
      cursor: pointer;
      transition: 0.2s ease-out;
      i {
        font-size: 38px;
      }
      p {
        font-size: 16px;
        margin-right: 20px;
      }
    }
    li:hover {
      margin-left: 0;
    }
    a {
      color: #f3c666;
    }
  }
  .wrap {
    background: url("/home/codeBg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 14px 6px 0 12px;
    width: 188px;
    margin-left: 126px;
    transition: 0.2s ease-out;
    i {
      font-size: 38px;
    }
    img {
      width: 120px;
      margin-left: 12px;
    }
    p {
      text-align: center;
      // padding-right: 27px;
      padding-left: 40px;
      padding-bottom: 4px;
      color: #999;
    }
  }
  .wrap:hover {
    margin-left: 0;
  }
  .open {
    position: fixed;
    right: 0;
    cursor: pointer;
  }
  .marginLeft0 {
    margin-left: 0;
  }
}
.CodeWrapper {
  width: 145px;
  height: 300px;
  position: absolute;
  right: 0;
  z-index: 100;
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  &.aboutWrapper {
    position: fixed;
    // top: 300px;
  }
  .QR-code {
    width: 127px;
    height: 127px;
    position: absolute;
    right: 9px;
    top: -14px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      animation: fadeIn 1s forwards;
      display: none;
    }
    .show {
      display: block;
    }
  }
  .scanning {
    position: absolute;
    right: 9px;
    animation: scanningMove 4s infinite;
  }
  @keyframes scanningMove {
    0% {
      top: -16px;
    }
    50% {
      top: 106px;
    }
    100% {
      top: -16px;
    }
  }
  a {
    width: 128px;
    border-radius: 4px;
    position: absolute;
    right: 9px;
    cursor: pointer;
    text-align: center;
    color: #fff;
  }
  .botton {
    height: 41px;
    line-height: 41px;
    background: linear-gradient(0deg, #348ac7, #7474bf);
    &:hover {
      // background: linear-gradient(0deg, #41b0ff, #8d8dff);
      background: linear-gradient(
        top,
        rgba(142, 45, 226, 1),
        rgba(74, 0, 224, 1)
      );
    }
  }
  .active {
    // background: linear-gradient(0deg, #23a3ff, #8282ff);
    // background: linear-gradient(0deg, #41b0ff, #8d8dff);
    background: linear-gradient(
      top,
      rgba(142, 45, 226, 1),
      rgba(74, 0, 224, 1)
    );
  }
  .ios {
    bottom: 130px;
  }
  .android {
    bottom: 82px;
  }
  .service {
    bottom: 10px;
    height: 59px;
    line-height: 59px;
    background: linear-gradient(0deg, #ee0979, #ff6a00);
    &:hover {
      background: linear-gradient(0deg, #ff007b, #ff8025);
    }
  }
}
</style>
