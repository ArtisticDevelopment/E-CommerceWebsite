import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up.component";

const SignIn = () => {
  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     try {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const userDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //     } catch (error) {
  //       console.error("Error in getRedirectResult:", error);
  //     }
  //   };

  //   handleRedirect(); // Call the function to execute it
  // }, []); // Empty dependency array to run the effect only once

  const logGoogleUser = async () => {
    //deconstructing user from the response
    //from signInWithGooglePopup
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <div>
        <h1>I am the Sign In page</h1>
        <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        <SignUpForm />
        {/* <button onClick={signInWithGoogleRedirect}>
          Sign In With Google Redirect
        </button> */}
      </div>
    </div>
  );
};

export default SignIn;
