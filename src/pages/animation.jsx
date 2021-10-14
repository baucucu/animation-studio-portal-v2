import React from 'react';
import { Page, Block, BlockTitle, useStore } from 'framework7-react';

const AnimationPage = () => {
  
  const project = useStore('project')

  if(project?.animation?.completed === undefined) return <AnimationClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
        <BlockTitle>Animation content</BlockTitle>
      </Block>
  </Page>
)};

export default AnimationPage;

function AnimationClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Animation step is closed</BlockTitle>
      </Block>
    </Page>
    
  )
}