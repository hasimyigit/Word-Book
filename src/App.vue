<template>
<div id="app">
<transition  name="slideContainer" mode="out-in">
    <component :is="getActiveComponent" ></component>
</transition>
</div>
</template>

<script>
import word from './store/data/words.json'
import ReminderWord from './components/ReminderWord'
import Youglish from './components/Youglish'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    ReminderWord,
    Youglish
    
  },
  computed:{
    ...mapGetters(['getActiveComponent'])
  },
  created() {
   
    this.$store.dispatch('initApp',word)
    var tag = document.createElement('script');

    tag.src = "https://youglish.com/public/emb/widget.js";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },
 
}
</script>

<style>
.slideContainer-enter-active{
animation: slide-in .7s ease-out forwards;
}

.slideContainer-leave-active{
animation: slide-out .7s ease-out forwards;
}

@keyframes slide-in {
  from{
    transform: translateX(-1000px);
    opacity: 0;
  }
  to{
      transform: translateX(0px);
      opacity: 1;
  }
}
@keyframes slide-out {
  from{
    transform: translateX(0px);
    opacity: 1;
  }
  to{
      transform: translateX(1000px);
      opacity: 0;
  }
}
</style>
