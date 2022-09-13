<template>
  <!--播放器-->
  <div
    class="prism-player"
    id="J_prismPlayer"
    style="margin-left: auto; margin-right: auto"
  ></div>
</template>
<script>
export default {
  props: {
    //组件需要的参数
    video: Object
  },
  data() {
    return {}
  },
  created() {
    //console.log("组件成功")
  },
  mounted() {
    this.initPlayer()
  },
  methods: {
    initPlayer() {
      //console.log(this.video)
      new Aliplayer(
        {
          id: 'J_prismPlayer',
          vid: this.video.vid, // 视频id
          playauth: this.video.playauth, // 播放凭证
          encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
          width: '800px',
          height: '450px',
          //cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
          qualitySort: 'asc', // 清晰度排序
          mediaType: 'video', // 返回音频还是视频
          autoplay: true, // 自动播放
          isLive: false, // 直播
          rePlay: false, // 循环播
          preload: true,
          controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
          useH5Prism: true // 播放器类型：html5
        },
        function (player) {
          console.log('播放器创建成功')
        }
      )
    }
  }
}
</script>
