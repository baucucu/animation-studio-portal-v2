import React, {useState, useEffect} from 'react';
import { Page, Chip, Block, BlockTitle, ListButton,Popover, List, Link, Segmented, Button,f7, useStore } from 'framework7-react';

import MUIChip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MUIButton from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import ManuscriptScenes from '../components/manuscript-scenes'

const ManuscriptPage = () => {
  
  const project = useStore('project')
  const [languageIndex, setLanguageIndex] = useState(0)
  const [versionIndex, setVersionIndex] = useState(project?.manuscript?.data[project?.manuscript?.languages[languageIndex]].versions.length)
  
  useEffect(() => {
    // console.log("new languageIndex: ",languageIndex)
  },[languageIndex])

  useEffect(() => {
    // console.log(" new versionIndex: ",versionIndex)
  },[versionIndex])
  
  useEffect(() => {
    setVersionIndex(project?.manuscript?.data[project?.manuscript?.languages[languageIndex]].versions.length)
  },[project])

  function setNewLanguage(index) {
    setLanguageIndex(index);
    setVersionIndex(project?.manuscript?.data[project?.manuscript?.languages[index]].versions.length);
  }

  if(project?.manuscript?.completed === undefined) return <ManuscriptClosed/>
  
  else return (
  <Page className="viewPage">
    <Stack direction="row" justifyContent="stretch">
    <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={1}>
          {/* <SplitButton languageIndex={languageIndex} setNewLanguage={setNewLanguage}/> */}
          <LanguageSelector languageIndex={languageIndex} setNewLanguage={setNewLanguage}/>
          {/* <VersionSelect versions={project?.manuscript?.data[project.manuscript.languages[languageIndex]].versions.map(version => version.id)} versionIndex={versionIndex} setVersionIndex={setVersionIndex}/> */}
          <VersionSelect versions={project?.manuscript?.data[project.manuscript.languages[languageIndex]].versions.map(version => version.id)} versionIndex={versionIndex} setVersionIndex={setVersionIndex}/>
          {/* <DropDownButton/> */}
        </Stack>
        <Stack direction="row" mt={2} spacing={1}>
          {project.manuscript.status === "open" && <Box>
            <MUIButton size="small" variant="contained" color= "success" startIcon={<SendIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to send to client?')}>
              Send to client
            </MUIButton>
          </Box>}
          {project.manuscript.status === "open" && <Box>
            <MUIButton size="small" variant="contained" color= "warning" startIcon={<MoreTimeIcon />} onClick={()=>f7.dialog.confirm('Are you sure you want to extend time?')}>
              Extend time
            </MUIButton>
          </Box>}
          {project.manuscript.status === "review" && <Box>
            <MUIChip  color="secondary" variant="outlined" icon={<AccessTimeIcon/>} label="In review by client"/>
          </Box>}
        </Stack>
      </Block>
      <Block inset strong style={{flexGrow:1}}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
            <Typography  variant="subtitle1" color="text.secondary" component="div">Scenes</Typography>
            <MUIChip color="secondary" variant="outlined" label={project?.manuscript?.data[project?.manuscript?.languages[languageIndex]].versions[versionIndex-1]?.scenes.length} ></MUIChip>
          </Stack>
          <Stack direction="row" sx={{alignItems:'center'}}>
            <Typography mr={1} variant="subtitle1" color="text.secondary" component="div">Word count</Typography>
            <MUIChip color="secondary" variant="outlined" label={"385"} ></MUIChip>
          </Stack>
          <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
            <Typography variant="subtitle1" color="text.secondary" component="div">Target length</Typography>
            <MUIChip color="secondary" variant="outlined" label={project?.brief.formResponse.answers[0].choice.label} ></MUIChip>
            <MUIChip color="secondary" variant="outlined" label={project?.brief.formResponse.answers[1].choice.label} ></MUIChip>
          </Stack>
          
        </Stack>
        <Stack direction="row" mt={2} spacing={2}>
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
    </Stack>
    <Block inset >
      <ManuscriptScenes  language={project?.manuscript?.languages[languageIndex]} versionIndex={versionIndex}/>
    </Block>
  </Page>
)};

export default ManuscriptPage;

function SplitButton(props) {
  const languages=useStore('project').manuscript.languages
  const {languageIndex, setNewLanguage} = props
  return (
    <Stack direction="row" spacing={2} sx={{alignItems:'center'}}>
      {/* <Typography variant="subtitle1" color="text.secondary" component="div">Language</Typography> */}
      <Segmented  tag="div">
        {languages.map((language,index) => <Button small key={index} size="small"  outline active={languageIndex === index} onClick={() => {setNewLanguage(index)}}>{language}</Button>)}
      </Segmented>   
    </Stack>
  );
}

function LanguageSelector(props) {
  const languages=useStore('project').manuscript.languages
  const {languageIndex, setNewLanguage} = props
  return(
    <ButtonGroup size="small">
      {languages.map((language,index) => <MUIButton key={index}  variant={index===languageIndex?"contained":"outlined"} color="secondary" onClick={() => {setNewLanguage(index)}}>{language}</MUIButton>)}
    </ButtonGroup>
  )
}

function ManuscriptClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Manuscript is closed</BlockTitle>
      </Block>
    </Page>
  )
}

function VersionSelect({versions, versionIndex, setVersionIndex}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("click: ",event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log("anchorEl: ",anchorEl)
    console.log("open: ",open)
  },[anchorEl])

  return (
    <Box >
      <Link popoverOpen=".popover-menu">
        <MUIButton
          variant="outlined"
          color="secondary"
          size="small"
          endIcon={<ArrowDropDownIcon/>}
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {versions.length === versionIndex ?  "version ".concat(versionIndex," (current)"): String("version "+versionIndex)}
        </MUIButton>
      </Link>
      <Popover className="popover-menu">
        <List>
          {versions.map((version, id) => <ListButton key={id} onClick={() => {console.log("new version selected: ", version); setVersionIndex(version)}}  popoverClose >{versions.length === version ?  String("Version "+version+" (current)"): String("Version "+version)}</ListButton>)}
        </List>
      </Popover>
    </Box>
  );
}

const options = ['Version 1', 'Version 2', 'Rebase and merge'];

function DropDownButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <MUIButton size="small" onClick={handleClick}>{options[selectedIndex]}</MUIButton>
        <MUIButton
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </MUIButton>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}