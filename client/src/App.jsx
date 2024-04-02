import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([{}]);

  async function fetchData() {
    try {
      const result = await fetch('http://localhost:5000/api/users', { method: 'GET' });
      const usersFromServer = await result.json();
      setUsers(usersFromServer);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUser(id) {
    try {
      const result = await fetch('http://localhost:5000/api/users/' + id, { method: 'DELETE' });
      const objWithMessage = await result.json();
      console.log(JSON.stringify(objWithMessage));
      let usersTemp = users.filter(p => p.id !== id);
      setUsers(usersTemp);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {users.map(user => <div key={user.id}>
        <span>
          {user.id} {user.name}, {user.surname} <button onClick={() => deleteUser(user.id)}>Delete user</button> <br />
        </span>
      </div>)}
    </div>
  )
}

export default App
