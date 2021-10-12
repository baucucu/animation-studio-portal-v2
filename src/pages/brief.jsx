import React   from 'react';
import { Popup, Page, Navbar,NavRight,Link, Block,BlockTitle, List, ListItem, Button, useStore } from 'framework7-react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const BriefPage = () => {
  const brief = useStore('project').brief

  if (brief.completed) {
    return (
      <List inset meediaList>  
        {brief.formResponse.answers.map((item,index) =>{
          return (
            <ListItem 
              key={index}
              title={brief.formResponse.definition.fields[index].title}
              after={String(item[item.type]?.label || item[item.type]?.labels || item[item.type])}
              >
            </ListItem>)})}
      </List>
  )} else {
    return (
      <Page id="briefForm">
        <Block strong inset>
          <Stack sx={{flexDirection:'row', alignItems:'center'}}>
            <Stack>
              <h2>Fill the questionnaire</h2>
              <p>You have 23 hours and 22 minutes to submit a response to the questionnaire.</p>
              <p>Be careful when filling in the form, no changes are possible afterwards</p>
              <Button raised fill popupOpen=".brief-popup" >Start brief questionnaire</Button>
            </Stack>
            <img style={{height:200, marginLeft:40}} src="../assets/fill_form.png"/>
          </Stack>  
        </Block>
        
        <Popup
          // push
          tabletFullscreen
          className="brief-popup"
        >
          <Page style={{display: 'flex', flexDirection: 'column'}}>
            <Navbar title="Brief Form">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <div style={{flexGrow:1, height:'100%'}}>
              <iframe style={{height:'100%', width: '100%' }} scrolling="no" seamless="seamless" title="Brief" src={brief.formUrl}></iframe>
            </div>
          </Page>
        </Popup>   
      </Page>     
    )
  }
}

export default BriefPage;
