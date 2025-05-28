import './css/App.css';
import './css/Home.css';
import './css/CreatePost.css';
import './css/Post.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PageNotFound from "./pages/404Page"
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const resetAuthState = {
    username: "",
    id: -1,
    status: false,
  }
  const [authState, setAuthState] = useState(resetAuthState);

  useEffect( () => {
    axios.get('http://localhost:3001/auth', { headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response) => {
      if(response.data.error) {
        setAuthState(resetAuthState);
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log("authState has changed:", authState);
  // }, [authState]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(resetAuthState);
  };

  return (
    <div className="App"> 
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Link to="/"> Home </Link>
          <Link to="/createpost"> Create A Post </Link>
          {!authState.status ? (
            <>
              <Link to="/login"> Login </Link>
              <Link to="/registration"> Sign Up </Link>
            </>
          ) : (
            <button onClick={logout}> Logout </button>
          )}
          <label> {authState.username} </label>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;