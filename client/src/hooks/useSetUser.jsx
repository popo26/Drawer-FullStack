import { useState, useEffect } from 'react';

export default function useSetUser (retrievedUser) {

  // Initiate the internal state.
  const [state, setInternalState] = useState(retrievedUser);

  // Only on our initial load, retrieve the data from the store and set the state to that data.
  useEffect(() => {

    const storageInBrowser = JSON.parse(sessionStorage.getItem('user'))

    if (storageInBrowser) {
      setInternalState(storageInBrowser);
    }
  }, []);


  const setState = (newState) => {
    sessionStorage.set("user", newState);
    setInternalState(newState);
  };

  return [state, setState];
}