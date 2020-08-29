---
id: flutter-mutation-widget
title: Mutation Widget
---

`ferry_flutter` also includes a `Mutation` Widget.

:::tip

You probably don't need the `Mutation` Widget.

It's often easier to just execute the Mutation directly:

```dart
final createReviewReq = GCreateReviewReq(
  (b) => b
    ..vars.review.stars = 5
    ..vars.review.commentary = "Amazing!!!",
);

final result = await client
  .responseStream(mutation)
  .firstWhere((response) => response.dataSource != DataSource.Optimistic);
```

:::
