import React, {useState,useEffect} from 'react';
import {f7, useStore,Popover } from 'framework7-react';
import Comments from './comments'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import MicIcon from '@mui/icons-material/Mic';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { stepConnectorClasses } from '@mui/material';



export default function ManuscriptScenes({language, versionIndex}) {
    
    const project = useStore('project') 
    const user = useStore('user')
    
    function sortScenes(items) {
        console.log("sorting scenes: ", items)
        if(items.length <2) return scenes
        else return items.sort((a,b) => a?.index<b?.index)
    }

    useEffect(() => {
        const mongodb = user.mongoClient("mongodb-atlas");
        const projectsCollection = mongodb.db("AnimationStudioDB").collection("Projects");
        f7.on('saveVoice',({voice,sceneIndex})=>{
            let tempManuscript = project.manuscript
            console.log("saving voice to ",tempManuscript.data[language]," version ",tempManuscript.data[language].versions[versionIndex-1])," scene ",sceneIndex
            tempManuscript.data[language].versions[versionIndex-1].scenes[sceneIndex].voice = voice
            projectsCollection.updateOne({_id:(project._id)},{
                $set:{"manuscript":tempManuscript}
            })
        })
        f7.on('saveAction',({action,sceneIndex})=>{
            let tempManuscript = project.manuscript
            tempManuscript.data[language].versions[versionIndex-1].scenes[sceneIndex].action = action
            projectsCollection.updateOne({_id:(project._id)},{
                $set:{"manuscript":tempManuscript}
            })
        })
    },[])

    return(
        <Grid pb={2} pr={2} container spacing={2} direction="row" rows={1} wrap="nowrap" sx={{overflow:"auto", flexGrow: 1, alignItems:"stretch", }}>
            {project?.manuscript?.data[language]?.versions[versionIndex-1]?.scenes.map((scene,id) => 
                <Grid item key={`${String(project._id)}-${language}-${versionIndex}-${id}`}>
                    <Card sx={{width: 450}}>
                        <CardContent >
                            <Stack direction="row" sx={{justifyContent:"space-between"}}>
                                <Stack direction="row" sx={{alignItems:"center",     justifyContent:"center"}}>
                                    <Typography variant="h6" color="text.secondary" component="div">Scene {`${language}-${versionIndex}-${id+1}`}</Typography>
                                </Stack>                                
                                <Stack direction="row">
                                    <ShowMoreOptions id={id}/>
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Voice sceneIndex={id} text={project.manuscript.data[language].versions[versionIndex-1].scenes[id].voice} handleChange={(e)=> console.log("Voice change - language: ",language,"; version: ",versionIndex,"; scene: ",scene.id,"; value: ",e.target.value)}/>
                                <Action sceneIndex={id} text={project.manuscript.data[language].versions[versionIndex-1].scenes[id].action} handleChange={(e)=> console.log("Action change - language: ",language,"; version: ",versionIndex,"; scene: ",scene.id,"; value: ",e.target.value)}/>
                                <Comments commentBoxId={`${String(project._id)}-${language}-${versionIndex}-${id}`} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}

function ShowMoreOptions(){

    const handleClick = (event) => {
        console.log("options button clicked: ",event)
    };

    
    return(
        <Box>
            <IconButton  onClick={handleClick}>
                <MoreVertIcon  color="secondary" />
            </IconButton>
        </Box>
    )
}

function Voice({text,sceneIndex,handleChange}){
    // const project = useStore('project')
    const [voice,setVoice] = useState(text)
    useEffect(()=>{
        console.log("new text props: ", text)
        setVoice(text)
    },[text])

    function saveVoice(e){
        console.log("saving voice: ", voice)
        f7.emit('saveVoice',{voice, sceneIndex})
    }
    
    return(
        <Stack mt={1} sx={{flexDirection:"row"}}>
            <MicIcon />
            <Stack sx={{flexGrow:1}} spacing={1}>
                <TextField
                    color="secondary"
                    pl={2}
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Voice"
                    multiline
                    maxRows={20}
                    placeholder="Maximum 4 rows"
                    value={voice}
                    onChange={(e)=>{handleChange(e); setVoice(e.target.value)}}
                >
                </TextField>
                {text!==voice && <Stack direction="row">
                <Button onClick={()=>saveVoice(voice)} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setVoice(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
            
        </Stack>
    )
}

function Action({text,sceneIndex,   handleChange}){
    const[action,setAction] = useState(text)
    useEffect(()=>{
        console.log("new text props: ", text)
        setAction(text)
    },[text])

    function saveAction(e){
        console.log("saving action: ", action)
        f7.emit('saveAction',{action, sceneIndex})
    }
    return(
        <Stack mt={1} style={{flexDirection:"row"}} >
            <DirectionsRunIcon />
            <Stack sx={{flexGrow:1}} spacing={1}>
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
                {text!==action && <Stack direction="row">
                    <Button onClick={()=>saveAction(action)} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setAction(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
        </Stack>
    )
}