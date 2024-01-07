import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const SignInWithGoogle = async () => {
    //deconstructing user from the response
    //from signInWithGooglePopup
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  //on submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    //after submit, reset form fields
    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    //on submit, try to create Firebase auth with email and password
    //error catching for user friendly UI
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      //error-catch for wrong email or password
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found, check email");
          break;

        case "auth/wrong-password":
          alert("incorrect password");
          break;
      }
    }
  };

  //when typing, every strike updates the state
  //with new object key: pair values.
  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    //import to recognize that event.target.name and event.target.value doesn't
    //work unless you put name and value in side the <input> element
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button buttonType="" type="submit">
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
