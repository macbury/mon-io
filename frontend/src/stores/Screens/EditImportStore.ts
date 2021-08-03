import { action, flow, observable, computed } from 'mobx'
import PapaParse from 'papaparse'
import Hashes from 'jshashes'
import currency from 'currency.js'
import { Import, Category, UpdateImportInput, ImportRow } from '../../api/graphql'
import { NonPersistableStore } from '../SubStore'
import { transactionsPath } from '../../helpers/urls'

function unpack(str) {
  var bytes = [];
  for(var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      bytes.push(char >>> 8);
      bytes.push(char & 0xFF);
  }
  return new Uint8Array(bytes);
}

const PER_PAGE = 15

const DELIMITER_OPTIONS = [
  { title: 'Auto', value: undefined },
  { title: ',', value: ',' },
  { title: ';', value: ';' },
  { title: 'Tab', value: "\t" },
]

const ENCODING_OPTIONS = [
  { title: 'UTF-8', value: 'utf-8' },
  { title: 'IBM866', value: 'ibm866' },
  { title: 'ISO-8859-2', value: 'iso-8859-2' },
  { title: 'ISO-8859-3', value: 'iso-8859-3' },
  { title: 'ISO-8859-4', value: 'iso-8859-4' },
  { title: 'ISO-8859-5', value: 'iso-8859-5' },
  { title: 'ISO-8859-6', value: 'iso-8859-6' },
  { title: 'ISO-8859-7', value: 'iso-8859-7' },
  { title: 'ISO-8859-8', value: 'iso-8859-8' },
  { title: 'windows-1250', value: 'windows-1250' },
  { title: 'windows-1251', value: 'windows-1251' },
  { title: 'windows-1252', value: 'windows-1252' },
  { title: 'windows-1253', value: 'windows-1253' },
  { title: 'windows-1254', value: 'windows-1254' },
  { title: 'windows-1255', value: 'windows-1255' },
  { title: 'windows-1256', value: 'windows-1256' },
  { title: 'windows-1257', value: 'windows-1257' },
  { title: 'windows-1258', value: 'windows-1258' },
]

export default class EditImportStore extends NonPersistableStore {
  @observable
  public id : string
  @observable
  private content : any
  @observable
  public fromLine : number = 0
  @observable
  public toLine : number = -1
  @observable
  public delimiter: string
  @observable
  public category: Category
  @observable
  public name: String
  @observable
  public encoding: string
  @observable
  public currentPage: number = 0

  @observable
  private amountColumn: number = null
  @observable
  private dateColumn: number = null
  @observable
  private notesColumn: number = null

  @computed
  public get amountColumnOption() {
    return this.header[this.amountColumn] || '-'
  }

  @computed
  public get dateColumnOption() {
    return this.header[this.dateColumn] || '-'
  }

  @computed
  public get notesColumnOption() {
    return this.header[this.notesColumn] || '-'
  }

  public destroy = flow(function * (this: EditImportStore) {
    if (yield this.ui.confirm.show('dialogs.new_import.destroy.title', 'dialogs.new_import.destroy.message')) {
      yield this.ui.progressDialog.show('pages.new_import.destroy.title')

      const success = yield this.api.imports.destroy({ id: this.id })

      if (success) {
        yield this.root.screens.imports.refresh()
        yield this.ui.notifications.showSuccess('success.import.destroyed')
      }

      yield this.ui.progressDialog.close()

      return success
    }

    return false
  }.bind(this))

  public pickAmountColumn = flow(function * (this: EditImportStore) {
    this.amountColumn = yield this.ui.radioPicker.show('Amount column', this.amountColumn, this.headerOptions)
  }.bind(this))

  public pickDateColumn = flow(function * (this: EditImportStore) {
    this.dateColumn = yield this.ui.radioPicker.show('Date column', this.dateColumn, this.headerOptions)
  }.bind(this))

  public pickNotesColumn = flow(function * (this: EditImportStore) {
    this.notesColumn = yield this.ui.radioPicker.show('Notes column', this.notesColumn, this.headerOptions)
  }.bind(this))

  public pickCategory = flow(function * (this: EditImportStore) {
    const { category } = yield this.ui.categoryPicker.pickCategory(this.category)

    if (category) {
      this.category = category
    }
  }.bind(this))

  public pickDelimiter = flow(function * (this: EditImportStore) {
    const value = yield this.ui.radioPicker.show('Delimiter', this.delimiter, DELIMITER_OPTIONS)

    if (value) {
      this.delimiter = value
    }
  }.bind(this))

  public pickEncoding = flow(function * (this: EditImportStore) {
    const value = yield this.ui.radioPicker.show('Pick encoding', this.encoding, ENCODING_OPTIONS)

    if (value) {
      yield this.ui.progressDialog.show('dialogs.new_import.update.encoding')
      this.encoding = value

      const { content } = yield this.api.imports.find(this.id, this.encoding)
      this.content = content

      yield this.ui.progressDialog.close()
    }
  }.bind(this))

  public load = flow(function * (this : EditImportStore, importId: string) {
    try {
      if (importId === this.id) {
        return
      }
      this.clear()
      this.id = importId
      this.state = 'Loading'

      const importData : Import = yield this.api.imports.find(importId)

      if (importData) {
        const {
          fromLine,
          toLine,
          name,
          category,
          encoding,
          delimiter,
          id,
          dateColumn,
          notesColumn,
          amountColumn,
          content
        } = importData

        this.id = id
        this.category = category
        this.name = name
        this.fromLine = fromLine || 0
        this.toLine = toLine || 0
        this.encoding = encoding || 'utf-8'
        this.delimiter = delimiter
        this.dateColumn = dateColumn
        this.notesColumn = notesColumn
        this.amountColumn = amountColumn
        this.content = content

        this.state = 'Ready'
      } else {
        this.state = 'NotFound'
      }
    } catch (error) {
      this.state = 'NotFound'
      yield this.ui.notifications.showError(error, () => this.load(importId))
    }
  }.bind(this))

  public save = flow(function * (this : EditImportStore) {
    yield this.ui.progressDialog.show('dialogs.new_import.importing.title')

    const input : UpdateImportInput = {
      id: this.id,
      rows: this.importRows,
      categoryId: this.category?.id,
      amountColumn: this.amountColumn,
      dateColumn: this.dateColumn,
      notesColumn: this.notesColumn,
      delimiter: this.delimiter,
      encoding: this.encoding,
      fromLine: this.fromLine,
      toLine: this.toLine
    }

    const response = yield this.api.imports.update(input)

    if (response.errors.length > 0) {
      yield this.ui.notifications.showErrors(response.errors)
    } else {
      const { transactionCount, id } : Import = response.import

      yield this.ui.notifications.show({
        message: this.i18n.t('success.import.update', { transactionCount }),
        action: {
          name: this.i18n.t('success.import.show'),
          url: transactionsPath(null, null, id)
        }
      })
    }

    yield this.ui.progressDialog.close()
  }.bind(this))

  @computed
  private get lines() {
    return this.content.split(/\r?\n/)
  }

  @computed
  private get narrowedContent() {
    return this.lines.slice(this.fromLine, this.lines.length - this.toLine).join("\n")
  }

  private castAmountValueToKind(rawAmount : string) {
    const amountFloat = currency(rawAmount).value

    if (amountFloat < 0) {
      return this.category?.kindByAmount?.negative
    } else {
      return this.category?.kindByAmount?.positive
    }
  }

  @computed
  private get importRows() : Array<ImportRow> {
    const SHA256 = new Hashes.SHA256()

    return this.rows.map((row : string[], index : number) => {
      const amount = row[this.amountColumn]
      const date = row[this.dateColumn]
      const notes = row[this.notesColumn]
      const kind = this.castAmountValueToKind(amount)
      const uuid = SHA256.hex([index, notes, date, amount].join('/'))

      const importRow : ImportRow = {
        uuid,
        amount,
        date,
        notes,
        kind
      }

      return importRow
    })
  }

  @computed
  private get csv() {
    if (this.content) {
      const { data } = PapaParse.parse(this.narrowedContent, {
        header: false,
        delimiter: this.delimiter
      })
      return data
    } else {
      return []
    }
  }

  @computed
  private get headerOptions() {
    const options =  this.header.map((column, index) => ({
      title: column,
      value: index
    }))

    return [
      { title: 'None', value: null },
      ...options
    ]
  }

  @computed
  public get rows() {
    return (this.csv.slice(1) || []).map((row, index) => ([index + 1 + this.fromLine, ...row]))
  }

  @action.bound
  public setPage(nextPage : number) {
    this.currentPage = nextPage
  }

  @computed
  public get currentPageRows() {
    const start = this.currentPage * PER_PAGE
    const end = start + PER_PAGE
    return this.rows.slice(start, end)
  }

  @computed
  public get numberOfPages() {
    return Math.ceil(this.rows.length / PER_PAGE)
  }

  @computed
  public get header() {
    return [
      'Row',
      ...(this.csv[0] || [])
    ]
  }

  @action.bound
  public setFromLine(newValue: number) {
    this.fromLine = newValue
  }

  @action.bound
  public setToLine(newValue: number) {
    this.toLine = newValue
  }

  @action.bound
  public clear() {
    this.id = null
    this.content = null
    this.state = 'Loading'
    this.category = null
    this.delimiter = null
    this.fromLine = 0
    this.toLine = 0
    this.encoding = null
    this.notesColumn = null
    this.amountColumn = null
    this.dateColumn = null
    this.currentPage = 0
  }
}