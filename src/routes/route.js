import Login from '../pages/login/Login.jsx';
import Signup from '../pages/signup/Signup.jsx';
import Home from '../pages/home/Home.jsx';
import Mypost from '../pages/home/Mypost.jsx';
import Allpost from '../pages/home/Allpost.jsx';
import Logout from '../pages/logout/logout.jsx';
let routesarray = (setShowNavbar) => [
    {
        path: "/Signup",
        element: <Signup setShowNavbar = {setShowNavbar}/>
    },
    {
        path: "/",
        element: <Login setShowNavbar = {setShowNavbar}/>
    },
    {
        path: "/Home",
        element: <Home setShowNavbar = {setShowNavbar}/>
    },
    {
        path: "/mypost",
        element: <Mypost setShowNavbar = {setShowNavbar}/>
    },
    {
        path: "/allpost",
        element: <Allpost setShowNavbar = {setShowNavbar}/>
    },
    {
        path: "/logout",
        element: <Logout setShowNavbar = {setShowNavbar}/>
    }
]

export default routesarray;
