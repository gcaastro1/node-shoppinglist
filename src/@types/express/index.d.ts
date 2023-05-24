import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      PurchaseList: {
        indexList: number
      }
      PurchaseListItem: {
        indexItem: number
      }
    }
  }
}
