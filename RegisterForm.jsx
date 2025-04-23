import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export default function RegisterForm() {
  const [form, setForm] = useState({ email: '', password: '', name: '', lastname: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, 'users', res.user.uid), {
        name: form.name,
        lastname: form.lastname,
        email: form.email,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="lastname" placeholder="Apellido" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}
