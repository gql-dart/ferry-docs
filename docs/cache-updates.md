---
id: cache-updates
title: Updating the Cache
---


### With UpdateCacheHandlers

The Client allows arbitrary cache updates following mutations, similar to functionality provided by Apollo Client's mutation `update` function. However, in order for mutations to work offline (still a WIP), the client must be aware of all `UpdateCacheHandlers`.

```dart
typedef UpdateCacheHandler<TData, TVars> = void Function(
  CacheProxy proxy,
  OperationResponse<TData, TVars> response,
);
```

`CacheProxy` provides methods to `readQuery`, `readFragment`, `writeQuery`, and `writeFragment`.

```dart
import 'package:gql_http_link/gql_http_link.dart';
import 'package:ferry/ferry.dart';

import '[path/to/MyUpdateCacheHandler]';

final link = HttpLink("https://graphql-pokemon.now.sh/graphql");

final updateCacheHandlers = <dynamic, Function>{
  "MyHandlerKey": MyUpdateCacheHandler,
};

final options = ClientOptions(updateCacheHandlers: updateCacheHandlers);

final client = Client(
  link: link,
  options: options,
);
```

This handler can then be called using its key `"MyHandlerKey"` from a `OperationRequest`.