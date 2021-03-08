import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId';
import clone from '@/lib/clone';
import router from '@/router';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,

  mutations: {
    findTag(state, id: string) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复，请重新输入');
      } else {
        const tag = state.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        store.commit('saveTags');
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
      store.commit('saveTags');
    },
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
        const id = createId().toString();
        state.tagList.push({id, iconName, name,});
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
      state.recordList.push(record2);
      store.commit('saveRecords');
      window.alert('记账成功');
    }
  },
  actions: {},
  modules: {}
});
export default store;
