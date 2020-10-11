---
id: pagination
title: Pagination & Refetching
---

Fetching new data for an `OperationRequest` in Ferry is easy. Just add a request of the same type and with the same `requestId` to the `Client.requestController`.

:::note

If no `requestId` is provided, Ferry will automatically assign a `uuid` when the request is instantiated.

```dart
final reviewsReq = GReviewsReq();

print(reviewsReq.requestId);
/// 60db32c0-e9d7-11ea-9678-054319a5b10b
```

:::

## Refetching

For example, if we are listening to the following request:

```dart
final reviewsReq = GReviewsReq(
  (b) => b
    ..vars.first = 3
    ..vars.offset = 0,
);

client.request(reviewsReq).listen((response) => print(response));
```

We can refetch the query by adding the request to the `requestController`:

```dart
client.requestController.add(reviewsReq);
```

Once the response is received, any `request()` Streams that were listening to `reviewsReq` will get updated with the new data.

## Pagination

Rather than just replacing the previous result with the refetched result, we may want to combine the results to enable pagination.

To do this, we need to create a copy of our original request that will fetch the next set of results and include an `updateResult` calback that tells ferry how to combine the results.

For example, let's fetch the next 3 reviews.

```dart
final nextReviewsReq = reviewsReq.rebuild(
  (b) => b
    ..vars.offset = 3
    ..updateResult = (previous, result) =>
        previous?.rebuild((b) => b..reviews.addAll(result.reviews)) ??
        result,
);

client.requestController.add(nextReviewsReq);
```

The next event received by our `request()` Stream will now include all six reviews.
