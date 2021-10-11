import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockTitle, Button, View, Views, useStore,f7 } from 'framework7-react';
import store from '../js/store';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import StepLabel from '@mui/material/StepLabel';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';

import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockClockIcon from '@mui/icons-material/LockClock';

import BSON from 'bson';

const ProjectPage = ({f7route,f7router}) => {

  // const [project, setProject] = useState(store.state.projects.filter(project => project._id.toString() === f7route.params.id)[0])

  const project = useStore('project') 

  useEffect(()=>{
    console.log("project changed: ", project)
  },[])

  const tabs = [
    { text: 'Brief','icon':'fullscreen', path: '/brief/', index:0, completed:"true", active:"true", mIcon:CheckIcon },
    { text: 'Manuscript','icon':'verticalaligntop', path: '/manuscript/', index:1, completed:"true", active:"true", mIcon:AccessTimeIcon  },
    { text: 'Storyboard','icon':'image', index:2, path: '/storyboard/', completed:"false", active:"false" ,mIcon:LockClockIcon },
    { text: 'Voiceover','icon':'music', index:3,  path: '/voiceover/', completed:"false", active:"false",mIcon:LockClockIcon  },
    { text: 'Illustrations','icon':'palette', path: '/illustrations/', index:4,  completed:"false", active:"false",mIcon:LockClockIcon   },
    { text: 'Animation','icon':'runner', path: '/animation/', index:5, completed:"false", active:"false",mIcon:LockClockIcon   },
    { text: 'Delivery','icon':'movetofolder', path: '/delivery/', index:6,  completed:"false", active:"false", mIcon:LockClockIcon   },
  ];
  
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
      console.log("project route: ", f7route.params.id)
      store.dispatch('setProject',f7route.params.id)
  },[])

return (
  <Page>
    <Navbar title="Project Name"/>
      <Block inset strong>
        <Stepper activeStep={selectedIndex} >
          {tabs.map((tab, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            // if (isStepSkipped(index)) {
              // stepProps.completed = false;
            // }
            return (
              <Step key={tab.index} className={`step-${tab.index}`} {...stepProps} >
                <StepLabel onClick={()=>{setSelectedIndex(tab.index)}} style={{cursor:'pointer'}} StepIconComponent={tab.mIcon} StepIconProps={{active:'true',completed:'true', error: 'false'}} {...labelProps}>{tab.text}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Block>
        <Views tabs>
            {tabs.map((tab,id) => <View key={id} tab url={`${tab.path}${f7route.params.id}`} tabActive={id === selectedIndex} />)}
        </Views>      
  </Page>
)};

export default ProjectPage;


function ProjectHeader(props) {

  const {project, history} = props

  return(
    <Stack sx={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
      <Box style={{display:"flex", flexDirection:"row", alignItems: "center"}}>
        <Button icon="back" onClick={history.goBack} style={{margin:8}}></Button>
        <h2 style={{fontSize:24}} className="projectName">{project.projectName}</h2>
        <Chip style={{marginLeft:8}} icon={<AccessTimeIcon/>} label="Ongoing" />
        <Chip style={{marginLeft:8}} icon={<AccessTimeIcon/>} label="Next expected delivery: 1 aug 2021 14:00" />
      </Box>
      <AvatarGroup max={4}>
        <Avatar sx={{ bgcolor: 'primary'}}>PM</Avatar>
        <Avatar sx={{ bgcolor: 'primary'}}>AR</Avatar>  
        <Avatar sx={{ bgcolor: 'primary'}}>AR</Avatar>  
        <Avatar sx={{ bgcolor: 'primary'}}>AR</Avatar>  
        <Avatar sx={{ bgcolor: 'primary'}}>AR</Avatar>  
      </AvatarGroup>
      <Box style={{display: "flex", flexGrow:0, justifyContent: "flex-end", alignItems:"center"}}>
        {project.products.map((product, id) => <Chip key={id} style={{marginLeft: 4}} avatar={<Avatar>{product.quantity}</Avatar>} label={product.name} />)}
        <Button icon="product" style={{marginLeft:8}} text="Proposal"></Button>
      </Box>
    </Stack>   
  )}