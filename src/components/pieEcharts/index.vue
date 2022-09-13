<template>
  <div>
    <div id="main_pie" style="width: 260px; height: 230px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "pieEcharts",

  mounted() {
    this.cc();
  },
  methods: {
    cc() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main_pie"));
      // 绘制图表
      myChart.setOption({
        toolbox: {
          show: true,
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [15, 70],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "前端" },
              { value: 38, name: "java" },
              { value: 32, name: "python" },
              { value: 30, name: "C++" },
              { value: 28, name: "UI" },
            ],
          },
        ],
      });
    },
  },
};
</script>
