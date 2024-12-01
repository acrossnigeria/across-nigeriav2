import Layout from '@/components/Layout'
import React from 'react'
import Landing from '@/components/giveawayquiz/Landing';

function landingPage() {

  return (
    <Layout>
      <Landing/>
    </Layout>
  )
}


landingPage.auth = true;
export default landingPage;