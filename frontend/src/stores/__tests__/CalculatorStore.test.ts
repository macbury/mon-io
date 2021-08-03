import { CalculatorStore } from '../CalculatorStore'

function build() {
  return new CalculatorStore(null)
}

describe('CalculatorStore', () => {
  describe('pushing values', () => {
    it('prints only 2', () => {
      const calculator = build()
      calculator.pushDigit(2)
      expect(calculator.value).toEqual('2')
    })

    it('prints 35', () => {
      const calculator = build()
      calculator.pushDigit(3)
      calculator.pushDigit(5)
      expect(calculator.value).toEqual('35')
    })

    it('prints 0.34', () => {
      const calculator = build()
      calculator.pushDigit(0)
      calculator.pushDigit('.')
      calculator.pushDigit(3)
      calculator.pushDigit(4)
      expect(calculator.value).toEqual('0.34')
    })

    it('prints 0.34 and ignores more numbers after coma', () => {
      const calculator = build()
      calculator.pushDigit(0)
      calculator.pushDigit('.')
      calculator.pushDigit(3)
      calculator.pushDigit(4)
      calculator.pushDigit(9)
      calculator.pushDigit(9)
      calculator.pushDigit(9)
      expect(calculator.value).toEqual('0.34')
    })

    it('handles adding zeo', () => {
      const calculator = build()
      calculator.pushDigit(0)
      calculator.pushDigit(0)
      calculator.pushDigit(0)
      calculator.pushDigit(0)
      calculator.pushDigit(1)
      calculator.pushDigit(0)
      calculator.pushDigit('.')
      calculator.pushDigit(3)
      calculator.pushDigit(0)
      expect(calculator.value).toEqual('10.30')
    })

    it('can remove items from calculation', () => {
      const calculator = build()
      calculator.pushDigit(6)
      calculator.pushDigit(4)
      calculator.pushDigit('.')
      calculator.pushDigit(9)
      calculator.pushDigit(8)
      expect(calculator.value).toEqual('64.98')
      calculator.delete()
      expect(calculator.value).toEqual('64.9')
      calculator.delete()
      expect(calculator.value).toEqual('64.')
      calculator.delete()
      expect(calculator.value).toEqual('64')
      calculator.delete()
      expect(calculator.value).toEqual('6')
      calculator.delete()
      expect(calculator.value).toEqual('0')
    })
  })

  describe('+', () => {
    it('executes 2+2', () => {
      const calculator = build()
      calculator.pushDigit(2)
      calculator.pushOperator('+')
      calculator.pushDigit(2)
      calculator.calculate()
      expect(calculator.cents).toEqual(400)
    })

    it('executes 2+2+3', () => {
      const calculator = build()
      calculator.pushDigit(2)
      calculator.pushOperator('+')
      calculator.pushDigit(2)
      calculator.pushOperator('+')
      calculator.pushDigit(3)
      calculator.calculate()
      expect(calculator.cents).toEqual(700)
    })
  })

  describe('-', () => {
    it('executes 10-5', () => {
      const calculator = build()
      calculator.pushDigit(1)
      calculator.pushDigit(0)
      calculator.pushOperator('-')
      calculator.pushDigit(5)
      calculator.calculate()
      expect(calculator.cents).toEqual(500)
    })
  })

  describe('*', () => {
    it('executes 2*4', () => {
      const calculator = build()
      calculator.pushDigit(2)
      calculator.pushOperator('*')
      calculator.pushDigit(4)
      calculator.calculate()
      expect(calculator.cents).toEqual(800)
    })
  })

  describe('/', () => {
    it('executes 9/3', () => {
      const calculator = build()
      calculator.pushDigit(9)
      calculator.pushOperator('/')
      calculator.pushDigit(3)
      calculator.calculate()
      expect(calculator.cents).toEqual(300)
    })

    it('executes 5/7', () => {
      const calculator = build()
      calculator.pushDigit(5)
      calculator.pushOperator('/')
      calculator.pushDigit(7)
      calculator.calculate()
      expect(calculator.value).toEqual('0.71')
    })
  })
})