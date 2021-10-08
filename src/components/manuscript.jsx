import React, {useState} from 'react';
import ManuscriptScenes from '../components/manuscript-scenes.jsx'
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import LockClockIcon from '@mui/icons-material/LockClock';


export default function Manuscript(props){

    const [briefDrawerOpen, setBriefDrawerOpen] = useState(false)
    const toggleBriefDrawer = () => {
        setBriefDrawerOpen(!briefDrawerOpen)
    }

    return(
        <Stack  spacing={2} >
            <Stack  sx={{flexDirection:"row", justifyContent: "start", alignItems: "center"}}>
                <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Language</Typography>
                <SplitButton />
            </Stack>
            <Stack  sx={{flexDirection: 'row', flexGrow:1}}>
                <ManuscriptMetadata toggleBriefDrawer={toggleBriefDrawer}/>
                <ManuscriptControlPanel />
            </Stack>
            <ManuscriptScenes briefDrawerOpen={briefDrawerOpen}/>
            <Box>
                <Paper></Paper>
            </Box>
        </Stack>
    )
  }

  function SplitButton(props) {
    
    return (
        <ButtonGroup variant="outlined" aria-label="small outlined primary button group">
            <Button variant="contained">English</Button>
            <Button startIcon={<LockClockIcon/>}>Swedish</Button>
            <Button startIcon={<LockClockIcon/>}>Norwegian</Button>
        </ButtonGroup>
    );
  }

  function ManuscriptControlPanel(props) {
      return(
        <Card sx={{ flexGrow:1, marginLeft:2}}>
            <CardContent>
                <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                    <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Revisions</Typography>
                        <Chip label={"2/5"} ></Chip>
                    </Stack>
                    <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Time to respond</Typography>
                        <Chip label={"18:00:00"} ></Chip>
                        <CardButton size="small">Extend time</CardButton>
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <CardButton size="small"  fill>Send to client</CardButton>
                <CardButton size="small"  fill>Approve manuscript</CardButton>
                <CardButton size="small">Ask for revision</CardButton>
            </CardActions>
        </Card>
      )
  }

  function ManuscriptMetadata(props) {
      const {toggleBriefDrawer} = props
      return(
        <Card sx={{flexGrow:4}}>
            <CardContent>
                <Stack sx={{flexDirection:"row", alignItems: "center", justifyContent:"space-between"}}>
                    <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Word count</Typography>
                        <Chip label={"385"} ></Chip>
                    </Stack>
                    <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Target length</Typography>
                        <Chip label={"60s"} ></Chip>
                        <Chip label={"not so strict"} ></Chip>
                    </Stack>
                    <Stack sx={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Scenes</Typography>
                        <Chip label={"8"} ></Chip>
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <CardButton size="small" onClick={()=>toggleBriefDrawer()}>Show Brief</CardButton>
                <CardButton size="small">Listen to AI Voiceover</CardButton>
                <CardButton size="small">Download PDF</CardButton>
            </CardActions>
        </Card>
      )
  }

  
