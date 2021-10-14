import React, {useState} from 'react';
import { Page, Icon, Block, Input, Segmented, Button,f7 } from 'framework7-react';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MUIButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


import ManuscriptScenes from '../components/manuscript-scenes'

const ManuscriptPage = () => {
  
  const [version, setVersion] = useState(1)
  const [language, setLanguage] = useState("English")
  
  const handleChangeVersion = (event) => {
    setVersion(event.target.value);
  };

  return (
  <Page className="viewPage">
    <Stack direction="row" justifyContent="stretch">
    <Block inset strong>
        <Stack direction="row" spacing={2}>
          <SplitButton />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel color="secondary" id="demo-simple-select-label">Version</InputLabel>
              <Select
                color="secondary"
                size="small"
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={version}
                label="Version"
                onChange={handleChangeVersion}
              >
                <MenuItem value={1}>1 (current)</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Stack direction="row" mt={2} spacing={2}>
          <Box>
              <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to send to client?')}>
                Send to client
              </MUIButton>
            </Box>
            <Box>
              <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?')}>
                Extend time
              </MUIButton>
            </Box>
            <Box>
            <Chip  color="secondary" variant="outlined" icon={<AccessTimeIcon/>} label="In review by client"/>
            </Box>
        </Stack>
      </Block>
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
        <Stack direction="row" mt={3} spacing={2}>
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
      <Block inset strong style={{flexGrow:2}}>
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
        <Stack direction="row" spacing={2} mt={3}>
          
          <Box>
            <MUIButton size="small" variant="contained" color= "success" startIcon={<CheckIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to approve the manuscript?')}>
              Approve manuscript
            </MUIButton>
          </Box>
          <Box>
            <MUIButton size="small" variant="contained" color= "warning" startIcon={<RateReviewIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to ask for revision?')}>
              Ask for revision
            </MUIButton>
          </Box>
          <Box>
            <Chip  color="secondary" variant="outlined" icon={<AccessTimeIcon/>} label="Open by manuscript writer"/>
          </Box>
          
        </Stack>
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
    <Segmented  tag="div">
      <Button  round size="small"  outline active>
        English
      </Button>
      <Button round size="small"  outline>
        Swedish
      </Button>
      <Button round size="small"  outline>
        
        Norwegian
      </Button>
    </Segmented>   
  );
}