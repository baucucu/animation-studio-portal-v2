import React, { useState, useEffect } from 'react';
import * as Realm from "realm-web";

import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Icon,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  // Login screen demo data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState()
  const [selected, setSelected] = useState('projects');

  // Framework7 Parameters
  const f7params = {
    name: 'AnimationStudio Portal', // App name
      theme: 'aurora', // Automatic theme detection

      // App store
      store: store,
      // App routes
      routes: routes,
  };
  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }

  const id = "animationstudioapp-hxbnj";
  const config = {
    id,
  };
  const app = new Realm.App(config);

  async function loginEmailPassword(email, password) {
    // Create an anonymous credential
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      // assert(user.id === app.currentUser.id)
      return user
    } catch(err) {
      console.error("Failed to log in", err);
    }
  }

  useEffect(() => {
    console.log("selected changed: ", selected);
    console.log("f7: ",f7)
    f7.views.main.router.navigate(`/${selected}/`)
  },[selected])

  useEffect(() => {
    if(app.currentUser) {
      setUser(app.currentUser)
    }
  },[])

  f7ready(() => {

    // Call F7 APIs here
  });

  return (
    <App { ...f7params } >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      {/* Left panel with cover effect*/}
      <Panel left visibleBreakpoint={0} opened>
        <View>
          <Page>
            <Navbar title="Animation Studio"/>
            <div style={{display: 'flex', flexDirection:'column', height: '100%'}}>
              <div style={{display: 'flex', flexDirection:'column', justifyContent: 'start'}}>
                <Block style={{marginTop:0}}>
                  <List menuList>
                    <ListItem
                      link
                      title="Projects"
                      selected={selected === 'projects'}
                      onClick={() => setSelected('projects')}
                    >
                      <Icon aurora="f7:folder" slot="media" />
                    </ListItem>
                    <ListItem
                      link
                      title="Tasks"
                      selected={selected === 'tasks'}
                      onClick={() => setSelected('tasks')}
                    >
                      <Icon aurora="f7:hammer" slot="media" />
                    </ListItem>
                    <ListItem
                      link
                      title="People"
                      selected={selected === 'people'}
                      onClick={() => setSelected('people')}
                    >
                      <Icon aurora="f7:person_2" slot="media" />
                    </ListItem>
                    <ListItem
                      link
                      title="Clients"
                      selected={selected === 'clients'}
                      onClick={() => setSelected('clients')}
                    >
                      <Icon aurora="f7:building" slot="media" />
                    </ListItem>
                  </List>
                </Block>
              </div>
              <div style={{display: 'flex', flexDirection:'column', justifyContent: 'end', flexGrow:1}}>
                <Block style={{marginBottom:0}}>
                    <List menuList>
                      <ListItem
                        link
                        title="Profile"
                        selected={selected === 'profile'}
                        onClick={() => setSelected('profile')}
                      >
                        <Icon aurora="f7:person" slot="media" />
                      </ListItem>
                      <ListItem
                        link
                        title="Log out"
                        onClick={() => app.currentUser.logOut().then(() => setUser(app.currentUser))}
                      >
                        <Icon aurora="f7:arrow_right_to_line" slot="media" />
                      </ListItem>
                    </List>  
                </Block>    
              </div>
            </div>
          </Page>
        </View>
      </Panel>

      {/* Right panel with reveal effect*/}
      <Panel right cover opened>
        <View>
          <Page>
            <Navbar title="Right Panel"/>
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>


      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas view-main" url="/projects/" />

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      <LoginScreen id="my-login-screen" opened={!user}>
        <View>
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
              <ListButton title="Sign In" onClick={() => {loginEmailPassword(username,password).then(data => setUser(data))}} />
              <BlockFooter>
                Some text about login information.<br />Click "Sign In" to close Login Screen
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  )
}
export default MyApp;



