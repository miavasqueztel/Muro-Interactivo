import React, { useEffect, useState } from "react";
import Registro from "./components/RegisterForm";
import Login from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-2xl font-bold text-center mb-4">Muro Interactivo 🧼</h1>

      {!user && (
        <>
          <h2 className="text-lg font-semibold">Registro</h2>
          <Registro />
          <h2 className="text-lg font-semibold mt-4">Iniciar Sesión</h2>
          <Login />
        </>
      )}

      {user && (
        <>
          <h2 className="text-lg font-semibold">¡Hola {user.email}!</h2>
          <PostForm />
        </>
      )}

      {/* ESTA PARTE SE MUESTRA SIEMPRE */}
      <h2 className="text-lg font-semibold mt-6">📝 Posts de todos los usuarios</h2>
      <PostList />
    </div>
  );
}

export default App;


