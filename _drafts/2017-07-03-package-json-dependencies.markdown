---
title: "package_json_dependencies"
date: "2017-07-03 11:09:31 +0900"
---

## dependencies
パッケージ名をkey、バージョンをvalueとしたObjectで定義する。
{% highlight json %}
"dependencies": {
  "react": "^15.6.0"
}
{% endhighlight %}

## devDependencies
書き方は`dependencies`と同じ。ビルドやテスト、ドキュメン−ションフレームワークを記述する。
moduleのpackage.jsonのdevDependenciesに書いてあるpackageは、そのmoduleをinstallしたときに依存関係として解決されない。
CoffeeScript, TypeScriptなどのAltJSやES最新版をCommonJS向けにコンパイル/トランスパイルする必要があるpackageの場合は、 `scripts.prepare` にビルドスクリプトを指定しておくとよい。

{% highlight json %}
"devDependencies": {
  "coffee-script": "~1.6.3"
}
"scripts": {
  "prepare": "coffee -o lib/ -c src/index.coffee"
}
{% endhighlight %}
こうしておくと、packageを公開するときにビルドスクリプトが走る。

## peerDependencies
webpackのpluginを開発していて、webpackの特定のバージョン互換性指定したいときなどに使う。
webpack-a-pluginとwebpack-b-plugin
