---
id: flutter
title: Using with Flutter
---

The `ferry_flutter` package provides Widgets for your convenience that make it easy to use Ferry with Flutter.

Since the entire Ferry architecture is [built around native Dart Streams](design), `ferry_flutter` Widgets are just simple wrappers around the Flutter `StreamBuilder` Widget.

## Setup

To use `ferry_flutter`, we must include it in our `pubspec.yaml`.

```yaml
dependencies:
  ferry_flutter: #[latest-version]
```

## Dependency Injection

We will need to pass our Ferry client to our `ferry_flutter` Widgets. While `ferry_flutter` can be used with any dependency injection library, we recommend using [`get_it`](https://pub.dev/packages/get_it).
