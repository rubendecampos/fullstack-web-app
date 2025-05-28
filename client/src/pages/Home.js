import React, { useContext } from 'react';
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Home(){
  const [allPosts, setAllPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(
      "http://localhost:3001/posts"
    ).then( (response) => {
      const postArray = response.data;

      if (authState.status) {
        // filter trough each post and get only the post IDs from the posts
        // the user liked
        console.log(postArray)
        setLikedPosts(postArray.filter((post) => {
          return post.Likes.some((like) => {return like.UserId === authState.id});
        }).map((post) => {return post.id}));
      } else {
        setLikedPosts([]);
      }

      setAllPosts(postArray);
    });
  }, [authState]);  // load/refresh when the dependencies in the given list change


  const  likePost = async (postId) => {
    await axios.post(
      "http://localhost:3001/likes",
      { postId: postId },
      { headers: { "accessToken": localStorage.getItem("accessToken")}
    }).then((response) => {
      // respond an error if user is not logged in
      if (response.data.error) {
        alert(response.data.error)
        console.log(response.data.error);
        return;
      }

      // refresh the list of posts when a like is made to update the number of likes displayed
      setAllPosts(allPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.liked) {
            return {...post, Likes: [...post.Likes, 0]};
          } else {
            const tempArray = post.Likes;
            tempArray.pop();      // pop a random element to decrease 'Likes' length
            return {...post, Likes: tempArray};
          }
        } else {
          return post
        }
      }));

      // updated the list of likedPosts
      if (likedPosts.includes(postId)) {
        setLikedPosts(likedPosts.filter(id => id != postId));
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
    });
  };
  
  return (
    <div className='Home'>
      {allPosts.map((value, key) => {
        return (
          <div key={key} className="post" onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className="header">
              <div className="title">{value.title}</div>
              <div className="like-btn">
                {likedPosts.includes(value.id) ? (
                  <FavoriteIcon
                    onClick={(event) => {
                      event.stopPropagation();  // avoid propagating the click to the parent 'post'
                      likePost(value.id);
                  }}
                    className="full-icon"/>
                ) : (
                  <FavoriteBorderIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      likePost(value.id);
                  }}
                    className="border-icon"/>
                )}
              </div>
            </div>
            <div className="body"> {value.postText} </div>
            <div className="footer">
              <div className="likes-nbr">{value.Likes.length} likes</div>
              <div className="username">{value.username}</div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Home;