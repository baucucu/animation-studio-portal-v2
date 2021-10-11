import React, {useState} from 'react';
import { Page, LoginScreenTitle, List, ListInput, BlockFooter, ListButton, useStore} from 'framework7-react';

import store from '../js/store';
import * as Realm from "realm-web";

export default function LoginPage({f7router}){

  const app = new Realm.App({ id: "animationstudioapp-hxbnj" });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginError,setLoginError] = useState();
  const loginError = useStore("loginError")

  return (
    <Page loginScreen>
      <LoginScreenTitle>Login</LoginScreenTitle>
      <List form>
      <ListInput
          type="text"
          name="username"
          placeholder="Your username"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
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
      <ListButton title="Sign In" onClick={() => store.dispatch("login",{email, password})} />
      {/* {loginError.value && <BlockFooter textColor="red">
          Incorrect username + password combination
      </BlockFooter>} */}
      <BlockFooter>
          Some text about login information.<br />Click "Sign In" to close Login Screen
      </BlockFooter>
      </List>
    </Page>
  )
};
