import { VictoryTheme } from 'victory-native'
import { MonioTheme } from './types'
import configureFonts from './fonts'

export const darkTheme : MonioTheme = {
  insets: null,
  mapBoxStyle: "mapbox://styles/mapbox/dark-v10",
  dark: true,
  orientation: 'landscape',
  device: 'mobile',
  roundness: 4,
  animation: {
    scale: 1.0,
  },
  fonts: configureFonts(),
  colors: {
    primary: '#ffa726',
    accent: '#ffa726',
    surface: '#121212',
    error: '#CF6679',
    text: '#fff',
    background: '#121212',
    icon: '#fff',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: 'rgba(255,255,255, 0.16)',
    placeholder: 'rgba(255,255,255, 0.56)',
    backdrop: 'rgba(0,0,0, 0.5)',
    notification: 'rgba(0,0,0, 0.5)',
    progress: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.9)',
    mapExpense: '#ed556277',
    mapExpenseBorder: '#ed556299',
    activityIndicator: 'rgba(255,255,255, 0.5)',
  },
  wideMaxWidth: '860px',
  smallMaxWidth: '480px',
  todayBackground: '#002822',
  navbarColor: '#000000',
  headerBackground: '#18181b',
  windowBackground: '#121212',
  headerItemBottomColor: '#ffa726',
  headerBorderColor: 'rgba(255, 255, 255, 0.15)',
  itemBorderColor: 'rgba(255, 255, 255, 0.1)',
  itemDarkBorderColor: 'rgba(0, 0, 0, 0.1)',
  itemSelectedBorderColor: 'rgba(255, 255, 255, 0.4)',
  calculatorAltBackground: 'rgb(30, 30, 30)',
  expenseColor: '#ed5562',
  expenseBackgroundColor: 'rgba(237, 85, 98, 0.1)',
  incomeColor: '#11a879',
  incomeBackgroundColor: 'rgba(76, 176, 80, 0.1)',
  savingColor: '#ffeb3c',
  savingBackgroundColor: 'rgba( 	255, 249, 197, 0.05)',
  budgetColor: '#fff',
  budgetProgressBorderColor: 'rgba(255, 255, 255, 0.14)',
  budgetProgressBackgroundColor: 'rgba(255, 255, 255, 0.1)',
  budgetSharedBorderColor: '#00000033',
  loanColor: '#2ca6ff',
  loanBackgroundColor: '#2ca6ff12',
  chartBrushColor: '#fff',
  chartBrushOpacity: 0.08,


  victory: {
    ...VictoryTheme.material,
    stack: {
      //domainPadding: { x: [10, 0], y: [0, 15] }
    },
    axis: {
      style: {
        axis: {
          stroke: 'rgba(255, 255, 255, 0.15)'
        },
        axisLabel: {
          padding: 8,
        },
        grid: {
          stroke: 'rgba(255, 255, 255, 0.1)',
          strokeDasharray: "5, 5"
        },

        tickLabels: {
          fill: '#ffffff',
          padding: 8,
        }
      }
    }
  }
}

export const lightTheme : MonioTheme = {
  insets: null,
  mapBoxStyle: "mapbox://styles/mapbox/light-v10",
  dark: false,
  device: 'mobile',
  orientation: 'landscape',
  roundness: 4,
  animation: {
    scale: 1.0,
  },
  fonts: configureFonts(),
  colors: {
    primary: '#ffa726',
    accent: '#ffa726',
    surface: '#fff',
    error: '#CF6679',
    text: '#555',
    background: '#ffffff',
    icon: '#555',
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: 'rgba(255,255,255, 0.26)',
    placeholder: 'rgba(0,0,0, 0.56)',
    backdrop: 'rgba(255,255,255, 0.5)',
    notification: 'rgba(0,0,0, 0.5)',
    progress: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(255, 255, 255, 0.7)',
    mapExpense: '#ed556277',
    mapExpenseBorder: '#ed556299',
    activityIndicator: 'rgba(0,0,0, 0.5)',
  },
  wideMaxWidth: '860px',
  smallMaxWidth: '480px',
  navbarColor: '#ffffff',
  todayBackground: 'rgba(76, 176, 80, 0.3)',
  headerBackground: '#ffffff',
  headerBorderColor: 'rgb(216, 216, 216)',
  windowBackground: '#ffffff',
  headerItemBottomColor: '#ffa726',
  itemBorderColor: 'rgba(0, 0, 0, 0.05)',
  itemDarkBorderColor: 'rgba(0, 0, 0, 0.1)',
  itemSelectedBorderColor: 'rgba(0, 0, 0, 0.4)',
  calculatorAltBackground: '#fff',
  expenseColor: '#ed5562',
  expenseBackgroundColor: 'rgba(237, 85, 98, 0.1)',
  incomeColor: '#11a879',
  incomeBackgroundColor: 'rgba(76, 176, 80, 0.1)',
  savingColor: '#ddcd3b',
  savingBackgroundColor: 'rgba(255, 249, 197, 0.05)',
  budgetColor: '#fff',
  budgetProgressBorderColor: 'rgba(0, 0, 0, 0.14)',
  budgetSharedBorderColor: '#ffffff53',
  budgetProgressBackgroundColor: 'rgba(0, 0, 0, 0.1)',
  loanColor: '#2ca6ffa1',
  loanBackgroundColor: '#2ca6ff12',
  chartBrushColor: '#000',
  chartBrushOpacity: 0.1,

  victory: {
    ...VictoryTheme.material,
    stack: {
      //domainPadding: { x: [10, 0], y: [0, 15] }
    },
    axis: {
      style: {
        axis: {
          stroke: 'rgba(0, 0, 0, 0.15)'
        },
        axisLabel: {
          padding: 8,
        },
        grid: {
          stroke: 'rgba(0, 0, 0, 0.1)',
          strokeDasharray: "5, 5"
        },

        tickLabels: {
          fill: '#555',
          padding: 8,
        }
      }
    }
  }
}
