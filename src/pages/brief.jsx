import React, {useEffect} from 'react';
import { Page, Navbar, Block, List, ListItem, useStore, Button } from 'framework7-react';

const BriefPage = ({f7route}) => {
  const brief = useStore('project').brief
  console.log("brief: ", brief)

  function startQuestionnaire() {
    
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
          <Button onClick={()=>startQuestionnaire()}>Start brief questionnaire</Button>
        </Block>
      </>}

    </Page>
  )
}

export default BriefPage;
