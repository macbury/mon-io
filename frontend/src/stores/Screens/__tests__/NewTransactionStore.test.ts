import * as mobx from 'mobx'
import moment from 'moment-timezone'
import NewTransactionStore from '../NewTransactionStore'
import { currency } from '../../../test/factories/currency'
import { receipt as receiptBuilder } from '../../../test/factories/receipt'
import { category as categoryBuilder } from '../../../test/factories/category'
import { series as seriesBuilder } from '../../../test/factories/series'
import { Recurrence, TransactionCategoryKind } from '../../../api/graphql'

const mainCurrency = currency.build()

function build(overwrite = {}) {
  return new NewTransactionStore({
    settings: {
      mainCurrency
    },
    ...overwrite
  })
}

describe('NewTransactionStore', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
  })

  afterAll(() => {
    Date.now.mockRestore()
  });

  describe('#initializeNew', () => {
    it('for empty params it sets everything to default values', async () => {
      const store = build()

      expect(store.isNewRecord).toBe(true)

      await store.initializeNew()

      expect(store.currency).toEqual(mainCurrency)
      expect(store.recurrence).toBe(Recurrence.None)
      expect(store.selectedReceipt).toBe(null)
      expect(store.selectedCategory).toBe(null)
      expect(store.selectedLocation).toBe(null)
      expect(store.selectedReceiptFile).toBe(null)
      expect(store.series).toBe(null)
      expect(store.selectedDate).toEqual(moment())
    })

    it('set selected date from param', async () => {
      const store = build()
      const myDate = moment('2019-03-13 11:00')

      await store.initializeNew(null, null, myDate)

      expect(store.selectedDate).toEqual(myDate)
    })

    it('loads value from passed receipt', async () => {
      const receipt = receiptBuilder.build()

      const store = build({
        screens: {
          receipts: {
            find: () => receipt
          }
        }
      })

      await store.initializeNew(receipt.id)

      expect(store.selectedReceipt.id).toEqual(receipt.id)
      expect(store.selectedCategory.id).toEqual(receipt.category.id)
      expect(store.selectedLocation.id).toEqual(receipt.location.id)
    })
  })

  it('loads category from root store', async () => {
    const category = categoryBuilder.build()

    const store = build({
      categories: {
        find: () => category
      }
    })

    await store.initializeNew(null, category.id)
    expect(store.selectedCategory.id).toEqual(category.id)
  })

  it('initialize transaction from series blueprint', async () => {
    const series = seriesBuilder.build()

    const store = build()

    jest.spyOn(store as any, 'api', 'get').mockReturnValue({
      series: {
        find: () => series
      }
    })

    await store.initializeNew(null, null, null, series.id)

    const { blueprint, recurrence } = series

    expect(store.recurrence).toEqual(recurrence)
    expect(store.notes).toEqual(blueprint.notes)
    expect(store.selectedReceipt).toBeNull()
    expect(store.selectedLocation).toBeNull()
    expect(store.type).toEqual(TransactionCategoryKind.Expense)
    expect(store.calculator.value).toEqual("10")
    expect(store.selectedCategory.id).toEqual(blueprint.category.id)
    expect(store.series).toEqual(series)
  })
})