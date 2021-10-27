import React, { useState, useEffect } from 'react';


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
  Button,
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
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState()
  const [selected, setSelected] = useState('projects');
  const [loginScreenOpened,setLoginScreenOpened] = useState(!store.getters.user.value)
  const [userName,setUserName] = useState()
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
    f7.on('loggedIn', () => {setLoginScreenOpened(false); setLoginError()}) 
    f7.on('loggedOut', () => setLoginScreenOpened(true)) 
    f7.on('loginError', (err) => {console.log("login error: ", err.error);setLoginError(err.error)})
    setUserName(f7.store.state.user.customData.name)
  })

  f7ready(() => {
    
  });

  return (
    <App { ...f7params } >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      {/* Left panel with cover effect*/}
      <Panel left visibleBreakpoint={0} >
        <View>
          <Page>
            <Navbar title="Animation Studio"/>
            <div style={{display:'flex',flexDirection:'column',height:'100%', padding:0}}>
              <List inset menuList style={{flexGrow:1}}>
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

              <List inset menuList style={{alignItems: 'flex-end'}}>
                <ListItem
                  link
                  title= {userName}
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
            </div>
          </Page>
        </View>
      </Panel>

      {/* Right panel with reveal effect*/}
      <Panel resizable right cover  style={{minWidth: '33%'}}>
        <View>
          <Page>
            <Navbar title="Right Panel"/>
            <Block>
            </Block>  
          </Page>
        </View>
      </Panel>

      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas view-main"/>

      {/* Popup */}
      <Popup id="my-popup" >
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
                {loginError && String(loginError)}
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  )
}
export default MyApp;



