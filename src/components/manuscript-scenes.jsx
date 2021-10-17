import React, {useState,useEffect} from 'react';
import {f7, useStore } from 'framework7-react';
import CommentsDrawer from '../components/comments-drawer'
import PageWithComments from './comments'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import MicIcon from '@mui/icons-material/Mic';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { stepConnectorClasses } from '@mui/material';



export default function ManuscriptScenes({language, versionIndex}) {
    
    const project = useStore('project') 
    // debugger;
    
    function sortScenes(items) {
        console.log("sorting scenes: ", items)
        if(items.length <2) return scenes
        else return items.sort((a,b) => a?.index<b?.index)
    }

    useEffect(() => {
        console.log("languages in manuscript: ",project.manuscript.data)
        console.log("language: ",language)
        console.log("scenes: ", project?.manuscript?.data[language].versions)
        console.log("versionIndex: ",versionIndex)
    },[])
    return(
        <Grid pb={2} pr={2} container spacing={2} direction="row" rows={1} wrap="nowrap" sx={{overflow:"auto", flexGrow: 1, alignItems:"stretch", }}>
            {project?.manuscript?.data[language]?.versions[versionIndex-1]?.scenes.map((scene,id) => 
                <Grid item key={`${String(project._id)}-${language}-${versionIndex}-${id}`}>
                    <Card sx={{width: 450}}>
                        <CardContent >
                            <Stack direction="row" sx={{justifyContent:"space-between"}}>
                                <Stack direction="row">
                                    {id !==0 && <Box>
                                        <IconButton>
                                            <ArrowLeftIcon color="secondary"/>
                                        </IconButton>
                                    </Box>}
                                    <Box>
                                        <IconButton>
                                            <AddIcon color="secondary"/>
                                        </IconButton>
                                    </Box>
                                </Stack>
                                <Stack direction="row" sx={{alignItems:"center",     justifyContent:"center"}}>
                                    <Typography variant="h6" color="text.secondary" component="div">Scene {`${language}-${versionIndex}-${id+1}`}</Typography>
                                    <Box>
                                        <IconButton>
                                            <HighlightOffIcon color="secondary"/>
                                        </IconButton>
                                    </Box>
                                </Stack>
                                
                                <Stack direction="row">
                                    <Box>
                                        <IconButton>
                                            <AddIcon color="secondary"/>
                                        </IconButton>
                                    </Box>
                                    {id !== 4 && <Box>
                                        <IconButton>
                                            <ArrowRightIcon color="secondary"/>
                                        </IconButton>
                                    </Box>}
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Voice scene={scene} handleChange={(e)=> console.log("Voice change - language: ",language,"; version: ",versionIndex,"; scene: ",scene.id,"; value: ",e.target.value)}/>
                                <Action scene={scene} handleChange={(e)=> console.log("Action change - language: ",language,"; version: ",versionIndex,"; scene: ",scene.id,"; value: ",e.target.value)}/>
                                <PageWithComments commentBoxId={`${String(project._id)}-${language}-${versionIndex}-${id}`} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}

function Voice({scene,handleChange}){

    const [voice,setVoice] = useState(scene.voice)
    useEffect(()=>{
        // console.log("new scene props: ",scene.voice)
        setVoice(scene.voice)
    },[scene])
    useEffect(()=>{
        // console.log("new voice state: ",voice)
    },[voice])

    return(
        <Stack mt={1} sx={{flexDirection:"row"}}>
            <MicIcon />
            <TextField
                pl={2}
                fullWidth
                id="outlined-multiline-flexible"
                label="Voice"
                multiline
                maxRows={20}
                placeholder="Maximum 4 rows"
                defaultValue={voice}
                onChange={(e)=>{handleChange(e); setVoice(e.target.value)}}
            />
        </Stack>
    )
}

function Action({scene,handleChange}){
    const[action,setAction] = useState(scene.action)
    return(
        <Stack mt={1} style={{flexDirection:"row"}} >
            <DirectionsRunIcon />
            <TextField
                pl={2}
                fullWidth
                id="outlined-multiline-flexible"
                label="Action"
                multiline
                maxRows={20}
                placeholder="Maximum 4 rows"
                value={action}
                onChange={(e)=>{handleChange(e); setAction(e.target.value)}}
            />
        </Stack>
    )
}