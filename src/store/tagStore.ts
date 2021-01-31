import createId from '@/lib/createId';

const tagStore = {
  tagList: [] as Tag[],
  findTag(id: string) {
    return this.tagList.filter(item => item.id === id)[0];
  },
  updateTag(id: string, name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复，请重新输入');
    } else {
      const tag = this.tagList.filter(item => item.id === id)[0];
      tag.name = name;
      this.saveTags();
    }
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
  },
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
  },
};
tagStore.fetchTags();
export default tagStore;
