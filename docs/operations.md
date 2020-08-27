---
id: operations
title: Queries & Mutations
---

## Queries

```dart
import 'path/to/client.dart';
import './[my_query].req.gql.dart';

// Instantiate a `OperationRequest` using the generated `.req.gql.dart` file.
final query = GMyQueryReq((b) => b..vars.id = "123");

// Listen to responses for the given query
client.responseStream(query).listen((response) => print(response));
```

## Mutations

Mutations are executed in the same way as queries

```dart
import 'path/to/client.dart';
import './[my_mutation].req.gql.dart';

// Instantiate an `OperationRequest` using the generated `.req.gql.dart` file.
final mutation = GMyMutationReq((b) => b..vars.id = "123");

// If I only care about the first non-optimistic response, I can do:
client
  .responseStream(mutation)
  .firstWhere((response) => response.source != ResponseSource.Optimistic)
  .then((response) => print(response));
```