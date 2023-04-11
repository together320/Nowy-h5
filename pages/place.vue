<template>
  <div v-if="loaded" class="container">
    <div class="fixed-header">
      <div class="header-container" @click="openApp">
        <img style="width:24px" src="@/static/img/novylogo-2-min.png"/>&nbsp;&nbsp; View in Nowy app for better
        experience
      </div>
    </div>
    <div v-if="placeDetail.photo_url">
      <van-swipe :autoplay="5000" lazy-render>
        <van-swipe-item v-for="image in placeDetail.photo_url" :key="image">
          <img :src="image" referrerpolicy="no-referrer" class="p-img"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-else>
      <van-swipe :autoplay="5000" lazy-render>
        <van-swipe-item v-for="image in defaultImgs" :key="image">
          <img :src="image" referrerpolicy="no-referrer" style="width: 62vh;object-fit: contain"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div style="padding:10px 23px 60px;position: fixed;bottom:90px; color:#FFFFFF;max-width: 414px;">
      <div style="display: flex">
        <div style="line-height: 40px; font-weight: bold;font-size: 24px;">
          {{ placeDetail.name }}
        </div>
      </div>
      <div>
        <div style="display: flex">
          <div style="line-height: 30px; font-size: 18px;">
            <van-icon name="location"/>&nbsp;{{ placeDetail.formattedAddress }}
          </div>
        </div>
        <div style="padding-top:10px">
          <span v-for="item in Object.values(placeDetail.about)" style="padding-right: 5px;line-height: 2">
      <van-tag v-if="item" round type="success" size="large"><van-icon
        name="location"/>&nbsp;{{ Object.keys(item)[0] }}</van-tag>
      </span>
        </div>
      </div>
    </div>
    <div
      style="border-radius: 45px;border: 1px solid #FFFFFF;background-color: #FFFFFF;width: 100%;position: fixed;bottom:-40px;max-width:414px;height:180px">
      <div style="padding:10px 25px 60px">
      <div style="padding-top:10px;">
        <span style="font-weight: bold;font-size: 18px">Rating : </span>
        <van-rate
          v-model="placeDetail.rating"
          :size="20"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
        {{ placeDetail.rating }}
      </div>
      <div style="padding-top:10px">
        <span style="font-weight: bold;font-size: 18px">Contact : </span>
        <span><a :href="'tel:'+placeDetail.phone">{{ placeDetail.phone }}</a></span>
      </div>
      </div>
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
  async asyncData({query, store}) {
    const {placeId} = query;
    // Validate query params

    // fetch data from API
    try {
      const carDetail = await store.dispatch('getPlaceDetail', {
        placeId
      });
      return {
        carDetail,
      };
    } catch (error) {
      // Redirect to error page or 404 depending on server response
    }
  },
  components: {HeadAvatar},
  name: 'place',
  data() {
    return {
      convertedPlaces: [],
      defaultImgs: ['https://api.nowy.io/assets/noplace.png']
    };
  },
  head() {
    return {
      title: this.carDetail?.name,
      meta: [{
        hid: 'og-image',
        name: 'og:image',
        content: this.carDetail?.photo_url[0]
      }]
    }
  },
  beforeCreate() {
    let placeId = ''
    if (this.$route.query.hasOwnProperty('placeId')) {
      placeId = this.$route.query.placeId
      this.$store.dispatch('getPlaceDetail', {placeId}).then(res => {
        window.location = `nowy://place/${this.$route.query.placeId}`;
      })
    } else {
      this.$notify({type: 'danger', message: "Can not find Post info. Please try again."});
    }
  },
  computed: {
    placeDetail() {
      return this.$store.getters["getPlaceDetail"]
    },
    loaded() {
      return this.$store.getters["getLoaded"]
    }
  },
  mounted() {
  },
  methods: {
    openApp() {
      window.location = `nowy://place/${this.$route.query.placeId}`;
      // setTimeout(function() {
      //   window.location = 'itms-apps://itunes.apple.com/us/app/nowy-best-travel-community/id1621810481'
      // }, 500);
    }
  },
}
</script>
<style src="./css/index.css"/>

<style scoped>
.fixed-header {
  width: 90%;
  bottom: 0;
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

.container {
  max-width: 414px;
  margin: auto;
  height: 100vh;
  overflow: hidden;
}

.p-img{
  height:100vh;object-fit: none;width:100vh;
}
</style>
