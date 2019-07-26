<template>
  <div class="user" v-show="userShow">
    <div class="content">
      <i class="iconfont" @click="close">&#xe727;</i>
      <div class="left">
        <h3>
          <p>会员中心</p>
          <span>Member Center</span>
        </h3>
        <ul>
          <li
            v-for="(item, i) in TabList"
            :key="i"
            :class="{ on: item.componentsName === componentsName }"
            @click="changeTab(item.componentsName, item.testNo)"
          >
            <i class="iconfont" v-html="item.icon"></i>
            <span>{{ item.title }}</span>
            <div
              class="messageRemind flexC"
              v-if="item.componentsName == 'Message' && userInfo.unread > 0"
            >
              <span>{{ userInfo.unread }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="right">
        <components :is="componentsName"></components>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import { Base64 } from "js-base64";
const UserDetail = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/UserDetail");
const Security = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Security");
const BankCenter = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/BankCenter");
const Recharge = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Recharge");
const Withdraw = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Withdraw");
const Amount = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Amount");
const Bill = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Bill");
// const Rechargelist = () =>
//   import(/* webpackChunkName:'user' */ "@/components/userCenter/Rechargelist");
// const Withdrawlist = () =>
//   import(/* webpackChunkName:'user' */ "@/components/userCenter/Withdrawlist");
const Activity = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Activity");
const Record = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Record");
const Notice = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Notice");
const Message = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Message");
const Help = () =>
  import(/* webpackChunkName:'user' */ "@/components/userCenter/Help");
const Template = {
  UserDetail,
  Security,
  BankCenter,
  Recharge,
  Withdraw,
  Amount,
  Bill,
  Activity,
  Record,
  Notice,
  Message,
  Help
  // Rechargelist,
  // Withdrawlist
};
const TabList = [
  {
    title: "个人资料",
    icon: "&#xe712;",
    componentsName: "UserDetail",
    testNo: true
  },
  {
    title: "安全中心",
    icon: "&#xe711;",
    componentsName: "Security",
    testNo: true
  },
  {
    title: "银行卡管理",
    icon: "&#xe719;",
    componentsName: "BankCenter",
    testNo: true
  },
  {
    title: "充值",
    icon: "&#xe71c;",
    componentsName: "Recharge",
    testNo: true
  },
  {
    title: "提现",
    icon: "&#xe71b;",
    componentsName: "Withdraw",
    testNo: true
  },
  {
    title: "额度转换",
    icon: "&#xe716;",
    componentsName: "Amount",
    testNo: true
  },
  {
    title: "账变明细",
    icon: "&#xe715;",
    componentsName: "Bill"
  },
  {
    title: "活动申请",
    icon: "&#xe717;",
    componentsName: "Activity",
    testNo: true
  },
  {
    title: "游戏记录",
    icon: "&#xe718;",
    componentsName: "Record"
  },
  {
    title: "公告列表",
    icon: "&#xe713;",
    componentsName: "Notice"
  },
  {
    title: "个人消息",
    icon: "&#xe714;",
    componentsName: "Message"
  },
  {
    title: "帮助中心",
    icon: "&#xe71a;",
    componentsName: "Help"
  }
];
export default {
  name: "User",
  data() {
    return {
      TabList,
      componentsName: "UserDetail"
    };
  },
  props: {
    userShow: Boolean
  },
  created() {
    // console.log(this.active, this.$children, "---------------");
  },
  computed: {
    ...mapGetters(["userInfo", "active"]),
    isTest() {
      return this.userInfo.parentId == 312;
    }
  },
  watch: {
    active(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$children[0].activeName = newVal;
        }, 100);
      }
    }
  },
  methods: {
    ...mapActions(["userDetails"]),
    changeTab(name, testNo) {
      if (this.isTest && testNo) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "试玩账号无法进入"
        });
      }
      this.componentsName = name;
    },
    close() {
      this.$parent.userShow = false;
    }
  },
  components: {
    ...Template
  }
};
</script>

<style scoped lang="scss">
.user {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 10px;
    > i {
      position: absolute;
      right: 16px;
      top: 14px;
      font-size: 30px;
      cursor: pointer;
      z-index: 999;
    }
    .left {
      width: 200px;
      color: white;
      background: linear-gradient(to top, #f83700, #fe9739);
      padding-bottom: 20px;
      h3 {
        height: 60px;
        text-align: center;
        p {
          padding-top: 13px;
          font-size: 18px;
        }
        span {
          font-size: 12px;
          color: #fc6e00;
        }
      }
      li {
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        cursor: pointer;
        position: relative;
        .messageRemind {
          position: absolute;
          right: 50px;
          top: 7px;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background-color: #60c961;
          span {
            font-size: 12px;
            color: #fff;
          }
        }
        &:hover {
          background: #fff;
          color: #fa591e;
        }
        &.on {
          background: #fff;
          color: #fa591e;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          font-size: 20px;
          margin-left: 40px;
          margin-right: 20px;
        }
      }
    }
    .right {
      flex: 1;
      width: 900px;
      background-color: #fff;
      position: relative;
      display: flex;
    }
  }
}
@media screen and (max-width: 1400px) {
}
</style>
