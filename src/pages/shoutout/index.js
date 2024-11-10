import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

function Index() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/booking/booking", {params:{param:'fetch'}});
        setData(response.data.map(doc=>doc.dateSelected));
         console.log(data); // Log response.data directly
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Log data whenever it changes
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout>
      shoutout
    </Layout>
  );
}

export default Index;
