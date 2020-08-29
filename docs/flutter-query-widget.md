---
id: flutter-query-widget
title: Query Widget
---

`ferry_flutter` includes a `Query` widget, which is a simple wrapper around the `StreamBuilder` widget.

This example assumes we've registered our `Client` instance with [`get_it`](https://pub.dev/packages/get_it), but you can use any dependency injection method.

```dart
import 'package:flutter/material.dart';
import 'package:ferry/ferry.dart';
import 'package:get_it/get_it.dart';
import 'package:ferry_flutter/ferry_flutter.dart';
import 'package:built_collection/built_collection.dart';

import './graphql/all_pokemon.data.gql.dart';
import './graphql/all_pokemon.req.gql.dart';
import './graphql/all_pokemon.var.gql.dart';
import './pokemon_card.dart';

class AllPokemonScreen extends StatelessWidget {
  final client = GetIt.I<Client>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('All Pokemon'),
      ),
      body: Query(
        client: client,
        operationRequest: GAllPokemonReq(
          (b) => b..vars.first = 50,
        ),
        builder: (
          BuildContext context,
          OperationResponse<GAllPokemonData, GAllPokemonVars> response,
        ) {
          if (response.loading)
            return Center(child: CircularProgressIndicator());

          final pokemons = response.data?.queryPokemon ?? BuiltList();

          return ListView.builder(
            itemCount: pokemons.length,
            itemBuilder: (context, index) => PokemonCard(
              pokemon: pokemons[index],
            ),
          );
        },
      ),
    );
  }
}
```