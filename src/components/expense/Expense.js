import { useNavigate } from "react-router-dom"
import classes from './expense.module.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/themeSlice";
const Expense =() =>{
 const navigate = useNavigate();
 const [expenses, setExpenses] = useState([]);
 const [editingItemId, setEditingItemId] = useState(null);
 const [isPremiumActivated, setIsPremium] = useState(false);
 const [totalExpenses, setTotalExpenses] = useState(0);
 const url ='https://expense-tracker-70907-default-rtdb.firebaseio.com/expenses.json'
 
 const list = expenses.map((expense) => (
  <li key={expense.key} >
    
    <span>{expense.price}  </span>
    <span>{expense.description}  </span>
    <span>{expense.category}  </span>
    <span> <button onClick={() => deleteBtnHandler(expense)}> Delete</button></span>
    <span> <button onClick={() =>editHandler(expense.key,
    expense.description,
    expense.price,
    expense.category)}> Edit</button></span>
  </li>
))
 const dispatch = useDispatch();
 const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
const myEmail = useSelector((state) => state.auth.email);
const isDarkTheme = useSelector((state) => state.theme.isDark)

 const amountRef = useRef();
 const descRef = useRef();
 const categoryRef = useRef();

 const toggleThemeHandler = () => {
  dispatch(themeActions.toggleTheme());
};

const downloadCSVHandler = () =>{
  const csvData = expenses.map((expense) => {
    return `${expense.description},${expense.price},${expense.category}`;
  });
  const csvContent = `Description,Price,Category\n${csvData.join("\n")}`;
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

  const submitHandler = async (e) => {  
    e.preventDefault();
    const enteredPrice = amountRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const obj= {
      price: enteredPrice,
      description: enteredDesc,
      category: enteredCategory,
      email: myEmail,
    }
   try{
    if(editingItemId){
      await axios.put( `https://expense-tracker-70907-default-rtdb.firebaseio.com/expenses/${editingItemId}.json`,
      {
        price: enteredPrice,
        description: enteredDesc,
        category: enteredCategory,
      })     
    }else
     await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json" },
    })
   
    
    console.log(expenses)
    console.log('expense added successfully')
   } catch(err){
    console.log(err, 'error adding expense')
   } 
   fetchData()
     };

  const fetchData = async () =>{
  try{
    const response = await axios.get(url)
    const data = response.data;
    console.log('data',data);
    const entriesArray = Object.entries(data).map(([key, expense]) => ({
      key, ...expense
    }) );
    
    const userExpenses = entriesArray.filter(
      (expense) => expense.email === myEmail
    );
  console.log(userExpenses, 'userexp')

   if(myEmail){
    setExpenses( userExpenses)
   } 
    let totalExpenses = 0;
    for (const expense of userExpenses) {
      totalExpenses += parseFloat(expense.price);
    }
    setTotalExpenses(totalExpenses);
  }catch(err){
    console.log(err)
  }

  
  }   
  const deleteBtnHandler = async (expense) => {
    try {
      await axios.delete(
        `https://expense-tracker-70907-default-rtdb.firebaseio.com/expenses/${expense.key}.json`
      );

      console.log("Successfully deleted expense");
      fetchData();
    } catch (error) {
      console.log("Error deleting an item", error);
    }
  };

  const editHandler =  (key, description, price, category)=>{
    setEditingItemId(key)
    amountRef.current.value = price
   descRef.current.value = description
    categoryRef.current.value= category
  }
 
 useEffect(() => {
  fetchData();
}, []);
 return(<>
<h2 className={classes.h2}> Welcome to Expense Tracker</h2>
<span className="Total">Total Expense: {totalExpenses}</span>

{totalExpenses > 10000 && isAuthenticated && (
        <div className="premium-button">
          {!isPremiumActivated && (
            <button
              className="premium-button1"
              onClick={() =>{setIsPremium(true)}}
            >
              Activate Premium
            </button>
          )}
        </div>)}
        {isPremiumActivated && (
            <div className="PremiumProp">
              <button className="propButton" onClick={toggleThemeHandler}>
                {isDarkTheme ? "Light" : "Dark"} Theme
              </button>
              <button className="propButton" onClick={downloadCSVHandler}>
                Download CSV
              </button>
              <button className="propButton" onClick={() =>{setIsPremium(false)}}>
                Cancel
              </button>
            </div>
          )}    

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
          <label htmlFor="category" className="form-label">Category</label>
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
    {list}

   

    
    

              
</>)   
}

export default Expense