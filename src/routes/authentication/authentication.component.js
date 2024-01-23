import SignUpForm from "../../components/sign-up-form/sign-up.component";
import SignInForm from "../../components/sign-in-form/sign-in.component";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
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

  // const logGoogleUser = async () => {
  //   //deconstructing user from the response
  //   //from signInWithGooglePopup
  //   const { user } = await signInWithGooglePopup();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  return (
    <AuthenticationContainer className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign In With Google Popup</button> */}
      <SignInForm />
      <SignUpForm />

      {/* <button onClick={signInWithGoogleRedirect}>
          Sign In With Google Redirect
        </button> */}
    </AuthenticationContainer>
  );
};

export default Authentication;
