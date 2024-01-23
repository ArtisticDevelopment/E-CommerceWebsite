import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignUpContainer } from "./sign-up.styles";

// import { UserContext } from "../../context/user.context";
//coulda/shoulda been stored inside SignUpForm but ZTM does this
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  //local state values and functions to change values
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  //function to change context values
  // const { setCurrentUser } = useContext(UserContext);

  //stopped using signOutHandler to prevent rerendering of three
  //components (nav, sign-in, sign-up). Now there is the
  //authStateChangedListener inside user.context that is able to
  //setCurrentUser locally every time the user/auth value changes from
  //a full object to null by signing in and out. This helps upkeep
  //a dynamic UI and optimization
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      //we only want the user object and not the whole response object
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //sets current user to context state
      // setCurrentUser(user);

      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
      resetFormFields();
      console.log(userDocRef);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      }
      console.log("error creating user", error);
    }
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    //import to recognize that event.target.name and event.target.value doesn't
    //work unless you put name and value in side the <input> element
    <SignUpContainer className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
