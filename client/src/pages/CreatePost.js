import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';   // for data validation
import axios from 'axios';

function CreatePost() {
  const navigate = useNavigate();
  
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("Title is required"),
    postText: Yup.string().trim().required(),
    username: Yup.string().trim().min(3).max(15).required("Username is not valid"),
  })

  const onSubmit = async (data) => {
    await axios.post("http://localhost:3001/posts", data=data).then( (response) => {
      console.log(`New Post created by ${data.username}`)
    });
    navigate("/")
  }

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Title:</label>
          <ErrorMessage name='title' component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="Post title..."
          />     {/* name should be the same as the column name in the database */}
          <label>Post:</label>
          <ErrorMessage name='postText' component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="Description..."
          />
          <label>Username:</label>
          <ErrorMessage name='username' component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Username..."
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost