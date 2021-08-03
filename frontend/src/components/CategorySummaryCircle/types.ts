import { Moment } from 'moment-timezone'
import { CategorySummary, Category, Currency, TransactionCategoryKind } from '../../api/graphql'

interface IActions {
  onCategoryPress?(category : Category, kind: TransactionCategoryKind)
}

export interface ICategorySummaryProps extends IActions {
  categories: CategorySummary[]
  sumOfCategoriesInCents: number;
  currentDate: Moment
  mainCurrency: Currency;
  onPress();
}

export interface ICategoryChartProps {
  categories: CategorySummary[]
  sumOfCategoriesInCents: number;
  currency: Currency;
  onPress();
}

export interface ICategoryOptionProps extends IActions {
  summary : CategorySummary
  kind: TransactionCategoryKind
}
