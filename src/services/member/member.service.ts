import { db } from "@/config/firebase.config";
import { WriteMemberPayload } from "./member.service.types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Member } from "@/types/common.types";

export const writeMember = async (payload: WriteMemberPayload) => {
  try {
    const { uid } = payload;

    await setDoc(doc(db, "members", uid), payload);
  } catch (e) {
    console.error(e);
  }
};

export const getMember = async (uid: string) => {
  const docRef = doc(db, "members", uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
    throw new Error("Member not found");
  }

  return docSnap.data() as Member;
};
