import React , {useEffect, useRef, useState} from 'react';
import { Page, Block, BlockTitle, useStore } from 'framework7-react';

import StoryboardScenes from '../components/storyboard-scenes'

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const StoryboardPage = () => {
  
  const project = useStore('project')

  if(project?.storyboard?.completed === undefined) return <StoryboardClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
      Storyboard header
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

