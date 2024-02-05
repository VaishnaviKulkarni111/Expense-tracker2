import { Link } from 'react-router-dom';
import classes from './navbar.module.css'
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';

const Navbar = () =>{
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logouHandler = () =>{
      authCtx.logout();
    }
  return(<>
  <header className={classes.header}>
    <nav >
    <ul>
     <li>
     <Link to='/home' className={(isActive) => isActive ? classes.active : undefined} >
     Home</Link>
     </li>
     <li>
     <Link to='/products' className={(isActive) => isActive ? classes.active : undefined} >
     Products</Link>
     </li>
     <li>
     <Link to='/about' className={(isActive) => isActive ? classes.active : undefined} >
        About</Link>
     </li>     
     { isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
    </li>}
     { isLoggedIn && ( <li>
          <button onClick={logouHandler}>Logout</button>
    </li>  )}         
    </ul>
    </nav>
</header>
   


   </>)  


}

export default Navbar