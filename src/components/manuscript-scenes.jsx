import React from 'react';
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



export default function ManuscriptScenes(props) {
    const project = useStore('project') 
    console.log("project: ",project)
    
    return(
        <Grid pb={2} pr={2} container spacing={2} direction="row" rows={1} wrap="nowrap" sx={{overflow:"auto", flexGrow: 1, alignItems:"stretch", }}>
            {[1,2,3,4,5].map((card,id) => 
                <Grid item key={id}>
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
                                    <Typography variant="h6" color="text.secondary" component="div">Scene {id+1}</Typography>
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
                            
                            <Stack sx={{flexDirection:"column"}} spacing={2}>
                                <Stack mt={1} sx={{flexDirection:"row"}}>
                                    <MicIcon />
                                    <TextField
                                        pl={2}
                                        fullWidth
                                        id="outlined-multiline-flexible"
                                        label="Voice"
                                        multiline
                                        maxRows={20}
                                        // value={value}
                                        placeholder="Maximum 4 rows"
                                        defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                                        // onChange={handleChange}
                                    />
                                    {/* <MoreVertIcon/> */}
                                </Stack>
                                <Stack mt={1} style={{flexDirection:"row"}} >
                                    <DirectionsRunIcon />
                                    <TextField
                                        pl={2}
                                        fullWidth
                                        id="outlined-multiline-flexible"
                                        label="Action"
                                        multiline
                                        maxRows={20}
                                        // value={value}
                                        placeholder="Maximum 4 rows"
                                        defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                                        // onChange={handleChange}
                                    />
                                </Stack>
                                <PageWithComments commentBoxId={`${String(project._id)}-${id}`} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}