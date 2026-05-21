import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const registerUser = async (wallet) => {
  try {

    await setDoc(
      doc(db, "users", wallet),
      {
        walletAddress: wallet,
        createdAt: new Date(),
        balance: 0,
        gasSaved: 0
      }
    );

    console.log("User Registered");

  } catch (error) {
    console.log(error);
  }
};