<template>
  <div v-if="loaded" style="max-width: 414px;margin:auto;">
    <div class="fixed-header">
      <div class="header-container" @click="openApp">
        <img style="width:24px" src="@/static/img/novylogo-2-min.png"/>&nbsp;&nbsp; View in Nowy app
      </div>
    </div>
    <div style="padding:10px;">
      <div style="display: flex">
        <head-avatar head-class="avatar-head" :thumbAvatar="postDetail.poster.hasOwnProperty('avatar')?postDetail.poster.avatar.url:''"></head-avatar>
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
      <span v-for="item in convertedPlaces" style="padding-right: 2px;">
      <van-tag v-if="item" round type="success" size="large"><van-icon
        name="location"/>&nbsp;{{ item }}</van-tag>
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
      const data = await store.dispatch('getPostDetail', {
        postId
      });
      let carDetail = data.data[0]
      const pImg = data.headImg
      return {
        carDetail,
        pImg,
      };
    } catch (error) {
      // Redirect to error page or 404 depending on server response
    }
  },
  components: {HeadAvatar},
  name: 'home',
  data() {
    return {
      convertedPlaces:[]
    };
  },
  head() {
    return {
      title: this.carDetail?.poster.displayName +' on Nowy: '+ this.carDetail?.title,
      meta: [{
          hid: 'og-image',
          name: 'og:image',
          content: 'https://api.nowy.io/assets/'+this.pImg
        }]
    }
  },
  beforeCreate() {
    let postId = ''
    if (this.$route.query.hasOwnProperty('postId')) {
      postId = this.$route.query.postId
      this.$store.dispatch('getPostDetail', {postId}).then(res=>{
        window.location = `nowy://${this.postDetail.postType==='note'?'post':'trip'}/${this.$route.query.postId}`;
        setInterval(function(){
          if(confirm('You do not seem to have Nowy installed, do you want to go download it now?')){
            document.location.href = 'https://apps.apple.com/us/app/nowy-best-travel-community/id1621810481';
          }
        }, 1000);
      })
    } else {
      this.$notify({type: 'danger', message: "Can not find Post info. Please try again."});
    }
  },
  computed: {
    postDetail() {
      const pd = this.$store.getters["getPostDetail"]
      const imageInfos = pd.imageInfo
      const placeSet = new Set()
      if(pd){
        for (let key in imageInfos) {
          if (imageInfos.hasOwnProperty(key)) {
            if(imageInfos[key].hasOwnProperty("imagePlace")){
              placeSet.add(imageInfos[key].imagePlace.name)
            }
          }
        }
        this.convertedPlaces = [...placeSet]
      }
      return pd
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
      setInterval(function(){
        if(confirm('You do not seem to have Nowy installed, do you want to go download it now?')){
          document.location.href = 'https://apps.apple.com/us/app/nowy-best-travel-community/id1621810481';
        }
      }, 1000);
    }
  },
}
</script>
<style src="./css/index.css"/>

<style scoped>
.fixed-header {
  width: 100%;
  bottom:0;
  max-width: 414px;
  background: #13056D;
  opacity: 0.8;
  padding: 10px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  margin: auto;
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
