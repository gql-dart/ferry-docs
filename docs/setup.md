---
id: setup
title: Setup
---

## Installation

Add `ferry` and `gql_http_link` to your pubspec dependencies. You will also need to add `ferry_generator` to your dev dependencies.

## Simple Setup

```dart
import 'package:gql_http_link/gql_http_link.dart';
import 'package:ferry/ferry.dart';

final link = HttpLink("[path/to/endpoint]");

final client = Client(link: link);
```

This instantiates a client with the default configuration, including a `Cache` instance that uses a `MemoryStore` to store data.

## With HiveStore (persisted offline data)

Add `hive` (and `hive_flutter` if you're using flutter) to your pubspec.

```dart
import 'package:gql_http_link/gql_http_link.dart';
import 'package:ferry/ferry.dart';
import 'package:ferry_hive_store/ferry_hive_store.dart';
import 'package:hive/hive.dart';
// *** If using flutter ***
// import 'package:hive_flutter/hive_flutter.dart';

Future<Client> initClient() async {
  Hive.init();
  // OR, if using flutter
  // await Hive.initFlutter();

  final box = await Hive.openBox("graphql");

  final store = HiveStore(box);

  final cache = Cache(store: store);

  final link = HttpLink("[path/to/endpoint]");

  final client = Client(
    link: link,
    cache: cache,
  );

  return client;
}
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