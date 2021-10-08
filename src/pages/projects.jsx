import React,{useState, useEffect} from 'react';
import * as Realm from "realm-web";

import { f7, Page, Navbar, Block, View, List, ListItem } from 'framework7-react';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ProjectsPage = ({f7router}) => {
  const [projects, setProjects] = useState([])

  function navigateToProject(projectId) {
    
  }

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
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const projectsCollection = mongodb.db("AnimationStudioDB").collection("Projects");
  
  async function getProjects() {
    return await projectsCollection.find()
  }

  useEffect(() => {
    f7.dialog.preloader();
    getProjects().then(data => setProjects(data)).then(() => f7.dialog.close());
  } ,[])

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

export default ProjectsPage;



