<template>
  <div>
    <div id="main" style="width: 230px; height: 230px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "radarEcharts",
  data() {
    return {
      // msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.aa();
  },
  methods: {
    aa() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {},

        radar: [
          {
            indicator: [
              { text: "Look", max: 100 },
              { text: "Photo", max: 100 },
              { text: "System", max: 100 },
              { text: "Performance", max: 100 },
              { text: "Screen", max: 100 },
            ],
            radius: 80,
            center: ["50%", "60%"],
          },
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item",
            },
            areaStyle: {},
            data: [
              {
                value: [60, 73, 85, 40],
                name: "A Software",
              },
            ],
          },
        ],
      });
    },
  },
};
</script>
