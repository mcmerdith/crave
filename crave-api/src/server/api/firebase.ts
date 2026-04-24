import { getApp, initializeApp, cert, App } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { env } from "@/env";

const adminConfig = {
  projectId: "crave-ea79a",
  privateKey: `-----BEGIN PRIVATE KEY-----${env.FIREBASE_ADMIN_PRIVKEY}`,
  clientEmail: "firebase-adminsdk-fbsvc@crave-ea79a.iam.gserviceaccount.com",
};

console.debug("Initializing Firebase");

// @ts-expect-error required to get around build-time errors with Next
let _app: App = undefined;
// @ts-expect-error required to get around build-time errors with Next
let _auth: Auth = undefined;
// @ts-expect-error required to get around build-time errors with Next
let _firestore: Firestore = undefined;

try {
  _app = getApp();
} catch {
  try {
    _app = initializeApp({
      credential: cert(adminConfig),
    });
  } catch (e) {
    console.error("Failed to initialize!", e);
  }
}

try {
  _auth = getAuth(_app);
  _firestore = getFirestore(_app);
} catch {}

try {
  _firestore.settings({
    ignoreUndefinedProperties: true,
  });
} catch {}

export const firebaseApp = _app;
export const firebaseAuth = _auth;
export const firestore = _app;

console.debug("Done!");
