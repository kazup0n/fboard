import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app.jsx'
import store from './stores';
import { Router, Route, browserHistory , IndexRoute} from 'react-router'
import { syncHistoryWithStore} from 'react-router-redux'

import SlideView from './containers/slide_view.jsx'
import SpeakView from './containers/speak_view.jsx'
import PresentationView from './components/presentation_view.jsx'

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
        <Route path="/" component={App}>
              <IndexRoute component={PresentationView} />
              <Route path="slides" component={SlideView} />
              <Route path="voice" component={SpeakView} />
        </Route>
    </Router>
  </Provider>,
  document.getElementById('react-container')
)