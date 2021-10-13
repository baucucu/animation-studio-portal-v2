import React, {useState} from 'react';
import { Page, Icon, Block, BlockTitle, Segmented, Button,f7 } from 'framework7-react';

import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MUIButton from '@mui/material/Button';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ManuscriptScenes from '../components/manuscript-scenes'

const ManuscriptPage = () => {
  
  const [briefDrawerOpen, setBriefDrawerOpen] = useState(false)
  const toggleBriefDrawer = () => {
    setBriefDrawerOpen(!briefDrawerOpen)
  }

  return (
  <Page className="viewPage">
    <Stack direction="row">
      <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={3}>
          <Stack direction="row">
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Word count</Typography>
            <Chip color="secondary" variant="outlined" label={"385"} ></Chip>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" color="text.secondary" component="div">Target length</Typography>
            <Chip color="secondary" variant="outlined" sx={{marginRight:1}} label={"60s"} ></Chip>
            <Chip color="secondary" variant="outlined" label={"not so strict"} ></Chip>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography  variant="subtitle1" color="text.secondary" component="div">Scenes</Typography>
            <Chip color="secondary" variant="outlined" label={"8"} ></Chip>
          </Stack>
        </Stack>
        <Stack direction="row" mt={2} spacing={2}>
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
      <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1" color="text.secondary" component="div">Revisions</Typography>
              <Chip color="secondary" variant="outlined" label={"2/5"} ></Chip>
          </Stack>
          <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1" color="text.secondary" component="div">Time to respond</Typography>
              <Chip color="secondary" variant="outlined" label={"18:00:00"} ></Chip>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} mt={2}>
          <Box>
            <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to send to client?')}>
              Send to client
            </MUIButton>
          </Box>
          <Box>
            <MUIButton size="small" variant="contained" color= "success" startIcon={<CheckIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to approve the manuscript?')}>
              Approve manuscript
            </MUIButton>
          </Box>
          <Box>
            <MUIButton size="small" variant="contained" color= "info" startIcon={<RateReviewIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revision?')}>
              Ask for revision
            </MUIButton>
          </Box>
          <Box>
            <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?')}>
              Extend time
            </MUIButton>
          </Box>
        </Stack>
      </Block>
    </Stack>
    <Box sx={{display:"flex", flexDirection:"row"}}>
      <Block inset style={{flexDirection:"row", marginBottom:16, marginTop:16, flexGrow:0, justifyContent:'flex-start'}}>
        <SplitButton />
      </Block>
    </Box>
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