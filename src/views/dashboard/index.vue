<template>
  <div class="dashboard-container">
    <div class="dashboard-top">
      <el-card class="fir_box">
        <echartsTitle leftTitle="总答题数量"> </echartsTitle>
        <p class="number_fir">260,560</p>
        <div class="zhou_fir">
          <span>周同比 12% <i class="el-icon-caret-top"></i></span>
          <span>日环比 11% <i class="el-icon-caret-bottom"></i></span>
        </div>
        <div
          style="
            margin-top: 10px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
          "
        >
          日答题数量 12,423
        </div>
      </el-card>
      <el-card>
        <echartsTitle leftTitle="试题方向"> </echartsTitle>

        <radarEcharts />
        <div
          style="
            margin-top: 10px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
          "
        >
          日答题数量 12,423
        </div>
      </el-card>
      <el-card>
        <echartsTitle leftTitle="试题学科分布"> </echartsTitle>
        <pieEcharts />
        <div
          style="
            margin-top: 10px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
          "
        >
          日答题数量 12,423
        </div>
      </el-card>

      <el-card>
        <echartsTitle leftTitle="上周试题新增"> </echartsTitle>
        <barEcharts />
        <div
          style="
            margin-top: 10px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
          "
        >
          日答题数量 12,423
        </div>
      </el-card>
    </div>
    <div class="dashboard-btm">
      <el-card class="mt-20 tab-third">
        <el-tabs
          class="table-left"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="前端学科" name="first" :lazy="true">
            <template>
              <div ref="chart" style="width: 875px; height: 400px"></div>
            </template>
            <!-- <lineEcharts :actName="activeName" /> -->
          </el-tab-pane>
          <el-tab-pane label="java学科" name="second" :lazy="true">
            <template>
              <div ref="chart" style="width: 875px; height: 400px"></div>
            </template>
            <!-- <lineEcharts :actName="activeName" >-->
          </el-tab-pane>
        </el-tabs>
        <div class="table-right">
          <h4>学科试题数量排名</h4>
          <ul>
            <li>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="circular circular_1">1</div>
                </div>
                <div class="el-col el-col-16">前端</div>
                <div class="el-col el-col-5">5,234</div>
              </div>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="circular circular_1">2</div>
                </div>
                <div class="el-col el-col-16">java</div>
                <div class="el-col el-col-5">3,210</div>
              </div>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="circular circular_1">3</div>
                </div>
                <div class="el-col el-col-16">大数据</div>
                <div class="el-col el-col-5">1,294</div>
              </div>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="light circular">4</div>
                </div>
                <div class="el-col el-col-16">c++</div>
                <div class="el-col el-col-5">1,001</div>
              </div>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="light circular">5</div>
                </div>
                <div class="el-col el-col-16">UI</div>
                <div class="el-col el-col-5">934</div>
              </div>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="light circular">6</div>
                </div>
                <div class="el-col el-col-16">php</div>
                <div class="el-col el-col-5">856</div>
              </div>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="light circular">7</div>
                </div>
                <div class="el-col el-col-16">python</div>
                <div class="el-col el-col-5">403</div>
              </div>
              <div class="row el-row">
                <div class="el-col el-col-3">
                  <div class="light circular">8</div>
                </div>
                <div class="el-col el-col-16">测试</div>
                <div class="el-col el-col-5">122</div>
              </div>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import barEcharts from '@/components/barEcharts/index.vue'
import radarEcharts from '@/components/radarCharts/index.vue'
import echartsTitle from '@/components/echartsTitle/index.vue'
import pieEcharts from '@/components/pieEcharts/index.vue'
// import lineEcharts from "@/components/lineEcharts/index.vue";

export default {
  name: 'Dashboard',
  components: {
    barEcharts,
    echartsTitle,
    radarEcharts,
    pieEcharts
    // lineEcharts,
  },
  data() {
    return {
      leftTitle: '',
      activeName: 'first',
      // option: {},
      isShow: false,
      isSecondShow: false
      // index: '0'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(typeof tab.index)
      // this.index = tab.index
      this.tab(tab.index)
    },
    //     tabClick(name){
    // console.log(name);
    //     },
    // echarts数据
    getEchartData() {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
              '2021-02',
              '2021-03',
              '2021-04',
              '2021-05',
              '2021-06',
              '2021-07',
              '2021-08'
            ]
          },
          yAxis: {
            type: 'value'
            // name: '**数量（件）'
          },
          /**
           * 暂时注释series
           */
          series: [
            {
              data: [200, 702, 501, 334, 400, 300, 220],
              // data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
              ////areaStyle: {}
            }
          ]
        }

        myChart.setOption(option) //设置图表数据

        // 不断地往一个function里面塞数据，如果不删除了话，会一直追加上去，不环保并且耗内存，必须要删掉追加。所以这里用到了追加事件window.addEventListener()和删除事件window.removeEventListener()
        window.addEventListener('resize', function () {
          //图表尺寸自适应
          myChart.resize()
        })
      }
      // this.$on("hook:destroyed", () => {
      //   window.removeEventListener("resize", function () {
      //     myChart.resize();
      //   });
      // });
    },
    tab(actName) {
      // debugger;
      console.log(actName)
      // this.$emit('tab',i)
      const chart = this.$refs.chart
      const myChart = this.$echarts.init(chart)

      // this.num = actName; //通过添加类名控制选项卡样式
      if (actName === '0') {
        console.log('-----------0-----------')
        console.log(actName)

        this.isShow = true
        const option = {
          yAxis: {
            type: 'value'
            // name: "保函数量（件）",
          },
          series: [
            {
              // 不会？？
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              // java学科 2 200
              // data: [200, 702, 501, 334, 400, 300, 220],
              type: 'line',
              smooth: true
              //areaStyle: {}
            }
          ]
        }
        myChart.setOption(option) //更改（而非覆盖）图表数据
      } else if (actName === '1') {
        console.log('-----------1-----------')
        this.isSecondShow = true
        console.log(actName)
        const option = {
          yAxis: {
            type: 'value'
            // name: '保费收入（万元）'
          },
          series: [
            {
              // 前端学科 800
              // data: [820, 932, 901, 934, 1290, 1330, 1320],
              // data: [200, 702, 501, 334, 400, 300, 220],
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
              //areaStyle: {}
            }
          ]
        }
        myChart.setOption(option) //更改（而非覆盖）图表数据
      }
    }
  },
  mounted() {
    this.getEchartData()
  },
  updated() {
    this.getEchartData()
    // this.handleClick()
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-card__body {
  width: 280px;
  // height: 260px;
}
.number_fir {
  font-size: 30px;
  height: 140px;
  line-height: 140px;
  padding-left: 20px;
  text-align: center;
}
.dashboard-top {
  display: flex;
  justify-content: space-between;
}
.el-icon-caret-top {
  color: red;
}
.el-icon-caret-bottom {
  color: green;
}
.zhou_fir {
  padding-bottom: 10px;

  span:nth-child(1) {
    margin-right: 10px;
  }
}
.tab_subject {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  div {
    margin-left: 20px;
  }
}
.mt-20 {
  margin-top: 20px;
}
.tab-third {
  // display: flex;
  // justify-content: space-between;
  .table-left {
    float: left;
  }
  .table-right {
    padding-top: 83px;
    float: left;
    width: 320px;
  }
}
::v-deep.circular_1 {
  width: 20px;
  height: 20px;
  background-color: #314659;
  color: #fff;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  font-weight: 600;
  border-radius: 50%;
}
li {
  list-style: none;
  div {
    margin-top: 5px;
  }
}
</style>
