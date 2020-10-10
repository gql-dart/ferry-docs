---
id: customization
title: Customizing the Client
---

Ferry is built to be modular and extensible. It's plugin system allows plugins to intercept and transform requests and responses, allowing virtually limitless customization of the client. In fact, many of the core features in ferry, including pagination and cache update handlers, are implemented as plugins.

To build your own plugin, simply extend the [`Plugin`](https://pub.dev/documentation/ferry/latest/plugins/Plugin-class.html) class and implement one of the following methods:

- `buildRequestTransformer`
- `buildResponseTransformer`

For example, here's the actual Ferry core plugin used to implement [pagination](pagination.md) functionality:

```dart
import 'dart:async';

import 'package:ferry/src/operation_response.dart';
import 'package:ferry/src/plugins/plugin.dart';

/// Update the result based on previous result.
///
/// Useful for features like pagination.
class UpdateResultPlugin extends Plugin {
  @override
  StreamTransformer<OperationResponse<TData, TVars>,
          OperationResponse<TData, TVars>>
      buildResponseTransformer<TData, TVars>() =>
          StreamTransformer.fromBind(_updateResultStream);

  Stream<OperationResponse<TData, TVars>> _updateResultStream<TData, TVars>(
    Stream<OperationResponse<TData, TVars>> stream,
  ) {
    OperationResponse<TData, TVars> previous;
    return stream.map(
      (response) => previous = response.operationRequest.updateResult == null
          ? response
          : OperationResponse(
              operationRequest: response.operationRequest,
              data: response.operationRequest.updateResult(
                previous?.data,
                response.data,
              ),
              dataSource: response.dataSource,
              linkException: response.linkException,
              graphqlErrors: response.graphqlErrors,
            ),
    );
  }
}
```

## Core `TypedLink`s

Ferry's core features are implemented as `TypedLink`s.

### Client

The Ferry Client itself is a `TypedLink`, implemented by composing other core `TypedLink`s.

### AddTypenameTypedLink

Adds `__typename` to each node of the operation.

### CacheTypedLink

A terminating link that fetches the operation from the Cache, mapping the fresult to an `OperationResponse`.

### FetchPolicyTypedLink

A terminating link that resolves an operation from the Link or the Cache based on the request's `FetchPolicy`, possibly caching the response.

### GqlTypedLink

A terminating link which defers execution to the provided `gql_link`, mapping the result to an `OperationResponse`.

Any errors received by the `gql_link` are included in the `OperationResponse.linkException`.

### OfflineMutationTypedLink

Caches mutations in a `hive` box when offline and re-runs them when re-connected.

This link must be between a `RequestControllerTypedLink` and the terminating link.

### OptimisticTypedLink

Returns the response stream from the next link in the chain, immediately emitting a response with the optimistic data.

### RequestControllerTypedLink

Allows multiple requests to be made by adding requests to the `requestController`.

To refetch an operation, simply add a new request of the same type and with the same `OperationRequest.requestId`.

To implement pagination, include an `OperationRequest.updateResult` callback.

If `OperationRequest.executeOnListen` == `true`, the operation will be
immediately executed when the stream returned by request is first
listened to.

### UpdateCacheTypedLink

Runs any specified [UpdateCacheHandler]s with a [CacheProxy] when

1. an optimistic response is received
2. the first time a non-optimistic response is received
