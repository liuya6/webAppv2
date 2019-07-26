<template>
  <div class="About" v-title="'关于我们'">
    <my-top></my-top>
    <my-header header_black="true"></my-header>
    <my-kefu></my-kefu>
    <div class="content w1200">
      <ul class="listUl">
        <li
          class="flexC"
          v-for="(item, i) in navigationList.footerConfig"
          :key="i"
          @click="changeContent(item.typeName, i)"
        >
          <div
            :class="{
              active:
                i ==
                (homeIndex > navigationList.footerConfig.length - 1
                  ? 0
                  : homeIndex)
            }"
          >
            {{ item.typeName }}
          </div>
        </li>
      </ul>
      <div class="right" v-if="navigationList.footerConfig">
        <div
          v-for="(item, i) in navigationList.footerConfig[
            homeIndex > navigationList.footerConfig.length - 1 ? 0 : homeIndex
          ].list"
          :key="i"
        >
          <h3>{{ item.title }}</h3>
          <div v-html="item.content"></div>
        </div>
      </div>
    </div>
    <my-foot></my-foot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MOBILE",
  data() {
    return {
      detail: "",
      index: "",
      homeIndex: 0
    };
  },
  created() {
    let i = this.$route.query.index;
    if (i) {
      this.homeIndex = i;
      console.log(this.homeIndex, "homeIndexcreated");
    } else {
      this.homeIndex = 0;
    }
  },
  watch: {
    $route(val) {
      let i = val.query.index;
      console.log(i, "iiiiiiiiiiiii");
      if (i) {
        this.homeIndex = i;
        console.log(this.homeIndex, "homeIndex");
      } else {
        this.homeIndex = 0;
      }
    }
  },
  methods: {
    changeContent(typeName, i) {
      console.log(typeName, "typeName");
      if (typeName.indexOf("DNS") != -1) {
        this.$router.push({ name: "dns" });
      } else if (typeName.indexOf("技术") != -1) {
        this.$router.push({ name: "technology" });
      } else {
        this.$router.replace({ name: "about", query: { index: i } });
      }
    }
  },
  computed: {
    ...mapGetters(["navigationList"])
  }
};
</script>

<style scoped lang="scss">
.About {
  margin-top: 120px;
  background: #f4f4f4;
  .content {
    display: flex;
    padding: 60px 0;
    ul {
      padding: 0 24px;
      margin-right: 14px;
      background: #fff;
      height: 100%;
      li {
        width: 190px;
        height: 80px;
        border-bottom: 1px solid #ededed;
        color: #4c4c4c;
        cursor: pointer;
        div:hover {
          width: 136px;
          text-align: center;
          height: 46px;
          line-height: 46px;
          font-size: 14px;
          border: none;
          transform: skewX(-16deg);
          color: #fff;
          background: #fe8c00;
          box-shadow: 1px 1px 6px 1px #fe8c00;
        }
      }
      li:last-child {
        border: 0;
      }
      .active {
        width: 136px;
        text-align: center;
        height: 46px;
        line-height: 46px;
        font-size: 14px;
        border: none;
        transform: skewX(-16deg);
        color: #fff;
        background: #fe8c00;
        box-shadow: 1px 1px 6px 1px #fe8c00;
      }
    }
    .right {
      background: #fff;
      width: 1000px;
      min-height: 300px;
      padding: 25px;
      // p {
      //   text-indent: 28px;
      // }
      // span {
      //   font-family: "Adobe 黑体";
      // }
      img {
        min-width: 100%;
      }
      h3 {
        margin: 18px 0;
        color: #000;
        font-size: 17px;
        font-weight: bold;
      }
      div {
        font-size: 16px;
        color: #666;
        line-height: 32px;
      }
    }
  }
}
</style>
