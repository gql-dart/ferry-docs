---
id: custom-plugins
title: Custom Plugins
---

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
