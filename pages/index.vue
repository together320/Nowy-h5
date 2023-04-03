<template>
  <div>
    <div class="fixed-header">
      <div class="header-container">
        <img style="width:24px" src="@/static/img/novylogo-2-min.png"/>&nbsp;&nbsp; View in Nowy app for better
        experience
      </div>
    </div>
    <div style="padding:10px">
      <div style="display: flex">
        <img class="header-img"
             referrerpolicy="no-referrer"
             src="@/static/img/default.png"
        />
        <div style="line-height: 40px; padding-left:10px;">
          username
        </div>
      </div>
    </div>
    <div>
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" referrerpolicy="no-referrer" style="width: 100%;object-fit: contain"/>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import {debounce} from "@/utils/utils";

export default {
  head: {
    title: '首页'
  },
  components: {},
  name: 'home',
  data() {
    return {
      isLoaded: false,
      images:[
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fd5822089-da2c-4cf3-869b-c585a1235084%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683036311&t=cb6f792d949468d8ba05783a964b7bfd',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa97b0262-28a1-49f0-bec7-d7c0034926a8%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683036311&t=b57d7285635118e1da6a3e58091d6e5a',
      ]
    };
  },
  computed: {},
  mounted() {
    this.isLoaded = true
  },
  methods: {},
}
</script>
<style src="./css/index.css"/>

<style scoped>
.fixed-header {
  width: 90%;
  background: #13056D;
  padding: 10px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  margin: 2px auto;
  border-radius: 10px;
  z-index: 9999;
}

.header-container {
  display: flex;
  margin: auto;
  line-height: 24px;
  justify-content: center;
}

.header-img {
  width: 40px;
  height: 40px;
  border-radius: 45px;
}
</style>
