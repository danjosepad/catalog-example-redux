import { createStore } from 'redux';

// Project imports

import rootReducer from './modules/rootReducer';


const store = createStore(rootReducer);

export default store;