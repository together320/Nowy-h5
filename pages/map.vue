<template>
  <div id="app" style="max-width: 414px;">
    <div class="fixed-header">
      <div class="header-container" @click="openApp">
        <img style="width:24px" src="@/static/img/novylogo-2-min.png"/>&nbsp;&nbsp; View in Nowy app
      </div>
    </div>
    <div style="padding:10px;">
      <div style="font-size: 20px;padding-bottom:15px;font-weight: bold">{{ postRoute.title }}</div>
      <div style="white-space: pre-line;">{{ postRoute.content }}</div>
    </div>
    <div style="padding: 10px">
      <gmap-map v-bind:center="center" v-bind:zoom="12" style="max-width: 414px; height:300px">
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
    <div>
      <div v-for="(item,index) in postRoute.tripPlans" style="padding:10px 10px 5px 10px">
        <img style="object-fit: contain;width: 100%"  :src="postRoute.places.filter(p=>p.objectId === item.placeId)[0].photo"/>
        <div style="padding-top:10px;">
          <div style="font-size: 18px;font-weight: bold;padding-bottom: 5px;">{{postRoute.places.filter(p=>p.objectId === item.placeId)[0].name}}</div>
          <div style="color:grey;font-size: 16px;display: inline-flex">
            {{postRoute.places.filter(p=>p.objectId === item.placeId)[0].country}}
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <van-rate
                v-model="parseFloat(postRoute.places.filter(p=>p.objectId === item.placeId)[0].rating).toFixed(1)"
                :size="16"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
              {{ postRoute.places.filter(p=>p.objectId === item.placeId)[0].rating>0?postRoute.places.filter(p=>p.objectId === item.placeId)[0].rating:0 }}
            </div>
          </div>
        </div>
        <div style="padding-top:30px;display: inline-flex" v-if="rArray&&rArray.length>0">
          <div style="font-size: 18px;font-weight: bold;">{{rArray[index]?rArray[index].distanceText:''}}</div>
          <div><van-icon name="guide-o" color="#FFF"/>{{rArray[index]?rArray[index].durationText:''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";

export default {
  name: "map",
  data() {
    return {
      // center: {lat: 55.915655, lng: -4.744502},
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
          window.location = `nowy://${this.postRoute.postType === 'note' ? 'post' : 'trip'}/${this.$route.query.postId}`;
        })
      } else {
        this.$notify({type: 'danger', message: "Can not find Post info. Please try again."});
      }
    })
  },
  methods: {
    openApp(){
      window.location = `nowy://${this.postDetail.postType==='note'?'post':'trip'}/${this.$route.query.postId}`;
    }
  },
  watch: {
    google(ng, og) {
      let results = []
      if (og === null && ng) {
        this.rArray.map(r => {
          results.push(google.maps.geometry.encoding.decodePath(r.overview_polyline))
        })
        this.realRoutes = results
      }
    },
    rArray: {
      handler: function (val, oldVal) {
        this.rArray.map((r, idx) => {
          this['path' + idx] = google.maps.geometry.encoding.decodePath(r.overview_polyline)
          this['show' + idx] = true;
        })
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
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
