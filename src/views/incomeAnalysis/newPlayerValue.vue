<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">新玩家价值</div>
          <Tabs type="card">
            <Tab-pane label="7日内平均贡献">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <new-Weekcontribution :chart-data="newWeek" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="newWeekTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="7日内平均贡献">
                    <template slot-scope="scope">{{scope.row.val}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
                  <div class="pages">
                    <el-pagination
                      :current-page="pageIndex"
                      :page-size="pageSize"
                      :page-sizes="[15, 20, 30, 40]"
                      :total="total"
                      @current-change="currentChange"
                      @size-change="sizeChange"
                      layout="total, sizes, prev, pager, next, jumper"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane label="14日内平均贡献">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <new-twoweekcontribution :chart-data="newTwoWeek" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 2">
                <el-table v-loading="listLoading" :data="newTwoWeekTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="14日内平均贡献">
                    <template slot-scope="scope">{{scope.row.val}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
                  <div class="pages">
                    <el-pagination
                      :current-page="pageIndex"
                      :page-size="pageSize"
                      :page-sizes="[15, 20, 30, 40]"
                      :total="total"
                      @current-change="currentChange"
                      @size-change="sizeChange"
                      layout="total, sizes, prev, pager, next, jumper"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane label="30日内平均贡献">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <new-monthcontribution :chart-data="newMonth" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table v-loading="listLoading" :data="newMonthTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="30日内平均贡献">
                    <template slot-scope="scope">{{scope.row.val}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
                  <div class="pages">
                    <el-pagination
                      :current-page="pageIndex"
                      :page-size="pageSize"
                      :page-sizes="[15, 20, 30, 40]"
                      :total="total"
                      @current-change="currentChange"
                      @size-change="sizeChange"
                      layout="total, sizes, prev, pager, next, jumper"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
          <div class="after">
            <a
              role="chartBtn"
              class="pic_but l"
              :class="{'hover':tabCt1==1}"
              @click="chartBtn(1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,1,1,tabCt10,tabCt11,tabCt12)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt1==2}"
              @click="chartBtn(2,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,2,2,tabCt10,tabCt11,tabCt12)"
            >
              <font class="table_icon">表格</font>
            </a>
          </div>
        </Card>
      </div>
    </el-row>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">ARPU</div>
          <Tabs type="card">
            <Tab-pane label="ARPU(日)">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <seep-dayarpu :chart-data="arpuData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt10 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstDayRateTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="首日付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="付费数">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
                  <div class="pages">
                    <el-pagination
                      :current-page="pageIndex"
                      :page-size="pageSize"
                      :page-sizes="[15, 20, 30, 40]"
                      :total="total"
                      @current-change="currentChange"
                      @size-change="sizeChange"
                      layout="total, sizes, prev, pager, next, jumper"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane label="ARPPU(日)">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <seep-dayarppu :chart-data="arppuData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstWeekRateTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="首周付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="付费数">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
                  <div class="pages">
                    <el-pagination
                      :current-page="pageIndex"
                      :page-size="pageSize"
                      :page-sizes="[15, 20, 30, 40]"
                      :total="total"
                      @current-change="currentChange"
                      @size-change="sizeChange"
                      layout="total, sizes, prev, pager, next, jumper"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </Tab-pane>
            <Tab-pane label="首月付费率">
              <div class="picbox_chart_table_div picbox" v-if="tabCt12 == 1">
                <!-- <pay-firstmonthrate :chart-data="firstMonthRateData" /> -->
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt12 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstMonthRateTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="首月付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="付费数">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
                  <div class="pages">
                    <el-pagination
                      :current-page="pageIndex"
                      :page-size="pageSize"
                      :page-sizes="[15, 20, 30, 40]"
                      :total="total"
                      @current-change="currentChange"
                      @size-change="sizeChange"
                      layout="total, sizes, prev, pager, next, jumper"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
          <div class="after">
            <a
              role="chartBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==1}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,1,1,1)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==2}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,2,2,2)"
            >
              <font class="table_icon">表格</font>
            </a>
          </div>
        </Card>
      </div>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">各地区新玩家价值</div>
            <Tabs type="card">
              <Tab-pane label="7日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <new-countryweek :chart-data="countryWeek" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="countryWeekTab"
                    border
                    style="width: 100%;"
                  >
                   <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="7日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="14日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <new-countrytwoweek :chart-data="countryTwoWeek" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="countryTwoWeekTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="14日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="30日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <new-countrymonth :chart-data="countryMonth" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="countryMonthTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="30日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="60日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <new-countrytwomonth :chart-data="countryTwoMonth" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="countryTwoMonthTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="60日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="90日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <new-countrythreemonth :chart-data="countryThreeMonth" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="countryThreeMonthTab"
                    border
                    style="width: 100%;"
                  >
                     <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="90日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
            </Tabs>
            <div class="after">
              <a
                role="chartBtn"
                class="pic_but l"
                :class="{'hover':tabCt2==1}"
                @click="chartBtn(tabCt1,1,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt2==2}"
                @click="chartBtn(tabCt1,2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="table_icon">表格</font>
              </a>
            </div>
          </Card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">分渠道新玩家价值</div>
            <Tabs type="card">
              <Tab-pane label="7日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <new-channelweek :chart-data="channelWeek" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="channelWeekTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="7日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="14日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <new-channeltwoweek :chart-data="channelTwoWeek" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="channelTwoWeekTab"
                    border
                    style="width: 100%;"
                  >
                     <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="14日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="30日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <new-channelmonth :chart-data="channelMonth" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="channelMonthTab"
                    border
                    style="width: 100%;"
                  >
                     <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="30日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="60日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <new-channeltwomonth :chart-data="channelTwoMonth" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="channelTwoMonthTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="60日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="90日贡献">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <new-channelthreemonth :chart-data="channelThreeMonth" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="channelThreeMonthTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="90日贡献">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
            </Tabs>
            <div class="after">
              <a
                role="chartBtn"
                class="pic_but l"
                :class="{'hover':tabCt3==1}"
                @click="chartBtn(tabCt1,tabCt2,1,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt3==2}"
                @click="chartBtn(tabCt1,tabCt2,2,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="table_icon">表格</font>
              </a>
            </div>
          </Card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  findNewPlayerContribution,
  findNewPlayerCountry,
  findNewPlayerChannel
} from "@/api/incomeAnalysis";
import FindSearch from "@/common/FindSearch";
import NewWeekcontribution from "./components/NewWeekcontribution";
import NewTwoweekcontribution from "./components/NewTwoweekcontribution";
import NewMonthcontribution from "./components/NewMonthcontribution";

import SeepDayave from "./components/SeepDayave";
import SeepDayarpu from "./components/SeepDayarpu";
import SeepDayarppu from "./components/SeepDayarppu";

import NewCountryweek from "./components/NewCountryweek";
import NewCountrytwoweek from "./components/NewCountrytwoweek";
import NewCountrymonth from "./components/NewCountrymonth";

import NewCountrytwomonth from "./components/NewCountrytwomonth";
import NewCountrythreemonth from "./components/NewCountrythreemonth";

import NewChannelweek from "./components/NewChannelweek";
import NewChanneltwoweek from "./components/NewChanneltwoweek";
import NewChannelmonth from "./components/NewChannelmonth";

import NewChanneltwomonth from "./components/NewChanneltwomonth";
import NewChannelthreemonth from "./components/NewChannelthreemonth";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "新玩家价值",
  components: {
    FindSearch,
    NewWeekcontribution,
    NewTwoweekcontribution,
    NewMonthcontribution,

    SeepDayave,
    SeepDayarpu,
    SeepDayarppu,

    NewCountryweek,
    NewCountrytwoweek,
    NewCountrymonth,
    NewCountrytwomonth,
    NewCountrythreemonth,

    NewChannelweek,
    NewChanneltwoweek,
    NewChannelmonth,
    NewChanneltwomonth,
    NewChannelthreemonth
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tabCt1: 1, //表格切换
      tabCt2: 1,
      tabCt3: 1,
      tabCt4: 1,
      tabCt5: 1,
      tabCt6: 1,
      tabCt7: 1,
      tabCt8: 1,
      tabCt9: 1,
      tabCt10: 1,
      tabCt11: 1,
      tabCt12: 1,

      playClick: false,
      dayClick: false,
      //自定义下拉菜单
      selectedDay: "Day1留存用户",
      selectedPlayer: "新增日等级",
      //selecteAnalysis: "流失前等级",
      addList: ["Day1留存用户", "Day7留存用户", "Day30留存用户"],
      // addPlay: ["全部玩家", "付费玩家"],
      addPlay: [
        "新增日等级",
        "新增日游戏次数",
        "新增日游戏时长",
        "新增日是否付费",
        "玩家性别",
        "玩家年龄"
      ],

      //新玩家收入贡献 7日
      newWeek: {
        val: [],
        cDate: []
      },
      newWeekTab: [],

      //新玩家收入贡献 14日
      newTwoWeek: {
        val: [],
        cDate: []
      },
      newTwoWeekTab: [],

      //新玩家收入贡献 30日
      newMonth: {
        val: [],
        cDate: []
      },
      newMonthTab: [],

      //各地区新玩家价值 7日
      countryWeek: {
        val: [],
        cDate: []
      },

      countryWeekTab: [],

      //各地区新玩家价值 14日
      countryTwoWeek: {
        val: [],
        cDate: []
      },
      countryTwoWeekTab: [],

      //各地区新玩家价值 30日
      countryMonth: {
        val: []
      },
      countryMonthTab: [],

      //各地区新玩家价值 60日
      countryTwoMonth: {
        val: []
      },
      countryTwoMonthTab: [],

      //各地区新玩家价值 90日
      countryThreeMonth: {
        val: []
      },
      countryThreeMonthTab: [],

      //各渠道新玩家价值 7日贡献
      channelWeek: {
        val: []
      },
      channelWeekTab: [],

      //各渠道新玩家价值 14日贡献
      channelTwoWeek: {
        val: []
      },
      channelTwoWeekTab: [],

      //各渠道新玩家价值 30日贡献
      channelMonth: {
        val: []
      },
      channelMonthTab: [],

      //各渠道新玩家价值 60日贡献
      channelTwoMonth: {
        val: []
      },
      channelTwoMonthTab: [],

      //各渠道新玩家价值 90日贡献
      channelThreeMonth: {
        val: []
      },
      channelThreeMonthTab: [],

      dataList: [], //整体数据
      bindCount: [], //绑定账户数据
      tabBindCount: [],
      regisCount: [], //注册账户类型
      tabRegisCount: [],
      countryCount: [], //地区数据
      tabCountryCount: [],
      channelCount: [], //渠道数据
      tabChannelCount: [],

      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      countryCh: [
        "美国",
        "马来西亚",
        "台湾",
        "澳大利亚",
        "加拿大",
        "其他",
        "英国"
      ]
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    //表格切换
    chartBtn(a, b, c, d, e, f, g, h, i, k, l, m) {
      this.tabCt1 = a;
      this.tabCt2 = b;
      this.tabCt3 = c;
      this.tabCt4 = d;
      this.tabCt5 = e;
      this.tabCt6 = f;
      this.tabCt7 = g;
      this.tabCt8 = h;
      this.tabCt9 = i;
      this.tabCt10 = k;
      this.tabCt11 = l;
      this.tabCt12 = m;
    },

    info() {
      this.$Message.info("这是一条普通的提醒");
    },
    findFormData() {
      (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.listLoading = true);
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值

      this.fetchData(form);
    },

    fetchData(data) {
      (this.pageIndex = 1), (this.pageSize = 15), (this.newWeek.val = []);
      this.newWeek.cDate = [];
      //新玩家收入贡献
      //findNewPlayerContribution(gameType, channelId, deviceType, beginTime, endTime)
      findNewPlayerContribution(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //7日内平均贡献
        this.dataList = response.data.lv7;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.newWeek.val.push(item.ltv7);
          this.newWeek.cDate.push(newDate);

          //表格
          this.newWeekTab.push({
            key: newDate,
            val: item.ltv7
          });
        }

        this.newTwoWeek.val = [];
        this.newTwoWeek.cDate = [];
        //14日内平均贡献
        this.dataList = response.data.lv14;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.newTwoWeek.val.push(item.ltv14);
          this.newTwoWeek.cDate.push(newDate);

          //表格
          this.newTwoWeekTab.push({
            key: newDate,
            val: item.ltv14
          });
        }

        this.newMonth.val = [];
        this.newMonth.cDate = [];
        //30日内平均贡献
        this.dataList = response.data.lv30;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.newMonth.val.push(item.ltv30);
          this.newMonth.cDate.push(newDate);
          //表格
          this.newMonthTab.push({
            key: newDate,
            val: item.ltv30
          });
        }
        this.listLoading = false;
      });

      this.countryWeek.val = [];

      this.countryWeekTab = [];
      this.countryTwoWeekTab = [];
       this.countryMonthTab = [];
       this.countryTwoMonthTab = [];
       this.countryThreeMonthTab = [];

      //各地区付费渗透 7日
      //findNewPlayerCountry(gameType, channelId, deviceType,type, beginTime, endTime)
      findNewPlayerCountry(
        data.company,
        data.channel,
        data.loginMethod,
        7,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allCountryEn = [
          "AMERICA",
          "MALAYSIA",
          "TAIWAN",
          "AUSTRALIA",
          "CANADA",
          "OTHER",
          "ENGLAND"
        ];

        for (let item in allCountryEn) {
          this.countryWeek.val.push(
            this.dataList[allCountryEn[item]].toFixed(2)
          );

          this.countryWeekTab.push({
            key: this.countryCh[item],
            val: this.dataList[allCountryEn[item]]
          });
        }

        this.listLoading = false;
      });

      this.countryTwoWeek.val = [];
      // 各地区14日
      //findNewPlayerCountry(gameType, channelId, deviceType,type, beginTime, endTime)
      findNewPlayerCountry(
        data.company,
        data.channel,
        data.loginMethod,
        14,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allCountryEn = [
          "AMERICA",
          "MALAYSIA",
          "TAIWAN",
          "AUSTRALIA",
          "CANADA",
          "OTHER",
          "ENGLAND"
        ];
        //各地区14日
        for (let item in allCountryEn) {
          this.countryTwoWeek.val.push(
            this.dataList[allCountryEn[item]].toFixed(2)
          );

          this.countryTwoWeekTab.push({
            key: this.countryCh[item],
            val: this.dataList[allCountryEn[item]]
          });
        }
        this.listLoading = false;
      });

      this.countryMonth.val = [];
      // 各地区30日
      //findNewPlayerCountry(gameType, channelId, deviceType,type, beginTime, endTime)
      findNewPlayerCountry(
        data.company,
        data.channel,
        data.loginMethod,
        30,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allCountryEn = [
          "AMERICA",
          "MALAYSIA",
          "TAIWAN",
          "AUSTRALIA",
          "CANADA",
          "OTHER",
          "ENGLAND"
        ];
        //各地区30日
        for (let item in allCountryEn) {
          this.countryMonth.val.push(
            this.dataList[allCountryEn[item]].toFixed(2)
          );

          //表格
          this.countryMonthTab.push({
            key: this.countryCh[item],
            val: this.dataList[allCountryEn[item]]
          });
        }
        this.listLoading = false;
      });

      this.countryTwoMonth.val = [];
      // 各地区60日
      //findNewPlayerCountry(gameType, channelId, deviceType,type, beginTime, endTime)
      findNewPlayerCountry(
        data.company,
        data.channel,
        data.loginMethod,
        60,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allCountryEn = [
          "AMERICA",
          "MALAYSIA",
          "TAIWAN",
          "AUSTRALIA",
          "CANADA",
          "OTHER",
          "ENGLAND"
        ];
        //各地区60日
        for (let item in allCountryEn) {
          this.countryTwoMonth.val.push(
            this.dataList[allCountryEn[item]].toFixed(2)
          );

          //表格
          this.countryTwoMonthTab.push({
            key: this.countryCh[item],
            val: this.dataList[allCountryEn[item]]
          });
        }
        this.listLoading = false;
      });

      this.countryThreeMonth.val = [];
      // 各地区90日
      //findNewPlayerCountry(gameType, channelId, deviceType,type, beginTime, endTime)
      findNewPlayerCountry(
        data.company,
        data.channel,
        data.loginMethod,
        90,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allCountryEn = [
          "AMERICA",
          "MALAYSIA",
          "TAIWAN",
          "AUSTRALIA",
          "CANADA",
          "OTHER",
          "ENGLAND"
        ];
        //各地区90日
        for (let item in allCountryEn) {
          this.countryThreeMonth.val.push(
            (this.dataList[allCountryEn[item]] * 100).toFixed(2)
          );

          //表格
          this.countryThreeMonthTab.push({
            key: this.countryCh[item],
            val: this.dataList[allCountryEn[item]]
          });
        }
        this.listLoading = false;
      });

       this.channelWeekTab = [];
       this.channelTwoWeekTab = [];
       this.channelThreeMonthTab = [];
       this.channelTwoMonthTab = [];
       this.channelThreeMonthTab = [];

      //各渠道付费渗透7日
      //findNewPlayerChannel(gameType, channelId, deviceType, type, beginTime, endTime)
      findNewPlayerChannel(
        data.company,
        data.channel,
        data.loginMethod,
        7,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allChannelEn = [
          "LEYOU_IOS",
          "TAIWAN_GOOGLEPLAY",
          "TAIWAN_IOS",
          "LEYOU_GOOGLEPLAY"
        ];

        for (let item of allChannelEn) {
          this.channelWeek.val.push(this.dataList[item].toFixed(2));
          this.channelWeekTab.push({
            key: item,
            val: this.dataList[item]
          });
        }
        this.listLoading = false;
      });

      //各渠道付费渗透14日
      //findNewPlayerChannel(gameType, channelId, deviceType, type, beginTime, endTime)
      findNewPlayerChannel(
        data.company,
        data.channel,
        data.loginMethod,
        14,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allChannelEn = [
          "LEYOU_IOS",
          "TAIWAN_GOOGLEPLAY",
          "TAIWAN_IOS",
          "LEYOU_GOOGLEPLAY"
        ];

        for (let item of allChannelEn) {
          this.channelTwoWeek.val.push(this.dataList[item].toFixed(2));
         this.channelTwoWeekTab.push({
            key: item,
            val: this.dataList[item]
          });
        }
        this.listLoading = false;
      });

      //各渠道付费渗透30日
      //findNewPlayerChannel(gameType, channelId, deviceType, type, beginTime, endTime)
      findNewPlayerChannel(
        data.company,
        data.channel,
        data.loginMethod,
        30,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allChannelEn = [
          "LEYOU_IOS",
          "TAIWAN_GOOGLEPLAY",
          "TAIWAN_IOS",
          "LEYOU_GOOGLEPLAY"
        ];

        for (let item of allChannelEn) {
          this.channelMonth.val.push(this.dataList[item].toFixed(2));
           this.channelMonthTab.push({
            key: item,
            val: this.dataList[item]
          });
        }
        this.listLoading = false;
      });

      //各渠道付费渗透60日
      //findNewPlayerChannel(gameType, channelId, deviceType, type, beginTime, endTime)
      findNewPlayerChannel(
        data.company,
        data.channel,
        data.loginMethod,
        60,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allChannelEn = [
          "LEYOU_IOS",
          "TAIWAN_GOOGLEPLAY",
          "TAIWAN_IOS",
          "LEYOU_GOOGLEPLAY"
        ];

        for (let item of allChannelEn) {
          this.channelTwoMonth.val.push(this.dataList[item].toFixed(2));
           this.channelTwoMonthTab.push({
            key: item,
            val: this.dataList[item]
          });
        }
        this.listLoading = false;
      });

      //各渠道付费渗透90日
      //findNewPlayerChannel(gameType, channelId, deviceType, type, beginTime, endTime)
      findNewPlayerChannel(
        data.company,
        data.channel,
        data.loginMethod,
        90,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let allChannelEn = [
          "LEYOU_IOS",
          "TAIWAN_GOOGLEPLAY",
          "TAIWAN_IOS",
          "LEYOU_GOOGLEPLAY"
        ];

        for (let item of allChannelEn) {
          this.channelThreeMonth.val.push(this.dataList[item].toFixed(2));
           this.channelThreeMonthTab.push({
            key: item,
            val: this.dataList[item]
          });
        }
        this.listLoading = false;
      });
    },

    // 整体数据分页组件
    currentChange(size) {
      this.pageIndex = size;
      // 每页下拉显示数据
    },
    sizeChange(currentPage) {
      this.pageSize = currentPage;
      //点击第几页
    }
  }
};
</script>

<style lang="scss" >
@import "./../../assets/css/base.css";
</style>
