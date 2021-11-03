import React, {useState, useEffect} from 'react';
import {Swiper, SwiperSlide, useStore } from 'framework7-react';


import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import DeleteIcon from '@mui/icons-material/Delete';
import MicIcon from '@mui/icons-material/Mic';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function StoryboardScenes() {
    
    const project = useStore('project') 
    const user = useStore('user')
    
    const mongodb = user.mongoClient("mongodb-atlas");
    const projectsCollection = mongodb.db("AnimationStudioDB").collection("Projects");

    const [languages,setLanguages] = useState([])

    // let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
    
    function getLanguageName(code) {
        console.log("code: ",code)
        return languageNames.of(code.toUpperCase()) 
    }

    useEffect(() => {
        fetch('https://translation.googleapis.com/language/translate/v2/languages?key=xxxxx')
        .then(response => response.json())
        .then(res => res.data.languages.map(item =>  {return {label: getLanguageName(item.language) , code: item.language }}))
        .then(res => setLanguages([...res]))
    },[])

    useEffect(() => {
        console.log("languages: ",languages)
    },[languages])

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
        tempstoryboard.scenes.map((scene,index) => {
            if(sceneIndex===scene.index) {
                tempstoryboard.scenes[index].voice = voice
            }  
        })
        projectsCollection.updateOne({_id:(project._id)},{
            $set:{"manuscript":tempManuscript}
        })
    }
    function saveAction(action,sceneIndex) {
        let tempManuscript = project.manuscript
        console.log(String("saving action to version "+versionIndex+" scene "+sceneIndex))
        tempstoryboard.scenes.map((scene,index) => {
            if(sceneIndex===scene.index) {
                tempstoryboard.scenes[index].action = action
            }  
        })
        projectsCollection.updateOne({_id:(project._id)},{
            $set:{"manuscript":tempManuscript}
        })
    }

    return(
        <Grid pb={2} pr={2} container spacing={2} direction="row" rows={1} wrap="nowrap" sx={{overflow:"auto", flexGrow: 1, alignItems:"stretch", }}>
            {sortScenes(project?.storyboard.scenes).map((scene,id) => 
                <Grid item key={scene.id}>
                    <Card sx={{width: 450}}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" sx={{justifyContent:"space-between"}}>
                                    <Typography variant="h6" color="text.secondary" component="div">Scene {`#${scene.index}`}</Typography>        
                                    <Stack direction="row" sx={{alignItems:"center",justifyContent:"center"}} spacing={1}>
                                        <Chip variant="outlined" color="success" size="small" icon={<CheckCircleIcon/>} label="Sketch"></Chip>
                                        <Chip variant="outlined" color="success" size="small" icon={<CheckCircleIcon/>} label="Illustration"></Chip>
                                    </Stack>
                                </Stack>
                                <Swiper pagination navigation>
                                    <SwiperSlide style={{height:200}}>Slide 1</SwiperSlide>
                                    <SwiperSlide>Slide 2</SwiperSlide>
                                    <SwiperSlide>Slide 3</SwiperSlide>
                                </Swiper>
                                <LanguageSelector languages={languages}/>
                                <Stack spacing={2}>
                                    <Voice
                                        saveVoice={saveVoice} 
                                        manuscriptStatus={project.manuscript.status} 
                                        role={user?.customData?.role} 
                                        sceneIndex={scene.index} 
                                        text={project.storyboard.scenes[id].voice}
                                        disabled
                                    />
                                    <Action 
                                        saveAction={saveAction} 
                                        manuscriptStatus={project.manuscript.status} 
                                        role={user?.customData?.role} 
                                        sceneIndex={scene.index} 
                                        text={project.storyboard.scenes[id].action}
                                        disabled
                                    />
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}

function LanguageSelector(props) {

    return (
      <Autocomplete
        disablePortal
        disableClearable
        // id="combo-box-demo"
        options={props.languages}
        sx={{ width: 'auto' }}
        renderInput={(params) => <TextField size="small" {...params} label="Translate to"/>}
      />
    );
  }

// function OptionsButton({index}) {
//     useEffect(()=>{
//         console.log("scene: " + JSON.stringify(index))
//     },[])

//     return(
//         <Box>
//             <F7Button popoverOpen={`#scene${index}`} onClick={()=>{console.log("options button sceneIndex: "+index)}} icon="more_vert" >
//                 <MoreVertIcon/>
//             </F7Button>
//             <Popover id={"scene"+index} closeByOutsideClick className="more-popover-menu">
//                 <List menuList>
//                     <ListItem
//                         link
//                         title="Upload sketches"
//                     >
//                         {/* <F7Button slot="after" popoverClose ><Icon aurora="f7:square_arrow_left_fill" /></F7Button> */}
//                     </ListItem> 
//                     <ListItem
//                         link
//                         title="Upload illustrations"
//                     >
//                         {/* <F7Button slot="after" popoverClose ><Icon aurora="f7:rotate_left_fill" /></F7Button> */}
//                     </ListItem>
//                 </List>
//             </Popover>
//         </Box>
//     )
// }

function Voice({text,sceneIndex, role, manuscriptStatus, saveVoice, disabled}){
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
                    disabled={disabled}
                    onChange={(e)=>{setVoice(e.target.value)}}
                >
                </TextField>
                {text!==voice && <Stack direction="row">
                    <Button onClick={onSaveVoice} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setVoice(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
            
        </Stack>
    )
}

function Action({text,sceneIndex, role, manuscriptStatus, saveAction, disabled}){
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
                    color="secondary"
                    pl={2}
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Action"
                    multiline
                    maxRows={20}
                    placeholder="Maximum 4 rows"
                    value={action}
                    disabled={disabled}
                    onChange={(e)=>{setAction(e.target.value)}}
                />
                {text!==action && <Stack direction="row">
                    <Button onClick={onSaveAction} variant="text" color="success" startIcon={<CheckCircleIcon />}>Save</Button>
                    <Button onClick={()=>setAction(text)} variant="text" color="error" startIcon={<DeleteIcon />}>Cancel</Button>
                </Stack>}
            </Stack>
        </Stack>
    )
}