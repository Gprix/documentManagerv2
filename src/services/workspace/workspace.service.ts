import { doc, where, query, setDoc, getDoc, or } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";

import { Workspace, WriteWorkspacePayload } from "./workspace.service.types";
import { db, auth } from "@/config/firebase.config";
import { filterFalsy } from "@/utils/common.utils";

/**
 * Write workspace to database
 */
export const writeWorkspace = async (payload: WriteWorkspacePayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const { members: payloadMembers = [] } = payload;
    const members = filterFalsy([user.uid, ...payloadMembers]);

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "workspaces", uid), {
      uid,
      ownerUid: user.uid,
      members,
    });
    return uid;
  } catch (e) {
    console.error(e);
  }
};

export const getWorkspace = async (uid: string) => {
  try {
    const docRef = doc(db, "workspaces", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Workspace;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getWorkspaces = async () => {
  const collectionRef = collection(db, "workspaces");
  const querySnapshot = await getDocs(collectionRef);

  const workspacesData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));

  return workspacesData;
};

/**
 * Get workspaces where current user is owner or member (requires authentication)
 */
export const getCurrentUserWorkspaces = async (): Promise<Workspace[]> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const workspacesRef = collection(db, "workspaces");
    const q = query(
      workspacesRef,
      or(
        where("ownerUid", "==", auth.currentUser?.uid),
        where("members", "array-contains", auth.currentUser?.uid)
      )
    );

    const querySnapshot = await getDocs(q);

    const workspacesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return workspacesData as Workspace[];
  } catch (e) {
    console.error(e);
    return [];
  }
};
