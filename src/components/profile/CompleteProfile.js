import { useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../../store/auth-context";
import { useSelector } from "react-redux";

const CompleteProfile =() =>{
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [profile, setProfile] = useState([])
    const [email, setEmail] = useState('');

    const nameRef = useRef();
    const photoRef = useRef();
    const authCtx = useContext(AuthContext) 
    const idToken = useSelector((state) => state.auth.idToken)
    useEffect(() =>{
        saveData();
    },[])
    const ProfileData = {
        name: name,
        photo: photo,
        id: Math.random().toString(),
    }
    const submitHandler=async (e) =>{
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredPhotoUrl = photoRef.current.value;
   
   
    const urlP = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD4V11PNolpKhtXgURPq9zel2py2kUt5Sw'
    try{
        const res = await fetch(urlP, {
        method: "POST",
        body: JSON.stringify({
        idToken,
        displayName: enteredName,
        photoUrl: enteredPhotoUrl ,
        
        }),
        headers: { "Content-type": "application/json" },
     })
     const data = await res.json();

     if (res.ok) {
       console.log('User profile updated successfully', data);
     } else {
       console.error('Error updating user profile', data);
     }
    }catch(err){
     console.log(err)
    }

    setProfile(ProfileData)
    console.log(ProfileData)
    }

    const saveData = async() =>{
    const url= 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD4V11PNolpKhtXgURPq9zel2py2kUt5Sw'    
    try{
    const res= await fetch(url,{
     method: "POST",   
     idToken
     }) 
     if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || "Failed to fetch user data");
      }

      const data = await res.json();
      const userData = data.users[0];

      setName(userData.displayName );
      setPhoto(userData.photoUrl );
      setEmail(userData.email );    

    }catch(err){
     console.log(err)
    }
    }

   const verifyEmail =async()=>{
    const url= 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD4V11PNolpKhtXgURPq9zel2py2kUt5Sw';
    try{
    const res = await fetch(url,{
        method: "POST",
        body: JSON.stringify({
        requestType:"VERIFY_EMAIL",
        idToken
        }),
        headers: { "Content-type": "application/json" },   
    })
    const data = await res.json();

     if (res.ok) {
       console.log('Verification email sent successfully', data);
     } else {
       console.error('Error sendinf email', data);
     }
    }catch(err){
    console.log(err)
    }
   }

    return(<>
    <h2>Contact Details</h2>
    <form onSubmit={submitHandler}>
     <label htmlFor="name">Full Name</label>
     <input type="text" value={name} onChange={e => setName(e.target.value)} ref={nameRef} />
     <label htmlFor="name">Profile Photo URL</label>
     <input type="text" value={photo} onChange={e => setPhoto(e.target.value)} ref={photoRef}/>
     <button type="submit">Update</button>
    </form>
    <button onClick={verifyEmail}> Verify email</button>

    </> )
}

export default CompleteProfile