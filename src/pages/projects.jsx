import React,{useState, useEffect} from 'react';
import * as Realm from "realm-web";

import { Block, Page, Navbar, List,Link, useStore} from 'framework7-react';
import store from '../js/store';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';

import AccessTimeIcon from '@mui/icons-material/AccessTime';


export default function ProjectsPage({f7router}) {
  const projects = useStore('projects')

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  useEffect(() => {store.dispatch('getProjects',store.state.user)}, [])

  return (
    <Page name="projects" >
      <Navbar title="Projects"/>
      <List inset mediaList>
        {projects.map((project, id) => 
          <ProjectItemList 
            project={project} 
            f7router={f7router}
            key={id} 
          />
        )}
      </List>
      
    </Page>
)};
function ProjectItemList({project, f7router}) {
  return(
    <Block inset strong>
      <Stack sx={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <Stack sx={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
          <Link onClick={()=>{console.log("project id: ",project?._id.toString());store.dispatch('setProject',project?._id.toString()); f7router.navigate(`/project/${project?._id.toString()}`)}}  > <Typography sx={{flexGrow:1}} ml={1} mr={1} component="div" variant='h6' className="projectName">{project.projectName}</Typography></Link>
          <AvatarGroup max={4} >
            <Avatar  sx={{ bgcolor: 'secondary', width: 24, height: 24, fontSize:12, bgcolor: 'primary'}}>PM</Avatar>
            <Avatar sx={{ bgcolor: 'secondary', width: 24, height: 24, fontSize:12, bgcolor: 'primary'}}>PM</Avatar>
          </AvatarGroup>
        </Stack>
        <Box style={{display: "flex", flexGrow:0, justifyContent: "flex-end", alignItems:"center"}}>
          {project?.products.map((product, id) => <Chip color="secondary" variant="outlined" key={id} style={{marginLeft: 4}} avatar={<Avatar>{product.quantity}</Avatar>} label={product.name} />)}
        </Box>
      </Stack>
      <Stack mt={1} sx={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <Box style={{display:"flex", flexDirection:"row", alignItems: "center"}}>
          {/* <Typography variant='h6' className="projectName">{project.projectName}</Typography> */}
          <Chip color="secondary" variant="outlined" style={{marginLeft:8}} icon={<AccessTimeIcon/>} label="Ongoing" />
          <Chip color="secondary" variant="outlined" style={{marginLeft:8}} icon={<AccessTimeIcon/>} label="Next expected delivery: 1 aug 2021 14:00" />
        </Box>
      </Stack>   
    </Block>
    
  )
}


