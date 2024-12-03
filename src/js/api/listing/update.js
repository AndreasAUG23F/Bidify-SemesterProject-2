// export async function updateProfile(username, { avatar, banner }) {
//     const profileBody = {
//       avatar: avatar,
//       banner: banner,
//     };

//     console.log("request body", profileBody);

//     try {
//       const response = await fetch(API_SOCIAL_PROFILES + "/" + username, {
//         method: "PUT",
//         headers: headers(),
//         body: JSON.stringify(profileBody),
//       });

//       console.log("Request Payload", JSON.stringify(profileBody, null, 2));
//       console.log("Response", response);

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Profile updated", data);
//         window.location.href = "/profile/";
//         return data;
//       }
//     } catch (error) {
//       console.error("An error occurred", error);
//     }
//   }
