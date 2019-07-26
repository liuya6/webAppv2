import {
  rechargeApply,
  bindingBefore,
  getMyBank,
  userDetail,
  checkLogin,
  rechargeBefore,
  help
} from "../api";

const user = {
  state: {
    userInfo: "", //用户详情
    // twoErrors: 0, //登录连续500报错两次
    order: "", //充值准备
    bindingList: "", //绑卡准备
    myBank: "", //我的银行卡
    rechargeList: [], //充值列表
    bankId: "", // 提现银行卡ID
    help: "", //帮助列表
    active: "" //个人中心选中tab
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    order: state => {
      return state.order;
    },
    bindingList: state => {
      return state.bindingList;
    },
    myBank: state => {
      return state.myBank;
    },
    rechargeList: state => {
      return state.rechargeList;
    },
    bankId: state => {
      return state.bankId;
    },
    help: state => {
      return state.help;
    },
    active: state => {
      return state.active;
    }
  },
  mutations: {
    SET_USER_INFO: (state, payload) => {
      state.userInfo = payload;
    },
    // TWO_ERRORS: (state, payload) => {
    //   console.log(state.twoErrors,payload,'state.twoErrors11')
    //   if (payload==1) {
    //     state.twoErrors +=1;
    //     console.log(state.twoErrors,payload,'state.twoErrors222')
    //     if (state.twoErrors==2) {
    //       state.userInfo=''
    //     }
    //   }else{
    //     if (state.twoErrors!=0) {
    //       state.twoErrors ==0;
    //     }
    //   }
    // },
    ORDERS: (state, payload) => {
      state.order = payload;
    },
    SET_BANK_BEFORE: (state, payload) => {
      state.bindingList = payload;
    },
    SET_MY_BANK: (state, payload) => {
      state.myBank = payload;
    },
    SET_RECHARGE_LIST: (state, payload) => {
      state.rechargeList = payload;
    },
    SET_BANK_ID: (state, payload) => {
      state.bankId = payload;
    },
    SET_HELP_LIST: (state, payload) => {
      state.help = payload;
    },
    SET_ACTIVE_NAME: (state, payload) => {
      state.active = payload;
    }
  },
  actions: {
    userDetails({ commit }) {
      userDetail()
        .then(res => {
          // console.log(typeof res, res, "userDetails数据----------------------");
          if (typeof res === "string") {
            return false;
          }
          if (res.status) {
            commit("SET_USER_INFO", res.data);
          } else {
            commit("SET_USER_INFO", "");
          }
        })
        .catch(e => {
          console.log(e, "eeeeeeeeee");
        });
    },
    checkLogins({ commit }) {
      checkLogin().then(res => {
        if (typeof res === "string") {
          return false;
        }
        if (res.status) {
          commit("SET_USER_INFO", res.data);
        } else {
          commit("SET_USER_INFO", "");
        }
      });
    },
    rechargeApplys(context, { id }) {
      context.commit("CHANGE_LOADING", 1);
      rechargeApply({ methodId: id }).then(res => {
        try {
          // console.log(res.data, "充值申请记录");
          context.commit("CHANGE_LOADING", 0);
          context.commit("ORDERS", res.data);
        } catch (e) {
          console.log(e);
        }
      });
    },
    bindingBefores({ commit }) {
      bindingBefore().then(res => {
        console.log(res, "绑卡准备");
        commit("SET_BANK_BEFORE", res.data);
      });
    },
    myBanks({ commit }) {
      commit("CHANGE_LOADING", 1);
      getMyBank().then(res => {
        console.log(res, "我的银行卡");
        commit("CHANGE_LOADING", 0);
        commit("SET_MY_BANK", res.data);
        if (res.data && res.data.length) {
          if (localStorage.getItem("bankId")) {
            commit("SET_BANK_ID", localStorage.getItem("bankId"));
          } else {
            commit("SET_BANK_ID", res.data[0].id);
          }
        }
      });
    },
    rechargeBefores(connext) {
      connext.commit("CHANGE_LOADING", 1);
      rechargeBefore().then(res => {
        connext.commit("CHANGE_LOADING", 0);
        connext.commit("SET_RECHARGE_LIST", res.data);
      });
    },
    helps(connext) {
      connext.commit("CHANGE_LOADING", 1);
      help().then(res => {
        connext.commit("CHANGE_LOADING", 0);
        connext.commit("SET_HELP_LIST", res.data);
      });
    }
  }
};
export default user;
