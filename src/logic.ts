import { Request, Response } from 'express'
import { lists } from './database'
import {
  IDataRequiredKeys,
  IList,
  IListData,
  IListRequiredKeys,
} from './interfaces'

const validatePurchaseListKeys = (payload: any): IList => {
  const purchaseListkeys: Array<string> = Object.keys(payload)
  const purchaseRequiredKeys: Array<IListRequiredKeys> = [
    'listName',
    'data',
    'id',
  ]
  const containsAllRequired: boolean = purchaseRequiredKeys.every(
    (key: string) => {
      return purchaseListkeys.includes(key)
    }
  )

  if (!containsAllRequired || purchaseListkeys.length > 3) {
    const joinedListKeys: string = purchaseRequiredKeys.join(', ')
    throw new Error(`Required keys are: ${joinedListKeys}`)
  }

  payload.data.every((item: IListData) => {
    validateDataKeys(item)
  })

  return payload
}

const validateDataKeys = (payload: any): IListData => {
  const dataKeys: Array<string> = Object.keys(payload)
  const dataRequiredKeys: Array<IDataRequiredKeys> = ['name', 'quantity']

  const containsAllRequiredData: boolean = dataRequiredKeys.every(
    (key: string) => {
      return dataKeys.includes(key)
    }
  )

  if (!containsAllRequiredData || dataKeys.length > 2) {
    const joinedDataKeys: string = dataRequiredKeys.join(', ')
    throw new Error(`Required keys are: ${joinedDataKeys}`)
  }

  return payload
}

export const createPurchaseList = (
  request: Request,
  response: Response
): Response => {
  try {
    const newList: IList = {
      ...request.body,
      id: lists.length === 0 ? 1 : lists[lists.length - 1].id + 1,
    }

    const validatedPurchaseList: IList = validatePurchaseListKeys(newList)

    lists.push(newList)
    return response.status(201).json(validatedPurchaseList)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message })
    }
    return response.status(500).json({ message: error })
  }
}

export const readPurschaseLists = (
  request: Request,
  response: Response
): Response => {
  return response.status(200).json(lists)
}

export const readCurrentList = (
  request: Request,
  response: Response
): Response => {
  const indexList: number = request.PurchaseList.indexList
  return response.status(200).json(lists[indexList])
}

export const deletePurschaseList = (
  request: Request,
  response: Response
): Response => {
  const indexList: number = request.PurchaseList.indexList

  lists.splice(indexList, 1)

  return response.status(204).send()
}

export const deletePurschaseListItem = (
  request: Request,
  response: Response
): Response => {
  const indexList: number = request.PurchaseList.indexList
  const indexItem: number = request.PurchaseListItem.indexItem

  lists[indexList].data.splice(indexItem, 1)

  return response.status(204).send()
}

export const updatePurchaseList = (
  request: Request,
  response: Response
): Response => {
  try {
    const indexList: number = request.PurchaseList.indexList
    const indexItem: number = request.PurchaseListItem.indexItem

    const data = lists[indexList].data

    const updatedData: IListData = { ...data[indexItem], ...request.body }

    validateDataKeys(updatedData)

    lists[indexList].data[indexItem] = { ...data[indexItem], ...request.body }

    return response.status(200).json(lists[indexList])
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message })
    }
    return response.status(500).json({ message: error })
  }
}
