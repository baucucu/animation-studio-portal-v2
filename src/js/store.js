
import { createStore } from 'framework7/lite';
import {f7} from 'framework7-react';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "animationstudioapp-hxbnj" });

const store = createStore({
  state: {
    user: app.currentUser,
    loginError: null,
  },
  getters: {
    user({ state }, caller) {
      // console.log("get user: ", state.user)
      return state.user;
    },
    loginError({state}) {
      return state.loginError
    }
  },
  actions: {
    setUser({ state }, user) {
      state.user = user
      // console.log('set user: ', state.user)
    },
    login({state, dispatch},{email, password}) {
      async function loginEmailPassword(email, password) {
        f7.dialog.preloader()
        const credentials = Realm.Credentials.emailPassword(email, password);
        
        app.logIn(credentials).then(dbUser => {
          dispatch('setUser', dbUser)
          f7.dialog.close()
          f7.emit('loggedIn')
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
    logout({state, dispatch}) {
      const logOutUser = async () => {
        return await app.currentUser.logOut()
      }
      // console.log('logout dispatched: ', app)
      f7.dialog.preloader()
      logOutUser()
      .then(() => {
        // console.log("log out successful")
        dispatch('setUser', null)
        f7.dialog.close()
        f7.emit('loggedOut')
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


