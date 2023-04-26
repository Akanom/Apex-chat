import { signout } from "./api-auth.js";
//Adding auth to the frontend

const auth = {
  //if user successfully sign-in, save jwt credentials
  authenticate(jwt, bc) {
    if (typeof window !== "undefined")
      //window if sucessfully defined
      localStorage.setItem("jwt", JSON.stringify(jwt)); //session stored in localStorage
    bc();
  },

  //retreive the stored credentials to check that the current user is signed in
  isAuthenticated() {
    if (typeof window == "undefined") return false;
    if (localStorage.getItem("jwt"))
      return JSON.parse(localStorage.getItem("jwt"));
    else return false;
  },

  //Deleting credentials when a user sign-out
  clearJWT(bc) {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    bc();
    signout().then((data) => {
      document.cookie = "t=; expires=Wed, 31 Dec 1969 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
