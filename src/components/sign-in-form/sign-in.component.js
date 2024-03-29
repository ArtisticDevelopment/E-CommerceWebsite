import { useState, useContext } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //setting up User Context
  // const { setCurrentUser } = useContext(UserContext);

  const SignInWithGoogle = async () => {
    //deconstructing user from the response
    //from signInWithGooglePopup
    await signInWithGooglePopup();
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
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      //stopped using signOutHandler to prevent rerendering of three
      //components (nav, sign-in, sign-up). Now there is the
      //authStateChangedListener inside user.context that is able to
      //setCurrentUser locally every time the user/auth value changes from
      //a full object to null by signing in and out. This helps upkeep
      //a dynamic UI and optimization

      //function to upload user to Context
      // setCurrentUser(user);

      console.log(user);
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
    //important to recognize that event.target.name and event.target.value doesn't
    //work unless you put name and value inside the <FormInput> element
    <SignInContainer className="sign-in-container">
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
        <ButtonsContainer className="buttons-container">
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
            Sign In
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={SignInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
