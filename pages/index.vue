<template>
  <a-layout 
    :style="{ background: '#fff' }"
  >
    <a-layout-header 
      :style="{ padding: '0', background: '#fff' }"
    >
      <!-- TODO: Place logo -->
    </a-layout-header>
    <a-layout-content
      :style="{ margin: '0 16px', padding: '24px', background: '#fff', minHeight: '90vh' }"
    >
      <div class="container">
        <a-row
          v-for="(beach, index) in beaches"
          :key="index"
        >
          <a-col 
            class="row" 
            :gutter="24"
          >
            <div 
              class="box"
            >
              <p>{{ beach.beachName }}</p>
            </div>
          </a-col>
          <a-col
            class="row" 
            :gutter="24"
          >
            <div class="box">
              <img 
                :id="beach.filename"
                :alt="beach.beachName"
              >
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
  async fetch () {
    const insertImg = (filename) => {
      const storageRef = this.$fireStorage.ref();
      storageRef.child(filename).getDownloadURL().then((url) => {
        // Or inserted into an <img> element:
          var img = document.getElementById(filename);
          return img.src = url;
        }).catch((e) => {
          console.error(e);
        });
    }

    const beachesRef = this.$fireDb.ref('beaches'); 
    this.beaches = await Axios.get(beachesRef.toString() + '.json')
      .then(response => {
        const beaches = response.data[Object.keys(response.data)];
        
        beaches.forEach(beach => {
          insertImg(beach.filename);
        })
        return beaches; 
    })
      .catch((e) => console.error(e))
  },
  data () {
    return {
      beaches: []
    }
  },
  fetchOnServer: false
}

</script>

<style scoped>
.container >>> .ant-row > div {
  background: transparent;
  border: 0;
}
</style>
