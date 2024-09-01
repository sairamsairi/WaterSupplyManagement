import { useState } from "react";
import axios from "axios";
import { getuserID } from "../hooks/getuserID";
const widthStyle={
  width:'100px',
  
}
const formStyle={
  width:'500px',
}
const formContainerStyle={
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}
const Createrecipe = () => {
  const userID=getuserID();
  const [recipe,setRecipe]=useState({
    name:"",
    numbers:"",
    house:"",
    email:"",
    userOwner:userID,
  })
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setRecipe({...recipe,[name]:value})
  };
 

  // const handleIngredientChange=(event,idx)=>{
  //   const {value} =event.target;
  //   const numbers=recipe.numbers;
  //   numbers[idx]=value;
  //   setRecipe({...recipe,numbers});
  //   console.log(recipe);
  // }

  // const addIngredient=()=>{
  //   setRecipe({...recipe,numbers:[...recipe.numbers,""]})
  // }
  const onSubmit=async(event)=>{
    event.preventDefault();
    console.log("Submitting recipe:", recipe);
    try{
      await axios.post("http://localhost:3006/recipes",recipe);
      alert("Complaint received");
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className="create-recipe"  style={formContainerStyle}>
      <h2>Complaint</h2>
      <form style={formStyle}>
        <label htmlFor="house">House ID</label>
        <input type="text" id="house" name="house" onChange={handleChange} />
        <label htmlFor="number">Number</label>
        <input type="text" id="number" name="number" onChange={handleChange} />
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="mail">Mail</label>
        <input type="text" id="mail" name="mail" onChange={handleChange} />
        <button onClick={onSubmit} type="submit" style={widthStyle}>Submit</button>
      </form>

    </div>
  )};
  export default Createrecipe;