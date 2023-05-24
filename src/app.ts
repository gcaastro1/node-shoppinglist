import express, { Application, json } from 'express'
import {
  createPurchaseList,
  deletePurschaseList,
  deletePurschaseListItem,
  readCurrentList,
  readPurschaseLists,
  updatePurchaseList,
} from './logic'
import { verifyListExists, verifyListItemExists, verifyTypeOfDataKeys, verifyTypeOfKeys } from './middlewares'

const app: Application = express()
app.use(json())

app.post('/purchaseList', verifyTypeOfKeys, createPurchaseList)
app.get('/purchaseList', readPurschaseLists)
app.get('/purchaseList/:id', verifyListExists, readCurrentList)
app.delete('/purchaseList/:id/', verifyListExists, deletePurschaseList)
app.delete(
  '/purchaseList/:id/:name',
  verifyListExists,
  verifyListItemExists,
  deletePurschaseListItem
)
app.patch('/purchaseList/:id/:name', verifyListExists, verifyListItemExists, verifyTypeOfDataKeys, updatePurchaseList)

const PORT: number = 3000
const runningMsg: string = `Server running on http://localhost${PORT}`

app.listen(PORT, () => console.log(runningMsg))
