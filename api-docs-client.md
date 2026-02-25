# API Usage for the React Native client

Documentation will be expanded as more features are implemented.

## Type Definitions

All types are defined in `crave-api/src/server/api/types/`

- [User Data](./crave-api/src/server/api/types/user.ts)
- [Group Mode](./crave-api/src/server/api/types/group-mode.ts)
- [Autocomplete](./crave-api/src/server/api/types/autocomplete.ts)
- [Restaurant Data](./crave-api/src/server/api/types/places.ts)

## Methods

### useGroupLobby

Get realtime lobby updates

```ts
const { id, ownerId, status, members } = useGroupLobby("lobbyId");
```

[Source](./crave-app/lib/hooks/use-group-lobby.ts) |
[Types](./crave-api/src/server/api/types/group-mode.ts)

### trpc.places.search

Search for restaurants

_Note: This method will be replaced with a hook at a later date_

```ts
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

const { data } = useQuery(
  trpc.places.search.queryOptions({
    center: { latitude: 37.7749, longitude: -122.4194 },
    radius: 1000,
  }),
);
```

[Source](./crave-api/src/server/api/routers/places.ts) |
[Types](./crave-api/src/server/api/types/places.ts)

### trpc.places.autocomplete + trpc.places.getAutocompleteCoordinates

Autocomplete searching for a region (city, etc)

_Note: These methods will be replaced with a hook at a later date_

_Documentation coming soon_

[Source](./crave-api/src/server/api/routers/places.ts) |
[Types](./crave-api/src/server/api/types/autocomplete.ts)

### trpc.recommender.createLobby

Create a new group lobby

_Note: This method may be replaced with a hook at a later date_

```ts
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

const { mutate } = useMutation(trpc.recommender.submitSwipes.mutationOptions());

const lobby = mutate();
```

[Source](./crave-api/src/server/api/routers/recommender.ts) |
[Types](./crave-api/src/server/api/types/group-mode.ts)

### trpc.recommender.submitSwipes

Submit swipes to the recommender system

_Note: This method may be replaced with a hook at a later date_

```ts
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

const { mutate } = useMutation(trpc.recommender.submitSwipes.mutationOptions());

mutate({
  lobbyId: "O98SF3", // Omit for solo mode
  result: {
    selectedRestaurantIds: ["id1", "id2"],
    rejectedRestaurantIds: ["id3", "id4"],
  },
});
```

[Source](./crave-api/src/server/api/routers/recommender.ts) |
[Types](./crave-api/src/server/api/types/group-mode.ts)

## Appendix: Firebase

Firebase stores data in nested collections and documents.

```ts
// The firestore client
import { firestore } from "@/lib/firebase";
// Methods to create document/collection references and query constraints
import { collection, doc, where } from "firebase/firestore";

// Root collections can be imported
import { users, restaurants, lobbies } from "@/lib/datastore/collections";
// Create restaurant data reference (does not fetch data)
const restaurantData = doc(restaurantsCollection, "restaurantId");
// Create subcollection reference (does not fetch data)
const userReviews = collection(restaurantData, "userReviews");

// Helper methods (for fetching data in components)
import {
  useDocument,
  useDocumentRealtime,
  useCollection,
} from "@/lib/hooks/firebase";

const restaurant = useDocument(doc(restaurants, "restaurantId"));
const lobby = useDocumentRealtime(doc(lobbies, "lobbyId"));
const allRestaurants = useCollection(restaurants);
const chineseRestaurants = useCollection(
  where(restaurants, "cuisine", "array-contains", "Chinese"),
);

// TODO: documentation for setting/updating data
```

### Additional Documentation

[Documents and Collections](https://firebase.google.com/docs/firestore/manage-data/structure-data)

## Appendix: TRPC

Some API calls must be made to the backend server instead of using firebase.

To do this, use TRPC queries and mutations.

### TLDR

Queries fetch data (e.g. endpoint "places.autocomplete") and mutations make changes (e.g. endpoint "recommender.submitSwipes").

### Examples

```ts
import { trpc } from "@/lib/trpc";
import { useQuery, useMutation } from "@tanstack/react-query";

// Basic Query Usage (endpoint "places.autocomplete")
// (not necessary to unpack all possible fields, just the ones you need)
const { data, error, isLoading, isSuccess, isError } = useQuery(
  trpc.places.autocomplete.queryOptions({
    /* payload data */
  }),
);
// Documentation:
// https://trpc.io/docs/client/tanstack-react-query/usage#queryOptions
// https://tanstack.com/query/latest/docs/framework/react/guides/queries

// Basic Mutation Usage (endpoint "recommender.submitSwipes")
// (not necessary to unpack all possible fields, just the ones you need)
const { mutate, mutateAsync, error, isPending, isError, isSuccess } =
  useMutation(
    trpc.recommender.submitSwipes.mutationOptions({
      // these are optional and will run for both `mutate` and `mutateAsync`
      onError: (error) => {}, // run on error
      onSuccess: () => {}, // run on succes
      onSettled: () => {}, // always runs
    }),
  );

// Usage in client component (or other non-async environment)
mutate(
  {
    /* payload data */
  },
  {
    onError: (error) => {}, // run on error
    onSuccess: () => {}, // run on succes
    onSettled: () => {}, // always runs
  },
);
// Documentation:
// https://trpc.io/docs/client/tanstack-react-query/usage#mutationOptions
// https://tanstack.com/query/latest/docs/framework/react/guides/mutations
```

### Additional Documentation

[TRPC](https://trpc.io/docs/client/tanstack-react-query/usage) |
[React Query Queries](https://trpc.io/docs/client/tanstack-react-query/usage) |
[React Query Mutations](https://trpc.io/docs/client/tanstack-react-query/usage)

You only need to read the parts on **Queries** and **Mutations**.
We are not using advanced features like **Infinite Queries** or **Subscriptions**
