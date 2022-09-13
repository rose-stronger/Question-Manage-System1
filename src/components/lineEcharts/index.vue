<template>
  <div>
    <div class="tabCon">
      <div ref="chart" style="width: 100%; height: 400px"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actName: {
      type: String,
    },
  },
  data() {
    return {
      // tabs: ["保函数量", "保费收入", "担保金额"],
      // num: "",
    };
  },
  mounted() {
    this.getEchartData();
  },
  methods: {
    // echarts数据
    getEchartData() {
      const chart = this.$refs.chart;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          title: {
            text: "",
          },
          // legend: {
          //   data: ["保函数量", "保函金额", "保函收入"],
          // },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "2021-02",
              "2021-03",
              "2021-04",
              "2021-05",
              "2021-06",
              "2021-07",
              "2021-08",
            ],
          },
          yAxis: {
            type: "value",
            name: "保函数量（件）",
          },

          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true,
              areaStyle: {},
            },
          ],
        };
        myChart.setOption(option); //设置图表数据

        // 不断地往一个function里面塞数据，如果不删除了话，会一直追加上去，不环保并且耗内存，必须要删掉追加。所以这里用到了追加事件window.addEventListener()和删除事件window.removeEventListener()
        window.addEventListener("resize", function () {
          //图表尺寸自适应
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },

    // 切换数据
    tab(actName) {
      // this.$emit('tab',i)
      const chart = this.$refs.chart;
      const myChart = this.$echarts.init(chart);
      // this.num = actName; //通过添加类名控制选项卡样式
      if (actName == "first") {
        var option = {
          yAxis: {
            type: "value",
            name: "保函数量（件）",
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true,
              areaStyle: {},
            },
          ],
        };
        myChart.setOption(option); //更改（而非覆盖）图表数据
      } else if (actName == "second") {
        var option = {
          yAxis: {
            type: "value",
            name: "保费收入（万元）",
          },
          series: [
            {
              data: [200, 702, 501, 334, 400, 300, 220],
              type: "line",
              smooth: true,
              areaStyle: {},
            },
          ],
        };
        myChart.setOption(option); //更改（而非覆盖）图表数据
      }
    },
  },
};
</script>

<style></style>
