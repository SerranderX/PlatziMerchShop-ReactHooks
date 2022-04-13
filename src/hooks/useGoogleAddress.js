import { useState, useEffect } from 'react';
import configEnv from '../config'
import axios from 'axios';

const useGoogleAddress = address => {
  const [map, setMap] = useState({});
  const API = `${configEnv.apiLocation}?address=${address}&key=${configEnv.apiKeyGoogleMaps}`;

  useEffect(async () => {
    const response = await axios(API);
    setMap(response.data.results[0].geometry.location);
  }, []);

  return map;
};

export default useGoogleAddress;