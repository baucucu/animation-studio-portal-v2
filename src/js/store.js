
import { createStore } from 'framework7/lite';
import {f7} from 'framework7-react';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "animationstudioapp-hxbnj" });

const store = createStore({
  state: {
    user: app.currentUser,
    projects: [],
    project: null
  },
  getters: {
    project({state}) {
      return state.project
    },
    projects({state}) {
      return state.projects
    },
    user({ state }) {
      return state.user;
    }
  },
  actions: {
    getProjects({state}, user){
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const projectsCollection = mongodb.db("AnimationStudioDB").collection("Projects");
      projectsCollection.find()
      .then(projects=> state.projects = [...projects])
    },
    setProject({state}, id){
      const project = state.projects.filter(project => project._id.toString() === id)[0]
      state.project= project
    },
    setUser({ state }, user) {
      state.user = user
    },
    login({state, dispatch},{email, password}) {
      async function loginEmailPassword(email, password) {
        f7.dialog.preloader()
        const credentials = Realm.Credentials.emailPassword(email, password);
        
        app.logIn(credentials).then(dbUser => {
          dispatch('setUser', dbUser)
          dispatch('getProjects', dbUser)
          f7.dialog.close()
          f7.emit('loggedIn')
        })
        .catch((err) => {
          console.error("Failed to log in", err);
          f7.emit('loginError', err)
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
      // console.log('dispatch executed: ', state.test)
    },
  },
})
export default store;


