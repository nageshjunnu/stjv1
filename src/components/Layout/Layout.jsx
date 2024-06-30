import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header/Header';
import LeftSide from '../components/LeftSide';

function Layout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const path = router.asPath; // Assuming your route parameter is named "id"

  useEffect(() => {
    // Check for authentication logic here and update isAuth state
    // setIsAuth(true/false based on authentication check);
  }, []);

  console.log("Path:", path);

  return (
    <>
      {/* <div id="loader"></div> */}
      {path !== "/" && !path.startsWith("/reset") ? (
        <>
          <Header />
          <LeftSide />
        </>
      ) : null}
      {children}
    </>
  );
}

export default Layout;
