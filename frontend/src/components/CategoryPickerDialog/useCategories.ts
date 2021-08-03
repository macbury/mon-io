import { useStoreData } from '../../stores'

export default function useCategories() {
  return useStoreData(({ ui: { categoryPicker }, categories }) => ({
    visible: categoryPicker.visible,
    selectedCategory: categoryPicker.selected,
    expenses: categories.expenses,
    income: categories.income,
    loans: categories.loans,
    savings: categories.savings,
    tabIndex: categoryPicker.tabIndex,
    routes: categoryPicker.routes,

    cancel: categoryPicker.cancel,
    success: categoryPicker.success,
    setTabIndex: categoryPicker.setTabIndex
  }))
}