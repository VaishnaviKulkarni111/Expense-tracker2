import { useNavigate } from "react-router-dom"


function HomePage(){
const navigate = useNavigate()
const updateHandler = () =>{
navigate('/profile')
 }

return(<>
    <h1> Welcome to Expense Tracker</h1>
    <section>
    <p>Your profile is incomplete 
<button onClick={updateHandler}> Complete now</button>
</p>
    </section>
    </>)
   
}

export default HomePage