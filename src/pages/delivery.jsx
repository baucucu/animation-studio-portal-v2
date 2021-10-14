import React from 'react';
import { Page, Block, BlockTitle, useStore } from 'framework7-react';

const DeliveryPage = () => {
  
  const project = useStore('project')

  if(project?.delivery?.completed === undefined) return <DeliveryClosed/>
  
  else return (
  <Page className="viewPage">
    <Block inset strong>
        <BlockTitle>Delivery content</BlockTitle>
      </Block>
  </Page>
)};

export default DeliveryPage;

function DeliveryClosed() {
  return(
    <Page className="viewPage">
      <Block inset strong>
        <BlockTitle>Delivery step is closed</BlockTitle>
      </Block>
    </Page>
    
  )
}