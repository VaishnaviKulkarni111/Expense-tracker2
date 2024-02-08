import { useNavigate } from "react-router-dom"
import classes from './expense.module.css'
import { useContext, useRef, useState } from "react";
import axios from "axios";
const Expense =() =>{
 const navigate = useNavigate();
 const [expenses, setExpenses] = useState([]);
 const url ='https://expense-tracker-70907-default-rtdb.firebaseio.com/expenses.json'
 const amountRef = useRef();
 const descRef = useRef();
 const categoryRef = useRef();

  const submitHandler = async (e) => {  
    e.preventDefault();
    const enteredPrice = amountRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCategory = categoryRef.current.value;
 
   try{
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        price: enteredPrice,
        description: enteredDesc,
        category: enteredCategory,
      }),
      headers: { "Content-type": "application/json" },
    })
    setExpenses(expenses)
    console.log(res)
    console.log('expense added successfully')
   } catch(err){
    console.log(err, 'error adding expense')
   } 
   fetchData()
     };

  const fetchData = async () =>{
  try{
    const response = await fetch(url,{
      method: 'GET',
    })
    
    if (response.status !== 200) {
      throw new Error("Failed to fetch expenses");
    }
    const data = response.data;
    
    console.log('data is',data);
  }catch(err){
    console.log(err)
  }
  }   
  const deleteBtnHandler = async (expense) => {
    try {
      console.log("Deleting expense with ID:", expense.id);

      await axios.delete(
        `https://expense-tracker-70907-default-rtdb.firebaseio.com/expenses/${expense.id}.json`
      );

      console.log("Successfully deleted expense");
      fetchData();
    } catch (error) {
      console.log("Error deleting an item", error);
    }
  };
 const updateHandler = () =>{
    navigate('/profileform')
 }
 return(<>
<h2 className={classes.h2}> Welcome to Expense Tracker</h2>
<p>Your profile is incomplete 
<button onClick={updateHandler}> Complete now</button>
</p>
<div className="container mt-5">
<div className="col-md-5">
  <h2 >Add your expenses here</h2>
   <form onSubmit={submitHandler}>
   <div className="mb-3">
      <label htmlFor="exp" className="form-label">Expense</label>
      <input type="number" className="form-control" id="amount" required ref={amountRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control"    id="desc"  required ref={descRef}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Category</label>
          <select className="form-select" id="category"  required ref={categoryRef}>
            <option value="" >Select Category</option>
            <option value="food">Food</option>
            <option value="salary">Salary</option>
            <option value="rent">Rent</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
    
    <div >
      {expenses.map((expense) => (
        <li key={expense.id} >
          
          <span>{expense.amount}  </span>
          <span>{expense.desc}  </span>
          <span>{expense.category}  </span>
          <span> <button onClick={deleteBtnHandler(expense)}> Delete</button></span>
          <span> <button> Edit</button></span>
        </li>
      ))}
    </div>
</>)   
}

export default Expense