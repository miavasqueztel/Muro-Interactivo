import React, { useState } from 'react';
import { db, storage, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function PostForm() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 💫 preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) {
      alert('Escribe algo o selecciona una imagen 😅');
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `posts/${uuidv4()}-${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, 'posts'), {
      content,
      imageUrl,
      author: user.email,
      createdAt: serverTimestamp(),
    });

    // Limpiar form después de publicar
    setContent('');
    setImage(null);
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Crear nuevo post</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu post aquí..."
        rows="3"
        style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <div style={{ marginTop: '1rem' }}>
          <p>Vista previa:</p>
          <img src={preview} alt="preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <button type="submit" style={{ marginTop: '1rem' }}>
        Publicar
      </button>
    </form>
  );
}
