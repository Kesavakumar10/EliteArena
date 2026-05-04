import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import './Protected.css';


export default function Protected(){
const [data, setData] = useState(null);
const [err, setErr] = useState(null);


useEffect(() => {
const load = async () => {
try {
const res = await API.get('/protected');
setData(res.data);
} catch (e) {
setErr(e.response?.data?.error || 'Failed to load');
}
};
load();
}, []);


return (
<div>
<h2>Protected Page</h2>
{err && <div className="protected-error">{err}</div>}
{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <div>Loading...</div>}
</div>
);
}
