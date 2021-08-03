import { action, observable, computed } from 'mobx'
import { Money, Currency } from '../api/graphql'
import { NonPersistableStore } from './SubStore'

type CharNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type CharNumberOrComa = CharNumber | '.' | ','

export type Operator = '+' | '-' | '/' | '*'

export class CalculatorStore extends NonPersistableStore {
  @observable
  public memory : Array<CharNumberOrComa> = []
  @observable
  public current : Array<CharNumberOrComa> = [0]
  @observable
  public operator : Operator
  @observable
  public subunitToUnit : number = 100

  @computed
  public get isDirty() {
    return !!this.operator
  }

  @action
  public setValue(amount : Money) {
    this.clear()
    this.setCurrency(amount.currency)
    this.setCents(amount.cents)
  }

  @action
  public setCents(cents : number) {
    this.current = (Math.abs(cents) / this.subunitToUnit).toString().split('') as Array<CharNumberOrComa>
  }

  @action
  public parseAmount(amount : string) {
    const cents = (parseFloat(amount.replace(',', '.')) || 0.0) * this.subunitToUnit
    this.setCents(cents)
  }

  @action
  public setCurrency(currency : Currency) {
    this.subunitToUnit = currency.subunitToUnit
  }

  @computed
  public get numberOfDigitsAfterComa() {
    return this.subunitToUnit.toString().length
  }

  @computed
  public get hasOperation() {
    return !!this.operator
  }

  @computed
  public get value() : string {
    const result = []

    if (this.memory.length > 0) {
      result.push(this.memory.join(''))
    }

    if (this.operator) {
      result.push(this.operator)
    }

    if (this.current.length > 0) {
      result.push(this.current.join(''))
    }
    return result.join(' ')
  }

  @computed
  public get cents() : number {
    return Math.floor(parseFloat(this.value) * this.subunitToUnit)
  }

  @action
  public pushDigit = (input : CharNumberOrComa) => {
    if (input === '.' || input === ',') {
      input = '.'
      if (!this.current.includes(input)) {
        if (this.current.length === 0) {
          this.current.push(0)
        }
        this.current.push(input)
      }
    } else {
      if (parseInt(this.current[0] as string) === 0 && !this.current.includes('.')) {
        this.current.shift() // remove first 0
      }
      this.current.push(input)
      this.roundCurrent()
    }
  }

  @action
  public pushOperator = (nextOperator : Operator) => {
    if (this.current.length > 0 && this.memory.length === 0) {
      this.operator = nextOperator
      this.saveToMemory()
    } else if (this.current.length > 0 && this.memory.length > 0) {
      this.calculate()
      this.saveToMemory()
      this.operator = nextOperator
    } else if (this.current.length === 0 && this.memory.length > 0) {
      this.operator = nextOperator
    }
  }

  @action
  public delete = () => {
    if (this.current.length > 0) {
      this.current.pop()
      if (this.current.length === 0 && !this.operator) {
        this.restoreFromMemory()
      }
      if (this.current.length === 0 && this.memory.length === 0) {
        this.current = [0]
      }
    } else if (this.operator) {
      this.operator = null
      this.restoreFromMemory()
    } else {
      this.current.push(0)
    }
  }

  @action
  public calculate = () => {
    if (!this.hasOperation) {
      return
    }

    const left = parseFloat([0, ...this.memory].join(''))
    const right = parseFloat([0, ...this.current].join(''))

    this.memory = []
    this.current = []

    let value = 0

    if (this.operator === '+') {
      value = (left + right)
    } else if (this.operator === '-') {
      value = (left - right)
    } else if (this.operator === '/') {
      value = (left / right)
    } else if (this.operator === '*') {
      value = (left * right)
    }

    this.current = value.toString().split('') as any
    this.roundCurrent()
    this.operator = null
  }

  @action
  private saveToMemory = () => {
    this.memory = this.current
    this.current = []
    if (this.memory.length === 0) {
      this.memory.push(0)
    }
  }

  @action
  private restoreFromMemory = () => {
    this.current = this.memory
    this.memory = []
  }

  @action
  private roundCurrent = () => {
    const positionOfComa = this.current.indexOf('.')
    if (positionOfComa > 0) {
      const start = positionOfComa + this.numberOfDigitsAfterComa
      this.current = this.current.slice(0, start)
    }
  }

  @action
  public async clear() {
    this.memory = []
    this.current = [0]
    this.subunitToUnit = 100
    this.operator = null
  }
}

