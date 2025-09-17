import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePage">
      <div className="basicInfo"> <h2> {username} </h2> </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post" onClick={() => {navigate(`/post/${value.id}`)}}>
              <div className="header">
                <div className="title">{value.title}</div>
              </div>
              <div className="body"> {value.postText} </div>
              <div className="footer">
                <div> {value.Likes.length} likes</div>
                <div> {value.username} </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Profile;