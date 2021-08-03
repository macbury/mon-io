import NotificationsStore from './NotificationsStore'
import ConfirmDialogStore from './ConfirmDialogStore'
import ReceiptPickerDialogStore from './ReceiptPickerDialogStore'
import SoftwareUpdateStore from './SoftwareUpdate'
import CurrencyPickerDialogStore from './CurrencyPickerDialogStore'
import CategoryPickerDialogStore from './CategoryPickerDialogStore'
import RadioPickerDialogStore from './RadioPickerDialogStore'
import DateRangePickerDialog from './DateRangePickerStore'
import DatePickerStore from './DatePickerStore'
import ProgressDialogStore from './ProgressDialogStore'
import IconDialogStore from './IconDialogStore'
import CopyContentDialogStore from './CopyContentDialogStore'
import MenuActionStore from './MenuActionStore'
import InputDialogStore from './InputDialogStore'

export default class UI {
  public readonly notifications : NotificationsStore
  public readonly confirm : ConfirmDialogStore
  public readonly receiptPicker : ReceiptPickerDialogStore
  public readonly softwareUpdate : SoftwareUpdateStore
  public readonly currencyPicker : CurrencyPickerDialogStore
  public readonly categoryPicker : CategoryPickerDialogStore
  public readonly radioPicker : RadioPickerDialogStore
  public readonly datePicker: DatePickerStore
  public readonly rangeDatePicker: DateRangePickerDialog
  public readonly progressDialog : ProgressDialogStore
  public readonly iconDialog : IconDialogStore
  public readonly copyContent : CopyContentDialogStore
  public readonly menuAction : MenuActionStore
  public readonly inputDialog : InputDialogStore

  constructor(root) {
    this.menuAction = new MenuActionStore(root)
    this.copyContent = new CopyContentDialogStore(root)
    this.confirm = new ConfirmDialogStore(root)
    this.receiptPicker = new ReceiptPickerDialogStore(root)
    this.softwareUpdate = new SoftwareUpdateStore(root)
    this.currencyPicker = new CurrencyPickerDialogStore(root)
    this.categoryPicker = new CategoryPickerDialogStore(root)
    this.notifications = new NotificationsStore(root)
    this.radioPicker = new RadioPickerDialogStore(root)
    this.datePicker = new DatePickerStore(root)
    this.progressDialog = new ProgressDialogStore(root)
    this.iconDialog = new IconDialogStore(root)
    this.rangeDatePicker = new DateRangePickerDialog(root)
    this.inputDialog = new InputDialogStore(root)
  }
}