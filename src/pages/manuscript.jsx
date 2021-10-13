import React, {useState} from 'react';
import { Page, Icon, Block, BlockTitle, Segmented, Button,f7 } from 'framework7-react';

import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

import ManuscriptScenes from '../components/manuscript-scenes'

const ManuscriptPage = () => {
  
  const [briefDrawerOpen, setBriefDrawerOpen] = useState(false)
  const toggleBriefDrawer = () => {
    setBriefDrawerOpen(!briefDrawerOpen)
  }

  return (
  <Page className="viewPage">
    <Box sx={{display:"flex", flexDirection:"row"}}>
      <Block inset style={{flexDirection:"row", marginBottom:16, marginTop:16, flexGrow:0, justifyContent:'flex-start'}}>
        <SplitButton />
      </Block>
    </Box>
    <Stack direction="row">
      <Block inset strong style={{flexGrow:1, marginTop:0}}>
        <Stack direction="row" spacing={3}>
          <Stack mr={3} sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Word count</Typography>
            <Chip color="secondary" variant="outlined" label={"385"} ></Chip>
          </Stack>
          <Stack mr={3} sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Target length</Typography>
            <Chip color="secondary" variant="outlined" sx={{marginRight:1}} label={"60s"} ></Chip>
            <Chip color="secondary" variant="outlined" label={"not so strict"} ></Chip>
          </Stack>
          <Stack mr={3} sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Scenes</Typography>
            <Chip color="secondary" variant="outlined" label={"8"} ></Chip>
          </Stack>
        </Stack>
        <Stack direction="row" mt={2}>
            <Chip clickable color="secondary" variant="filled " style={{marginLeft:8}} icon={<VolumeUpIcon/>} label="Listen to AI Voiceover" />
            <Chip clickable color="secondary" variant="filled " style={{marginLeft:8}} icon={<PictureAsPdfIcon/>} label="Download PDF" />
            {/* <CardButton color="secondary" size="small" onClick={()=>f7.emit('listenVoiceover')}>Listen to AI Voiceover</CardButton>
            <CardButton color="secondary" size="small" onClick={()=>f7.emit('downloadPDF')}>Download PDF</CardButton> */}
        </Stack>
      </Block>
      <Block inset strong style={{flexGrow:1, marginTop:0}}>
        <Stack direction="row" spacing={2}>
          <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
              <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Revisions</Typography>
              <Chip color="secondary" variant="outlined" label={"2/5"} ></Chip>
          </Stack>
          <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
              <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Time to respond</Typography>
              <Chip color="secondary" variant="outlined" label={"18:00:00"} ></Chip>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} mt={2}>
          <Chip onClick={()=>f7.dialog.confirm('Are you sure you want to send to client?')} clickable color="primary" variant="filled " style={{marginLeft:8}} icon={<SendIcon pl={0} />} label="Send to client" />
          <Chip onClick={()=>f7.dialog.confirm('Are you sure you want to approve the manuscript?')} clickable color="success" variant="filled " style={{marginLeft:8}} icon={<CheckIcon/>} label="Approve manuscript" />
          <Chip onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revision?')} clickable color="warning" variant="filled " style={{marginLeft:8}} icon={<RateReviewIcon/>} label="Ask for revision" />
          <Chip onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?')} clickable color="warning" variant="filled " style={{marginLeft:8}} icon={<MoreTimeIcon/>} label="Extend time" />
          {/* <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to send to client?')}>Send to client</CardButton>
          <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to approve the manuscript?')}>Approve manuscript</CardButton>
          <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revision?')}>Ask for revision</CardButton>
          <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?')}>Extend time</CardButton> */}
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
  
  return (
    <Segmented round tag="div">
      <Button  round outline active>
        English
      </Button>
      <Button icon="lock" round outline>
        <Icon icon="lock"></Icon>
        Swedish
      </Button>
      <Button icon="lock" round outline>
        
        Norwegian
      </Button>
    </Segmented>   
  );
}