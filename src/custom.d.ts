type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}
type RecordItem = {
  notes: string
  type: string
  amount: string
  tag: string
  createdAt?: string
}
type Tag = {
  id: string,
  name: string
}
