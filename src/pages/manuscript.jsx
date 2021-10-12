import React, {useState} from 'react';
import { Page, Icon, Block, BlockTitle, Segmented, Button,f7 } from 'framework7-react';

import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

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
    <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
      <Block inset strong style={{flexGrow:2, marginTop:0}}>
        <Stack sx={{flexDirection:"row", alignItems: "center", justifyContent:"space-between"}}>
          <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Word count</Typography>
            <Chip color="secondary" variant="outlined" label={"385"} ></Chip>
          </Stack>
          <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Target length</Typography>
            <Chip color="secondary" variant="outlined" sx={{marginRight:1}} label={"60s"} ></Chip>
            <Chip color="secondary" variant="outlined" label={"not so strict"} ></Chip>
          </Stack>
          <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Scenes</Typography>
            <Chip color="secondary" variant="outlined" label={"8"} ></Chip>
          </Stack>
        </Stack>
        <CardActions>
            <CardButton color="secondary" size="small" >Show Brief</CardButton>
            <CardButton color="secondary" size="small">Listen to AI Voiceover</CardButton>
            <CardButton color="secondary" size="small">Download PDF</CardButton>
        </CardActions>
      </Block>
      <Block inset strong style={{flexGrow:1, marginTop:0}}>
        <Stack sx={{flexDirection:"row", alignItems: "center", justifyContent:"space-between"}}>
          <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
              <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Revisions</Typography>
              <Chip color="secondary" variant="outlined" label={"2/5"} ></Chip>
          </Stack>
          <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
              <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Time to respond</Typography>
              <Chip color="secondary" variant="outlined" label={"18:00:00"} ></Chip>
          </Stack>
        </Stack>
        <CardActions>
          <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to send to client?')}>Send to client</CardButton>
          <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to approve the manuscript?')}>Approve manuscript</CardButton>
          <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revision?')}>Ask for revision</CardButton>
          <CardButton color="secondary" size="small" onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?')}>Extend time</CardButton>
        </CardActions>
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