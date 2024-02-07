import React ,{ useContext}from "react";
 import ExpenseContext from "../../store/ExpenseContext";
// import classes from'./MedicineList.module.css';


const ExpenseList = () => {
  
  const Ctx = useContext(ExpenseContext)
  console.log(Ctx.expenses)
  return ( 
    <div >
      {Ctx.ExpenseValue.expenses.map((expense) => (
        <li key={expense.id} >
          <span>{expense.name}  </span>
          <span>{expense.description}  </span>
          <span>{expense.category}  </span>

        </li>
      ))}
    </div>
    
  );
};

export default ExpenseList;