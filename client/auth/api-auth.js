//Integrating API from the server with the frontend

//Signin
const signin = async (user) => {
  try {
    let res = await fetch(
      "/auth/signin/", //user signin data retreived from the view
      {
        method: "POST", // POST call to verify the user with the backend
        header: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      }
    );
    return await res.json(); // return to component in a promise
  } catch (err) {
    console.log(err);
  }
};

//Signout
const signout = async () => {
  try {
    let res = await fetch(
      "/auth/signout", // user data retreived from the backend
      {
        method: "GET", // GET method made to the signout API endpoint on the server
      }
    );
    return await res.json(); //Promise will be returned to the component
  } catch (err) {
    console.log(err);
  }
};

export { signin, signout };
