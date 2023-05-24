export type IListRequiredKeys = 'id' | 'listName' | 'data'
export type IDataRequiredKeys = 'name' | 'quantity'

export interface IListData {
  name: string
  quantity: string
}

export interface IList {
  id: number
  listName: string
  data: Array<IListData>
}
