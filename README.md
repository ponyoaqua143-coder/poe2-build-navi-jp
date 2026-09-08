# PoE2ビルドナビ (poe2-build-navi-jp)

Path of Exile 2（PoE2）向けの日本語初心者攻略サイト。ビルド不要のプレーンな静的サイト
（HTML / CSS / vanilla JS のみ、依存パッケージなし）です。

## 構成

```
index.html                 トップページ
guides/beginner.html       初心者ガイド
guides/version-1-0.html    1.0リリース・基本無料化・デュエリスト情報まとめ
guides/currency-trading.html  通貨・トレード解説
classes/index.html         クラス診断ツール + 全7クラス概要
about.html / privacy.html / disclaimer.html / contact.html  各種固定ページ
assets/css/style.css       共通スタイル
assets/js/main.js          ナビ開閉・クラス診断ロジック
robots.txt / sitemap.xml   SEO関連
.github/workflows/deploy.yml  GitHub Pages自動デプロイ（要: 下記セットアップ）
company/memory/            経営判断・アイデア・ルールの記録（company.md, decisions.md, ideas.md, rules.md）
```

## ローカル確認

ビルド不要。ブラウザで `index.html` を直接開くか、簡易サーバーで確認できます。

```bash
npx serve .
# または
python3 -m http.server 8080
```

## 公開（デプロイ）にあたって — 人間の承認・作業が必要な項目

このリポジトリはコードとして完成していますが、以下は人間の判断・アカウント操作が必要なため
未着手です（AI経営指示書のHUMAN APPROVAL GATE方針に基づく）。

1. **ホスティング先の決定とドメイン**
   - 推奨: Vercel / Cloudflare Pages の無料枠に接続（このリポジトリをそのままインポート可能）。
   - GitHub Pagesを使う場合は、リポジトリの Settings → Pages → Source を
     「GitHub Actions」に設定してください（`.github/workflows/deploy.yml` は用意済み、mainブランチへの
     pushで自動デプロイされます）。
   - 独自ドメインを取得する場合は費用が発生するため、購入前に承認をお願いします。
   - `sitemap.xml` 内のURLは仮のプレースホルダー（`https://poe2-build-navi.example/`）です。
     本番ドメインが決まり次第、実際のURLに置き換えてください。

2. **Google Search Console / Google Analytics**
   - サイト公開後、Search Consoleへの登録とサイトマップ送信、Analyticsのトラッキングコード追加を
     行うことでSEO状況の計測が可能になります（Googleアカウントでの登録が必要）。

3. **収益化（広告・アフィリエイト）**
   - Google AdSenseの申請には審査（サイト・トラフィック要件あり）と、Googleアカウントでの申し込みが必要です。
   - Amazonアソシエイト等のアフィリエイトプログラムも同様にアカウント登録が必要です。
   - `privacy.html` / `disclaimer.html` は草案です。実際に広告・アフィリエイトを導入する際は
     内容を実態に合わせて更新し、必要であれば専門家の確認を受けてください。

4. **SNS運用**
   - X（旧Twitter）等での情報発信は、アカウント開設・投稿ルールの承認後に開始してください。

## 経営コンテキスト

このリポジトリの事業判断の経緯は `company/memory/` 以下に記録しています。特に
`company/memory/decisions.md` に、なぜこの事業・技術構成・コンテンツ方針を選んだかの理由を残しています。
