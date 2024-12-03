// // export async function readProfile(username) {}

// // export async function readProfiles(limit, page) {}

// import { AUCTION_PROFILES } from '../constants';

// export async function readProfile(userData) {
//   try {
//     const response = await fetch(`${AUCTION_PROFILES}/${userData}`, {
//       method: 'GET',
//       headers: headers(),
//     });
//     if (response.ok) {
//       const data = await response.json();
//       return data.data;
//     }
//   } catch (error) {
//     console.error('Error reading profile:', error);
//   }
// }
