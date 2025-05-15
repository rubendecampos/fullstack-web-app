import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(){
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then( (response) => {
      setAllPosts(response.data);
    });
  }, []);  // load/refresh when the dependencies in the given list change (here its empty)
  
  return (
    <div className='Home'>
      {allPosts.map((value, key) => {
        return (
          <div key={key} className="post" onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className="title"> {value.title} </div>
            <div className="body"> {value.postText} </div>
            <div className="footer"> {value.username} </div>
          </div>
        )
      })}
    </div>
  );
}

export default Home;