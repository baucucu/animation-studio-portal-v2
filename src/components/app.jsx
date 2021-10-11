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
  useStore
} from 'framework7-react';

import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  const user = store.getters.user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selected, setSelected] = useState('projects');
  const [loginScreenOpened,setLoginScreenOpened] = useState(!user.value)

  // Framework7 Parameters
  const f7params = {
    name: 'AnimationStudio Portal', // App name
      theme: 'aurora', // Automatic theme detection

      // App store
      store: store,
      // App routes
      routes: routes,
  };

  useEffect(() => {
    f7.views.main.router.navigate(`/${selected}/`)
  },[selected])

  useEffect(() => {
    f7.on('loggedIn', () => setLoginScreenOpened(false)) 
    f7.on('loggedOut', () => setLoginScreenOpened(true)) 
  })

  f7ready(() => {
    f7.on
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
                        onClick={() => {store.dispatch('logout')}}
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
      <Panel right reveal>
        <View>
          <Page>
            <Navbar title="Right Panel"/>
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas view-main"/>

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

      <LoginScreen id="my-login-screen" opened={loginScreenOpened}>
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="email"
                placeholder="Your email"
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
              <ListButton title="Sign In" onClick={() => {store.dispatch('login',{email,password})}} />
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



