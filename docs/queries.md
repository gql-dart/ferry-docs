---
id: queries
title: Queries
---

Executing a GraphQL Query with Ferry is as easy as:

1. Creating an instance of the [generated](codegen) request class for your Query.
2. Listening to a `responseStream` for that request.

### Creating a Request

For example, let's say we've saved the following `Reviews` Query to a file named `reviews.graphql`:

```graphql
query Reviews($first: Int, $offset: Int) {
  reviews(first: $first, offset: $offset) {
    id
    stars
    commentary
    createdAt
  }
}
```

Running the Ferry [generator](codegen) will create a `reviews.req.gql.dart` file with a `GReviewsReq` class. We can instantiate it like so:

```dart
final query = GReviewsReq(
  (b) => b
    ..vars.first = 10
    ..vars.offset = 0,
);
```

:::note

Notice how we can chain-assign nested values. Our generated Classes are based on `built_value` which uses the Builder Pattern.

Check out [this post](https://medium.com/dartlang/darts-built-value-for-immutable-object-models-83e2497922d4) for more information on `built_value` classes and how to use them.

:::


### Listening to the Response Stream

Now, all we need to do is listen to the `responseStream`.

```
client.responseStream(query).listen((response) => print(response));
```