import { useNavigate } from "react-router-dom"
import './home.css'
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux";
function HomePage(){
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
const navigate = useNavigate()
const updateHandler = () =>{
navigate('/profile')
 }

return(<>

    <h1 className="h1"> Welcome to Expense Tracker !</h1>
    {!isLoggedIn && <h4>Please Login to use the provided services </h4>}
   { isLoggedIn && <section className="section">
    <p>Your profile is incomplete 
<Button onClick={updateHandler} variant="link"> Complete now</Button>
</p>
    </section>}
    </>)
   
}

export default HomePage

// src= https://cdn4.vectorstock.com/i/1000x1000/23/98/budget-tracking-set-smartphone-background-vector-35182398.jpg