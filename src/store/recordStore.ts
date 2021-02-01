import clone from '@/lib/clone';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  },
  createRecord(recordList: RecordItem) {
    const record2: RecordItem = clone(recordList);
    record2.createdAt = new Date().toISOString();
    this.recordList.push(record2);
    this.saveRecords();
  }
};
recordStore.fetchRecords();
export default recordStore;
