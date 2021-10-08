import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, Button } from 'framework7-react';
import * as Realm from "realm-web";

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

import Manuscript from '../components/manuscript.jsx'
// import Brief from '../../components/brief/brief.js'

import BSON from 'bson';

const ProjectPage = ({f7route,f7router}) => {
  const app = new Realm.App({ id: "animationstudioapp-hxbnj" });
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const projectsColection = mongodb.db("AnimationStudioDB").collection("Projects");
  // const history = useHistory();
  // const projectId = history.location.pathname.split(":")[1]

  const [project, setProject] = useState()
  const [selectedIndex, setSelectedIndex] = useState(0)

  async function getProject(projectId){
    return await projectsColection.find({_id: BSON.ObjectId(projectId)})
  }

  useEffect(() => {
      console.log("route: ", f7route)
      // getProject(projectId)
      //   .then(data => {
      //     setProject(data[0])
      //   })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
  },[project])

  const Brief = (props) => {
    return(<>Brief content</>)
  }
  const Storyboard = (props) => {
    return(<>Storyboard content</>)
  }
  const Voiceover = (props) => {
    return(<>Voiceover content</>)
  }
  const Illustrations = (props) => {
    return(<>Illustrations content</>)
  }
  const Animation = (props) => {
    return(<>Animation content</>)
  }
  const Delivery = (props) => {
    return(<>Delivery content</>)
  }

  const tabs = [
    { text: 'Brief','icon':'fullscreen', index:0, completed:"true", active:"true", mIcon:CheckIcon , component: Brief, project: project},
    { text: 'Manuscript','icon':'verticalaligntop', index:1, completed:"true", active:"true", mIcon:AccessTimeIcon , component: Manuscript, project: project },
    { text: 'Storyboard','icon':'image', index:2, completed:"false", active:"false" ,mIcon:LockClockIcon , component: Storyboard, project: project },
    { text: 'Voiceover','icon':'music', index:3,  completed:"false", active:"false",mIcon:LockClockIcon ,  component: Voiceover, project: project  },
    { text: 'Illustrations','icon':'palette', index:4,  completed:"false", active:"false",mIcon:LockClockIcon ,  component: Illustrations, project: project  },
    { text: 'Animation','icon':'runner', index:5, completed:"false", active:"false",mIcon:LockClockIcon ,  component: Animation, project: project  },
    { text: 'Delivery','icon':'movetofolder', index:6,  completed:"false", active:"false", mIcon:LockClockIcon ,  component: Delivery, project: project  },
  ];

return (
  <Page>
    <Navbar title="Project Name"/>
      <Stack spacing={2} className={'content-block'}>
        {/* <ProjectHeader project={project} history={history}/>  */}
        
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
        {/* <MultiView
          // flexGrow={1}
          dataSource={tabs}
          selectedIndex={selectedIndex}
          swipeEnabled={false}
          itemComponent={tabs.filter(tab => tab.index===selectedIndex)[0].component}
          animationEnabled={true} 
        /> */}
      </Stack>

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