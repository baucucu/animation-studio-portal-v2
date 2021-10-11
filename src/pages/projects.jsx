import React,{useState, useEffect} from 'react';
import * as Realm from "realm-web";

import { f7, Page, Navbar, Block, View, List, ListItem, useStore } from 'framework7-react';
import store from '../js/store';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ProjectsPage({f7router}) {
  const [projects, setProjects] = useState([])

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  const id = "animationstudioapp-hxbnj";
  const config = {
    id,
  };
  const app = new Realm.App(config);
  
  async function getProjects() {
    f7.dialog.preloader();
    const mongodb = app?.currentUser.mongoClient("mongodb-atlas");
    const projectsCollection = mongodb?.db("AnimationStudioDB").collection("Projects");
    return await projectsCollection.find()
  }

  function logout() {
    f7.dialog.preloader()
    store.dispatch('logout', app)
  }

  useEffect(() => {
    if(!store.state.user) {f7router.navigate('/login/')}
  },[store.state.user])


  useEffect(() => {
    store.state.user && getProjects().then(data => setProjects(data)).then(() => f7.dialog.close());
  } ,[store.state.user])

  useEffect(() => {
    console.log("projects changed: ", projects)
  }, [projects])

  
  
  return (
    <Page name="projects" >
      <Navbar title="Projects"/>
      {/* <BlockTitle>Projects</BlockTitle> */}
      <List inset mediaList>
        {projects.map((project, id) => 
          <ListItem key={id} onClick={(project) => {f7router.navigate({name: `project`, params:{project:project}})}}>
            <h4 slot='title'>{project.projectName} <Chip style={{marginLeft:8}} icon={<AccessTimeIcon/>} label="Ongoing" /></h4>  
            {project.products.map((product, id) => <Chip slot='footer' key={id} style={{marginLeft: 4}} avatar={<Avatar>{product.quantity}</Avatar>} label={product.name}/>)}
            <div className="members" slot='after'>
              <Chip style={{marginRight: 4}} avatar={<Avatar sx={{ bgcolor: 'primary' }}>PM</Avatar>} label={project.projectOwnerName} />
              <Chip style={{marginRight: 4}} avatar={<Avatar sx={{ bgcolor: 'primary' }} {...stringAvatar(project.clientName)} /> } label={project.clientName}/>
            </div>
          </ListItem>)}
      </List>
      
    </Page>
)};


