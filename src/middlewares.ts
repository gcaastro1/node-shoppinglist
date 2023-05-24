import { NextFunction, Request, Response } from 'express'
import { lists } from './database'

export const verifyListExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = +request.params.id

  const indexList = lists.findIndex((item) => item.id === id)

  if (indexList === -1) {
    return response.status(404).json({
      message: `List with id \"${id}\" does not exist`,
    })
  }

  request.PurchaseList = {
    indexList: indexList,
  }

  return next()
}

export const verifyListItemExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const indexList: number = request.PurchaseList.indexList
  const item: string = request.params.name

  const indexItem = lists[indexList].data.findIndex((elt) => elt.name === item)

  if (indexItem === -1) {
    return response.status(404).json({
      message: `Item with name \"${item}\" does not exist`,
    })
  }

  request.PurchaseListItem = {
    indexItem: indexItem,
  }

  return next()
}

export const verifyTypeOfKeys = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const typeOfName = typeof request.body.listName
  const typeofData = typeof request.body.data

  if (typeOfName !== 'string' || typeofData !== 'object') {
    return response
      .status(400)
      .json({ message: 'The list name need to be a string' })
  }

  return next()
}

export const verifyTypeOfDataKeys = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const typeOfName = typeof request.body.name
  const typeofQty = typeof request.body.quantity

  if (
    (typeOfName !== 'undefined' && typeOfName !== 'string') ||
    (typeofQty !== 'undefined' && typeofQty !== 'string')
  ) {
    return response
      .status(400)
      .json({ message: 'The list name and quantity needs to be a string' })
  }
  return next()
}
