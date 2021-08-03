import ReceiptsStore from './ReceiptsStore'
import ApiExplorerStore from './ApiExplorerStore'
import UpdateReceiptStore from './UpdateReceiptStore'
import UploadReceiptsStore from './UploadReceiptsStore'
import PreviewReceiptStore from './PreviewReceiptStore'
import CreateReceiptStore from './CreateReceiptStore'
import NewTransactionStore from './NewTransactionStore'
import EditTransactionStore from './EditTransactionStore'
import SummaryStore from './SummaryStore'
import BudgetStore from './BudgetStore'
import EditCategoryBudgetStore from './EditCategoryBudgetStore'
import SeriesStore from './SeriesStore'
import TransactionsStore from './TransactionsStore'
import ChartsStore from './Charts'
import EditSeriesStore from './EditSeriesStore'
import SessionsStore from './SessionsStore'
import MapStore from './MapStore'
import EditCategoryStore from './EditCategoryStore'
import ImportsStore from './ImportsStore'
import EditImportStore from './EditImportStore'
import SidebarStore from './SidebarStore'

export default class Screens {
  public readonly receipts : ReceiptsStore
  public readonly updateReceipt : UpdateReceiptStore
  public readonly uploadReceipts : UploadReceiptsStore
  public readonly previewReceipt : PreviewReceiptStore
  public readonly createReceipt : CreateReceiptStore
  public readonly editCategory : EditCategoryStore

  public readonly newTransaction : NewTransactionStore
  public readonly editTransaction : EditTransactionStore
  public readonly transactions : TransactionsStore

  public readonly budget : BudgetStore
  public readonly editCategoryBudget : EditCategoryBudgetStore
  public readonly summary : SummaryStore

  public readonly series : SeriesStore
  public readonly editSeries : EditSeriesStore
  public readonly charts : ChartsStore

  public readonly map : MapStore
  public readonly sessions : SessionsStore
  public readonly imports : ImportsStore
  public readonly editImport : EditImportStore
  public readonly sidebar : SidebarStore
  public readonly apiExplorer : ApiExplorerStore

  constructor(root) {
    this.receipts = new ReceiptsStore(root)

    this.updateReceipt = new UpdateReceiptStore(root)
    this.uploadReceipts = new UploadReceiptsStore(root)
    this.previewReceipt = new PreviewReceiptStore(root)
    this.createReceipt = new CreateReceiptStore(root)
    this.newTransaction = new NewTransactionStore(root)
    this.editTransaction = new EditTransactionStore(root)
    this.summary = new SummaryStore(root)
    this.budget = new BudgetStore(root)
    this.editCategoryBudget = new EditCategoryBudgetStore(root)
    this.series = new SeriesStore(root)
    this.transactions = new TransactionsStore(root)
    this.charts = new ChartsStore(root)
    this.editSeries = new EditSeriesStore(root)
    this.sessions = new SessionsStore(root)
    this.map = new MapStore(root)
    this.editCategory = new EditCategoryStore(root)
    this.imports = new ImportsStore(root)
    this.editImport = new EditImportStore(root)
    this.sidebar = new SidebarStore(root)
    this.apiExplorer = new ApiExplorerStore(root)
  }

  public clear() {
    this.sidebar.clear()
    this.editCategory.clear()
    this.map.clear()
    this.receipts.clear()
    this.updateReceipt.clear()
    this.uploadReceipts.clear()
    this.previewReceipt.clear()
    this.createReceipt.clear()
    this.newTransaction.clear()
    this.editTransaction.clear()
    this.uploadReceipts.clear()
    this.summary.clear()
    this.budget.clear()
    this.editCategoryBudget.clear()
    this.series.clear()
    this.transactions.clear()
    this.charts.clear()
    this.editSeries.clear()
    this.sessions.clear()
    this.imports.clear()
    this.editImport.clear()
    this.apiExplorer.clear()
  }
}