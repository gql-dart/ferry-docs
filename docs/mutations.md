---
id: mutations
title: Mutations
---

Mutations are executed exactly the same way as [queries](queries).

## Running a Mutation

```dart
import 'package:ferry/ferry.dart';
import 'package:gql_http_link/gql_http_link.dart';
import './graphql/[my_mutation].req.gql.dart';

final link = HttpLink("[path/to/endpoint]");
final client = Client(link: link);

// Instantiate an `OperationRequest` using the generated `.req.gql.dart` file.
final mutation = GMyMutationReq((b) => b..vars.id = "123");

// Listen to responses for the given mutation
client.responseStream(mutation).listen((response) => print(response));
```

## Optimistic Updates

Users often expect that changes they make within applications are reflected in the UI immediately. To achieve this, we can provide our `OperationRequest` with an `optimisticResponse`, which will trigger an `OperationResponse` that includes the optimistic data immediately. Then, once the actual mutation response is received from the server, a second `OperationResponse` will be triggered.

To pass an `optimisticResponse` to 

```

```



## With UpdateCacheHandlers

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