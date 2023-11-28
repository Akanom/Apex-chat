// //Fetching data from user CRUD

// //Creating a user
// const create = async (user) => {
//   try {
//     let res = await fetch("/api/users/", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
//     const data = await res.json();

//     if (res.ok) {
//       return data;
//     } else {
//       throw new Error(data.error); // Throw an error with the server error message
//     }
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     throw err; // Re-throw the error to propagate it to the caller
//   }
// };

// //Listing the Users
// const list = async (signal) => {
//   try {
//     let res = await fetch("/api/users/", {
//       method: "GET", //fetch GET call to retreive all the users in the database
//       signal: signal,
//     });
//     return await res.json(); //return response as promise
//   } catch (err) {
//     console.log(err);
//   }
// };

// //Reading a user profile
// const read = async (params, credentials, signal) => {
//   try {
//     let res = await fetch("/api/users/" + params.userId, {
//       method: "GET",
//       signal: signal,
//       headers: {
//         Accept: "Application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.t,
//       },      
//     });
//     return await res.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

// //Deleting users profile
// const remove = async (params, credentials) => {
//   try {
//     let res = await fetch("/api/users/" + params.userId, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + credentials.t,
//         "Content-Type": "application/json",
//       },
//     });
//     return await res.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

// //Updating user profile
// const update = async (params, credentials, user) => {
//   try {
//     let res = await fetch("/api/users/" + params.userId, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Autorization: "Bearer " + credentials.t,
//       },
//       body: user,
//     });
//     return await res.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

// //Accessing the follow and unfollow API's in views
// const follow = async (params, credentials, followId) => {
//   try {
//     let response = await fetch("/api/users/follow/", {
//       method: "PUT",
//       headers: {
//         Accept: "Application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.t,
//       },
//       body: JSON.stringify({ userId: params.userId, followId: followId }),
//     });
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

// const unfollow = async (params, credentials, unfollowId) => {
//   try {
//     let response = await fetch("/api/users/unfollow/", {
//       method: "PUT",
//       headers: {
//         Accept: "Application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.t,
//       },
//       body: JSON.stringify({ userId: params.userId, followId: unfollowId }),
//     });
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

// //finding people and displaying them
// const findPeople = async (params, credentials, signal) => {
//   try {
//     let response = await fetch("/api/users/findpeople/" + params.userId, {
//       method: "GET",
//       signal: signal,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.t,
//       },
//     });
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// };



// export { create, remove, list, read, update, follow, unfollow, findPeople };


import axios from 'axios';

// API URL
const apiUrl = "http://localhost:3000/";
// Creating a user
const create = async (user) => {
  try {
    const response = await axios.post(apiUrl, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Listing the Users
const list = async (signal) => {
  try {
    const response = await axios.get(apiUrl, { signal });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Reading a user profile
const read = async (params, credentials, signal) => {
  try {
    const response = await axios.get(`${apiUrl}${params.userId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
      },
      signal,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Deleting a user profile
const remove = async (params, credentials) => {
  try {
    const response = await axios.delete(`${apiUrl}${params.userId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${credentials.t}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Updating user profile
const update = async (params, credentials, user) => {
  try {
    const response = await axios.put(`${apiUrl}${params.userId}`, user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Accessing the follow and unfollow APIs in views
const follow = async (params, credentials, followId) => {
  try {
    const response = await axios.put('/api/users/follow/', { userId: params.userId, followId }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (params, credentials, unfollowId) => {
  try {
    const response = await axios.put('/api/users/unfollow/', { userId: params.userId, followId: unfollowId }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Finding people and displaying them
const findPeople = async (params, credentials, signal) => {
  try {
    const response = await axios.get(`/api/users/findpeople/${params.userId}`, {
      signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { create, remove, list, read, update, follow, unfollow, findPeople };
