import Layout from '@/components/Layout'
import React from 'react'
import Landing from '@/components/giveawayquiz/Landing';
import ProductClosed from '@/components/ProductClosed';

function landingPage() {

  return (
    <Layout desc={'Play with 100 Naira and you could win 10,000 Naira'} title={'Giveaway Quizzes!'} image={'https://acrossnig.com/images/giveaway_quizzes.jpg'}>
      <Landing/>
    </Layout>
  )
}


landingPage.auth = true;
export default landingPage;