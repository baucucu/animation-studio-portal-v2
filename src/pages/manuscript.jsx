import React, {useState, useEffect} from 'react';
import { Page, Block, BlockTitle, ListItem,Popover, List, Segmented, Button,f7, useStore } from 'framework7-react';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MUIButton from '@mui/material/Button';
import Box from '@mui/material/Box';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import ManuscriptScenes from '../components/manuscript-scenes'

const ManuscriptPage = () => {
  
  const project = useStore('project')
  const [languageIndex, setLanguageIndex] = useState(0)
  const [versions,setVersions] = useState(project?.manuscript?.data[languageIndex].versions)
  const [versionIndex, setVersionIndex] = useState(versions?.length-1)
  
  useEffect(() => {
    console.log("new languageIndex: ",languageIndex)
    setVersions(project?.manuscript?.data[languageIndex].versions)
  },[languageIndex])

  useEffect(() => {
    console.log("new versions: ",versions)
    setVersionIndex(versions?.length-1)
  },[versions])

  useEffect(() => {
    console.log(" new versionIndex: ",versionIndex)
  },[versionIndex])

  if(project?.manuscript?.completed === undefined) return <ManuscriptClosed/>
  
  else return (
  <Page className="viewPage">
    <Stack direction="row" justifyContent="stretch">
    <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={2}>
          <SplitButton languages={project?.manuscript?.languages} languageIndex={languageIndex} setLanguageIndex={setLanguageIndex}/>
          <VersionSelect versions={project?.manuscript?.data[languageIndex].versions.map(version => version.id)} versionIndex={versionIndex} setVersionIndex={setVersionIndex}/>
        </Stack>
        <Stack direction="row" mt={2} spacing={2}>
          <Box>
              <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to send to client?')}>
                Send to client
              </MUIButton>
            </Box>
            <Box>
              <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?')}>
                Extend time
              </MUIButton>
            </Box>
            <Box>
            <Chip  color="secondary" variant="outlined" icon={<AccessTimeIcon/>} label="In review by client"/>
            </Box>
        </Stack>
      </Block>
      <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={3}>
          <Stack direction="row" sx={{alignItems:'center'}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Word count</Typography>
            <Chip color="secondary" variant="outlined" label={"385"} ></Chip>
          </Stack>
          <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
            <Typography variant="subtitle1" color="text.secondary" component="div">Target length</Typography>
            <Chip color="secondary" variant="outlined" sx={{marginRight:1}} label={"60s"} ></Chip>
            <Chip color="secondary" variant="outlined" label={"not so strict"} ></Chip>
          </Stack>
          <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
            <Typography  variant="subtitle1" color="text.secondary" component="div">Scenes</Typography>
            <Chip color="secondary" variant="outlined" label={"8"} ></Chip>
          </Stack>
        </Stack>
        <Stack direction="row" mt={3} spacing={2}>
          <Box>
            <MUIButton size="small" variant="contained" color= "info" startIcon={<VolumeUpIcon />}>
              Listen to AI Voiceover
            </MUIButton>
          </Box>
          <Box>
            <MUIButton size="small" variant="contained" color= "info" startIcon={<VisibilityIcon />}>
              Preview
            </MUIButton>
          </Box>
          <Box>
            <MUIButton size="small" variant="contained" color= "info" startIcon={<PictureAsPdfIcon />}>
            Download PDF
            </MUIButton>
          </Box>
        </Stack>
      </Block>
    </Stack>
    <Block inset >
      <ManuscriptScenes />
    </Block>
  </Page>
)};

export default ManuscriptPage;

function SplitButton(props) {
  const {languages,languageIndex, setLanguageIndex} = props
  return (
    <Stack direction="row" spacing={2} sx={{alignItems:'center'}}>
      <Typography variant="subtitle1" color="text.secondary" component="div">Language</Typography>
      <Segmented  tag="div">
        {languages.map((language,index) => <Button key={index} size="small"  outline active={languageIndex === index} onClick={() => {setLanguageIndex(index)}}>{language}</Button>)}
      </Segmented>   
    </Stack>
  );
}

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
  return(
    <Stack direction="row" spacing={2} sx={{alignItems:'center'}}>
      <Typography variant="subtitle1" color="text.secondary" component="div">Version</Typography>
      <Button style={{minWidth:80}} fill raised popoverOpen=".popover-menu">
        {versions.length-1 === versionIndex ?  String(versionIndex+" (current)"): String(versionIndex)}
      </Button>
      <Popover className="popover-menu">
        <List>
          {versions.map((version, id) => <ListItem onClick={() => setVersionIndex(version)} link key={id} popoverClose >{version === versionIndex ?  String(version+" (current)"): String(version)}</ListItem>)}
        </List>
      </Popover>
    </Stack>
    
  )
}