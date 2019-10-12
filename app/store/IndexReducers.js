import {combineReducers} from 'redux';
import getCount from '../router/order/redux/CountReducer';

const rootReducer = combineReducers({
  getCount,
});

export default rootReducer;
