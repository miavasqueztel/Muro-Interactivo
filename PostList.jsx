import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (post) => {
    const confirm = window.confirm('¿Eliminar este post?');
    if (!confirm) return;
    if (post.imageUrl) {
      const imageRef = ref(storage, post.imageUrl);
      await deleteObject(imageRef);
    }
    await deleteDoc(doc(db, 'posts', post.id));
  };

  if (loading) return <p className="text-center text-gray-500">Cargando posts...</p>;

  return (
    <div className="mt-4 space-y-4">
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white p-4 rounded-2xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            layout
          >
            <p className="font-semibold text-sm text-gray-600 mb-2">{post.author}</p>
            <p className="text-gray-800">{post.content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="mt-2 rounded-xl max-h-64 object-cover w-full"
              />
            )}
            {currentUser?.email === post.author && (
              <button
                onClick={() => handleDelete(post)}
                className="mt-3 text-sm text-red-500 hover:underline"
              >
                Eliminar
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
