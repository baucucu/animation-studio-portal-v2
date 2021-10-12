import React, {useEffect, useRef, useState} from 'react';
import { Popup, Page, Navbar,NavRight,Link, Block, List, ListItem, Button, useStore } from 'framework7-react';


const BriefPage = ({f7route}) => {
  const brief = useStore('project').brief
  console.log("brief: ", brief)
  const [briefModalOpen, setBriefModalOpen] = useState(false)
  const popup = useRef(null);

  function startQuestionnaire() {
    console.log('open brief modal button clicked')
    setBriefModalOpen(true)
  }

  return(
      <Page>
        <Navbar title="Brief" />
        {brief.completed && <>
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
        </>}

        {!brief.completed && <>
          <Block strong inset>  
            <p>In order to start your project, we need to collect some information about your company, product, and your expectations.</p>

            <p>This will lay the ground for the whole project and will be shared with all creators working on the project.</p>

            <p>The questionnaire contains about 40 questions and takes roughly 30 minutes to respond to.</p>

            <p>Make sure you have gathered all involved parties on your side when answering the questions in the brief. The more detailed the better it is!</p>

            <p>Click the link below to start the questionnaire.</p>
            <Button popupOpen=".brief-popup" onClick={startQuestionnaire}>Start brief questionnaire</Button>
          </Block>
          <Popup
            push
            tabletFullscreen
            className="brief-popup"
            opened={briefModalOpen}
            onPopupClosed={() => setBriefModalOpen(false)}
          >
            <Page>
              <Navbar title="Brief Form">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <div>
                <iframe style={{height:'1000px', width: '100%' }} scrolling='no' title="Brief" src={brief.formUrl}></iframe>
              </div>
            </Page>
          </Popup>
        </>}
      </Page>
  )
}

export default BriefPage;
