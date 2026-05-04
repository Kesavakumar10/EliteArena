import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';


export default function Register(){
const [form, setForm] = useState({ name: '', email: '', password: '' });
const [err, setErr] = useState(null);
const navigate = useNavigate();


const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const submit = async (e) => {
e.preventDefault();
setErr(null);
try{
await API.post('/auth/register', form);
alert('Registered! Please login.');
navigate('/login');
}catch(e){
setErr(e.response?.data?.error || 'Failed');
}
};

return (
<div className="register-page">   
<form onSubmit={submit} className="register-form">
<h2>Register</h2>
{err && <p className="register-error">{err}</p>}
<div>
<label>Name:</label>
<input name="name" onChange={handle} value={form.name} className="register-input"/>
</div><br />
<div>
<label>Email:</label>
<input name="email" onChange={handle} value={form.email} className="register-input" />
</div><br />
<div>
<label>Password:</label>
<input name="password" type="password" onChange={handle} value={form.password} className="register-input"/>
</div><br />
<button type="submit" className="register-button">Register</button>
</form>
</div> 
);
}
