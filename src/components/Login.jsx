import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from "../utils/auth";

export default function Login(){
const [form, setForm] = useState({ email: '', password: '' });
const [err, setErr] = useState(null);
const navigate = useNavigate();


const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const submit = async (e) => {
  e.preventDefault();
  setErr(null);

  try {
    const res = await API.post('/auth/login', form);
    const token = res.data.token;

    localStorage.setItem('token', token);

    const role = getUserRole();

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/"); // home page
    }
  } catch (e) {
    setErr(e.response?.data?.error || 'Login failed');
  }
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  outline: 'none', 
  fontSize: '14px'
};
const buttonStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#00b894',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer'
};

return (
<div style={{height:'100vh', display: 'flex', alignItems: 'center', justifyContent:'center', border: '1px solid black',padding:'20px'}}>
<form onSubmit={submit} style={{ maxWidth: 520,minWidth: 320, border: '1px solid black',padding: '40px', borderRadius:'10px', boxShadow: '0 10px 25px rgba(130, 13, 154, 0.82)' }}>
<div style={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column'}}>
<h2>Login</h2>
{err && <p style={{ color: 'red' }}>{err}</p>}
<div style={{width: '100%'}}>
<label>Email: </label>
<input name="email" onChange={handle} value={form.email} style={inputStyle}/>
</div><br />
<div style={{width: '100%'}}>
<label>Password: </label>
<input name="password" type="password" onChange={handle} value={form.password} style={inputStyle}/>
</div><br />
<button style={buttonStyle}>Login</button>
  <p
    style={{
      marginTop: '15px',
      fontSize: '14px',
      textAlign: 'center'
    }}
  >
    Doesn't have an account?{' '}
    <span
      style={{
        color: '#00b894',
        cursor: 'pointer',
        fontWeight: '500'
      }}
    onClick={() => navigate('/register')}
    >
    Sign up
    </span>
  </p>
</div>
</form>
</div>
);
}