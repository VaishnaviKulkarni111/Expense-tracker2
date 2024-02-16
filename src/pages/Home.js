import { useNavigate } from "react-router-dom"
import './home.css'
import { Button } from "react-bootstrap"
function HomePage(){
const navigate = useNavigate()
const updateHandler = () =>{
navigate('/profile')
 }

return(<>

    <h1 className="h1"> Welcome to Expense Tracker !</h1>
    <section className="section">
    <p>Your profile is incomplete 
<Button onClick={updateHandler} variant="link"> Complete now</Button>
</p>
    </section>
    </>)
   
}

export default HomePage

// src= https://cdn4.vectorstock.com/i/1000x1000/23/98/budget-tracking-set-smartphone-background-vector-35182398.jpg