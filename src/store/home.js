import { initHome, settings, jackpot } from "../api";

const Home = {
  state: {
    homeInfo: [],
    downloadText: "",
    allConfig: {},
    jackpotNum: {
      jackpot: ""
    }, //老虎机奖池
    playStartShow: false // 开始游戏准备窗口
  },
  getters: {
    homeInfo: state => {
      return state.homeInfo;
    },
    allConfig: state => {
      return state.allConfig;
    },
    downloadText: state => {
      return state.downloadText;
    },
    // articles: state => {
    //   return state.articles;
    // },
    jackpotNum: state => {
      // console.log(state, state.jackpotNum, 'state.jackpotNum');
      return state.jackpotNum;
    },
    playStartShow: state => {
      return state.playStartShow;
    }
  },
  mutations: {
    SET_INITHOME: (state, payload) => {
      state.homeInfo = payload;
      // state.appErweima = payload.siteConfig.appErweima;
    },
    SET_TEXT: (state, payload) => {
      state.downloadText = payload;
    },
    SET_SETTING: (state, payload) => {
      console.log(payload, "allConfig");
      state.allConfig = payload;
    },
    SER_ARTICLE: (state, payload) => {
      state.articles = payload;
    },
    SET_JACKPOT: (state, payload) => {
      // console.log(state, payload, 'payload');
      state.jackpotNum = payload;
    },
    SET_PLAY_START_SHOW: (state, payload) => {
      state.playStartShow = payload;
    }
  },
  actions: {
    getInitHome(context) {
      initHome().then(res => {
        if (res.status) {
          console.log(res.data, "homeInfo---------------");
          let downloadText = "选择" + res.data.siteConfig.webName;
          context.commit("SET_INITHOME", res.data);
          context.commit("SET_TEXT", downloadText);
        }
      });
    },
    getSettings(context) {
      settings().then(res => {
        // console.log(res, "设置项-------------");
        if (res.status) {
          context.commit("SET_SETTING", res.data);
        }
      });
    },
    jackpots(context) {
      jackpot().then(res => {
        // console.log(res.data, 'SET_JACKPOT');
        if (res.status) {
          context.commit("SET_JACKPOT", res.data);
        }
      });
    }
  }
};
export default Home;
