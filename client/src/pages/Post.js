import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostObject(response.data);
    })
  }, []);

  return (
    <div className="postPage">
      <div className="singlePost">
        <div className="content">
          <div className="title"> {postObject.title} </div>
          <div className="body"> {postObject.postText} </div>
        </div>
        <div className="footer"> {postObject.username} </div>
      </div>
      <div className="comments">
        Comment Section
      </div>
    </div>
  )
}

export default Post;