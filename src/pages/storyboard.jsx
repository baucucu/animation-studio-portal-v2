import React from 'react';
import { Page, Block, BlockTitle, useStore } from 'framework7-react';

const StoryboardPage = () => {
  
  const project = useStore('project')

  if(project?.storyboard?.completed === undefined) return <StoryboardClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
        <BlockTitle>Storyboard content</BlockTitle>
      </Block>
  </Page>
)};

export default StoryboardPage;

function StoryboardClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Storyboard step is closed</BlockTitle>
      </Block>
    </Page>
    
  )
}