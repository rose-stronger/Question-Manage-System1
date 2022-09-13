<template>
  <div>
    <div id="main_bar" style="width: 230px; height: 230px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'barEcharts',
  data() {
    return {}
  },
  mounted() {
    this.bb()
  },
  methods: {
    bb() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main_bar'))
      // 绘制图表main_bar
      myChart.setOption({
        // title: {
        //   text: "上周试题新增",
        // },
        xAxis: [
          {
            type: 'category',
            // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Email',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              normal: {
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    '#c23531',
                    '#61a0a8',
                    '#2f4554',
                    '#d48265',
                    '#91c7ae',
                    '#749f83',
                    '#ca8622'
                    // pink,
                    // red,
                    // shyblue,
                    // yellow
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            name: 'Union Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
              normal: {
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    '#ca8622',
                    '#749f83',
                    '#c23531',

                    '#61a0a8',
                    '#2f4554',
                    '#d48265',
                    '#91c7ae'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>
