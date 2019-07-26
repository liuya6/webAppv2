<template>
  <div
    class="recharge"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.3)"
  >
    <el-tabs v-if="rechargeList" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, i) in rechargeList"
        :key="i"
        :label="item.title"
        :name="item.type + ''"
        :disabled="paying"
      >
        <div class="common" v-if="!paying">
          <ul v-show="activeName !== '40'">
            <li v-for="(child, j) in item.data" :key="j">
              <div>
                <el-radio
                  v-model="methodId"
                  :label="child.id"
                  @change="
                    changeRadio(
                      child.payWay,
                      child.desc,
                      child.rechargeMoney,
                      child.rechargeMoneyType,
                      child.rechargeMin,
                      child.rechargeMax
                    )
                  "
                >
                  <div>
                    <h3>{{ child.rechargeName }}</h3>
                    <!-- <span>{{ child.desc }}</span> -->
                  </div>
                </el-radio>
              </div>
            </li>
          </ul>
          <div class="content">
            <h3>
              <span>支付方式</span>
              <div v-if="activeName === '40'">
                <el-select v-model="bankSelect" @change="changeBank">
                  <el-option
                    v-for="(bank, k) in [
                      { rechargeName: '请选择', id: '', payWay: '', desc: '' }
                    ].concat(item.data)"
                    :key="k"
                    :label="bank.rechargeName"
                    :value="bank.id + ',' + bank.payWay + ',' + bank.desc"
                  >
                  </el-option>
                </el-select>
              </div>
              <i v-else>
                <img :src="item.typeImg" :alt="item.title" />
              </i>
            </h3>
            <div>
              <span>转入金额</span>
              <div>
                <el-input
                  placeholder="请输入金额"
                  type="number"
                  v-model="amount"
                  :disabled="isReadonly"
                ></el-input>
                <div>
                  <img src="../../assets/recharge.png" alt="" />
                  <span>{{ desc }}</span>
                </div>
              </div>
            </div>
            <div v-if="rechargeMoney.length" class="selectMoney">
              <span
                v-for="(item, i) in rechargeMoney"
                :key="i"
                @click="changeMoney(item)"
                :class="{ on: item === amount }"
                >{{ item }}</span
              >
            </div>
            <div class="submitBtn" @click="Application">
              立即提交
            </div>
          </div>
        </div>
        <div v-else class="paying">
          <div class="left">
            <div class="bank" v-if="payWays">
              <dl>
                <dt>
                  转账银行信息
                </dt>
                <dd>
                  <span>银行：</span>
                  <span>{{ order.rechargeMethod.rechargeName }}</span>
                </dd>
                <dd>
                  <span>收款人：</span>
                  <span>{{ order.rechargeMethod.username }}</span>
                  <span
                    v-clipboard:copy="order.rechargeMethod.username"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
                <dd>
                  <span>帐号：</span>
                  <span>{{ order.rechargeMethod.account }}</span>
                  <span
                    v-clipboard:copy="order.rechargeMethod.account"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
                <dd>
                  <span>开户网点：</span>
                  <span>{{ order.rechargeMethod.bankname }}</span>
                  <span
                    v-clipboard:copy="order.rechargeMethod.bankname"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                  >
                </dd>
              </dl>
              <div class="btm">
                <h3>温馨提示：</h3>
                <ul>
                  <li>推荐使用银行卡入款： 更快捷/3分钟到账 更大额度</li>
                  <li>*接下来您可以通过以下方式完成转帐:</li>
                  <li>※1.网银转帐:登录您的网上银行完成转帐。</li>
                  <li>※2.ATM转帐:到您最近的ATM将款项转到左侧收款账号。</li>
                  <li>※3.ATM现存:到银行ATM以现金存入到左侧收款账号。</li>
                  <li>※4.银行柜台:到您最近的银行将款项转到左侧收款账号。</li>
                  <li>※5.手机转帐:通过您的手机验证将款项转到左侧收款账号。</li>
                </ul>
              </div>
            </div>
            <div v-else class="noBank">
              <h3>扫描以下二维码进行支付</h3>
              <img
                :src="order.rechargeMethod.image"
                alt="支付二维码"
                draggable="false"
              />
              <div class="btm">
                <h3>操作步骤：</h3>
                <ul>
                  <li>
                    ※1.支付宝/云闪付
                    支付（扫一扫直接到账）方便快捷，支付完成立即到账
                  </li>
                  <li>※2.24小时存款不限次数，免除所有手续费，3分钟火速到账</li>
                  <li>※3.为了加快审核速度，请不要支付整数，如100.1</li>
                  <li>※4.公司收款二维码试试更新，请不要保存二维码</li>
                  <li>※5.存款遇到问题？立即联络在线客服为你服务</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right">
            <dl class="bank" v-if="payWays">
              <dt>
                完善充值信息
              </dt>
              <dd>
                <span>充值单号：</span>
                <span>{{ order.recharge.rechargeId }}</span>
              </dd>
              <dd>
                <span>存款人姓名：</span>
                <el-input
                  type="text"
                  placeholder="请输入存款人姓名"
                  v-model="payAccountName"
                />
              </dd>
              <dd>
                <span>存款金额：</span>
                <el-input type="text" v-model="amount" />
              </dd>
              <dd>
                <span>存款时间：</span>
                <el-input
                  type="text"
                  readonly="readonly"
                  :placeholder="timestampToString(order.recharge.actionTime)"
                />
              </dd>
              <dd>
                <span>存款方式：</span>
                <el-select v-model="bankPos" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </dd>
              <dd>
                <span @click="prev">上一步</span>
                <span @click="submit">提交订单</span>
              </dd>
            </dl>
            <div class="noBank" v-else>
              <h3>完善充值信息</h3>
              <ul>
                <li>
                  <span>充值单号：</span>
                  <span>{{ order.recharge.rechargeId }}</span>
                </li>
                <li>
                  <span>商户名称：</span>
                  <span>{{ order.rechargeMethod.ext2 }}</span>
                </li>
                <li>
                  <span>存款人姓名：</span>
                  <el-input
                    type="text"
                    placeholder="请输入存款人姓名"
                    v-model="payAccountName"
                  />
                </li>
                <li>
                  <span>存款金额：</span>
                  <el-input type="text" v-model="amount" />
                </li>
                <li>
                  <span>存款时间：</span>
                  <el-input
                    type="text"
                    readonly="readonly"
                    :placeholder="timestampToString(order.recharge.actionTime)"
                  />
                </li>
                <li>
                  <span @click="prev">上一步</span>
                  <span @click="submit">提交订单</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { rechargeApply, rechargeSubmit } from "../../api";
// import BScroll from "better-scroll";
export default {
  name: "Recharge",
  data() {
    return {
      // moneyList: ["50", "500", "1500", "3000", "50000"],
      rechargeMoney: "",
      rechargeMoneyType: "",
      rechargeMin: "",
      rechargeMax: "",
      options: [
        {
          label: "网银转账"
        },
        {
          label: "ATM自动柜员机"
        },
        {
          label: "ATM现金入款"
        },
        {
          label: "银行柜台转账"
        },
        {
          label: "手机银行转账"
        },
        {
          label: "其他"
        }
      ],
      bankSelect: "",
      activeName: "10",
      amount: "",
      desc: "请选择充值通道",
      payWay: "", // 1 跳外链 2 扫码 3 银行卡
      paying: false, // 购买状态
      methodId: "",
      rechargeId: "",
      date: "",
      payAccountName: "",
      payAccountNameFull: "",
      bankPos: "网银转账"
    };
  },
  created() {
    console.log(
      this.rechargeList,
      "充值数据",
      this.order,
      this.allConfig,
      "==========="
    );
    if (!this.rechargeList || !this.rechargeList.length) {
      this.$store.dispatch("rechargeBefores");
    }
  },
  computed: {
    ...mapGetters(["rechargeList", "order", "loading", "allConfig"]),
    payWays() {
      return this.payWay == "3";
    },
    isReadonly() {
      return this.rechargeMoneyType == 1;
    }
  },
  methods: {
    onCopy: function() {
      this.$message({
        type: "success",
        showClose: true,
        message: "复制成功，可直接Ctrl+V进行粘贴"
      });
    },
    onError: function() {
      this.$message({
        type: "error",
        showClose: true,
        message: "复制失败"
      });
    },
    changeMoney(money) {
      this.amount = money;
    },
    Application() {
      console.log(this.methodId, this.payWay);
      if (!this.amount) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入充值金额"
        });
      }
      if (!this.payWay) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请选择充值通道"
        });
      } else {
        if (this.payWay == "1") {
          if (parseFloat(this.rechargeMin) > this.amount) {
            return this.$message({
              type: "error",
              showClose: true,
              message: "金额不能少于" + this.rechargeMin + "元"
            });
          }
          if (parseFloat(this.rechargeMax) < this.amount) {
            return this.$message({
              type: "error",
              showClose: true,
              message: "金额不能大于" + this.rechargeMax + "元"
            });
          }
          this.reCharge(
            "/api/common/pay/create/methodId/" +
              this.methodId +
              "/money/" +
              this.amount
          );
        } else {
          rechargeApply({ methodId: this.methodId }).then(res => {
            console.log(res);
            if (res.status) {
              this.$store.commit("ORDERS", res.data);
              this.paying = true;
            }
          });
        }
      }
    },
    submit() {
      if (!this.payAccountName) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入存款人姓名"
        });
      }
      if (!this.amount) {
        return this.$message({
          type: "error",
          showClose: true,
          message: "请输入存入金额"
        });
      }
      this.rechargeId = this.order.recharge.rechargeId;
      this.date = this.timestampToString(this.order.recharge.actionTime);
      this.payAccountNameFull =
        this.order.rechargeMethod.orderdesc + "：" + this.payAccountName;
      if (parseFloat(this.order.rechargeMethod.rechargeMin) > 0) {
        if (this.amount < parseFloat(this.order.rechargeMethod.rechargeMin)) {
          return this.$message({
            type: "error",
            showClose: true,
            message:
              "充值金额不能低于" + this.order.rechargeMethod.rechargeMin + "元"
          });
        }
      }
      if (parseFloat(this.order.rechargeMethod.rechargeMax) > 0) {
        if (this.amount > parseFloat(this.order.rechargeMethod.rechargeMax)) {
          return this.$message({
            type: "error",
            showClose: true,
            message:
              "充值金额不能高于" + this.order.rechargeMethod.rechargeMax + "元"
          });
        }
      }
      let parameter;
      if (this.payWays) {
        parameter = {
          rechargeId: this.rechargeId,
          methodId: this.methodId,
          amount: this.amount,
          date: this.date,
          payAccountNameFull: this.payAccountNameFull,
          bankPos: this.bankPos
        };
      } else {
        parameter = {
          rechargeId: this.rechargeId,
          amount: this.amount,
          date: this.date,
          payAccountNameFull: this.payAccountNameFull,
          bankPos: this.bankPos
        };
      }
      console.log(parameter, "充值提交数据------------------");
      rechargeSubmit(parameter).then(res => {
        let type;
        if (res.status) {
          type = "success";
          this.prev();
        } else {
          type = "error";
        }
        this.$message({
          type: type,
          showClose: true,
          message: res.msg
        });
      });
    },
    prev() {
      this.initData();
    },
    changeRadio(
      payWay,
      desc,
      rechargeMoney,
      rechargeMoneyType,
      rechargeMin,
      rechargeMax
    ) {
      console.log(
        rechargeMin,
        "/",
        rechargeMax,
        "/",
        rechargeMoney,
        "/",
        rechargeMoneyType
      );
      this.payWay = payWay;
      this.desc = desc;
      this.rechargeMoney = rechargeMoney;
      this.rechargeMoneyType = rechargeMoneyType;
      this.rechargeMin = rechargeMin;
      this.rechargeMax = rechargeMax;
    },
    changeBank(val) {
      console.log(val);
      this.methodId = val.split(",")[0];
      this.payWay = val.split(",")[1];
      this.desc = val.split(",")[2];
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.initData();
      this.rechargeMoney = "";
      this.rechargeMoneyType = "";
    },
    initData() {
      this.paying = false;
      this.methodId = "";
      this.payWay = "";
      this.amount = "";
      this.desc = "请选择充值通道";
    }
  }
};
</script>

<style scoped lang="scss">
.recharge {
  display: flex;
  flex: 1;
  .common {
    ul {
      display: flex;
      max-width: 900px;
      flex-wrap: wrap;
      border-bottom: 1px solid #e9e8ea;
      li {
        flex: 0 0 auto;
        padding: 0 0 0 20px;
        /*width: 179px;*/
        > div {
          position: relative;
          &:after {
            width: 1px;
            height: 46px;
            content: "";
            background-image: linear-gradient(#e9e8ea, #e9e8ea),
              linear-gradient(#fc7f07, #fc7f07);
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
          }
          label {
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-radio__label {
              div {
                margin-left: 5px;
                h3 {
                  color: #666666;
                  font-size: 16px;
                  margin-bottom: 5px;
                  /*width: 100px;*/
                  overflow: hidden;
                  text-overflow: ellipsis;
                  padding-right: 20px;
                }
                span {
                  display: inline-block;
                  color: #999999;
                  width: 100px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
    .content {
      padding-left: 50px;
      margin-top: 44px;
      h3 {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        span {
          color: #666666;
        }
        .el-select {
          width: 214px;
          margin-left: 20px;
        }
        i {
          margin-left: 20px;
          display: inline-block;
          width: 115px;
          height: 41px;
          img {
            height: 100%;
          }
        }
      }
      > div {
        display: flex;
        span {
          color: #666;
          line-height: 40px;
        }
        > div {
          margin-left: 20px;
          .el-input {
            width: 214px;
          }
          > div {
            img {
              float: left;
              color: #000000;
              margin: 6px 5px 0 18px;
            }
            span {
              color: #cbb79f;
            }
          }
        }
        &.selectMoney {
          margin-left: 76px;
          display: flex;
          margin-top: 10px;
          span {
            width: 80px;
            height: 40px;
            border: 1px solid #eeeeee;
            border-radius: 4px;
            margin-right: 10px;
            text-align: center;
            color: #999999;
            cursor: pointer;
            &.on {
              color: #fc7f07;
              border-color: #fc7f07;
            }
            &:hover {
              border-color: #fc7f07;
            }
          }
        }
      }
      .submitBtn {
        display: block;
        text-align: center;
        float: right;
        margin-right: 40px;
        margin-top: 150px;
      }
    }
    .submitBtn {
      margin-bottom: 30px;
    }
  }
  .paying {
    display: flex;
    .left {
      flex: 0 0 auto;
      width: 522px;
      background-color: #fdf7ea;
      .bank {
        dl {
          dt {
            text-align: center;
            margin-top: 33px;
            color: #999999;
            font-size: 16px;
          }
          dd {
            span {
              display: inline-block;
              line-height: 30px;
              &:nth-child(1) {
                width: 96px;
                text-align: right;
              }
              &:nth-child(2) {
                width: 336px;
                margin-left: 10px;
              }
              &:nth-child(3) {
                color: #666666;
                cursor: pointer;
                &:hover {
                  color: #fd7632;
                }
              }
            }
          }
        }
        .btm {
          margin-top: 90px;
          margin-bottom: 45px;
          padding-left: 40px;
          line-height: 30px;
          h3 {
            font-size: 17px;
          }
        }
      }
      .noBank {
        text-align: center;
        h3 {
          margin-top: 20px;
          margin-bottom: 20px;
          color: #999999;
          font-size: 16px;
        }
        img {
          display: inline-block;
          width: 230px;
          height: 230px;
        }
        .btm {
          text-align: left;
          margin-left: 38px;
          h3 {
            margin-top: 0;
            margin-bottom: 5px;
          }
          ul {
            margin-bottom: 36px;
            li {
              line-height: 40px;
            }
          }
        }
      }
    }
    .right {
      width: 378px;
      .bank {
        dt {
          text-align: center;
          margin-top: 38px;
          margin-bottom: 48px;
          font-size: 16px;
          color: #333333;
        }
        dd {
          line-height: 42px;
          margin-bottom: 10px;
          span {
            color: #666;
            &:nth-child(1) {
              display: inline-block;
              width: 104px;
              text-align: right;
            }
          }
          .el-input {
            width: 214px;
          }
          .el-select {
            width: 214px;
          }
          &:last-child {
            margin-top: 120px;
            span {
              cursor: pointer;
              display: inline-block;
              text-align: center;
              color: #fff;
              width: 118px;
              height: 42px;
              border-radius: 4px;
              &:nth-child(1) {
                background-image: linear-gradient(
                    0deg,
                    #4f52a1 0%,
                    #52c0d9 100%
                  ),
                  linear-gradient(#eeeeee, #eeeeee);
                margin-left: 45px;
                margin-right: 58px;
              }
              &:nth-child(2) {
                background-image: linear-gradient(
                    0deg,
                    #fc4a1a 0%,
                    #f7b733 100%
                  ),
                  linear-gradient(#eeeeee, #eeeeee);
              }
            }
          }
        }
      }
      .noBank {
        h3 {
          text-align: center;
          margin-top: 38px;
          margin-bottom: 48px;
          font-size: 16px;
          color: #333333;
        }
        ul {
          li {
            line-height: 42px;
            margin-bottom: 10px;
            span {
              color: #666;
              &:nth-child(1) {
                display: inline-block;
                width: 104px;
                text-align: right;
              }
            }
            .el-input {
              width: 214px;
            }
            .el-select {
              width: 214px;
            }
            &:last-child {
              margin-top: 120px;
              span {
                cursor: pointer;
                display: inline-block;
                text-align: center;
                color: #fff;
                width: 118px;
                height: 42px;
                border-radius: 4px;
                &:nth-child(1) {
                  background-image: linear-gradient(
                      0deg,
                      #4f52a1 0%,
                      #52c0d9 100%
                    ),
                    linear-gradient(#eeeeee, #eeeeee);
                  margin-left: 45px;
                  margin-right: 58px;
                }
                &:nth-child(2) {
                  background-image: linear-gradient(
                      0deg,
                      #fc4a1a 0%,
                      #f7b733 100%
                    ),
                    linear-gradient(#eeeeee, #eeeeee);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
