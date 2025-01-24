import Layout from '@/components/Layout'
import React from 'react';
import Profile from '@/components/Profile';

const profile = () => {
  return (
    <Layout>
      <Profile/>
    </Layout>
  )
}

profile.auth = true;
export default profile;
