
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    user: {},
    projects: []
  },
  getters: {
    user({ state }) {
      return state.products;
    }
  },
  actions: {
    setUser({ state }, user) {
      state.user = user;
    },
    setProducts({state}, products) {
      state.products = [...products]
    }
  },
})
export default store;
