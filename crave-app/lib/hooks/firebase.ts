import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QueryFieldFilterConstraint,
  UpdateData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export {
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  increment,
} from "@firebase/firestore";

/**
 * React wrappers for Firebase queries
 */

/**
 * Retrieve a document with realtime updates
 *
 * @param docRef A firebase document reference
 * @param defaultValue If provided, a document will be created using this data if the referenced document does not exist. Additionally, if a document is deleted, a new one will be created.
 * @returns The document data, null if the document does not exist, or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useDocumentRealtime<TData extends DocumentData>(
  docRef: DocumentReference<TData, TData>,
  defaultValue?: ProviderLike<TData>,
): DocumentHandle<TData> {
  const [data, setData] = useState<TData | null>();
  const { set, update } = useDocMutators(docRef);

  /* eslint-disable react-hooks/exhaustive-deps */
  // don't refetch if just changing the default value. only the reference
  useEffect(() => {
    return onSnapshot(docRef, (doc) =>
      existOrCreate(defaultValue)(doc).then(setData),
    );
  }, [docRef]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { data, set, update };
}

/**
 * Retrieve a document snapshot
 *
 * @param docRef A firebase document reference
 * @param defaultValue If provided, a document will be created using this data if the referenced document does not exist
 * @returns The document data, null if the document does not exist, or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/get-data
 */
export function useDocument<TData extends DocumentData>(
  docRef: DocumentReference<TData, TData>,
  defaultValue?: ProviderLike<TData>,
): DocumentHandle<TData> {
  const [data, setData] = useState<TData | null>();
  const { set, update } = useDocMutators(docRef);

  /* eslint-disable react-hooks/exhaustive-deps */
  // don't refetch if just changing the default value. only the reference
  useEffect(() => {
    getDoc(docRef).then(existOrCreate(defaultValue)).then(setData);
  }, [docRef]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { data, set, update };
}

/**
 * Retrieve all documents from a collection with (optional) query constraints
 *
 * @param collectionRef A firebase collection reference
 * @param constraints A list of query constraints
 * @returns An array of documents or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/queries
 */
export function useCollectionRealtime<TData extends DocumentData>(
  collectionRef: CollectionReference<TData, TData>,
  constraints: QueryFieldFilterConstraint[] | undefined = undefined,
): TData[] | undefined {
  const [data, setData] = useState<TData[]>();
  useEffect(() => {
    console.log("we have recreated the useEffect");
    const q = constraints
      ? query(collectionRef, ...constraints)
      : query(collectionRef);
    return onSnapshot(q, (querySnapshot) => {
      const changes = querySnapshot.docChanges().length;
      console.log("new data", changes);
      if (changes === 0) return;
      setData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [collectionRef, constraints]);
  return data;
}
/**
 * Retrieve all documents from a collection with (optional) query constraints
 *
 * @param collectionRef A firebase collection reference
 * @param constraints A list of query constraints
 * @returns An array of documents or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/queries
 * @deprecated prefer useCollectionRealtime
 */
export function useCollection<TData extends DocumentData>(
  collectionRef: CollectionReference<TData, TData>,
  ...constraints: QueryFieldFilterConstraint[]
): TData[] | undefined {
  const [data, setData] = useState<TData[]>();
  useEffect(() => {
    const q = constraints
      ? query(collectionRef, ...constraints)
      : query(collectionRef);
    getDocs(q).then((querySnapshot) => {
      setData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [collectionRef, constraints]);
  return data;
}

function existOrCreate<TData extends DocumentData>(
  defaultValue: ProviderLike<TData>,
): (doc: DocumentSnapshot<TData>) => Promise<TData>;
function existOrCreate<TData>(
  defaultValue?: ProviderLike<TData> | undefined,
): (doc: DocumentSnapshot<TData>) => Promise<TData | null>;
function existOrCreate<TData>(defaultValue?: ProviderLike<TData> | undefined) {
  return async (doc: DocumentSnapshot<TData>) => {
    if (doc.exists()) {
      return doc.data();
    } else if (typeof defaultValue == "function") {
      // type hacking :)
      const provided = (
        defaultValue as (ref: DocumentReference<TData>) => TData
      )(doc.ref);
      await setDoc(doc.ref, provided);
      return provided;
    } else if (defaultValue) {
      await setDoc(doc.ref, defaultValue);
      return defaultValue;
    } else {
      return Promise.resolve(null);
    }
  };
}

type ProviderLike<TData> = TData | ((ref: DocumentReference<TData>) => TData);
type DocumentMutator<TData> = (data: TData) => Promise<TData>;
export type DocumentHandle<TData> = {
  data: TData | null | undefined;
  set: DocumentMutator<TData>;
  update: DocumentMutator<UpdateData<TData>>;
};

export function useDocMutators<TData extends DocumentData>(
  docRef: DocumentReference<TData, TData>,
) {
  const set = useCallback(
    async (data: TData) => {
      await setDoc(docRef, data);
      return data;
    },
    [docRef],
  );
  const update = useCallback(
    async (data: UpdateData<TData>) => {
      await updateDoc(docRef, data);
      return data;
    },
    [docRef],
  );

  return { set, update };
}
