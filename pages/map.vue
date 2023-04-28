<template>
  <div id="app"  style="max-width: 414px;margin:auto;">
    <div class="fixed-header">
      <div class="header-container" @click="openApp">
        <img style="width:24px" src="@/static/img/novylogo-2-min.png"/>&nbsp;&nbsp; View in Nowy app
      </div>
    </div>
    <div style="padding:10px;">
      <div style="display: flex" v-if="postRoute&&postRoute.poster">
        <head-avatar head-class="avatar-head" :thumbAvatar="postRoute.poster.avatar?postRoute.poster.avatar.url:''"></head-avatar>
        <div style="line-height: 40px; padding-left:10px;">
          {{ postRoute.poster.displayName }}
        </div>
      </div>
    </div>
    <div style="padding:10px;">
      <div style="font-size: 20px;padding-bottom:15px;font-weight: bold">{{ postRoute.title }}</div>
      <div style="white-space: pre-line;">{{ postRoute.content }}</div>
    </div>
    <div style="padding: 10px 0">
      <gmap-map ref="map" :center="pArray&&pArray.length>0?pArray[parseInt(pArray.length/2)].position:center" v-bind:zoom="12" style="max-width: 414px; height:300px">
        <gmap-polyline v-show="show0" v-bind:path.sync="path0" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show1" v-bind:path.sync="path1" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show2" v-bind:path.sync="path2" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show3" v-bind:path.sync="path3" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show4" v-bind:path.sync="path4" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show5" v-bind:path.sync="path5" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show6" v-bind:path.sync="path6" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show7" v-bind:path.sync="path7" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show8" v-bind:path.sync="path8" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show9" v-bind:path.sync="path9" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show10" v-bind:path.sync="path10" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show11" v-bind:path.sync="path11" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show12" v-bind:path.sync="path12" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show13" v-bind:path.sync="path13" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show14" v-bind:path.sync="path14" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show15" v-bind:path.sync="path15" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show16" v-bind:path.sync="path16" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show17" v-bind:path.sync="path17" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show18" v-bind:path.sync="path18" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show19" v-bind:path.sync="path19" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <gmap-polyline v-show="show20" v-bind:path.sync="path20" v-bind:options="{ strokeColor:'#000000'}">
        </gmap-polyline>
        <GmapMarker
          :key="index"
          v-for="(m, index) in pArray"
          :position="m.position"
          :icon="m.icon"
          :label="m.label"
          @click="center=m.position"
        />
      </gmap-map>
    </div>
    <div style="padding: 10px 10px">
      <van-icon name="clock-o" color="#000000"/>&nbsp;Total on route:<span
      style="font-weight: bold;font-size: 18px">{{
        toHoursAndMinutes(rArray.reduce((partialSum, a) => partialSum + a.durationValue, 0))
      }}</span>
    </div>
    <div>
      <div v-for="(item,index) in postRoute.tripPlans" style="padding:10px 0 5px 0">
        <div :style="item.route===''?'':'margin-left:15px;border-left: dashed '+item.color">
          <div v-if="rMap.hasOwnProperty(index)" :style="index === Object.keys(rMap).length-1&&index!==0?'margin-left:2px;margin-top:-2px;':'margin-left:-13px;margin-top:-2px;'"><van-tag size="medium" :color="rMap[index].color" type="primary">{{rMap[index].day}}</van-tag></div>
          <div v-if="item.route!==''" style="padding-top:40px;position:absolute; margin-left:-10px;"><van-tag v-if="rBmap[index]" round size="medium" :color="rBmap[index].color" type="primary">{{rBmap[index].day}}</van-tag></div>
          <div style="padding: 0 10px 0 20px;">
        <img style="object-fit: cover; width: 100%;max-height: 140px;border-radius: 15px"
             :src="postRoute.places.filter(p=>p.objectId === item.placeId)[0].photo"/>
        </div>
        <div style="padding-top:10px;padding-left: 30px;">
          <div style="font-size: 18px;font-weight: bold;padding-bottom: 5px;">
            {{ postRoute.places.filter(p => p.objectId === item.placeId)[0].name }}
          </div>
          <div style="color:grey;font-size: 16px;display: inline-flex">
            {{ postRoute.places.filter(p => p.objectId === item.placeId)[0].country }}
            <div>
              &nbsp;&nbsp;
              <van-rate
                v-model="parseFloat(postRoute.places.filter(p=>p.objectId === item.placeId)[0].rating).toFixed(1)"
                :size="16"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
              {{
                parseFloat(postRoute.places.filter(p => p.objectId === item.placeId)[0].rating ).toFixed(1)> 0 ? parseFloat(postRoute.places.filter(p => p.objectId === item.placeId)[0].rating ).toFixed(1) : 0
              }}
            </div>
          </div>
        </div>
        </div>
        <div style="padding-top:20px;display: inline-flex" v-if="rArray&&rArray.length>0">
          <div  v-if="rArray[index]" style="font-size: 18px;font-weight: bold; display: inline-flex">
            <div v-if="item.mode==='walking'"><img src="@/static/img/walking.png" width="28"/>&nbsp;&nbsp;</div>
            <div v-if="item.mode==='rail'"><img src="@/static/img/rail.png" width="28"/>&nbsp;&nbsp;</div>
            <div v-if="item.mode==='driving'"><img src="@/static/img/driving.png" width="28"/>&nbsp;&nbsp;</div>
            <div v-if="item.mode==='bus'"><img src="@/static/img/bus.png" width="28"/>&nbsp;&nbsp;</div>
            <div v-if="item.mode==='bicycling'"><img src="@/static/img/bicycling.png" width="28"/>&nbsp;&nbsp;</div>
            <div style="margin:auto">
            <span v-if="rArray[index]">{{ rArray[index] ? rArray[index].distanceText : '' }} </span>&nbsp;&nbsp;
            <van-icon v-if="rArray[index]" name="guide-o" color="#000000"/>
            {{ rArray[index] ? rArray[index].durationText : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px;"/>
  </div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";
import HeadAvatar from "@/pages/com/HeadAvatar";

export default {
  async asyncData({query, store}) {
    const {postId} = query;
    // Validate query params

    // fetch data from API
    try {
      const data = await store.dispatch('getPostRoute', {
        postId
      });
      let carDetail = data.data[0]
      const pImg = data.headImg
      return {
        carDetail,
        pImg
      };
    } catch (error) {
      // Redirect to error page or 404 depending on server response
    }
  },
  name: "map",
  components: {HeadAvatar},
  head() {
    return {
      title: this.carDetail?.title +' on Nowy',
      meta: [{
        hid: 'og-image',
        name: 'og:image',
        content: 'https://api.nowy.io/assets/'+this.pImg
      }]
    }
  },
  data() {
    return {
      center: {
        lat: 5.4169791,
        lng: 100.3371222
      },
      path: [],
      path0: [],
      path1: [],
      path2: [],
      path3: [],
      path4: [],
      path5: [],
      path6: [],
      path7: [],
      path8: [],
      path9: [],
      path10: [],
      path11: [],
      path12: [],
      path13: [],
      path14: [],
      path15: [],
      path16: [],
      path17: [],
      path18: [],
      path19: [],
      path20: [],
      realRoutes: [],
      markers: [],
      show0: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      show10: false,
      show11: false,
      show12: false,
      show13: false,
      show14: false,
      show15: false,
      show16: false,
      show17: false,
      show18: false,
      show19: false,
      show20: false,
    }
  },
  beforeMount() {
    this.$nextTick(function () {
      let postId = ''
      if (this.$route.query.hasOwnProperty('postId')) {
        postId = this.$route.query.postId
        this.$store.dispatch('getPostRoute', {postId}).then(res => {
          window.location = `nowy://${this.postRoute.postType==='plan'?'trip':'post'}/${this.$route.query.postId}`;
          setTimeout (function(){
            window.location = 'itms-apps://itunes.apple.com/us/app/nowy-best-travel-community/id1621810481'
          }, 300);
        })
      } else {
        this.$notify({type: 'danger', message: "Can not find Post info. Please try again."});
      }
    })
  },
  methods: {
    openApp() {
      window.location = `nowy://${this.postRoute.postType==='plan'?'trip':'post'}/${this.$route.query.postId}`;
      setTimeout (function(){
        window.location = 'itms-apps://itunes.apple.com/us/app/nowy-best-travel-community/id1621810481'
      }, 300);
    },
    toHoursAndMinutes(totalSeconds) {
      const totalMinutes = Math.floor(totalSeconds / 60);

      const seconds = totalSeconds % 60;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return hours + 'h '  + minutes + "mins";
    }
  },
  watch: {
    google(ng, og) {
      let results = []
      if (og === null && ng) {
        this.rArray.map(r => {
          // results.push(google.maps.geometry.encoding.decodePath(r.overview_polyline))
        })
        this.realRoutes = results
      }
    },
    rArray: {
      handler: function (val, oldVal) {
        this.rArray.map((r, idx) => {
          let dPath = ''
          try{
            dPath = google.maps.geometry.encoding.decodePath(r.overview_polyline)
          }catch(error){
            console.log(error)
            dPath = ''
          }
          if(dPath!==''){
            this['path' + idx] = dPath
            this['show' + idx] = true;
          }
        })
        let lats = this.pArray.map(p=>p.position.lat)
        let lngs = this.pArray.map(p=>p.position.lng)
        let lat_max = Math.min( ...lats ),
          lat_min = Math.max( ...lats );
        let lng_max = Math.min( ...lngs )
        let lng_min = Math.max( ...lngs )
        let center = new google.maps.LatLng(
          ((lat_max + lat_min) / 2.0),
          ((lng_max + lng_min) / 2.0)
        )
        this.$refs['map'].$mapObject.setCenter(new google.maps.LatLng(
          ((lat_max + lat_min) / 2.0),
          ((lng_max + lng_min) / 2.0)
        ));
        const bounds = new google.maps.LatLngBounds();
        this.pArray.forEach((marker) => {
          bounds.extend(new google.maps.LatLng(marker.position.lat, marker.position.lng))
        })
        this.$refs['map'].$mapObject.fitBounds(bounds)
        // this.$refs['map'].$mapObject.fitBounds(new google.maps.LatLngBounds(
        //   //bottom left
        //   new google.maps.LatLng(lat_min, lng_min),
        //   //top right
        //   new google.maps.LatLng(lat_max, lng_max)
        // ));
      },
    }
  },
  computed: {
    google: VueGoogleMaps.gmapApi,
    postRoute() {
      return this.$store.getters["getPostRoute"]
    },
    pArray() {
      return this.$store.getters["getPArray"]
    },
    rArray() {
      return this.$store.getters["getRArray"]
    },
    rMap(){
      return this.$store.getters["getRMap"]
    },
    rBmap(){
      return this.$store.getters["getRBMap"]
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

.avatar-head {
  width: 40px;
  height: 40px;
  border-radius: 45px;
}
.left-handbar{
  margin-left:15px;
}
</style>
