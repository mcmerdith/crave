import { getApp, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "@/env";

const adminConfig = {
  projectId: "crave-ea79a",
  privateKey: `-----BEGIN PRIVATE KEY-----${env.FIREBASE_ADMIN_PRIVKEY}`,
  clientEmail: "firebase-adminsdk-fbsvc@crave-ea79a.iam.gserviceaccount.com",
};

console.debug("Initializing Firebase");

let _app: App;

try {
  _app = getApp();
} catch {
  _app = initializeApp({
    credential: cert(adminConfig),
  });
}
export const firebaseApp = _app;
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
try {
  firestore.settings({
    ignoreUndefinedProperties: true,
  });
} catch {}

console.debug("Done!");
