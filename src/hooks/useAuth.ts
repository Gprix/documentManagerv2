import { auth } from "@/config/firebase.config";
import { useAuthStore } from "@/stores/auth.store";
import { GoogleAuthProvider, User } from "firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { useCallback, useMemo } from "react";

const useAuth = () => {
  const setUid = useAuthStore((s) => s.setUid);

  const subscriber = useCallback(async (user: User | null) => {
    if (!user) return;
    // actions to do with current auth firebase user
    const { uid } = user;
    setUid(uid);
  }, []);

  return useMemo(
    () => ({
      signOut: async () => {
        await signOut(auth);
        // other actions
      },
      signInWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        try {
          const credentials = await signInWithPopup(auth, provider);
          // other actions
          return credentials;
        } catch (err) {
          console.error({ err });
        }
      },
      listenAuthState: () => auth.onAuthStateChanged(subscriber),
    }),
    []
  );
};

export default useAuth;
