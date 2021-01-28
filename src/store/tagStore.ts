import createId from '@/lib/createId';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') as Tag[];
    return this.tagList;
  },
  saveTags() {
    window.localStorage.setItem('tagList', JSON.stringify(this.tagList));
  },
  createTag(name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) !== -1) {
      window.alert('标签名重复，请重新输入');
    } else {
      const id = createId().toString();
      this.tagList.push({id, name});
      this.saveTags();
    }
  }
};
tagStore.fetchTags();
export default tagStore;
