import React , {useEffect, useState} from 'react';
import { Page, Block, BlockTitle, useStore, f7 } from 'framework7-react';

import StoryboardScenes from '../components/storyboard-scenes'

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

const StoryboardPage = () => {
  
  const project = useStore('project')
  const user = useStore('user')

  if(project?.storyboard?.completed === undefined) return <StoryboardClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
      <StoryboardActionButtons />
    </Block>
    <Block>
      <StoryboardScenes/>
    </Block>
    
  </Page>
)};

export default StoryboardPage;

function UploadButton () {
  const [selectedFiles, setSelectedFiles] = useState([]);
	const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
		setSelectedFiles([...selectedFiles, ...event.target.files]);
		setIsSelected(true);
	};

  const handleSubmission = () => {
		
  };
  return(
    <Stack sx={{flexDirection: 'row', alignItems: 'center', justifyContent:"space-between"}}>
      <Box htmlFor="upload-photo">
        <label htmlFor="contained-button-file">
          <input style={{display:"none"}} accept="image/*" id="contained-button-file" multiple type="file" onChange={changeHandler}/>
          <Button color="secondary" variant="contained" component="span" startIcon={<CloudUploadIcon/>}>
            Upload storyboard files
          </Button>
        </label>
      </Box>
      <Stack>
      {selectedFiles.map((file,index) => <p key={index}>{file.name}</p>)}
    </Stack>
  </Stack>
  )
}

function StoryboardClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Storyboard step is closed</BlockTitle>
      </Block>
    </Page>
    
  )
}


function StoryboardActionButtons () {
  const user = useStore('user')
  const project = useStore('project')
  
  function approveStoryboard () {}
  function askForRevision() {}
  function sendToClient () {}
  function extendTime () {}

  console.log("storyboard user: ",user)
  console.log("storyboard project: ",project)
  return(
    <Stack>
      {user?.customData?.role === "client" && project?.storyboard?.status === "review" &&
        <Stack direction="row" spacing={1}>
          <Box>
            <Button size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to approve?','Approve storyboard',approveStoryboard)}>
              Approve
            </Button>
          </Box>
          <Box>
            <Button size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revison?','Ask for revision',askForRevision)}>
              Ask for revision
            </Button>
          </Box>
        </Stack>
      }
      {user?.customData?.role === "freelancer" && project?.storyboard?.status === "open" &&
        <Stack direction="row" spacing={1}>
          <Box>
            <Button size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>{f7.dialog.confirm('Are you sure you want to send the manuscript to client for review?','Send storyboard to client',sendToClient)}} >
              Send to client
            </Button>
          </Box>
          <Box>
            <Button size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?','Extend time',extendTime)}>
              Extend time
            </Button>
          </Box>
        </Stack>
      }
    </Stack>
  )
}
