---
id: codegen
title: Generate GraphQL Data Classes
sidebar_label: Code Generation
---

The ferry `Client` is fully typed, so we must use the `gql_build` package to generate dart representations of our GraphQL operations, variables, and data. We will also use the `req_builder` included in the `ferry_generator` package to build typed `OperationRequest`s for each GraphQL operation.

### Download GraphQL Schema

First, we need to downoad our GraphQL in SDL format to any location within the `lib` project directory. You can use the [get-graphql-schema](https://github.com/prisma-labs/get-graphql-schema) tool to download a schema from a GraphQL endpoint:

First, install the tool:

```sh
npm install -g get-graphql-schema
```

Next, download the schema:

```sh
get-graphql-schema ENDPOINT_URL > lib/schema.graphql
```

### Add Queries to `.graphql` files

`gql_build` will generate dart code for all files located in the `lib` folder that end in a `.graphql` extention.

For example, we might have the following in `all_pokemon.graphql`:

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

### Build Generated Queries

Add `gql_build` and `build_runner` to your `dev_dependencies` in your pubspec file.

Next add a `build.yaml` file to your project root:

```yaml
targets:
  $default:
    builders:
      gql_build|schema_builder:
        enabled: true
      gql_build|ast_builder:
        enabled: true
      gql_build|op_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql
      gql_build|data_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql
      gql_build|var_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql

      ferry_generator|req_builder:
        enabled: true
        options:
          schema: your_package_name|lib/schema.graphql
```

Now we can build our dart generated files by calling:

```sh
pub run build_runner build
```

Or, if we are using flutter

```sh
flutter pub run build_runner build
```