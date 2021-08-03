import { Currency, Category } from '../../../api/graphql'

export interface IChartProps {
  months: number;
  chartData: any
  mainCurrency: Currency
  selectedCategoriesIds: any
  categories: Category[]

  selectOnly(categoryId: string)
  toggle(categoryId: string)
}