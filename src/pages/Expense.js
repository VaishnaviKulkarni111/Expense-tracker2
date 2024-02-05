import { useNavigate } from "react-router-dom"

const Expense =() =>{
 const navigate = useNavigate();

 const updateHandler = () =>{
    navigate('/profileform')
 }
 return(<>
<p> Welcome to Expense Tracker</p>
<p>Your profile is incomplete 
<button onClick={updateHandler}> Complete now</button>
</p>

</>)   
}

export default Expense