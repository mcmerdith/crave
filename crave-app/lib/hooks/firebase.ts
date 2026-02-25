import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  QueryFieldFilterConstraint,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 * React wrappers for Firebase queries
 */

/**
 * Retrieve a document with realtime updates
 *
 * @param docRef A firebase document reference
 * @returns The document data, null if the document does not exist, or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useDocumentRealtime<TData extends DocumentData>(
  docRef: DocumentReference<TData, TData>,
): TData | null | undefined {
  const [data, setData] = useState<TData | null>();
  useEffect(() => {
    return onSnapshot(docRef, (doc) => {
      setData(doc.data() ?? null);
    });
  }, [docRef]);
  return data;
}

/**
 * Retrieve a document snapshot
 *
 * @param docRef A firebase document reference
 * @returns The document data, null if the document does not exist, or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/get-data
 */
export function useDocument<TData extends DocumentData>(
  docRef: DocumentReference<TData, TData>,
): TData | null | undefined {
  const [data, setData] = useState<TData | null>();
  useEffect(() => {
    getDoc(docRef).then((doc) => {
      setData(doc.data() ?? null);
    });
  }, [docRef]);
  return data;
}

/**
 * Retrieve all documents from a collection with (optional) query constraints
 *
 * @param collectionRef A firebase collection reference
 * @param constraints A list of query constraints
 * @returns An array of documents or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/queries
 */
export function useCollection<TData extends DocumentData>(
  collectionRef: CollectionReference<TData, TData>,
  ...constraints: QueryFieldFilterConstraint[]
): TData[] | undefined {
  const [data, setData] = useState<TData[]>();
  useEffect(() => {
    const q = constraints
      ? query(collectionRef, ...constraints)
      : collectionRef;
    getDocs(q).then((querySnapshot) => {
      setData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [collectionRef, constraints]);
  return data;
}
