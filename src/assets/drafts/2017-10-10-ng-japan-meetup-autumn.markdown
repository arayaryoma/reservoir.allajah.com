---
title: "Ng Japan Meetup Autumn"
date: "2017-10-10 19:37:00 +0900"
---

# laco さん Angular v5.0.0

- Animations
  - :increments / :decrements
  - Disable animations by data-binding
  - Negative Query Limit (count from tail)
- Router
  - ChildActivationStart/End
  - ActivationStart/End
- Forms
  - updateOn
    - アップデートのタイミングをコントロールできる('change' | 'blur' | 'submit')
- Core
  - Multiple 'exportAs'
  - Bootstrap on custom zone.js
    - zone.js を除外すると、変更検知できなくなるので自分でコンポーネントに書く
    -
- Http
  - httpClient に直接 Object map を突っ込めるようになった
- Platform Server
  - TransferState
  - Render Hooks
- ServiceWorker
  - Rewritten in angular/angular
  - experimental. 触らないほうが良い
- Deprecation
  - @angular/http は非推奨。 HttpClient を使いましょう
- Removal
  - <template>
  - OpaqueToken
  - initialNavigation: true | false
  - ngFor は\*ngFor だけ
- Breaking Changes
  - Require TypeScript 2.4
  - number, currency, decimal, date あたりの pipe の内部実装が変わった
    - Intl API を捨てた
    - en_US 以外は追加で読み込まなきゃいけない。`registerLocaleData()`
    - DeprecatedI18NPipesModule を使うのもあり。ただし v6.0.0 で消える
- https://next.angular.io/docs

# Compile - Qurami さん

## Component

Component をパースして描画、アップデートする関数は別にしてるってのが Compiler がやってること

# Just in Time or Ahead of Time

## JiT

- ブラウザで動作させるまで Compile エラーに気づけない
- XSS をつかれた場合、動的に Component を書き換えられる可能性がある

## AoT

- ビルドに時間かかりすぎ
- js のサイズが肥大

AoT が速ければ JiT なんて使わなくていい

- Transformer (TypeScript 魔改造) angular-cli >= v1.5.0
- TS2.4.1 から Custom Transformer が許されるようになった
- Transformer?
  - AST を別の AST へ変換する

Angular Bazel Rule
Bazel はビルド対象を細分化した上で並行してビルドを実行
対応された場合、ビルドに JVM が必要になる...

# Angular の設計指針

## 中規模

- Service はただの TS の class。オブジェクト指向の原則に従う
- すべては非同期であることを前提に作る

## 大規模

- 優秀なエンジニアが複数人いるときの宗派の違いは無駄な議論のもと
- DDD みたいな設計手法に乗っかる
- コードは腐敗する。それをきちんと把握し、負債は計画的に返済する
