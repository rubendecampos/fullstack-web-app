import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostObject(response.data);
    });
    
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setPostComments(response.data);
    })

    // create an event listener so that the comment is also create when "Enter" key is pressed
    var commentInput = document.getElementById("newCommentInput");
    const handleKeyUp = (event) => {
      if(event.key === "Enter") {
        event.preventDefault();
        document.getElementById("addCommentButton").click();
      }
    }
    if (commentInput) {
      commentInput.addEventListener("keyup", handleKeyUp);
    }

    // Cleanup the listener on unmout (avoid having multiples "clicks" when component re-render)
    return () => {
      if(commentInput) {
        commentInput.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, []);

  const addComment = async () => {
    await axios.post("http://localhost:3001/comments", {
      commentBody: newComment,
      PostId: id,
    }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
        console.log(response.data.error);
      } else {
        setPostComments([...postComments, response.data]);
        setNewComment("");
      }
    });
  };

  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:3001/comments/${id}`, {headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response) => {
      if (!response.error) {
        // keep all the commments except the one we are deleting
        setPostComments(postComments.filter((val) => {
          return val.id != id;
        }));
      }
    });
  };

  return (
    <div className="postPage">
      <div className="singlePost">
        <div className="content">
          <div className="title"> {postObject.title} </div>
          <div className="body"> {postObject.postText} </div>
        </div>
        <div className="footer"> {postObject.username} </div>
      </div>
      <div className="commentsContainer">
        <div className="createComment">
          <input id="newCommentInput"
            type="text"
            placeholder="Comments..."
            value={newComment} onChange={(event) => {
            setNewComment(event.target.value)
          }} />
          <button id="addCommentButton" onClick={addComment}>Add Comment</button>
        </div>
        <div className="allComments">
          {postComments.map((value, key) => {
            return (
              <div key={key} className="commentBody">
                <label> @{value.username} </label>
                {value.commentBody}
                {authState.username === value.username && (
                  <button onClick={() => {deleteComment(value.id)}}> X </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


export default Post;