import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './routes/App.tsx'
import { store } from './modules/store'

import 'decentraland-ui/lib/styles.css'

import 'decentraland-ui/lib/dark-theme.css'
import './styles.css'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
