import React , {useEffect, useRef, useState} from 'react';
import { Page, Block, BlockTitle, useStore } from 'framework7-react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const StoryboardPage = () => {
  
  const project = useStore('project')
  const uploadInputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
	const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
		setSelectedFiles([...selectedFiles, ...event.target.files]);
		setIsSelected(true);
	};

  const handleSubmission = () => {
		const formData = new FormData();

		formData.append('Files', selectedFiles);

		fetch(
			'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
  };

  useEffect(() => {
    console.log('files: ', selectedFiles.map(file=> file.name))
  },[selectedFiles])


  if(project?.storyboard?.completed === undefined) return <StoryboardClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
      <Stack sx={{flexDirection: 'row', alignItems: 'center', justifyContent:"space-between"}}>
        <Box htmlFor="upload-photo">
          <label htmlFor="contained-button-file">
            <input style={{display:"none"}} accept="image/*" id="contained-button-file" multiple type="file" onChange={changeHandler}/>
            <Button color="secondary" variant="contained" component="span" startIcon={<CloudUploadIcon/>}>
              Upload storyboard files
            </Button>
          </label>
        </Box>
      </Stack>
      <Stack>
        {selectedFiles.map((file,index) => <p key={index}>{file.name}</p>)}
      </Stack>
    </Block>
  </Page>
)};

export default StoryboardPage;

function StoryboardClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Storyboard step is closed</BlockTitle>
      </Block>
    </Page>
    
  )
}