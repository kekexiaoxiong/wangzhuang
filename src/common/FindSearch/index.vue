<template>
  <div class="findseatch">
    <el-form :model="form" label-width="100px" style="overflow: auto;">
      <el-form-item label="公司:" v-if="companyHide" style="float:left;">
        <el-col :span="5">
          <el-select style="width:150px;" v-model="form.company" placeholder="请选择公司">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="(item,index) in companySelect"
              :label="item.value"
              :key="index"
              :value="item.key"
            />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="渠道:" style="float:left;" v-if="channelHide">
        <el-select style="width:150px;float:left;" v-model="form.channel" placeholder="请选择渠道">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in channelSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="登录方式:" prop="sortNo" v-if="loginHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.loginMethod" placeholder="请选择登录方式">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in loginMethodSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="国家:" prop="sortNo" v-if="countryHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.country" placeholder="请选择国家">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in countrySelect"
            :label="item"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- 购买种类 -->
      <el-form-item label="购买种类:" prop="sortNo" v-if="typeOfPurchaseHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.chargeType" placeholder="请选择购买种类">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in typeOfPurchaseSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <!-- 成就类型 -->
      <el-form-item label="成就类型:" prop="sortNo" v-if="achievementTypeHide" style="float:left;">
        <el-select
          style="width:150px;float:left;"
          v-model="form.achievementType"
          placeholder="请选择成就类型"
        >
          <el-option label="全部" :value="''" />
          <el-option label="普通获得金币" :value="1" />
          <el-option label="免费获得金币" :value="2" />
          <el-option label="BONUS获得金币" :value="3" />
          <el-option label="LEVEL" :value="4" />
          <el-option label="五连次数" :value="5" />
          <el-option label="个人奖池次数" :value="6" />
        </el-select>
      </el-form-item>

      <!-- 购买面额 -->
      <el-form-item label="购买面额:" prop="sortNo" v-if="purchaseAmountHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.payMoney" placeholder="请选择购买面额">
          <el-option label="全部" :value="''" />
          <el-option
            v-for="(item,index) in purchaseAmountSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <!-- 支付方式 -->
      <el-form-item label="支付方式:" prop="sortNo" v-if="paymentMethodHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.payType" placeholder="请选择支付方式">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in paymentMethodSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <!-- 玩家ID -->
      <el-form-item label="玩家ID:" prop="sortNo" v-if="playerIdHide" style="float:left;">
        <el-input size="mini" placeholder="请输入玩家ID" style="width:150px;" v-model="form.rid"></el-input>
      </el-form-item>

      <!-- 埋点类型 -->
      <el-form-item label="埋点类型:" prop="sortNo" v-if="buriedTypeHide" style="float:left;">
        <el-input size="mini" placeholder="请输入埋点类型" style="width:150px;" v-model="form.buriedType"></el-input>
      </el-form-item>

      <!-- 玩家昵称 -->
      <el-form-item label="玩家昵称:" prop="sortNo" v-if="playerNicknameHide" style="float:left;">
        <el-input size="mini" placeholder="请输入玩家昵称" style="width:150px;" v-model="form.nick"></el-input>
      </el-form-item>

      <!-- 玩家编号 -->
      <el-form-item label="玩家编号:" prop="sortNo" v-if="playerNumberHide" style="float:left;">
        <el-input
          size="mini"
          placeholder="请输入玩家编号"
          style="width:150px;"
          v-model="form.playerNumber"
        ></el-input>
      </el-form-item>


       <!-- 选择应用 -->
      <el-form-item label="选择应用:" prop="sortNo" v-if="applicationHide" style="float:left;">
        <el-select
          style="width:150px;float:left;"
          v-model="form.application"
          placeholder="请选择应用"
        >
          <el-option label="全部" :value="''" />
       
        </el-select>
      </el-form-item>


      <!-- 接收人ID -->
      <el-form-item label="接收人ID:" prop="sortNo" v-if="receiveIdHide" style="float:left;">
        <el-input size="mini" placeholder="请输入接收人ID" style="width:150px;" v-model="form.receiveId"></el-input>
      </el-form-item>

      <!-- 机器码 -->
      <el-form-item label="机器码:" prop="sortNo" v-if="machineCodeHide" style="float:left;">
        <el-input size="mini" placeholder="请输入机器码" style="width:150px;" v-model="form.machineCode"></el-input>
      </el-form-item>

      <!-- 最后登录ip -->
      <el-form-item label="最后登录ip:" prop="sortNo" v-if="lastIpHide" style="float:left;">
        <el-input size="mini" placeholder="最后登录ip" style="width:150px;" v-model="form.lastIp"></el-input>
      </el-form-item>ip

      <!-- 第三方订单 -->
      <el-form-item label="第三方订单:" prop="sortNo" v-if="thirtOrderHide" style="float:left;">
        <el-input size="mini" placeholder="输入第三方订单" style="width:150px;" v-model="form.thirtOrder"></el-input>
      </el-form-item>

      <!-- VIP等级 -->
      <el-form-item label="vip等级:" prop="sortNo" v-if="gradeHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.vipLevel" placeholder="请选择vip等级">
          <el-option label="全部" :value="0" />
          <el-option label="1" :value="1" />
          <el-option label="2" :value="2" />
          <el-option label="3" :value="3" />
          <el-option label="4" :value="4" />
          <el-option label="5" :value="5" />
          <el-option label="6" :value="6" />
        </el-select>
      </el-form-item>


        <!-- appId -->
      <el-form-item label="app:" prop="sortNo" v-if="appIdHide" style="float:left;">

        <el-select style="width:150px;float:left;" v-model="form.appId" placeholder="请选择appId">
          <el-option label="全部" :value="''" />
          <el-option
            v-for="(item,index) in appidSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
       
      </el-form-item>


      <!-- 在线类型 -->
      <el-form-item label="在线类型:" prop="sortNo" v-if="onlineStateHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.onlineState" placeholder="请选择在线类型">
          <el-option label="全部" :value="''" />
          <el-option label="在线" :value="1" />
          <el-option label="离线" :value="2" />
        </el-select>
      </el-form-item>

      <!-- 选择排行种类 -->
      <el-form-item label="选择排行种类:" prop="sortNo" v-if="playerRankingHide" style="float:left;">
        <el-select
          style="width:150px;float:left;"
          v-model="form.rankingState"
          placeholder="请选择排行类型"
        >
          <el-option label="金币" :value="0" />
          <el-option label="砖石" :value="1" />
          <el-option label="代币" :value="2" />
        </el-select>
      </el-form-item>

      <!-- 快速选择 -->
      <el-form-item label="快速选择:" prop="sortNo" v-if="quickSelectionHide" style="float:left;">
        <el-select
          style="width:150px;float:left;"
          v-model="form.quickSelection"
          placeholder="请选择日期"
          @change="onSelectedDrug($event)"
        >
          <el-option label="今天" :value="0" />
          <el-option label="前一天" :value="1" />
          <el-option label="过去一周" :value="2" />
          <el-option label="最近30天" :value="3" />
          <el-option label="最近90天" :value="4" />
          <el-option label="过去半年" :value="5" />
          <el-option label="过去12个月" :value="6" />
        </el-select>
      </el-form-item>
      <!-- 是否过滤测试玩家 -->
      <el-form-item
        label="是否过滤测试玩家:"
        prop="sortNo"
        label-width="180px"
        v-if="testPlayerHide"
        style="float:left;"
      >
        <el-select style="width:150px;float:left;" v-model="form.testPlayer" placeholder="请选择排行类型">
          <el-option label="否" :value="''" />
          <el-option label="是" :value="1" />
        </el-select>
      </el-form-item>
      <!-- 选择关卡 -->
      <el-form-item label="选择关卡:" prop="sortNo" v-if="checkpointHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.checkpoint" placeholder="请选择关卡">
          <el-option label="全部" :value="''" />
          <el-option
            v-for="(item,index) in checkpointSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <!-- 邮件类型 -->
      <el-form-item label="邮件类型:" prop="sortNo" v-if="messageTypeHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.msgType" placeholder="请选择邮件类型">
          <el-option label="全部" :value="''" />
          <el-option label="广告" :value="1" />
          <el-option label="赛季排行榜中获奖信息" :value="2" />
          <el-option label="战斗排行榜中获奖信息" :value="3" />
          <el-option label="PVP排行榜中获奖信息" :value="4" />
          <el-option label="PVE排行榜中获奖信息" :value="5" />
          <el-option label="促销信息" :value="6" />
          <el-option label="关卡解锁信息" :value="7" />
          <el-option label="好友礼物" :value="8" />
          <el-option label="gm补偿信息" :value="9" />
          <el-option label="周期任务" :value="10" />
          <el-option label="公告信息" :value="11" />
          <el-option label="停服公告" :value="12" />
        </el-select>
      </el-form-item>

      <el-form-item label="月度目标:" prop="sortNo" style="float:left;" v-if="targetHide" >
        <el-input-number
          size="medium"
          @change="handleChange"
          :min="0"
          :step="1"
          v-model="form.target"
        ></el-input-number>
      </el-form-item>

      <!-- 最小金币 -->
      <!-- <el-form-item label="最小金币:" prop="sortNo" v-if="true" style="float:left;">
        <el-input-number
          v-model="startGold"
          style="width: 200px"
          :min="0"
          :step="10000000"
          label="请输入最小金币"
        ></el-input-number>
      </el-form-item>-->
      <!-- 最大金币 -->
      <!-- <el-form-item label="最大金币:" prop="sortNo" v-if="true" style="float:left;">
        <el-input-number
          v-model="endGold"
          style="width: 300px"
          :min="0"
          :step="10000000"
          label="请输入最大金币"
        ></el-input-number>
      </el-form-item>-->
      <!-- 排序 -->
      <!-- <el-form-item label="排序:" prop="sortNo" v-if="true" style="float:left;">
        <el-select style="width:150px;float:left;" placeholder="金币排序" v-model="sortType">
          <el-option key="1" label="正序" value="1"></el-option>
          <el-option key="2" label="倒序" value="2"></el-option>
        </el-select>
      </el-form-item>-->
      <!-- 选择时间 -->
      <el-form-item label="选择时间:" prop="sortNo" v-if="timeHide" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.time" placeholder="请选择时间">
          <el-option label="当日数据" :value="0" />
          <el-option label="周数据" :value="1" />
          <el-option label="月数据" :value="2" />
        </el-select>
      </el-form-item>

      <!-- 选择期数 -->
      <el-form-item label="选择期数:" prop="sortNo" v-if="NumberOfPeriodsHide" style="float:left;">
        <el-select
          style="width:150px;float:left;"
          v-model="form.NumberOfPeriods"
          placeholder="请选择期数"
          value-format="yyyy-MM-dd"
        >
          <el-option label="全部" :value="0" />
        </el-select>
      </el-form-item>

      <el-form-item label style="float:left;" label-width="50px" v-if="buttomHide1">
        <el-button type="primary" size="mini" @click="findFormData()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="form" label-width="100px" style="overflow: auto;">
      <el-form-item label="开始时间：" v-if="startTimeHide" style="float:left;">
        <el-date-picker
          v-model="form.startTime"
          type="date"
          placeholder="Pick a date"
          style="width: 150px;"
          value-format="yyyy-MM-dd"
          @change="change1"
        />
      </el-form-item>
      <el-form-item label="结束时间：" v-if="endTimeHide" style="float:left;">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="Pick a date"
          style="width: 150px;"
          value-format="yyyy-MM-dd"
          @change="change2"
        />
      </el-form-item>

      <el-form-item label="开始时间：" v-if="startTimeDefault" style="float:left;">
        <el-date-picker
          v-model="form.startTimeNone"
          type="date"
          placeholder="Pick a date"
          style="width: 150px;"
          value-format="yyyy-MM-dd"
          @change="change3"
        />
      </el-form-item>
      <el-form-item label="结束时间：" v-if="endTimeDefault" style="float:left;">
        <el-date-picker
          v-model="form.endTimeNone"
          type="date"
          placeholder="Pick a date"
          style="width: 150px;"
          value-format="yyyy-MM-dd"
          @change="change4"
        />
      </el-form-item>

      <el-form-item label="选择时间" v-if="choiceTimeHide" style="float:left;">
        <el-date-picker
          v-model="form.endTimeDay"
          type="date"
          placeholder="Pick a date"
          style="width: 150px;"
          value-format="yyyy-MM-dd"
          @change="change4"
        />
      </el-form-item>

      <el-form-item label style="float:left;" v-if="buttomHide">
        <el-button type="primary" size="mini" @click="findFormData()">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "find",
  data() {
    return {
      phoneList: [],
      companyHide: true, //隐藏公司下拉框
      countryHide: true, //隐藏国家下拉框
      loginHide: true, //隐藏登录方式下拉框
      channelHide: true, //隐藏渠道下拉框
      appIdHide:false,
      startTimeDefault: false,
      endTimeDefault: false,
      targetHide:false,
      choiceTimeHide:false,
      typeOfPurchaseHide: false, //隐藏购买种类下拉框
      purchaseAmountHide: false, //隐藏购买面额下拉框
      paymentMethodHide: false, //隐藏支付方式下拉框
      playerIdHide: false, //隐藏玩家id input框
      playerNicknameHide: false, //隐藏玩家昵称

      receiveIdHide: false, //隐藏接受人ID
      achievementTypeHide: false, //隐藏成就类型下拉框
      gradeHide: false, //隐藏vip等级下拉框
      onlineStateHide: false, //在线类型 隐藏下拉框
      playerRankingHide: false, //排行种类下拉框
      startTimeHide: true,
      endTimeHide: true,
      buttomHide: true,
      checkpointHide: false,
      quickSelectionHide: false,
      NumberOfPeriodsHide: false, //期数
      timeHide: false, //时间,
      messageTypeHide: false, //邮件类型
      machineCodeHide: false, //机器码
      lastIpHide: false, //  最后ip
      thirtOrderHide: false, //第三方订单

      buriedTypeHide: false,

      buttomHide1: false,
      testPlayerHide: false,
      playerNumberHide: false,

      applicationHide:false,
      form: {
        appId:'',
        target:'100000',
        playerNumber: "", //玩家编号
        buriedType: "", //埋点类型
        testPlayer: "",
        thirtOrder: "",
        loginMethod: 0,
        company: 0,
        channel: 0,
        country: "全部",
        chargeType: 0,
        application:'',
        payMoney: "",
        payType: 0,
        buyType: "",
        rid: "",
        nick: "",
        receiveId: "",
        vipLevel: 0,
        achievementType: "",
        onlineState: "",
        rankingState: 0,
        checkpoint: "",
        time: 0,
        NumberOfPeriods: 0,
        msgType: "",
        machineCode: "",
        lastIp: "",
        startTime: this.GetDateStr(-8),
        endTime: this.GetDateStr(-1),
        endTimeDay:this.GetDateStr(0),
        startTimeNone: "",
        endTimeNone: ""
        //搜索数据
      },
      startTime: "",
      endTime: "",
      channelSelect: [], //渠道下拉
      companySelect: [], //公司下拉
      loginMethodSelect: [], //登录方式下拉框
      countrySelect: ["美国", "台湾", "马来西亚", "澳大利亚", "加拿大", "英国"], //国家

      typeOfPurchaseSelect: [], //购买种类下拉框
      purchaseAmountSelect: [], //购买金额
      paymentMethodSelect: [], //支付方式
      checkpointSelect: [], //选择关卡
      appidSelect:[]  //appid
    };
  },

  filters: {},
  mounted() {
    this.commonSelect();
  },

  methods: {
    change1(value) {
      if (value == null || value == "null" || value == undefined) {
        value = "";
        this.form.startTime = "";
      }
    },
    change2(value) {
      if (value == null || value == "null" || value == undefined) {
        value = "";
        this.form.endTime = "";
      }
    },
    change3(value) {
      if (value == null || value == "null" || value == undefined) {
        value = "";
        this.form.startTimeNone = "";
      }
    },
    change4(value) {
      if (value == null || value == "null" || value == undefined) {
        value = "";
        this.form.endTimeNone = "";
      }
    },

    commonSelect() {
      //公司下拉数据
      this.$common.findGameTypeEnum().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.companySelect.push(item);
          }
          console.log(this.companySelect);
        }
      });

      //渠道下拉数据
      this.$common.findChannel().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.channelSelect.push(item);
          }
        }
      });

      //登录方式下拉
      this.$common.findPlatFormType().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.loginMethodSelect.push(item);
          }
        }
      });

      //购买种类
      this.$common.findChargeType().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.typeOfPurchaseSelect.push(item);
          }
        }
      });

      //支付金额
      this.$common.findChargeMoney().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.purchaseAmountSelect.push(item);
          }
        }
      });

      //支付方式
      this.$common.findPayType().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.paymentMethodSelect.push(item);
            console.log(this.paymentMethodSelect);
          }
        }
      });

      //选择关卡
      this.$common.findCheckpoint().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.checkpointSelect.push(item);
            console.log(this.paymentMethodSelect);
          }
        }
      });


       //appid
      this.$common.findAppid().then(res => {
        if (res.data) {
          console.log(res.data)
          for (let item of res.data) {
            this.appidSelect.push(item);
            console.log(this.appidSelect);
          }
        }
      });
     
      //国家下拉数据
      //  this.$common.findChannel().then(res => {
      //   if (res.data) {
      //     for (let item of res.data) {
      //       this.countrySelect.push(item);
      //     }
      //   }
      // });
    },

    onSelectedDrug(d) {
      if (d == 0) {
        this.form.startTime = this.GetDateStr(-0);
        this.form.endTime = this.GetDateStr(-0);
        this.findFormData();
      } else if (d == 1) {
        this.form.startTime = this.GetDateStr(-1);
        this.form.endTime = this.GetDateStr(-0);
        this.findFormData();
      } else if (d == 2) {
        this.form.startTime = this.GetDateStr(-7);
        this.form.endTime = this.GetDateStr(-0);
        this.findFormData();
      } else if (d == 3) {
        this.form.startTime = this.GetDateStr(-30);
        this.form.endTime = this.GetDateStr(-0);
        this.findFormData();
      } else if (d == 4) {
        this.form.startTime = this.GetDateStr(-90);
        this.form.endTime = this.GetDateStr(-0);
        this.findFormData();
      } else if (d == 5) {
        this.form.startTime = this.GetDateStr(-180);
        this.form.endTime = this.GetDateStr(-0);
        this.findFormData();
      } else if (d == 6) {
        this.form.startTime = this.GetDateStr(-365);
        this.form.endTime = this.GetDateStr(-0);
        this.findFormData();
      }
    },
    // 获取日期
    GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },

    findFormData: function() {
      if (this.form.startTime == null) {
        this.form.startTime = "";
      }
      if (this.form.endTime == null) {
        this.form.endTime = "";
      }

      if (this.form.startTimeNone == null) {
        this.form.startTimeNone = "";
      }
      if (this.form.endTimeNone == null) {
        this.form.endTimeNone = "";
      }
      this.$emit("searchData", this.form);
    }
  }
};
</script>

<style lang="scss">
.d {
  overflow: auto;
}
</style>