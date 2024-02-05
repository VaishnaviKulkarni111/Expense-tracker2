import { useState } from "react"


const CompleteProfile =() =>{
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [profile, setProfile] = useState([])
    
    const ProfileData = {
        name: name,
        photo: photo,
        id: Math.random().toString(),
    }
    const submitHandler=(e) =>{
    e.preventDefault();
     //setProfile((prevData) => [...prevData, ProfileData]);
    setProfile(ProfileData)
    console.log(ProfileData)
    }

    return(<>
    <h2>Contact Details</h2>
    <form onSubmit={submitHandler}>
     <label htmlFor="name">Full Name</label>
     <input type="text" value={name} onChange={e => setName(e.target.value)}/>
     <label htmlFor="name">Profile Photo URL</label>
     <input type="text" value={photo} onChange={e => setPhoto(e.target.value)}/>
     <button type="submit">Update</button>
    </form>

    </> )
}

export default CompleteProfile