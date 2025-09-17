import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';   // for data validation
import axios from 'axios';

function Registration() {
  const navigate = useNavigate();
  
  const initialValues = {
    username: "",
    password: "",
    email: "",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().min(3).max(15).required("Username is not valid"),
    password: Yup.string().trim().min(4).max(30).required("Password is not valid"),
    email: Yup.string().trim().required("Email is not valid"),
  })

  const onSubmit = async (data) => {
    await axios.post("http://localhost:3001/auth", data=data).then( (response) => {
      console.log(response.data);
    });
    navigate("/");
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Username:</label>
          <ErrorMessage name='username' component="span" />
          <Field
            id="inputRegistration"
            name="username"
            placeholder="Username..."
          />
          <label>Email:</label>
          <ErrorMessage name='email' component="span" />
          <Field
            id="inputRegistration"
            name="email"
            placeholder="email@gmail.com"
          />
          <label>Password:</label>
          <ErrorMessage name='password' component="span" />
          <Field
            id="inputRegistration"
            type="password"
            name="password"
            placeholder="Password..."
          />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration