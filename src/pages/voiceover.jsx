import React from 'react';
import { Page, Block, BlockTitle, useStore } from 'framework7-react';

const VoiceoverPage = () => {
  
  const project = useStore('project')

  if(project?.voiceover?.completed === undefined) return <VoiceoverClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
        <BlockTitle>Voiceover content</BlockTitle>
      </Block>
  </Page>
)};

export default VoiceoverPage;

function VoiceoverClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Voiceover step is closed</BlockTitle>
      </Block>
    </Page>
    
  )
}