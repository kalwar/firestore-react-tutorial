import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const usersCollectionRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    console.log(data);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //use spread operator to return all fields from data
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    getUsers();
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}> Create User</button>

      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1> Name: {user.name} </h1>
            <h1> Age: {user.age} </h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
