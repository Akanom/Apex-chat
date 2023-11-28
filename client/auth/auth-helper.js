import { signout } from "./api-auth.js";

const auth = {
  // If the user successfully signs in, save the JWT credentials
  authenticate(jwt, bc) {
    if (typeof window !== "undefined") {
      // Use sessionStorage instead of localStorage to store the JWT token
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
    bc();
  },

  // Retrieve the stored credentials to check if the current user is signed in
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    
    // Use sessionStorage instead of localStorage to retrieve the JWT token
    const jwt = sessionStorage.getItem("jwt");
    
    if (jwt) {
      return JSON.parse(jwt);
    } else {
      return false;
    }
  },

  // Deleting credentials when a user signs out
  clearJWT(bc) {
    if (typeof window !== "undefined") {
      // Use sessionStorage instead of localStorage to remove the JWT token
      sessionStorage.removeItem("jwt");
    }
    
    bc();
    
    // Call the signout function, and remove the cookie as well
    signout().then((data) => {
      // Clear the cookie by setting its expiration to the past
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
