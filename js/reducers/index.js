import { combineReducers } from 'redux'
import { routerReducer} from 'react-router-redux'
import slides from './slides'

const fboardApp = combineReducers({slides, routing: routerReducer})

export default fboardApp