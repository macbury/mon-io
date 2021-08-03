global['__DEV__'] = false

import App from './App'

if (process.env.NODE_ENV === 'development' && !localStorage['debug']) {
  localStorage['debug'] = '@monio/*'
}

export default App