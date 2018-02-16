---
title: "InsideFrontend #2 に参加してきた"
date: "2018-02-11 03:30:00 +0900"
tags:
  - 勉強会レポート
---


2/11に日経カンファレンスルームで開催された[Inside Frontend #2](https://inside-frontend.com/)に参加してきた。
このイベントには去年も参加していて、めちゃくちゃよかったのでa

## Opening
Wifi、行動規範等の諸注意
moffersさんからサービスの紹介
企業側の参加はFUJIFILM、OLYMUS、KDDI、CAなど
https://moffers.jp/

## Varyヘッダとキャッシュバリエーションの将来(The Vary header and the future of cache variation) https://twitter.com/triblondon
ケアしなきゃいけないこ
HTTPはめっちゃ重要
Varyがなぜ重要か
Varyを
Brotliで20%圧縮できる
言語対応
ネットワーク環境がよくないときに軽量版を配信
画像形式webpとかつかいたくてもレガシーブラウザのためにpngとかjpegも用意しなきゃいけない
コンテントネゴシエーション
1997年からあるRFC2068
最初にサーバーからHTMLで返ってきても、CSVが欲しかったらもう一度リクエストを送る必要がある
You don't have to view websites as html
Acceptヘッダに追加しても普通はHTMLを返す
そういう原案は死んだ。現実的にURLを分けてる
Varyの典型的な用途
同じURLで異なるレスポンス
ページヘのリクエストはまずCDNにいく
Aがjaでリクエスト -> CDNにキャッシュ -> JIMがリクエスト -> 日本語が表示される
キャッシュさせないのはナンセンス
Vary: Accept-Language
Accept-Languageによってレスポンスが異なることをサーバーに伝える
ユーザーの言語によるキャッシュは非効率的になる
Normalizeでブリティッシュ・イングリッシュだったのか
Traditional Vary targets
Accept, Accept-Language Accept-Encoding
Brotliの圧縮形式は重要
RFC7234 Variants
Varyヘッダの代替となるKeyヘッダ
Accept-Language
同じURLへのリクエストに対しては常に同じVaryヘッダを含めるべき
BrowserはVariationを一つしかストアできない
ブラウザは6段階のキャッシュの仕組みを持っている。すべてVaryをサポートすべきだが状況は微妙


## AMA WebPayments API
### WebPayment, Payment Request API
ブラウザのNativeUIを使えるので、フォームを作る必要がない
支払い方法はブラウザが保存しているクレジットカード以外にも、
サードパーティのPaymentサービスを自分で追加できる
https://blog.agektmr.com/2017/12/web-payment-misconception.html
ユーザーがサブミットすると、JSON形式でPayment APIから返却される
### ケーススタディ
Fresh! J.Crew 
従来のフォームより75%少ない時間 by J.Crew
クレジットカードの生の情報じゃなくて、Tokenを扱うのでセキュア
実際に自分がPayment RequestAPIを直に触ることはない。決済代行業者のSDKが基本的にやってくれる。
Stripeとかがラップしてくれていて、対応してないブラウザでは


## 現場の ES201x とアーキテクチャの変遷と未来 @mizchi
アーキテクチャの変遷の生理と、死なないアーキテクチャを作る
### フレームワーク振り返り
太古: セルフスクレイピングの時代自分でDOMを追加したり消したりしてた
不安定なブラウザのAPIをjQueryがいい感じに吸収
添付レーティングの時代
innerHTML = template()みたいな。コンポーネントの概念
二重テンプレート問題, SEO問題
データバインディングの時代
componentを定義して、それをレンダリングしろっていう命令を書く
文字列を展開する時代から木構造を出力する
現代
Client Side MVCの終焉
Rails由来のBackboneのMVCモデルはは痰した
Flux/Observableの時代
Event, State, Viewに完全に分離
EventSourceとsubscribeの形態
FRPの概念を輸入してきた

Componentの内側に隠れたStateの存在は基本的に悪
富豪的設計とチューニングを繰り返してよくわからない理想形に近づいている
開発言語の話
AltJSが果たした役割
文法追加とか機能提案をしてきて、どんどんES201xに入ってきた
最近の流行
とにかく型。柔軟な型宣言、型推論
フロントエンドの静的型の需要
とにかくテストが書きづらい
Observableはないとまじで厳しい
WebComponentsのあとの世界
状態管理層としてのフレームワークは残りそう
WebComponentsで死ぬもの
xxデザインのxxx実装
古いコードを手なづける
lint、型、...
いいコード: 静的検査、インターフェースが明らか、簡単に捨てられる
悪いコード: モジュール境界が明らかじゃない
ViewとStateが綺麗に切り離されてたら、末端のViewフレームワークは簡単に置き換えられる(React -> hyperapp)
とりあえずやっとけ no-used-vars
守破離
OSSコシステム、標準に従う

今のフロントエンド: OOP, FP, GUI設計論の知見がごったに、様々な思想をぶつけあう戦場

## AMA 現場の ES201x とアーキテクチャの変遷と未来 @mizchi
IE11をサポートから外す言い訳はいくらでもできる。
- フロントエンドエンジニアっていうラベル付は破綻してる
- デザイン方面から来た人と、node.jsから来た人だと価値観が違う。
- 前者は共有が多いので、フロントエンドってくくりで一緒にすると全体の給与水準は下がる
- URLがマスターなのか内部状態がマスターなのかは意識してRouterを書くべき
- WebComponentsはまだエコシステムが整ってないので、現場で使える状態じゃないんじゃないか。標準原理主義者っぽい。
- State管理荒れるのでは？ -> ようやくそこで議論ができるようになったのでいい時代

## 攻めつづける FRESH! の Web ver.新春 @sutiwo
### Payment Request APIの導入
GMOペイメントゲートウェイを使って、FRESHが決済情報を持たないようにしていた
購入のたびに別ドメインへ繊維
テンプレートの更新が面倒
FRESH!にカード情報を保存してるわけじゃないが、ユーザーからはそう見える問題
Payment RequestAPIでブラウザのネイティブUIを使える
FRESH!での初期導入
ブラウザはChromeのみ
basic-cardのみ対応
Payment Request API用のエンドポイントを用意した
EdgeはMicroSoftアカウントを使わないといけなかった。それは体験が悪すぎた。


### React v15 -> v16
FRESH!の構成はReact + Fluxible
v16からFragmentを使うとdivでラップしなくて良くなった。ng-containerみたいなやつか
render関数でStringを返却できるようになった。spanでラップしなくて良くなった
結構早くなった
renderToString -> renderToNodeStream
SSR時、ReactElementを初期のHTMLに描画する
Node.jsのStreamAPI Writableを使って非同期処理
metaタグの作成で副作用が発生
metadataをcontext, fluxなどのグローバルスコープにするのが良さそう
パフォーマンスはあまり上がらなかった

### Puppeteerを使ったE2Eテスト
FRESHのデプロイは stg -> standby -> proの流れ。
standbyとproでチェックシートで確認してた
Puppeteerとmochaで自動化
https://medium.com/@ivanmontiel/using-that-headless-chrome-youve-been-hearing-about-543a8cc07af5
大変なこと
決済テストはおかねかかる
完璧にやるのは大変
今後やりたい
CIで実行
Cronで定期実行
スクショとテスト結果の保持
FMPの計測

### 日経電子版を速くするためにやっていること @sisidovski
モバイルサイトは全面刷新
表示速度は約2倍になった
Hearstのランキングで2位になった
Financial Timesの調査で サイトの速度が1秒落ちるとユーザーエンゲージメントは5%下がることがわかった
2018/7からモバイル検索でもサイトの速度をランキングシグナルとして追加(google)
チーム発足時: チーム内でスピードを最重要KPIにした
旧モバイル版はSSRなしのBackbone制SPAだった。初回のロードに9秒かかってた
ブロッキングリソースも多い
Speedcurveで計測
旧プロダクトや競合サービスと比較
CDNの要件を一番満たすのがFastlyだった
r.nikkei.comとネイティブアプリのバックエンドでFastlyを使ってる
CDNでできるところは任せる
VCLで柔軟にキャッシュを制御
新しいプロトコルへの対応も(SSLとか)CDNに任せようというところは任せる
CDNで圧縮できるのは圧縮する、Fastlyに任せる
Feature FlagsをFastlyで切り替えてA/Bテスト
A/BつとだけでなくQAとかにも使える
 動的コンテンツもCDN経由
ログインの有無・会員属性ごとにキャッシュできる
CDN上でJWTのデコードを行うことで有料会員限定記事などの認可の必要なページのキャッシュも可能になった
VCLまじ辛い
Promise Cache
キャッシュの非同期更新
画像配信
SaaSのimgix
webp, jpg, png等に対応してる
キャッシュヒット率90%, 有料会員に対しても70%以上
オリジンサーバーのリソース削減
### フロントエンドですべきこと
#### あとでいいことはあとで
クリティカルレンダリングパスを減らす
JSはすべて非同期でロードする
Critical CSS
FirstViewのスタイル以外はあとから読み込む
r.nikkei.comではまだ導入できてない
セクション単位の遅延ロード
スケルトンスクリーン

####必要なことは先に
HTTP/2 server Push
画面の表示に必要になるリソースはなるべく早く
Service Workerによる事前キャッシュ
サブリソースはLinkヘッダから追加取得
キャッシュ動機問題はServiceWorker内で対応した
古いキャッシュの削除はキャッシュしたURLとタイムスタンプをIndexedDBにいれて、

####使いまわせるものは使い回す
静的ファイルのHTTPキャッシュ
UIコンポーネント
どのキャッシュから取得したのかわからなくなるのはCDTを使ってキャッシュの状態を確認

####クライアントにとって最適なものを配信
pictureタグで最適な画像サイズで表示
画像サイズ・画質の変更はインパクトがかなり大きい
Network Information API
通信環境を取得できる。wifi? cellular? 3G? 4G?

#### まとめ
まずは分析。Lighthouseやwebpagetest
Speedcurveなどで継続的にモニタリング
CDN/サーバーサイドのパフォーマンスも重要
手がつけられるところから手を付ける


### AMA
BabelでPolifyllやらせると、無駄なコードを作ってしまうので、ランタイムでPolyfillしてる
広告の表示を高速にする
全部同じAd Serverから受け取ってる
document.writeを吸収して書き換えてる
そのあとevalをして、shadowDOMでレンダリングしてる
customelements -> shadowdom -> iframeの順で落としていこうと思ってる
大変
仮にAdServerが死んでも影響が出ないようにしている
prerenderがChrome58から無効化されてる(chromeの内部ロジック置き換えのため一時的に)
hoverだけでいいのか？ -> 気にしない
	

### デザインシステムとコードを密結合するワークフロー
基本みんなリモートなので認識合わせのコストが高い
現状の実装構造が複雑化
=> プロダクトの変化速度が低下して身動き取れなくなる
問題はコミュニケーションコスト
企画から実装まで、職種による翻訳や出戻りが多く発生する
デザインとUI実装を1対1にできる
全員でUIデザインしたらレビューいらなくね? -> Figmaでやってみた
企画には具象度を高めてもらって、エンジニアには抽象度を高めてもらい、
全員同じ土俵でUIを作った
UI実装の依存関係も定義する
UIデザインにないものは絶対に実装されないルールにした
デモ
