import React, {useState,useEffect} from 'react';
import {f7, Button as F7Button,Block, Link, useStore,Popover, List, ListItem } from 'framework7-react';
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

        f7.on('saveVoice',({voice,language,versionIndex,sceneIndex})=>{
            let tempManuscript = project.manuscript
            console.log(String("saving voice to "+language+" version "+versionIndex+" scene "+sceneIndex))
            tempManuscript.data[language].versions[versionIndex-1].scenes[sceneIndex].voice = voice
            console.log("tempManuscript: ",tempManuscript)
            projectsCollection.updateOne({_id:(project._id)},{
                $set:{"manuscript":tempManuscript}
            })
        })
        
        f7.on('saveAction',({action,language,versionIndex,sceneIndex})=>{
            let tempManuscript = project.manuscript
            console.log(String("saving action to "+language+" version "+versionIndex+" scene "+sceneIndex))
            tempManuscript.data[language].versions[versionIndex-1].scenes[sceneIndex].action = action
            console.log("tempManuscript: ",tempManuscript)
            projectsCollection.updateOne({_id:(project._id)},{
                $set:{"manuscript":tempManuscript}
            })
        })
        
        f7.on('deleteScene',({sceneIndex})=>{
            console.log('deleteScene',{sceneIndex})
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
                                    <OptionsButton id={id} index={`${language}-${versionIndex}-${scene.index}`}/>   
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Voice manuscriptStatus={project.manuscript.status} role={user?.customData?.role} sceneIndex={id} language={language} versionIndex={versionIndex} text={project.manuscript.data[language].versions[versionIndex-1].scenes[id].voice} handleChange={(e)=> {}}/>
                                <Action manuscriptStatus={project.manuscript.status} role={user?.customData?.role} language={language} versionIndex={versionIndex} text={project.manuscript.data[language].versions[versionIndex-1].scenes[id].action} handleChange={(e)=> {}}/>
                                <Comments commentBoxId={`${String(project._id)}-${language}-${versionIndex}-${id}`} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}

function OptionsButton(props) {
    useEffect(()=>{
        console.log("scene: " + JSON.stringify(props.index))
    },[])

    return(
        <Box>
            <F7Button popoverOpen=".more-popover-menu" onClick={()=>{console.log("options button sceneIndex: "+props.index)}} icon="more_vert" >
                {props.index}<MoreVertIcon/>
            </F7Button>
            <Popover closeByOutsideClick className="more-popover-menu">
                <List>                    
                    <ListItem>
                        <F7Button 
                            popoverClose 
                            onClick={()=>{
                                // f7.emit('deleteScene',{sceneIndex:sceneIndex})
                                console.log("popover sceneIndex: " + props.index);
                            }} 
                            color="red"
                        >Delete scene {props.index}
                        </F7Button>
                    </ListItem> 
                </List>
            </Popover>
        </Box>
    )
}

function Voice({text,language,versionIndex,sceneIndex,handleChange, role, manuscriptStatus}){
    const [voice,setVoice] = useState(text)
    useEffect(()=>{
        setVoice(text)
    },[text])

    function saveVoice(e){
        console.log("saving voice: ", {voice,language,versionIndex,sceneIndex})
        f7.emit('saveVoice',{voice,language,versionIndex,sceneIndex})
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
                    disabled={role === "client" && manuscriptStatus === 'review' && manuscriptStatus==="approved"}
                    onChange={(e)=>{handleChange(e); setVoice(e.target.value)}}
                >
                </TextField>
                {text!==voice && <Stack direction="row">
                    <Button onClick={()=>saveVoice({voice,language,versionIndex,sceneIndex})} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setVoice(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
            
        </Stack>
    )
}

function Action({text,language,versionIndex,sceneIndex,handleChange, role, manuscriptStatus}){
    const[action,setAction] = useState(text)
    useEffect(()=>{
        setAction(text)
    },[text])

    function saveAction(e){
        console.log("saving action: ", action)
        f7.emit('saveAction',{action,language,versionIndex,sceneIndex})
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
                    disabled={role === "client" && manuscriptStatus === 'review' && manuscriptStatus==="approved"}
                    onChange={(e)=>{handleChange(e); setAction(e.target.value)}}
                />
                {text!==action && <Stack direction="row">
                    <Button onClick={()=>saveAction({action,language,versionIndex,sceneIndex})} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setAction(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
        </Stack>
    )
}