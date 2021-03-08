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
type dayResult = {
  title: string
  total?: number
  items: RecordItem[]
}[]
type typeResult = {
  tag: string
  total?: number
  items: RecordItem[]
}[]

