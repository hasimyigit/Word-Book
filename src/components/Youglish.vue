
<template>
<div style="    display: flex;
    justify-content: center;     height: 100vh;
    align-items: center;">
  <div id="widget-1" @click="onYouglishAPIReady"></div>
  <i @click="againRandom" class="fas fa-arrow-circle-left" style="position: absolute;top: 25px; font-size:30px"></i>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      views: 0,
      curTrack: 0,
      totalTracks: 0,
      widget: null,
      
    };
  },

  computed: {
   ...mapGetters(['getSelectedWord'])
  },

  mounted() {
    
   this.onYouglishAPIReady(this.getSelectedWord.english);
  },

  methods: {
    againRandom(){
      this.$store.commit('setActiveComponent','ReminderWord');
    },
    onYouglishAPIReady(word) {
    
      this.widget = new YG.Widget("widget-1", {
        width: 500,
        components: 9, //search box & caption
        events: {
          onFetchDone: this.onFetchDone,
          onVideoChange: this.onVideoChange,
          onCaptionConsumed: this.onCaptionConsumed,
        },
      });
      
      this.widget.fetch(word, "english", "us");
    },

   
    onFetchDone(event) {
      if (event.totalResult === 0) alert("No result found");
      else this.totalTracks = event.totalResult;
    },

   
    onVideoChange(event) {
      this.curTrack = event.trackNumber;
      this.views = 0;
    },

  
    onCaptionConsumed(event) {
      if (++this.views < 3) this.widget.replay();
      else if (this.curTrack < this.totalTracks) this.widget.next();
    },
  },
};
</script>
<style lang="scss">
#widget-1 {
  width: 500px;
}
</style>