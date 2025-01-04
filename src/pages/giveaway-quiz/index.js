import Layout from '@/components/Layout'
import React from 'react'
import Landing from '@/components/giveawayquiz/Landing';
import ProductClosed from '@/components/ProductClosed';

function landingPage() {

  return (
    <Layout>
      // <ProductClosed/>
      <Landing/>
    </Layout>
  )
}


landingPage.auth = true;
export default landingPage;