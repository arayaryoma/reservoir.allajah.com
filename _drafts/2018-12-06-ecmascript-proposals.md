---
title: "ECMAScriptのproposalで個人的に気になっているものを紹介する"
date: "2018-12-06 00:00:00 +0900"
---

これは[#kosen10s Advent Calendar 2018](https://adventar.org/calendars/3004)６日目の記事です。

自分の担当日を1日勘違いしていたため遅刻です。

今日はECMAScriptのproposalについて書きます。

[12/3のBabel 7.2.0のリリース](https://babeljs.io/blog/2018/12/03/7.2.0)で、Pipeline OperatorとPrivate Instance Methodsの実装が入りました。
特にPipeline OperatorはJavaScript界隈以外でも各所で話題になっていました。



JavaScriptの仕様標準であるECMAScriptにはこれらの他にも面白く利便性の高い提案(proposal)がたくさん出されています。
この記事ではその中でも僕が気になっている・期待しているものをいくつか紹介します。

## ECMAScriptの仕様追加の進められ方
proposalを紹介する前に、proposalが出されてからECMAScriptに正式に入るまでの流れについて、
少しだけ触れておこうと思います。

ECMAScriptは[tc39](https://www.ecma-international.org/memento/tc39.htm)という団体で仕様の策定が進められています。
proposalは[GitHubのリポジトリ](https://github.com/tc39/proposals)にまとめられていて、
[Contributing guideline](https://github.com/tc39/ecma262/blob/master/CONTRIBUTING.md)に従えば、誰でも出すことができます。

新たに出されたproposalはstage0からstage4まで５つのプロセスを通って行き、最終的にECMAScriptに正式に入ることになります。

stage0からstage4までどのような条件で上がっていくかは[EcmaScriptのドキュメント](https://tc39.github.io/process-document/)に
まとめられていますが、ここで各ステージに進むための代表的な条件を簡単に紹介します。


### Stage0 Strawman(たたき台)
新しい提案が出されただけの状態です。
Stage0のproposalは、[Stage1~4とは別けてまとめられています](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md)。

### Stage1 Proposal(提案)
Stage1に進むための条件は、
- 対象の新仕様追加を誰が牽引するか("Champion")が定められている。
- 問題性または必要性についてと、解決策についての概説がある。
- 仕様自体の横断的な懸念と実装難易度について述べられている。
- ユースケースの説明がある

などです。
Stage1では実際にPolyfillやdemoが実装され、実装難易度やもたらす可能性のある副作用について議論されます。

前述した[Pipeline Operator](https://github.com/tc39/proposal-pipeline-operator)は現在このStageです。


### Stage2 Draft(下書き)
Stage2に進むための条件は
- spec text(仕様書)の初期案

です。
Stage2では具体的にSyntaxやsemanticsを正確に定めます。
TC39はここで、仕様が開発され、最終的に標準仕様に組み込まれることを期待します。

### Stage3 Candidate(候補)
Stage3に進むための条件は
- 仕様書の完了
- 指定されたレビューアーが仕様書を承認している
- 全てのECMASｃript編集者が仕様書を承認している

です。
Stage3では仕様の策定は完了し、ブラウザの実装や、ユーザーからのフィードバックを待ちます。
この時点でECMAScript標準に入る可能性は非常に高いと言えます。もちろんここで落ちる可能性もあります。

### Stage4 Finished(完了)
Stage4に進むための条件は
- 2つ以上の競合する主要なJSエンジンで実装されている
- [tc39/test262](https://github.com/tc39/test262)の受け入れテストが主要なユースシナリオ用に作成され、マージされている。
- [tc39/ecma262](https://github.com/tc39/ecma262)に、統合された仕様書とともに全てのPRが提出されている。
- 全てのECMASｃript編集者がPRを全て承認している。

などです。Stage4に入った仕様は、次回のECMAScriptのリリースで標準仕様としてリリースされることが決定しています。

Stage4のproposalは[ここ](https://github.com/tc39/proposals/blob/master/finished-proposals.md)から確認できます。


## 個人的に気になっているproposalをいくつか
現在Stage1~3で80個ほど、Stage0も含めると100程度のproposalが出されていて、全て紹介するのは厳しいので、
個人的に気になっているものをかいつまんで紹介します。

※Stageの状態は2018年12月6日現在のものです。

### [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding) (Stage4)
JavaScriptのtry-catch構文では、catchでerrorの値を受け取らなければなりません。

```javascript
try {
    // Do something expected error may be threw
} catch (err) {
    console.log("error");
}

```
このproposalは、 `catch`でエラーの値を受け取らなくてもいいとするものです。
```javascript
try {
    // Do something expected error may be threw
} catch {
    console.log("error");
}
```
`try`ブロックで`throw` された値が不要なとき、無駄な変数を作らずに済みます。
Babelでtranspileする際は[@babel/plugin-proposal-optional-catch-binding](https://www.npmjs.com/package/@babel/plugin-proposal-optional-catch-binding)を利用します。
Babelでtranspileすると以下のコードが出力されます。
```javascript
"use strict";

try {
  // Do something expected error may be threw
} catch (_unused) {
  console.log("error");
}
```
Optional catch bindingは2019年にリリースされるECMAScriptに搭載予定です。

### [import()](https://github.com/tc39/proposal-dynamic-import) (Stage3)
ESModuleをロードするための`import`構文はトップレベルでの静的なローディングのみサポートしています。
```javascript
// valid
import 'some-module';

// invalid
if(expression) {
    import `${variable.moduleName}`;
}
```

このproposalは、ESModuleを動的にロードするための`import()` 関数を追加するためのものです。
```javascript
  const moduleSpecifier = './utils.mjs';
  import(moduleSpecifier)
    .then((module) => {
        // Use the module after loaded
    });
```

[IEを除く最新のメジャーブラウザではすでに利用可能になっています](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Browser_compatibility)。
ESModuleの動的importについては[この記事](https://developers.google.com/web/updates/2017/11/dynamic-import)がわかりやすいと思います。　

### [BigInt](https://github.com/tc39/proposal-bigint) (Stage3)
BigIntはJavaScriptのIntegerを拡張するためのものです。
現状JavaScriptで扱える整数の最大値は`Number.MAX_SAFE_INTEGER + 1`で取得できます。

```javascript
const x = Number.MAX_SAFE_INTEGER;
// ↪ 9007199254740991, 2^53 - 1

const y = x + 1;
// ↪ 9007199254740992

const z = x + 2;
// ↪ 9007199254740992
```

BigIntはこれより大きい整数値を扱えます。
BigIntは整数値の最後に`n`をつけることで表現します。

```javascript
const number = 9007199254740993; // => 9007199254740992
const bigIntNumber = 9007199254740993n; // => 9007199254740993n
```

若しくは、`BigInt()`関数にNumberまたはStringを渡すことで作成できます。
```javascript
const value1 = BigInt(9007199254740993);  // => 9007199254740993n
const value2 = BigInt('9007199254740993');  // => 9007199254740993n
```

また、BigIntはNumber型に属していなく、JavaScriptの全く新しいprimitiveです。
```javascript
typeof 0; // => 'number' 
typeof 0n; // => 'bigint'
```
[この記事](https://developers.google.com/web/updates/2018/05/bigint)でBigIntについて、演算子等も含め詳しく解説されています。

### [Numeric Separator](https://github.com/tc39/proposal-numeric-separator) (Stage2)
Number型の値を読みやすくするためのものです。数値の先頭および末尾以外の、任意の場所に `_` を挿入することができます。

読みやすくするためだけなので、 `_` を挿入する位置で、数値が変わることはなく、単に取り除かれます。
```javascript
console.log(1_000_000); // => 1000000
console.log(1_00); // => 100
console.log(0xFF_BA_54); // => 16759380
```

###  [throw expressions](https://github.com/tc39/proposal-throw-expressions) (Stage2)
JavaScriptの`throw`文を式としても使えるようにしようというproposalです。

例えば、引数を1つ受取り、引数がなかった場合は `'required!'`、引数が文字列出なかった場合は `'argument must be string'`
とErrorをthrowし、文字列であれば標準出力に出力する関数`test`を、現行のJavaScriptで書くと
```javascript
const test = (param) => {
    if (param === undefined) throw new Error('required!');
    if (typeof param !== 'string') throw new Error('argument must be string');
    console.log(param);
};
```
このようになります。throw expressionを用いると以下のように書けるようになります。
```javascript
const test = (param = throw new Error('required')) => {
    typeof param === 'string' ? console.log(param) : throw new Error('argument must be string');
};
```

### [Top-level await](https://github.com/tc39/proposal-top-level-await) (Stage2)

### [Temporal](https://github.com/tc39/proposal-temporal) (Stage2)

### [Realms API](https://github.com/tc39/proposal-realms) (Stage2)

### [Observable](https://github.com/tc39/proposal-observable) (Stage1)

### [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) (Stage1)

### [Pipeline Operator](https://github.com/tc39/proposal-pipeline-operator) (Stage1)

### [Getting last item from Array](https://github.com/keithamus/proposal-array-last) (Stage1)

### [Pattern Matching](https://github.com/tc39/proposal-pattern-matching) (Stage1)

### [Standard Library](https://github.com/tc39/proposal-javascript-standard-library) (Stage1)

### [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled) (Stage1)

### [Asset References](https://github.com/sebmarkbage/ecmascript-asset-references) (Stage1)
