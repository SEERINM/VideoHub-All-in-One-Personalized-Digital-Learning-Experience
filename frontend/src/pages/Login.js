import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../Login.css';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


export default function Login(){
  const [mode, setMode] = useState("login"); // or register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const endpoint = mode === "login" ? "/api/login" : "/api/register";
    const payload = mode === "login" ? {email, password} : {username, email, password};
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(!res.ok){
        alert(data.error || "Error");
        return;
      }
      if(mode === "login"){
        localStorage.setItem("mvs_token", data.token);
        localStorage.setItem("mvs_user", JSON.stringify(data.user));
        nav("/home");
      } else {
        alert("Registered! You can now login.");
        setMode("login");
      }
    } catch (err){
      alert("Server error. Make sure backend is running.");
    }
  }

  return (
    <div className="container">
      <div className="login-box">
        <h2>{mode==="login"? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {mode==="register" && (
           <div className="form-row">
  <div className="input-wrapper">
    <FaUser className="input-icon" />
    <input
      placeholder="Username"
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      autoFocus
    />
  </div>
</div>
          )}
          <div className="form-row">
  <div className="input-wrapper">
    <FaEnvelope className="input-icon" />
    <input
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      type="email"
    />
  </div>
</div>
         <div className="form-row">
  <div className="input-wrapper">
    <FaLock className="input-icon" />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
    />
    {/* Add eye icon here if you implement show/hide password */}
    {/* <AiOutlineEye className="input-icon eye" /> */}
  </div>
</div>
          <div style={{display:"flex",gap:12}}>
            <button type="submit" style={{padding:"8px 12px"}}>{mode==="login"? "Login":"Register"}</button>
            <button type="button" onClick={()=>setMode(mode==="login"?"register":"login")} style={{padding:"8px 12px"}}>
              {mode==="login"? "Go to Register":"Back to Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/*import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login(){
  const [mode, setMode] = useState("login"); // or register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const endpoint = mode === "login" ? "/api/login" : "/api/register";
    const payload = mode === "login" ? {email, password} : {username, email, password};
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(!res.ok){
        alert(data.error || "Error");
        return;
      }
      if(mode === "login"){
        localStorage.setItem("mvs_token", data.token);
        localStorage.setItem("mvs_user", JSON.stringify(data.user));
        nav("/home");
      } else {
        alert("Registered! You can now login.");
        setMode("login");
      }
    } catch (err){
      alert("Server error. Make sure backend is running.");
    }
  }

  return (
    <div className="container">
      <div className="login-box">
        <h2>{mode==="login"? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {mode==="register" && (
            <div className="form-row">
              <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
          )}
          <div className="form-row">
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="form-row">
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div style={{display:"flex",gap:12}}>
            <button type="submit" style={{padding:"8px 12px"}}>{mode==="login"? "Login":"Register"}</button>
            <button type="button" onClick={()=>setMode(mode==="login"?"register":"login")} style={{padding:"8px 12px"}}>
              {mode==="login"? "Go to Register":"Back to Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}*/
