import { createStore } from 'redux';

const store = createStore(() => {
  return {
    name: 'Daniel',
    email: 'test'
  }
})

export default store;