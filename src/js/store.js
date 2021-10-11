
import { createStore } from 'framework7/lite';
import {f7} from 'framework7-react';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "animationstudioapp-hxbnj" });

const store = createStore({
  state: {
    user: app.currentUser,
    loginError: null
  },
  getters: {
    user({ state }) {
      console.log("getters user called: ", state.user)
      return state.user;
    },
    loginError({state}) {
      return state.loginError
    }
  },
  actions: {
    setUser({ state }, user) {
      state.user = user
      console.log('user set: ', state.user)
    },
    login({state},{email, password}) {
      async function loginEmailPassword(email, password) {
        f7.dialog.preloader()
        const credentials = Realm.Credentials.emailPassword(email, password);
        
        app.logIn(credentials).then(dbUser => {
          store.dispatch('setUser', dbUser)
          f7.loginScreen.close()
          f7.dialog.close()
        })
        .catch((err) => {
          console.error("Failed to log in", err);
          state.loginError = err
          f7.dialog.close()
        })
      }
      loginEmailPassword(email,password)
      .then(user => state.user = user)
    },
    logout({state}) {
      f7.dialog.preloader()
      console.log('logout dispatched: ', app)
      const logOutUser = async () => {
        return await app.currentUser.logOut()
      }
      logOutUser()
      .then(() => {
        console.log("log out successful: ")
        state.user = null
        f7.dialog.close()
        f7.loginScreen.open()
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


