import React, {useState, useEffect} from 'react';
import { Page, Icon, Chip,ListItem, Block, BlockTitle, ListButton,Popover, List, Link, Segmented, Button,f7, useStore } from 'framework7-react';

import MUIChip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MUIButton from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import ManuscriptScenes from '../components/manuscript-scenes'

const ManuscriptPage = () => {
  const user = useStore('user')
  const project = useStore('project')
  const [versionIndex, setVersionIndex] = useState(project?.manuscript.versions[project.manuscript.versions.length - 1].id)

  const mongodb = user?.mongoClient("mongodb-atlas");
  const projectsCollection = mongodb?.db("AnimationStudioDB")?.collection("Projects");

  useEffect(() => {
    const languageTooltip = f7.tooltip.create({
      targetEl: '#language',
      text: 'Language',
    });
    const scenesTooltip = f7.tooltip.create({
      targetEl: '#scenes',
      text: 'Scenes',
    });
    const wordCountToolip = f7.tooltip.create({
      targetEl: '#wordCount',
      text: 'Word count',
    });
    const targetLength = f7.tooltip.create({
      targetEl: '#targetLength',
      text: 'Target video length',
    });
  },[])
  
  useEffect(() => {
    setVersionIndex(project.manuscript.versions.length)
  },[project])
  
  function sendForReview() {
    projectsCollection.updateOne({_id:(project._id)},{
      $set:{"manuscript.status":"review"}
    })
  }
  
  function extendTime() {}
  
  function approveManuscript() {
    projectsCollection.updateOne({_id:(project._id)},{
      $set:{"manuscript.status":"approved", "manuscript.completed":true, "storyboard": {completed:false}}
    })
  }
  
  function askForRevision() {
    let newManuscript = project.manuscript    
    newManuscript.status = "open"
    
    const lastVersionNumber = newManuscript.versions.length
    console.log("lastVersionNumber: ",lastVersionNumber)
    
    const newVersion = {
      id:lastVersionNumber+1,
      scenes: project.manuscript.versions[lastVersionNumber-1].scenes
    }
    console.log('setting up a new version: ', newVersion)

    newManuscript.versions = [...project.manuscript.versions, newVersion]
    console.log("new manuscript object: ", newManuscript)
    
    projectsCollection.updateOne({_id:(project._id)},{
      $set:{
        "manuscript": newManuscript
      },
    })
  }


  if(project?.manuscript?.completed === undefined) return <ManuscriptClosed/>
  
  else return (
  <Page className="viewPage">
    <Stack direction="row" justifyContent="stretch">
      {/* {user !== null && user?.customData?.role === "freelancer" && <FreelancerManuscriptControlPanel project={project} sendForReview={sendForReview} extendTime={extendTime}  versionIndex={versionIndex}  setVersionIndex={setVersionIndex}/>} */}
      {/* {user !== null && user?.customData?.role === "client" && <ClientManuscriptControlPanel project={project} approveManuscript={approveManuscript} askForRevision={askForRevision}  versionIndex={versionIndex}  setVersionIndex={setVersionIndex}/>} */}
      <ManuscriptMetadata project={project}  versionIndex={versionIndex} setVersionIndex={setVersionIndex} user={user} approveManuscript={approveManuscript} askForRevision={askForRevision} sendForReview={sendForReview} extendTime={extendTime}/>
    </Stack>
    <Block inset >
      <ManuscriptScenes versionIndex={versionIndex}/>
    </Block>
  </Page>
)};

export default ManuscriptPage;


function ManuscriptClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Manuscript is closed</BlockTitle>
      </Block>
    </Page>
  )
}

function VersionSelect({versions, versionIndex, setVersionIndex}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("click: ",event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // console.log("anchorEl: ",anchorEl)
    console.log("open: ",open)
  },[anchorEl])

  return (
    <Box >
      <Link popoverOpen=".popover-menu">
        <MUIButton
          variant="outlined"
          color="secondary"
          size="small"
          endIcon={<ArrowDropDownIcon/>}
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {versions.length === versionIndex ?  "v ".concat(versionIndex," (current)"): String("v "+versionIndex)}
        </MUIButton>
      </Link>
      <Popover className="popover-menu">
        <List menuList>
          {versions.map((version, id) => <ListItem link key={id} onClick={() => {console.log("new version selected: ", version); setVersionIndex(version)}}  popoverClose title={versions.length === version ?  String("Version "+version+" (current)"): String("Version "+version)}></ListItem>)}
        </List>
      </Popover>
    </Box>
  );
}

function ManuscriptOptionsButton() {

  return(
      <Box>
          <Button popoverOpen="#manuscriptOptions" onClick={()=>{console.log("manuscript options button clicked")}}>
              <MoreVertIcon/>
          </Button>
          <Popover id="manuscriptOptions" closeByOutsideClick className="more-popover-menu">
              <List menuList>
                <ListItem
                  link
                  title="Listen to AI Voiceover"
                  // selected={selected === 'projects'}
                  onClick={() => {}}
                >
                  <Icon aurora="f7:speaker_zzz_fill" slot="media" />
                </ListItem>
                <ListItem
                  link
                  title="Preview"
                  // selected={selected === 'projects'}
                  onClick={() => {}}
                >
                  <Icon aurora="f7:eye_fill" slot="media" />
                </ListItem>
                <ListItem
                  link
                  title="Download PDF"
                  // selected={selected === 'projects'}
                  onClick={() => {}}
                >
                  <Icon aurora="f7:arrow_down_to_line" slot="media" />
                </ListItem>     
              </List>
          </Popover>
      </Box>
  )
}

function ManuscriptMetadata (props){
  const {project, versionIndex, setVersionIndex, sendForReview,extendTime,approveManuscript,askForRevision,user} = props

  function wordCount(str) { 
    return str.split(" ").filter((word) => { if (word !== '') return word }).length;
  }
  
  return(
    <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" sx={{justifyContent:"space-between"}}>
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={0.2} sx={{alignItems:'center'}}>
              {/* <Typography  variant="body2" color="text.secondary" component="div">Language</Typography> */}
              <MUIChip id="language" icon={<LanguageIcon/>} color="secondary"  variant="outlined" label={project?.manuscript.language} ></MUIChip>
            </Stack>
            <Stack direction="row" spacing={0.2} sx={{alignItems:'center'}}>
              {/* <Typography  variant="body2" color="text.secondary" component="div">Scenes</Typography> */}
              <MUIChip id="scenes" icon={<MovieIcon/>}color="secondary" variant="outlined" label={project.manuscript.versions[versionIndex-1]?.scenes.length} ></MUIChip>
            </Stack>
            <Stack direction="row" spacing={0.2} sx={{alignItems:'center'}}>
              {/* <Typography variant="body2" color="text.secondary" component="div">Word count</Typography> */}
              <MUIChip id="wordCount" icon={<TextFormatIcon/>} color="secondary" variant="outlined" label={project.manuscript.versions[versionIndex-1].scenes.map(scene =>{ return (wordCount(scene.action) + wordCount(scene.voice))}).reduce((a, b) =>{return a+b} )} ></MUIChip>
            </Stack>
            <Stack direction="row" spacing={0.2} sx={{alignItems:'center'}}>
              {/* <Typography variant="body2" color="text.secondary" component="div">Target length</Typography> */}
              <MUIChip id="targetLength" icon={<TrackChangesIcon/>} color="secondary"  variant="outlined" label={project?.brief.formResponse.answers[0].choice.label+" - "+project?.brief.formResponse.answers[1].choice.label} ></MUIChip>
              {/* <MUIChip color="secondary" size="small" variant="outlined" label={project?.brief.formResponse.answers[1].choice.label} ></MUIChip> */}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} sx={{alignItems:"center"}}>
            <VersionSelect versions={project?.manuscript.versions.map(version => version.id)} versionIndex={versionIndex} setVersionIndex={setVersionIndex}/>
            {user !== null && user?.customData?.role === "client" && 
              <Stack direction="row" spacing={1}>
                {project.manuscript.status === "review" && <Box>
                  <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to approve?','Approve manuscript',approveManuscript)}>
                    Approve
                  </MUIButton>
                </Box>}
                {project.manuscript.status === "review" && <Box>
                  <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revison?','Ask for revision',askForRevision)}>
                    Ask for revision
                  </MUIButton>
                </Box>}
                {project.manuscript.status === "open" && <Box>
                  <MUIChip  color="secondary" variant="filled" icon={<AccessTimeIcon/>} label="Edited by manuscript writer"/>
                </Box>}
              </Stack>
            }
            {user !== null && user?.customData?.role === "freelancer" && 
              <Stack direction="row" spacing={1}>
                {project.manuscript.status === "open" && <Box>
                  <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} 
                    onClick={()=>{
                      f7.dialog.confirm('Are you sure you want to send the manuscript to client for review?','Send manuscript to client',sendForReview)
                    }}
                  >
                    Send to client
                  </MUIButton>
                </Box>}
                {project.manuscript.status === "open" && <Box>
                  <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?','Extend time',extendTime)}>
                    Extend time
                  </MUIButton>
                </Box>}
                {project.manuscript.status === "review" && <Box>
                  <MUIChip color="secondary" variant="filled" icon={<AccessTimeIcon/>} label="In review by client"/>
                </Box>}
              </Stack>
            }
            {project.manuscript.status === "approved" && <Box>
              <MUIChip  color="success" variant="outlined" icon={<CheckIcon/>} label="Approved"/>
            </Box>}
            <ManuscriptOptionsButton />
          </Stack>
        </Stack>
      </Block>
  )
}

function FreelancerManuscriptControlPanel(props){
  const {project,versionIndex, setVersionIndex, sendForReview,extendTime} = props
  console.log("freelancer control panel: ",props)
  return(
    <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={1}>
          {/* <LanguageSelector  /> */}
          <VersionSelect versions={project?.manuscript.versions.map(version => version.id)} versionIndex={versionIndex} setVersionIndex={setVersionIndex}/>
        </Stack>
        <Stack direction="row" mt={2} spacing={1}>
          {project.manuscript.status === "open" && <Box>
            <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} 
              onClick={()=>{
                f7.dialog.confirm('Are you sure you want to send the manuscript to client for review?','Send manuscript to client',sendForReview)
              }}
            >
              Send to client
            </MUIButton>
          </Box>}
          {project.manuscript.status === "open" && <Box>
            <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?','Extend time',extendTime)}>
              Extend time
            </MUIButton>
          </Box>}
          {project.manuscript.status === "review" && <Box>
            <MUIChip  color="secondary" variant="outlined" icon={<AccessTimeIcon/>} label="In review by client"/>
          </Box>}
          {project.manuscript.status === "approved" && <Box>
            <MUIChip  color="success" variant="outlined" icon={<CheckIcon/>} label="Approved"/>
          </Box>}
        </Stack>
      </Block>
  )
}

function ClientManuscriptControlPanel(props){
  const {project,versionIndex, setVersionIndex,approveManuscript,askForRevision} = props
  return(
    <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={1}>
          <VersionSelect versions={project.manuscript.versions.map(version => version.id)} versionIndex={versionIndex} setVersionIndex={setVersionIndex}/>
        </Stack>
        <Stack direction="row" mt={2} spacing={1}>
          {project.manuscript.status === "review" && <Box>
            <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to approve?','Approve manuscript',approveManuscript)}>
              Approve
            </MUIButton>
          </Box>}
          {project.manuscript.status === "review" && <Box>
            <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revison?','Ask for revision',askForRevision)}>
              Ask for revision
            </MUIButton>
          </Box>}
          {project.manuscript.status === "open" && <Box>
            <MUIChip  color="secondary" variant="outlined" icon={<AccessTimeIcon/>} label="In revision by manuscript writer"/>
          </Box>}
          {project.manuscript.status === "approved" && <Box>
            <MUIChip  color="secondary" variant="outlined" icon={<AccessTimeIcon/>} label="Approved"/>
          </Box>}
        </Stack>
      </Block>
  )
}