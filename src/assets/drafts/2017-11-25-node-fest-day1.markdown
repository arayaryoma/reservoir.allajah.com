---
title: "node fest day1"
date: "2017-11-25 12:58:41 +0900"
---

# Source to Binary - journey of V8 javascript engine -- 青野健利 a.k.a brn

https://speakerdeck.com/brn/source-to-binary-journey-of-v8-javascript-engine

## Execution flow

source -> AST -> Bytecode -> Graph -> Assembly

## Parse

- Make AST from the source

### Problems

- Parsing all function --> too slow

### lazy parsing

```
function x(a, b) {
  return a + b;
}
```

AST を作らずにパースする。`x()`が呼ばれた段階で AST にパースする

## AST

- V8 は AST を作った後更に変形をかける

### ES - Bynary AST

- 今の AST のサイズが大きいので Binary AST にする提案がでてる

## Ignition

- V8 が生成した AST を 1~4byte の Bytecode に変換

### Ignition Handler

- CodeStubAssembler という DSL で記述されてる
- 実行予定の Node を組み立てるだけ。Assembly をいちいち書かなくていい。すごい。
- Builtins は Assembler クラスを利用して各アーキテクチャ向けの処理をラップしてる。

### Builtins

### Runtime

- Builtins やその他のアセンブラコードから呼べるただの C++

## Hidden Class

- JS には型がないからオブジェクトの構造自体を内部的に map などを型として作成
- 別のオブジェクトでも同じ構造を持ってたら同じ Hidden Class として扱う
- Map 王ジェクトはプロパティの構造を厳密にチェックしてる
- プロパティの増減が起きた時は Map を共有しながら新しい Map を使う
- オブジェクトのプロパティアクセスや型チェックが高速かつ安全にできる

## Inlne Caching

- オブジェクトからプロパティを探すのは遅い。HashMap や FixedArray からプロパティをロードするから。
- Cache は特定の Map を初回呼び出し時に記憶する。

### Cache miss

- 4 つまで Map オブジェクトをキャッシュできる

### Cache state

- Pre Monmorphic
- Monomorphic
- Polymorphic
- Megamorphic
  - Map の記録を停止

## Optimization

- Optimize Budget が 0 を切ったら最適化が走る

### For loop

- JumpLoop というバイドコードが出力される

### Concurrent Compilation

- function は並列的にコンパイルされてる

### TurboFun

### Code generation

### Deoptimization

- 最適化した Assembly コードに予期せぬ値が渡ったらコンパイルし直す

# Make you a React: How to build your own JavaScript framework. -- Jorge Bucaran

http://goo.gl/UKjXiC

- Virtual DOM

## JSX

## VDOM

- virtual node を作って、DOM を更新する(`patch()`)
- Performance を上げるためのものではなくて、開発者が書きやすいようになっている。

## Virtual Node

- ただの JS オブジェクト
-

# WebAssembly and the Future of the Web -- Athan Reines

- JS の数値計算ライブラリ https://stdlib.io/

## History

### Java アプレット

- ブラウザ上から実行可能だった。JavaScript のグラフィック処理の発展によって廃れた

### ActiveX

-

### NaCl

### PNaCl

### asm.js

## WebAssembly

- C/C++ -> IR -> wasm -> x86/ARM
- バイナリエンコーディングとテキストフォーマットがある

### 使える型

- i32, f32, i64, f64

### Binary Encoding

- Magic Number: `00 61 73 6d` -> `asm`

## Advantages

Compact, Parsing, Typed, Optimization, Deoptimization, Lower-level, GC, Performance

### Emscripten

- LLVM code -> JS code

### Roadmap

- ブラウザ互換性
- 活発な開発
- LLVM
- Develoer tools
- GC などの新しい機能
- Node.js のアップデート

# No REST for the weary... Introducing GraphQL -- Sia Karamalegos

## History

- REST の前には SOAP があったよね
- クライアントとサーバーの結合が密なのはよくなくてなくなった

### REST

- HTTP のメソッドでクライアントとサーバー間の結合が疎になった
- 1 ページのデータを表示するために叩く REST API が多すぎる
- リソース指向よりもニーズ指向。必要なデータだけを全部取りたい

### GraphQL

- http://graphql.org/

#### 実装例

- https://github.com/graphql/swapi-graphql
- https://github.com/siakaramalegos/star_wars_graphql

#### ecosystem

- https://github.com/graphql/graphiql

# Turbo Boost Next Node.js -- Yosuke Furukawa

## Inside of Node.js

- 標準ライブラリ
- n-api
- V8
- http-parser, c-ares, OpenSSL とかの middleware
- libuv

## V8 Optimization

- Runtime で最適化 -　 Deoptimization が走るとかなり遅くなる

### 前のバージョンであった問題

- ES の最新版に対応してない
- Deoptimization が起きないように気をつけなきゃいけない
- 大量のマシンコードを生むので、メモリを食う

## V8v6

- Ignition Interpreter が Bytecode を生成
- TurboFan Compiler がマシンコードを生成

## UseCases

- 色々使われるようになってきたけど、CPU に高負荷をかける。Node.js は向いてないと言われてきた
- Node.js も Concurrency を入れるようになってきたし、worker の活用による明るい未来が見えている

# Native ES Module - something almost, but not quite entirely unlike CommonJS -- Gil Tayar

## ESM and CJSM

- import => Asynchronous, require() => Synchronous
- ES module を使う時は拡張子が`.mjs`じゃないとだめ

### export as default

### index

- まず index.js を探す
- package.json の`main`フィールドに指定するのが better

# SSR with Angular -- Angular Universal Suguru Inatomi

Angular で SSR するには Angular Universal

## Why SSR

- パフォーマンスと SEO

## DOMINO

https://github.com/fgnass/domino

# 2017 版、React、Lambda、S3 で始めるモダンなユーザーデータ可視化ツール 向山 裕介

## API Gateway

- VPC の中にエンドポイントを閉じ込められるようになった
- アクセスログが使えるようになった

# How TypeScript can simplify design decision Hyunje Jun

# Introduction to Visual Regression Testing Yusuke Kurami

- https://speakerdeck.com/quramy/introduction-to-visual-regression-testing-jp
