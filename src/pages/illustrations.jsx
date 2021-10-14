import React from 'react';
import { Page, Block, BlockTitle, useStore } from 'framework7-react';

const IllustrationsPage = () => {
  
  const project = useStore('project')

  if(project?.illustrations?.completed === undefined) return <IllustrationsClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
        <BlockTitle>Illustration content</BlockTitle>
      </Block>
  </Page>
)};

export default IllustrationsPage;

function IllustrationsClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Illustration step is closed</BlockTitle>
      </Block>
    </Page>
    
  )
}