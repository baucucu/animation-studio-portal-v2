import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, View, Views, useStore,f7 } from 'framework7-react';
import store from '../js/store';

import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MUIButton from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockClockIcon from '@mui/icons-material/LockClock';

import BSON from 'bson';

const ProjectPage = ({f7route,f7router}) => {

  const project = useStore('project') 

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
      store.dispatch('setProject',f7route.params.id)
  },[])

return (
  <Page>
    <Navbar title="Project Name"/>
      <ProjectHeader project={project} f7router={f7router} />
      <Block inset strong style={{marginTop:0, marginBottom:0}}>
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
          {tabs.map((tab,id) => <View id="view-tab" key={id} tab url={`${tab.path}${f7route.params.id}`} tabActive={id === selectedIndex} />)}
      </Views>      
  </Page>
)};

export default ProjectPage;


function ProjectHeader(props) {

  const {project, f7router} = props

  return(
    <Block inset strong>
      <Stack sx={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <Stack sx={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
          <Box>
            <IconButton onClick={() => f7router.back()}>
              <ArrowBackIcon/>
            </IconButton>
          </Box>
          <Typography sx={{flexGrow:1}} ml={1} mr={1} component="div" variant='h6' className="projectName">{project?.projectName}</Typography>
          <AvatarGroup max={4} >
            <Avatar sx={{ width: 24, height: 24, fontSize:12, bgcolor: 'primary'}}>PM</Avatar>
            <Avatar sx={{ width: 24, height: 24, fontSize:12, bgcolor: 'primary'}}>PM</Avatar>
          </AvatarGroup>
        </Stack>
        <Box style={{display: "flex", flexGrow:0, justifyContent: "flex-end", alignItems:"center"}}>
          {project?.products.map((product, id) => <Chip key={id} style={{marginLeft: 4}} avatar={<Avatar>{product.quantity}</Avatar>} label={product.name} />)}
        </Box>
      </Stack>
      <Stack mt={1} sx={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <Box style={{display:"flex", flexDirection:"row", alignItems: "center"}}>
          {/* <Typography variant='h6' className="projectName">{project.projectName}</Typography> */}
          <Chip style={{marginLeft:8}} icon={<AccessTimeIcon/>} label="Ongoing" />
          <Chip style={{marginLeft:8}} icon={<AccessTimeIcon/>} label="Next expected delivery: 1 aug 2021 14:00" />
        </Box>
        <Box>
          <MUIButton size="small" variant="outlined" color="primary" startIcon={<WorkOutlineIcon />}>
            Proposal
          </MUIButton>
        </Box>
      </Stack>   
    </Block>
  )}