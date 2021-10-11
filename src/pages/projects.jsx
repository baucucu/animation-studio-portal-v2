import React,{useState, useEffect} from 'react';
import * as Realm from "realm-web";

import { f7, Page, Navbar, List, ListItem} from 'framework7-react';
import store from '../js/store';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ProjectsPage({f7router}) {
  const app = new Realm.App({ id: "animationstudioapp-hxbnj" });
  const [projects, setProjects] = useState([])

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Page name="projects" >
      <Navbar title="Projects"/>
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


