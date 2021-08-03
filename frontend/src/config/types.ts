import { Font } from 'react-native-paper/src/types'
import { VictoryThemeDefinition } from 'victory-core'
import { EdgeInsets } from 'react-native-safe-area-context'

export type Device = 'desktop' | 'mobile'
export type Orientation = 'landscape' | 'portrait'
export type ThemeMode = 'light' | 'dark' | null | undefined

export interface MonioTheme {
  insets: EdgeInsets;
  device: Device;
  orientation: Orientation;
  dark: boolean;
  mode?: any;
  wideMaxWidth: string;
  smallMaxWidth: string;
  roundness: number;
  mapBoxStyle: string;

  fonts: {
    regular: Font;
    medium: Font;
    light: Font;
    thin: Font;
  };

  colors: {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    onSurface: string;
    onBackground: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
    icon: string;
    progress: string;
    overlay: string;
    activityIndicator: string;
    mapExpense: string;
    mapExpenseBorder: string;
  };

  animation: {
    scale: number;
  };
  navbarColor: string;
  todayBackground: string;
  headerBackground: string;
  windowBackground: string;
  headerItemBottomColor: string;
  headerBorderColor: string;
  itemBorderColor: string;
  itemDarkBorderColor: string;
  itemSelectedBorderColor: string;
  calculatorAltBackground: string;
  expenseColor: string;
  expenseBackgroundColor: string;
  incomeColor: string;
  incomeBackgroundColor: string;
  savingColor: string;
  savingBackgroundColor: string;
  budgetColor: string;
  budgetProgressBorderColor: string;
  budgetSharedBorderColor: string;
  budgetProgressBackgroundColor: string;
  loanColor: string;
  loanBackgroundColor: string;
  chartBrushColor: string;
  chartBrushOpacity: number;

  victory: VictoryThemeDefinition;
}