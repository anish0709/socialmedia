import React from 'react'
import routesarray from './route';
import {Routes, Route} from 'react-router-dom';

const Myroute = ({setShowNavbar}) => {
  const routes = routesarray(setShowNavbar);
  return (
    <>
        <Routes>
        {routes.map((e, index)=>{
            return(
                <Route key={index} path={e.path} element={e.element} />
            )
        })}
        </Routes>
    </>
  )
}

export default Myroute;
