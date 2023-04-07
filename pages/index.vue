<template>
  <div v-if="loaded" style="max-width: 414px;margin:auto;">
    <div class="fixed-header">
      <div class="header-container" @click="openApp">
        <img style="width:24px" src="@/static/img/novylogo-2-min.png"/>&nbsp;&nbsp; View in Nowy app for better
        experience
      </div>
    </div>
    <div style="padding:10px;">
      <div style="display: flex">
        <head-avatar head-class="avatar-head" :thumbAvatar="postDetail.poster.avatar.url"></head-avatar>
        <div style="line-height: 40px; padding-left:10px;">
          {{ postDetail.poster.displayName }}
        </div>
      </div>
    </div>
    <div>
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in postDetail.imageUrls" :key="image">
          <img :src="image" referrerpolicy="no-referrer" style="width: 100%;object-fit: contain"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div style="padding:10px;">
      <span v-for="item in postDetail.imageInfo" style="padding-right: 2px;">
      <van-tag v-if="item&&item.imagePlace" round type="success" size="large"><van-icon
        name="location"/>&nbsp;{{ item.imagePlace.name }}</van-tag>
      </span>
    </div>
    <div style="padding:10px;" >
      <div style="font-size: 20px;padding-bottom:15px;font-weight: bold">{{ postDetail.title }}</div>
      <div style="white-space: pre-line;padding-bottom:50px">{{ postDetail.content }}</div>
    </div>
  </div>
  <div v-else>
    <div class="spinner">
      <van-loading color="#1989fa" type="spinner" size="36px"/>
    </div>
  </div>
</template>

<script>
import HeadAvatar from "@/pages/com/HeadAvatar";

export default {
  async asyncData({ query, store }) {
    const { postId } = query;
    // Validate query params

    // fetch data from API
    try {
      const carDetail = await store.dispatch('getPostDetail', {
        postId
      });
      return {
        carDetail,
      };
    } catch (error) {
      // Redirect to error page or 404 depending on server response
    }
  },
  components: {HeadAvatar},
  name: 'home',
  data() {
    return {
    };
  },
  head() {
    return {
      title: this.carDetail?.poster.displayName +'on Nowy: '+ this.carDetail?.title,
      meta: [{
          hid: 'og-image',
          name: 'og:image',
          content: this.carDetail?.imageUrls[0]
        }]
    }
  },
  beforeCreate() {
    let postId = ''
    if (this.$route.query.hasOwnProperty('postId')) {
      postId = this.$route.query.postId
      this.$store.dispatch('getPostDetail', {postId})
    } else {
      this.$notify({type: 'danger', message: "Can not find Post info. Please try again."});
    }
  },
  computed: {
    postDetail() {
      return this.$store.getters["getPostDetail"]
    },
    loaded() {
      return this.$store.getters["getLoaded"]
    }
  },
  mounted() {
  },
  methods: {
    openApp(){
      window.location = `nowy://${this.postDetail.postType==='note'?'post':'trip'}/${this.$route.query.postId}`;
      setTimeout(function() {
        window.location = 'itms-apps://itunes.apple.com/us/app/nowy-best-travel-community/id1621810481'
      }, 500);
    }
  },
}
</script>
<style src="./css/index.css"/>

<style scoped>
.fixed-header {
  width: 90%;
  bottom:0;
  max-width: 414px;
  background: linear-gradient(180deg, #252AAA 0%, #2571E1 100%);
  padding: 10px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  margin: 2px auto;
  border-radius: 10px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
}

.header-container {
  display: flex;
  margin: auto;
  line-height: 24px;
  justify-content: center;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.avatar-head {
  width: 40px;
  height: 40px;
  border-radius: 45px;
}
</style>
