---
id: plugins
title: Plugins
---

Ferry is built to be modular and extensible. It's plugin system allows plugins to intercept and transform requests and responses, allowing virtually limitless customization of the client. In fact, many of the core features in ferry, including pagination and cache update handlers, are implemented as plugins.

To build your own plugin, simply extend the [`Plugin`](https://pub.dev/documentation/ferry/latest/plugins/Plugin-class.html) class and implement its `buildRequestTransformer` or `buildResponseTransformer` method.
