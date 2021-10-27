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
import { breadcrumbsClasses, stepConnectorClasses } from '@mui/material';



export default function ManuscriptScenes({versionIndex}) {
    
    const project = useStore('project') 
    const user = useStore('user')
    
    const mongodb = user.mongoClient("mongodb-atlas");
    const projectsCollection = mongodb.db("AnimationStudioDB").collection("Projects");

    function ObjectId () {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        const suffix = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase()
        return `${timestamp}${suffix}`;
      }
    
    function sortScenes(items) {
        console.log("sorting scenes: ", items)
        let result
        if(items.length <2) result = items
        else result =  items.sort(({index:a}, {index:b}) => a-b)
        console.log("sorted scenes: ", result)
        return result
    }
    function saveVoice(voice,sceneIndex) {
        let tempManuscript = project.manuscript
        console.log(String("saving voice to version "+versionIndex+" scene "+sceneIndex))
        tempManuscript.versions[versionIndex-1].scenes.map((scene,index) => {
            if(sceneIndex===scene.index) {
                tempManuscript.versions[versionIndex-1].scenes[index].voice = voice
            }  
        })
        projectsCollection.updateOne({_id:(project._id)},{
            $set:{"manuscript":tempManuscript}
        })
    }
    function saveAction(action,sceneIndex) {
        let tempManuscript = project.manuscript
        console.log(String("saving action to version "+versionIndex+" scene "+sceneIndex))
        tempManuscript.versions[versionIndex-1].scenes.map((scene,index) => {
            if(sceneIndex===scene.index) {
                tempManuscript.versions[versionIndex-1].scenes[index].action = action
            }  
        })
        projectsCollection.updateOne({_id:(project._id)},{
            $set:{"manuscript":tempManuscript}
        })
    }

    function addScene() {
        console.log("function args: ",arguments)
        const direction = arguments[0]
        const sceneIndex = arguments[1]
        console.log('addScene',{direction, sceneIndex})
        let tempManuscript = project.manuscript
        
        const indexModifier = direction === 'left' ? 0 : 1
        
        const lastId = tempManuscript.versions[versionIndex-1].scenes[tempManuscript.versions[versionIndex-1].scenes.length-1].id
        console.log("lastId: "+lastId)

        tempManuscript.versions[versionIndex-1].scenes.map((scene, index)=>{
            console.log("index: ",index)
            console.log("scene.index: ", scene.index)
            console.log("sceneIndex: ",sceneIndex)
            if(sceneIndex < scene.index) {
                console.log("changing scene index from ",tempManuscript.versions[versionIndex-1].scenes[index].index," to ",tempManuscript.versions[versionIndex-1].scenes[index]?.index + 1)
                tempManuscript.versions[versionIndex-1].scenes[index].index = tempManuscript.versions[versionIndex-1].scenes[index]?.index + 1
            }
            if(sceneIndex === scene.index && direction === 'left') {
                console.log("changing scene index from ",tempManuscript.versions[versionIndex-1].scenes[index].index," to ",tempManuscript.versions[versionIndex-1].scenes[index]?.index + 1)
                tempManuscript.versions[versionIndex-1].scenes[index].index = tempManuscript.versions[versionIndex-1].scenes[index]?.index + 1
            }
        })

        console.log("sceneIndex: ",sceneIndex)
        console.log("indexModifier: ",indexModifier)
        const newId = ObjectId()
        const newIndex = sceneIndex + indexModifier
        console.log("newIndex: ", newIndex)

        let newScene = {
            id: newId,
            index : newIndex,
            voice : "Voice placeholder",
            action: "Action placeholder"
        }

        console.log("pushing new scene: ", newScene)
        tempManuscript.versions[versionIndex-1].scenes.push(newScene)

        projectsCollection.updateOne({_id:(project._id)},{
            $set:{"manuscript":tempManuscript}
        })

    }
    function moveScene(direction,sceneIndex) {
        let tempManuscript = project.manuscript

        const index = tempManuscript.versions[versionIndex-1].scenes.findIndex(scene => sceneIndex === scene.index)
        console.log("index found: ",index)
        // debugger;
        console.log('moving scene ',sceneIndex," to ",direction)
        let indexModifier = direction === 'left' ? -1 : 1
        console.log("index modifier: ",indexModifier)
        
        console.log("current scene index: ", tempManuscript.versions[versionIndex-1].scenes[index].index)
        console.log("new current scene index: ",tempManuscript.versions[versionIndex-1].scenes[index].index + indexModifier)

        console.log("next scene index: ", tempManuscript.versions[versionIndex-1].scenes[index+indexModifier].index)
        console.log("new next scene index: ",tempManuscript.versions[versionIndex-1].scenes[index+indexModifier].index - indexModifier)
        
        tempManuscript.versions[versionIndex-1].scenes[index].index = tempManuscript.versions[versionIndex-1].scenes[index].index + indexModifier
        tempManuscript.versions[versionIndex-1].scenes[index + indexModifier].index = tempManuscript.versions[versionIndex-1].scenes[index + indexModifier].index - indexModifier
   
        projectsCollection.updateOne({_id:(project._id)},{
            $set:{"manuscript":tempManuscript}
        })
    }
    function deleteScene(sceneIndex) {
        console.log('deleteScene',{sceneIndex})
        let tempManuscript = project.manuscript
        tempManuscript.versions[versionIndex-1].scenes.map((scene,index) => {
            if(sceneIndex === scene.index) {tempManuscript.versions[versionIndex-1].scenes.splice(index,1)}
            if(sceneIndex <= scene.index) {tempManuscript.versions[versionIndex-1].scenes[index].index = tempManuscript.versions[versionIndex-1].scenes[index]?.index - 1}
        })
        projectsCollection.updateOne({_id:(project._id)},{
            $set:{"manuscript":tempManuscript}
        })
    }

    return(
        <Grid pb={2} pr={2} container spacing={2} direction="row" rows={1} wrap="nowrap" sx={{overflow:"auto", flexGrow: 1, alignItems:"stretch", }}>
            {sortScenes(project?.manuscript?.versions[versionIndex-1]?.scenes).map((scene,id) => 
                <Grid item key={`${String(project._id)}-${versionIndex}-${scene.index}`}>
                    <Card sx={{width: 450}}>
                        <CardContent >
                            <Stack direction="row" sx={{justifyContent:"space-between"}}>
                                <Stack direction="row" sx={{alignItems:"center",     justifyContent:"center"}}>
                                    <Typography variant="h6" color="text.secondary" component="div">Scene {`${versionIndex}-${scene.index}`}</Typography>
                                </Stack>                                
                                <Stack direction="row">
                                    <OptionsButton 
                                        addScene={addScene}
                                        moveScene={moveScene}
                                        deleteScene={deleteScene}
                                        index={scene.index} 
                                        scenesCount={project.manuscript.versions[versionIndex-1].scenes.length}
                                    />   
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Voice
                                    saveVoice={saveVoice} 
                                    manuscriptStatus={project.manuscript.status} 
                                    role={user?.customData?.role} 
                                    sceneIndex={scene.index} 
                                    versionIndex={versionIndex} 
                                    text={project.manuscript.versions[versionIndex-1].scenes[id].voice} 
                                />
                                <Action 
                                    saveAction={saveAction} 
                                    manuscriptStatus={project.manuscript.status} 
                                    role={user?.customData?.role} 
                                    sceneIndex={scene.index} 
                                    versionIndex={versionIndex} 
                                    text={project.manuscript.versions[versionIndex-1].scenes[id].action}
                                />
                                <Comments commentBoxId={scene.id} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}

function OptionsButton({index, scenesCount, addScene, moveScene, deleteScene}) {
    useEffect(()=>{
        console.log("scene: " + JSON.stringify(index))
    },[])

    return(
        <Box>
            <F7Button popoverOpen={`#scene${index}`} onClick={()=>{console.log("options button sceneIndex: "+index)}} icon="more_vert" >
                <MoreVertIcon/>
            </F7Button>
            <Popover id={"scene"+index} closeByOutsideClick className="more-popover-menu">
                <List>
                    <ListItem>
                        <F7Button 
                            popoverClose 
                            onClick={()=>{
                                addScene('left', index)
                                console.log("popover sceneIndex: " + index);
                            }} 
                            color="secondary"
                        >Add to left
                        </F7Button>
                        <F7Button 
                            popoverClose 
                            onClick={()=>{
                                addScene('right', index)
                                console.log("popover sceneIndex: " + index);
                            }} 
                            color="secondary"
                        >Add to right
                        </F7Button>
                    </ListItem>      
                    <ListItem>
                        <F7Button 
                            popoverClose 
                            onClick={()=>{
                                moveScene('left', index)
                                console.log("popover sceneIndex: " + index);
                            }} 
                            color="secondary"
                            disabled = {index === 1}
                        >Move left
                        </F7Button>
                        <F7Button 
                            popoverClose 
                            onClick={()=>{
                                moveScene('right', index)
                                console.log("popover sceneIndex: " + index);
                            }} 
                            color="secondary"
                            disabled={index === scenesCount}
                        >Move right
                        </F7Button>
                    </ListItem>         
                    <ListItem>
                        <F7Button 
                            popoverClose 
                            onClick={()=>{
                                f7.dialog.confirm('Are you sure you want to delete scene '+index,()=>deleteScene(index))
                                // deleteScene(index)
                                console.log("popover sceneIndex: " + index);
                            }} 
                            color="red"
                        >Delete scene
                        </F7Button>
                    </ListItem> 
                </List>
            </Popover>
        </Box>
    )
}

function Voice({text,versionIndex,sceneIndex,handleChange, role, manuscriptStatus, saveVoice}){
    console.log("role: " + role)
    console.log("manuscriptStatus "+manuscriptStatus)
    const [voice,setVoice] = useState(text)
    useEffect(()=>{
        setVoice(text)
    },[text])

    function onSaveVoice(e){
        console.log("saving voice: ", {voice,sceneIndex})
        saveVoice(voice,sceneIndex)
    }

    console.log("disabled: ",["review","approved"].includes(manuscriptStatus))
    
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
                    onChange={(e)=>{setVoice(e.target.value)}}
                >
                </TextField>
                {text!==voice && <Stack direction="row">
                    <Button onClick={()=>onSaveVoice({voice,versionIndex,sceneIndex})} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setVoice(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
            
        </Stack>
    )
}

function Action({text,versionIndex,sceneIndex,handleChange, role, manuscriptStatus, saveAction}){
    const[action,setAction] = useState(text)
    useEffect(()=>{
        setAction(text)
    },[text])

    function onSaveAction(e){
        console.log("saving action: ", {action, sceneIndex})
        saveAction(action,sceneIndex)
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
                    onChange={(e)=>{setAction(e.target.value)}}
                />
                {text!==action && <Stack direction="row">
                    <Button onClick={()=>onSaveAction({action,versionIndex,sceneIndex})} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setAction(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
        </Stack>
    )
}