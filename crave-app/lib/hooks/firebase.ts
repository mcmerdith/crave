import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  UpdateData,
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export {
  arrayRemove,
  arrayUnion,
  increment,
  serverTimestamp,
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
  docRef: DocumentReference<TData, TData> | null,
  defaultValue?: ProviderLike<TData>,
): DocumentHandle<TData> {
  const [data, setData] = useState<TData | null>();
  const mutators = useDocMutators(docRef);

  /* eslint-disable react-hooks/exhaustive-deps */
  // don't refetch if just changing the default value. only the reference
  useEffect(() => {
    if (!docRef) return;
    return onSnapshot(docRef, (doc) =>
      existOrCreate(defaultValue)(doc).then(setData),
    );
  }, [docRef]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return { ref: docRef, data, ...mutators };
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
  docRef: DocumentReference<TData, TData> | null,
  defaultValue?: ProviderLike<TData>,
): DocumentHandle<TData> {
  const [data, setData] = useState<TData | null>();
  const mutators = useDocMutators(docRef);

  /* eslint-disable react-hooks/exhaustive-deps */
  // don't refetch if just changing the default value. only the reference
  useEffect(() => {
    if (!docRef) return;
    getDoc(docRef).then(existOrCreate(defaultValue)).then(setData);
  }, [docRef]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { ref: docRef, data, ...mutators };
}

/**
 * Retrieve all documents from a collection with (optional) query constraints
 *
 * @param queryOrRef A firebase collection reference or query
 * @param constraints A list of query constraints
 * @returns An array of documents or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/queries
 */
export function useCollectionRealtime<
  TData extends DocumentData,
  OData = TData,
>(
  queryOrRef: Query<TData, DocumentData> | null,
  constraints: QueryFieldFilterConstraint[] | undefined = undefined,
  documentMapFn:
    | ((
        doc: QueryDocumentSnapshot<TData, DocumentData>,
      ) => PromiseLike<OData> | OData)
    | undefined = undefined,
): OData[] | undefined {
  const [data, setData] = useState<OData[]>();
  useEffect(() => {
    if (!queryOrRef) return;
    const q = constraints
      ? query(queryOrRef, ...constraints)
      : query(queryOrRef);
    return onSnapshot(q, async (querySnapshot) => {
      if (querySnapshot.empty) {
        setData([]);
        return;
      }
      const changes = querySnapshot.docChanges().length;
      if (changes === 0) return;
      const snap = querySnapshot.docs.map(
        documentMapFn ?? ((doc) => doc.data() as unknown as OData),
      );
      const res = await Promise.all(snap);
      setData(res);
    });
  }, [queryOrRef, constraints, documentMapFn]);
  return data;
}
/**
 * Retrieve all documents from a collection with (optional) query constraints
 *
 * @param queryOrRef A firebase collection reference or query
 * @param constraints A list of query constraints
 * @returns An array of documents or undefined if the data is not yet loaded
 * @see https://firebase.google.com/docs/firestore/query-data/queries
 * @deprecated prefer useCollectionRealtime
 */
export function useCollection<TData>(
  queryOrRef: Query<TData, DocumentData> | null,
  ...constraints: QueryFieldFilterConstraint[]
): TData[] | undefined {
  const [data, setData] = useState<TData[]>();
  useEffect(() => {
    if (!queryOrRef) return;
    const q = constraints
      ? query(queryOrRef, ...constraints)
      : query(queryOrRef);
    getDocs(q).then((querySnapshot) => {
      setData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [queryOrRef, constraints]);
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
type DocumentMutator<TData> = (data: TData) => Promise<void>;
export type DocumentHandle<
  TData extends DocumentData,
  Ref extends DocumentReference<TData, TData> = DocumentReference<TData, TData>,
> = {
  ref: Ref | null;
  data: TData | null | undefined;
  set: DocumentMutator<TData>;
  update: DocumentMutator<UpdateData<TData>>;
  delete: () => Promise<void>;
};

export function useDocMutators<TData extends DocumentData>(
  docRef: DocumentReference<TData, TData> | null,
) {
  const set = useCallback(
    async (data: TData) => {
      if (!docRef) return;
      await setDoc(docRef, data);
      return;
    },
    [docRef],
  );
  const update = useCallback(
    async (data: UpdateData<TData>) => {
      if (!docRef) return;
      await updateDoc(docRef, data);
      return;
    },
    [docRef],
  );
  const _delete = useCallback(async () => {
    if (!docRef) return;
    await deleteDoc(docRef);
  }, [docRef]);

  return { set, update, delete: _delete };
}

export function useColMutators<TData extends DocumentData>(
  colRef: CollectionReference<TData, TData> | null,
) {
  const add = useCallback(
    async (data: TData) => {
      if (!colRef) return;
      await addDoc(colRef, data);
      return;
    },
    [colRef],
  );
  const _delete = useCallback(async () => {
    if (!colRef) return;
    for (const doc of (await getDocs(colRef)).docs) {
      await deleteDoc(doc.ref);
    }
  }, [colRef]);

  return { add, delete: _delete };
}
