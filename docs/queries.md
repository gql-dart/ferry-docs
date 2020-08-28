---
id: queries
title: Queries
---

Running a GraphQL Query with Ferry is as easy as:

1. Creating an instance of the request class [generated](codegen) for your Query.
2. Listening to the `responseStream` for that request.

You can locate the [generated](codegen) `G[MyQuery]Req` class in the `[my_query].req.gql.dart` file located next to your `[my_query].graphql` file.

## Running a Query

```dart
import 'package:ferry/ferry.dart';
import 'package:gql_http_link/gql_http_link.dart';
import './graphql/[my_query].req.gql.dart';

final link = HttpLink("[path/to/endpoint]");
final client = Client(link: link);

// Instantiate an `OperationRequest` using the generated `.req.gql.dart` file.
final query = GMyQueryReq((b) => b..vars.id = "123");

// Listen to responses for the given query
client.responseStream(query).listen((response) => print(response));
```