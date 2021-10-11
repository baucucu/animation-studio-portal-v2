import React, {useEffect, useState} from 'react';
import { Page,LoginScreen, LoginScreenTitle, List, ListInput, BlockFooter, ListButton,f7} from 'framework7-react';

import store from '../js/store';
import * as Realm from "realm-web";

export default function LoginPage({f7router}){

  const app = new Realm.App({ id: "animationstudioapp-hxbnj" });
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError,setLoginError] = useState();


  function loginEmailPassword(email, password) {
    f7.dialog.preloader()
    const credentials = Realm.Credentials.emailPassword(email, password);
    
    app.logIn(credentials).then(dbUser => {
      store.dispatch('setUser', dbUser)
      f7router.navigate('/')
      f7.dialog.close()
    })
    .catch((err) => {
      console.error("Failed to log in", err);
      setLoginError(err)
      f7.dialog.close()
    })
  }

  return (
    <Page loginScreen>
      <LoginScreenTitle>Login</LoginScreenTitle>
      <List form>
      <ListInput
          type="text"
          name="username"
          placeholder="Your username"
          value={username}
          onInput={(e) => setUsername(e.target.value)}
      ></ListInput>
      <ListInput
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
      ></ListInput>
      </List>
      <List>
      <ListButton title="Sign In" onClick={() => {loginEmailPassword(username, password)}} />
      {loginError && <BlockFooter textColor="red">
          Incorrect username + password combination
      </BlockFooter>}
      <BlockFooter>
          Some text about login information.<br />Click "Sign In" to close Login Screen
      </BlockFooter>
      </List>
    </Page>
  )
};
