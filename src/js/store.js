
import { createStore } from 'framework7/lite';
import {f7} from 'framework7-react';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "animationstudioapp-hxbnj" });

const store = createStore({
  state: {
    user: app.currentUser,
  },
  getters: {
    user({ state }) {
      console.log("getters user called: ", state.user)
      return state.user;
    }
  },
  actions: {
    setUser({ state }, user) {
      state.user = user
      console.log('user set: ', state.user)
    },
    logout({state},app) {
      console.log('logout dispatched: ', app)
      const logOutUser = async () => {
        return await app.currentUser.logOut()
      }
      logOutUser()
      .then(() => {
        console.log("log out successful: ")
        state.user = null
        f7.dialog.close()
      })
      .catch(error=> {
        console.log("log out error: ", error)
      })
    },
    toggleTest({ state }) {
      state.test = !state.test
      console.log('dispatch executed: ', state.test)
    },
  },
})
export default store;
