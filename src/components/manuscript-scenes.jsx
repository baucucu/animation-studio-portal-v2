import React, {useState} from 'react';
// import CommentsDrawer from '../components/comments-drawer.jsx'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MicIcon from '@mui/icons-material/Mic';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RateReviewIcon from '@mui/icons-material/RateReview';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


export default function ManuscriptScenes(props) {

    const {briefDrawerOpen} = props
    const [commentsDrawerOpen, setCommentsDrawerOpen] = useState(false)
    const toggleDrawer = () => {
        setCommentsDrawerOpen(!commentsDrawerOpen)
    }

    // const [showBriefDrawer, setShowBriefDrawer] = useState(false)
    // const toggleBriefDrawer = () => {
    //     setShowBriefDrawer(!showBriefDrawer)
    // }

    return(
        <Box >
            {/* <Drawer
                
                opened={briefDrawerOpen}
                openedStateMode="shrink"
                position="left"
                revealMode="slide"
                component={BriefDrawer}
                // closeOnOutsideClick={this.onOutsideClick}
                // height="100%"
            >
                <Drawer
                    
                    opened={commentsDrawerOpen}
                    openedStateMode="shrink"
                    position="right"
                    revealMode="slide"
                    component={CommentsDrawer}
                    // closeOnOutsideClick={this.onOutsideClick}
                    // height="100%"
                > */}
                    
                    <Scenes toggleDrawer={toggleDrawer}/>
                {/* </Drawer>
            </Drawer>             */}
        </Box>
    )
}

function BriefDrawer(props) {
    return(
        <Box pr={2}>
            Brief drawer *****************************
        </Box>
    )
}


function Scenes(props) {
    const {toggleDrawer} = props
    return(
        <Grid pb={2} pr={2} container spacing={2} direction="row" rows={1} wrap="nowrap" sx={{overflow:"auto", flexGrow: 1, alignItems:"stretch", }}>
            {[1,2,3,].map((card,id) => 
                <Grid item key={id}>
                    <Card sx={{width: 450}}>
                        <CardContent >
                            <Stack sx={{flexDirection:"row", justifyContent: "space-between"}}>
                                <Typography variant="h6" color="text.secondary" component="div">Scene #</Typography>
                                <IconButton color="primary" aria-label="open comments" onClick={() => {toggleDrawer(id)}}>
                                    <Badge badgeContent={4} color="secondary" >
                                        <RateReviewIcon color="action" onClick={() => {}}/>
                                    </Badge>
                                </IconButton>
                            </Stack>
                            {/* <Typography variant="body2" color="text.secondary" component="div">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography> */}
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
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}