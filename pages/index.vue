<template>
  <a-layout 
    :style="{ background: '#fff', border: '1px solid red' }"
  >
    <a-layout-header 
      :style="{ padding: '0', background: '#fff', border: '1px solid green' }"
    >
      <!-- TODO: Place logo -->
    </a-layout-header>
    <a-layout-content
      :style="{ margin: '0 16px', padding: '24px', background: '#fff', minHeight: '90vh', border: '1px solid yellow' }"
    >
      <div class="container">
        <a-row :style="{ border: '1px solid purple' }">
          <a-col 
            class="row" 
            :gutter="16" 
            :style="{ border: '1px solid pink' }"
          >
            <div class="box">
              <a-button @click="getData()">
                Load
              </a-button>
            </div>
          </a-col>
          <a-col
            class="row" 
            :gutter="16" 
            :style="{ border: '1px solid pink' }"
          >
            <div class="box">
              <a-button @click="writeToRealtimeDb()">
                Write
              </a-button>
            </div>
          </a-col>
        </a-row>
        <a-row :style="{ border: '1px solid purple' }">
          <a-col 
            class="row"  
            :gutter="16" 
            :style="{ border: '1px solid pink' }"
          >
            <div class="box">
              <a-button @click="getFileUrl()">
                Load
              </a-button>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Axios from 'axios'

export default {
  // asyncData () {
  //   const beachesRef = this.$fireDb.ref('beaches'); // Where 'cases' is the json object
  //   return axios.get(beachesRef.toString() + '.json')
  //     .then((res) => {
  //       return { title: res.data }
  //     })
  // },
  methods: {
    async getData() {
      const beachesRef = this.$fireDb.ref('beaches'); // Where 'cases' is the json object
      try {
          Axios.get(beachesRef.toString() + '.json')
            .then(response => {
            return response.data;
          }).catch((e) => console.error(e))
      } catch (e) {
        console.info(e.message);
      }
    },
    async writeToRealtimeDb() {
      const messageRef = this.$fireDb.ref('message')
      return await messageRef.set({
          message: 'Nuxt-Fire with Firebase Realtime Database rocks!'
        }).then(
          console.info('Success.')
        ).catch((e) => {
          console.error(e);
      })    
    },
    async getFileUrl() {
      const storageRef = this.$fireStorage.ref().child('antigos_e_antiguinhos.jpg');
      try {
        const url = await storageRef.getDownloadURL()
        console.info(`The file can be found here: ${url}`);
      } catch (e) {
        console.info(e.message);
      }
    }
  }
}

</script>

<style scoped>
.container >>> .ant-row > div {
  background: transparent;
  border: 0;
}
</style>
