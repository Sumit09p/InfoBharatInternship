// src/components/Toast.jsx
import { useState, useEffect } from 'react';

let toastFn = null;
export function showToast(message, type = 'success') {
  if (toastFn) toastFn({ message, type });
}

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    toastFn = ({ message, type }) => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 2500);
    };
    return () => { toastFn = null; };
  }, []);

  if (!toast) return null;
  const color = toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-gray-800';

  return (
    <div className="fixed top-14 inset-x-0 flex justify-center z-50 pointer-events-none">
      <div className={`pointer-events-auto ${color} text-white px-4 py-2 rounded-lg shadow-lg`}>
        {toast.message}
      </div>
    </div>
  );
}
