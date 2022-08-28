
import { createStore } from 'vuex'
export default createStore({
  state: {
    word:{
      english:[],
      turkish:[],
    },
    selectedWord:{},
    activeComponent:'ReminderWord'
  },
  getters:{
    
    getWords(state){
      return state.word;
    },
    getSelectedWord(state){
      return state.selectedWord;
    },
    getActiveComponent(state){
      return state.activeComponent;
    }
  
  },
  mutations: {
    setData(state,data){
      
      for (let [key, value] of Object.entries(data)) {
        state.word.english.push(key);
        state.word.turkish.push(value);
      }
    },
    setSelectedWord(state,payload){
      if(typeof payload == 'number'){
        state.selectedWord.english = state.word.english[payload-1]
        state.selectedWord.turkish = state.word.turkish[payload-1]
      }
      else{
        state.selectedWord.english = payload;
        state.selectedWord.turkish = state.word.turkish[state.word.english.indexOf(payload)]
      }
      

    },
    setActiveComponent(state,payload){
      state.activeComponent = payload;
    }
  },
  actions: {
    initApp({commit},data){
      commit('setData',data)
    }
  },
  modules: {
  }
})
