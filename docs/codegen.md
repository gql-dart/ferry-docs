---
id: codegen
title: Generate GraphQL Classes
sidebar_label: Generate Classes
---

Ferry generates immutable data classes for all of your GraphQL Operations and Fragments. This saves time, improves the developer experience, and eliminates potential runtime errors.

## How it works

Let's say I've created an `all_pokemon.graphql` file with the following query:

```graphql
query AllPokemon($first: Int!) {
  pokemons(first: $first) {
    id
    name
    maxHP
    image
  }
}
```

When I run the generator, Ferry will create the following classes:

1. `GAllPokemonReq`: This class extends `OperationRequest` and includes the GraphQL document and variables for this query. It also includes other necessary settings to adjust how this operation is executed (e.g. `FetchPolicy`).
2. `GAllPokemonVars`: This class includes any variables used in the query (just "first", in this case)
3. `GAllPokemonData`:  This class represents the data returned by the query, including the "pokemons" field and all child fields.

In addition, Ferry will generate any necessary supporting classes from your GraphQL schema, including `input` types, `enum`s, and custom `scalars`.

:::note

As you can see, Ferry prepends `"G"` to all class names. This is due to a limitation in the `built_value` package on which `ferry_generator` is based.

:::

## Download Your GraphQL Schema

To generate our classes, we first need to downoad our GraphQL in SDL format to any location within the `lib` project directory. You can use the [get-graphql-schema](https://github.com/prisma-labs/get-graphql-schema) tool to download a schema from a GraphQL endpoint:

First, install the tool:

```sh
npm install -g get-graphql-schema
```

Next, download the schema:

```sh
get-graphql-schema ENDPOINT_URL > lib/schema.graphql
```

## Create `.graphql` Files

As shown in the example above, we need to save all of our GraphQL operations to files that end with the `.graphql` extension.

The generated files are created as siblings to the `.graphql` file. To reduce clutter, we recommend placing your `.graphql` files in a `/graphql` subdirectory. For example, if I have an `AllPokemon` widget that will use my `AllPokemon` query, I might use the following directory structure:

```
lib/
  src/
    components/
      graphql/
        ### Generated files will go here
        all_pokemon.graphql
      all_pokemon.dart
```

:::caution

Make sure that all `.graphql` files are located in the `lib` directory (or a subdirectory). The generator cannot read files located outside of `lib`. 

:::

See the [examples](https://github.com/gql-dart/ferry/tree/master/examples) for more detail.

### Importing from other `.graphql` files

If your operations have dependencies in other `.graphql` files, you can import them by adding a *comment import* statement at the top of your `.graphql` file.

```graphql
# import './pokemon_card_fragment.graphql'
```


## Build Generated Queries

Now that we've downloaded our GraphQL schema and written our GraphQL Operations, we're almost ready to run the generator. But first, we need to add a configuration file so that `built_runner` knows which generators to run and where to find your schema.

Add a `build.yaml` file to your project root with the following contents, **replacing `your_package_name` and the path to your schema file** accordingly.

```yaml
targets:
  $default:
    builders:
      gql_build|schema_builder:
        enabled: true
      gql_build|ast_builder:
        enabled: true
      gql_build|data_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql
      gql_build|var_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql
      gql_build|serializer_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql

      ferry_generator|req_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql
```

Now you can build your dart generated files by calling:

```sh
pub run build_runner build
```

Or, if you are using flutter

```sh
flutter pub run build_runner build
```

:::tip

You may need to add the `--delete-conflicting-outputs` flag to the build_runner command:

```sh
pub run build_runner build --delete-conflicting-outputs
```

:::