type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}
type RecordItem = {
  notes: string
  type: string
  amount: number
  tag: string
  createdAt: string
}
type Tag = {
  id: string,
  name: string,
  iconName: string
}
type Result = {
  title: string
  total?: number
  items: RecordItem[]
}[]

