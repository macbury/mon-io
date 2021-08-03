import { useStoreData } from '../../stores'

export default function useEditImport() {
  return useStoreData(({ screens: { editImport } }) => ({
    notFound: editImport.isNotFound,
    currentPage: editImport.currentPage,
    numberOfPages: editImport.numberOfPages,
    currentPageRows: editImport.currentPageRows,
    header: editImport.header,
    loading: editImport.isLoading,
    fromLine: editImport.fromLine,
    toLine: editImport.toLine,
    delimiter: editImport.delimiter,
    encoding: editImport.encoding,
    category: editImport.category,
    amountColumnOption: editImport.amountColumnOption,
    dateColumnOption: editImport.dateColumnOption,
    notesColumnOption: editImport.notesColumnOption,

    save: editImport.save,
    load: editImport.load,
    clear: editImport.clear,
    setFromLine: editImport.setFromLine,
    setToLine: editImport.setToLine,
    pickDelimiter: editImport.pickDelimiter,
    pickEncoding: editImport.pickEncoding,
    pickCategory: editImport.pickCategory,
    pickAmountColumn: editImport.pickAmountColumn,
    pickNotesColumn: editImport.pickNotesColumn,
    pickDateColumn: editImport.pickDateColumn,
    setCurrentPage: editImport.setPage
  }))
}
