import { Category } from '../../api/graphql'

interface SharedProps {
  onSelectCategory(category : Category)
}

export interface ICategorySelectGridProps extends SharedProps {
  categories: Array<Category>
  selectedCategory?: Category
  numOfColumns?: number;
}

export interface IItemProps extends SharedProps {
  category : Category
  selected: boolean
  size: number
}