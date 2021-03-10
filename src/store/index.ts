import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId';
import clone from '@/lib/clone';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,

  mutations: {

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') as Tag[];

    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state: RootState, {iconName, name}) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) !== -1) {
        window.alert('标签名重复，请重新输入');
        return;
      } else {
        state.tagList.push({iconName, name,});
        store.commit('saveTags');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, recordList: RecordItem) {
      const record2: RecordItem = clone(recordList);
      const id = createId().toString();
      state.recordList.push({id, ...record2});
      store.commit('saveRecords');
      window.alert('记账成功');
    },
    removeRecord(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].id === id) {
          console.log(id);
          index = i;

          break;
        }
      }
      if (index >= 0) {
        console.log(index);
        state.recordList.splice(index, 1);
      } else {
        window.alert('删除失败');
      }
      store.commit('saveRecords');
    },
  },
  actions: {},
  modules: {}
});
export default store;
