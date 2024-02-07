import React, { useEffect, useState } from 'react'


const ExpenseContext = React.createContext({
    ExpenseValue:[],
 newExpense: '',
 addExpense: (expense) => {}
  });

 export const ExpenseProvider = (props) => {
    const [expenses, setExpenses] = useState([]);
      const addExpense =  (newExpense) => {
     
        // const response = await axios.post(url, { ...newExpense });
        // setExpenses([...expenses, response.data]);
        
        setExpenses((prevexpenses) => [...prevexpenses, newExpense]);
  
     
     };
  
    //   const getItem = async () => {
    //     try {
    //       const response = await axios.get(url);
    //        setExpenses( response.data);
    
    //     } catch (error) {
    //       console.log("error fetching cart cart items", error);
    //     }
    //   };
    //   useEffect(() => {
    //     getItem();
    //   }, []);
      const ExpenseValue = {
        expenses:expenses,
        addExpense : addExpense,
      };
      
        return (
          <ExpenseContext.Provider value={ExpenseValue}>
            {props.children}
          </ExpenseContext.Provider>
        );
  }; 
export default ExpenseContext;  