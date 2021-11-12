import { Component } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

class App extends Component {
  state = {
    users: [],
    newName: "",
    newAge: 0,
  };

  usersCollectionRef = collection(db, "users");

  getUsers = async () => {
    const data = await getDocs(this.usersCollectionRef);
    this.setState({
      users: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  };

  createUser = async () => {
    await addDoc(this.usersCollectionRef, {
      name: this.state.newName,
      age: Number(this.state.newAge),
    });
    this.getUsers();
  };

  updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    this.getUsers();
  };

  deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    this.getUsers();
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        <input
          placeholder="Name..."
          onChange={(event) => {
            this.setState({
              newName: event.target.value,
            });
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            this.setState({
              newAge: event.target.value,
            });
          }}
        />
        <button onClick={this.createUser}> Create User</button>

        {this.state.users.map((user) => {
          return (
            <div>
              {" "}
              <h1> Name: {user.name} </h1>
              <h1> Age: {user.age} </h1>
              <button
                onClick={() => {
                  this.updateUser(user.id, user.age);
                }}
              >
                {" "}
                Increase Age
              </button>
              <button
                onClick={() => {
                  this.deleteUser(user.id);
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
}

export default App;
