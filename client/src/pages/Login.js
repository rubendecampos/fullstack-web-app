import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';   // for data validation
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  
  const initialValues = {
    identifier: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    identifier: Yup.string().trim().min(1).required("Username is not valid"),
    password: Yup.string().trim().min(1).required("Password is not valid"),
  })

  const onSubmit = async (data) => {
    await axios.post("http://localhost:3001/auth/login", data=data).then( (response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Logged in successfully");
        localStorage.setItem("accessToken", response.data.token);
        setAuthState(true);
        navigate("/");
      }
      console.log(response.data);
    });

    // TODO: display a pop up window, or a small message indicating the successful logged in
    // If password is wrong, it should not navigate to home page, but instead stay on the login
    // page and show in red "incorrect passwor" or "user not found"

  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Username or Email:</label>
          <ErrorMessage name='identifier' component="span" />
          <Field
            id="inputLogin"
            name="identifier"
            placeholder="Username or Email..."
          />
          <label>Password:</label>
          <ErrorMessage name='password' component="span" />
          <Field
            id="inputLogin"
            type="password"
            name="password"
            placeholder="Password..."
          />
          <button type="submit">Sign in</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login