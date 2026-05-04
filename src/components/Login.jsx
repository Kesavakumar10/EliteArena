import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from "../utils/auth";
import './Login.css';

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

return (
<div className="login-page">
<form onSubmit={submit} className="login-form">
<div className="login-content">
<h2>Login</h2>
{err && <p className="login-error">{err}</p>}
<div className="login-field">
<label>Email: </label>
<input name="email" onChange={handle} value={form.email} className="login-input"/>
</div><br />
<div className="login-field">
<label>Password: </label>
<input name="password" type="password" onChange={handle} value={form.password} className="login-input"/>
</div><br />
<button className="login-button">Login</button>
  <p className="login-signup-text">
    Doesn't have an account?{' '}
    <span
      className="login-signup-link"
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
