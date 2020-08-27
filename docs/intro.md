---
id: intro
title: Introduction
---

Ferry is a simple but powerful GraphQL Client for Flutter & Dart.

## Features

1. ✅ **Fully Typed**: work faster and safer with compile time checks and IDE autocomplete, including fully typed Cache reads and writes.
2. 🔄 **Code Generators**: automatically generated immutable data classes for all your GraphQL Operations and Fragments, based on your schema.
3. 🌐 **Customizable Network Interface**: highly customizable network interface using `gql_link`, allowing you to compose and extend `Link`s.
4. ✨ **Normalized Optimistic Cache**: keep data in sync with cache normalization and update your UI instantly with optimistic data.
5. 💾 **Multiple Data Stores**: extensible `Store` interface with built-in `MemoryStore` and `HiveStore` (which uses `hive` for offline persistence)
6. 📄 **Fetch More & Pagination**: easily update responses with new data or combine multiple responses, allowing for seamless pagination
7. 📱 **Flutter Widgets**: Widgets for Queries, Mutations, and Subscriptions, available out of the box

## Architecture

The core Ferry client architecture is very simple, consisting of:
1. **`Client.requestController`**: a single StreamController of `OperationRequest`s.
2. **`Client.responseStream()`**: a method that generates a Stream of `OperationResponse`s for a given `OperationRequest`.

In Ferry, each GraphQL Operation (including Queries, Mutations & Subscriptions) is wrapped in an `OperationRequest` which can be dispatched to the `requestController`.

Any `responseStream` created for a particular `OperationRequest` will listen to the `requestController` and resolve any matching requests from the Cache or Network (depending on the `OperationRequest.FetchPolicy`), returning a stream of `OperationResponse`s.

![Ferry request architecture](../static/img/request-response.jpg)