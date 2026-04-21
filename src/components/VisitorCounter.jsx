import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

// visitor ID generator
function getVisitorId() {
  let id = localStorage.getItem("visitor_id");

  if (!id) {
    id = "id-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("visitor_id", id);
  }

  return id;
}

function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const run = async () => {
      const visitorId = getVisitorId();

      const visitorRef = doc(db, "visitors", visitorId);
      const visitorSnap = await getDoc(visitorRef);

      const counterRef = doc(db, "stats", "counter");

      // اگر نیا visitor ہو
      if (!visitorSnap.exists()) {
        await setDoc(visitorRef, { createdAt: Date.now() });

        await updateDoc(counterRef, {
          total: increment(1),
        });
      }

      const counterSnap = await getDoc(counterRef);
      setCount(counterSnap.data().total);
    };

    run();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>👀 Visitors: {count}</h3>
    </div>
  );
}

export default VisitorCounter;