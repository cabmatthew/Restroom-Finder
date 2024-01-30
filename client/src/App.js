import './App.css';
// Import a react hook
// useEffect: runs a function immediately when site is loaded
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  // create a state, which is a list
  // initial value: empty array
  // [list name, function used to alter the list] 
  const [listOfUsers, setListOfUsers] = useState([]);

  // states to be populated
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  // when someone goes to URL, want to automatically 
  // make API call to populate the state (listOfUsers)

  useEffect(() => {
    // make API call to backend

    // .get URL to endpoint
    // localhost only for local, change to the website/server if online

    // .get returns a promise -> the response from backend (res.json(result))
    // .then((response) catches the data into variable response
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      // response.data accesses the data from the request
      // function setListOfUsers -> sets listOfUsers to the API request data
      setListOfUsers(response.data);
    });

  // pass a list, empty array, what is this?
  }, []);

  const createUser = () => {
    // axios post request, when button is clicked
    // send info thru the request, will use states to hold the data
    Axios.post("http://localhost:3001/createUser", {
      // name: name, 
      // age: age, 
      // username: username,
      // ABOVE CAN BE SHORTENED only if object equal to variable with same name

      // passing the states
      name,
      age,
      username,
    }).then((response) => {
      // updating the page's listOfUsers to have newest person

      // array to be set to whatever's in it, plus the object
      setListOfUsers([...listOfUsers, 
        {
          name,
          age,
          username,
        }])
    });
  };


  return (
    <div className="App">
      <div className="usersDisplay">
        {/* display users in a list manner
        make api request to backend
        need to store the data in a state*/}

        {/* react mapping, returns html */}
        {listOfUsers.map((user) => {
          return (
            <div className="person">
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          );
        })}
      </div>


      {/* inputs for user, sends to backend */}
      <div className="myForm">
        <input 
          type="text" 
          placeholder="Name..." 
          onChange={(event) => {
            setName(event.target.value)}} 
        />
        <input 
          type="number" 
          placeholder="Age..." 
          onChange={(event) => {
            setAge(event.target.value)}} 
        />
        <input 
          type="text" 
          placeholder="Username..." 
          onChange={(event) => {
            setUsername(event.target.value)}} 
        />
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
