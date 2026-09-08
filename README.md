# PoE2ビルドナビ (poe2-build-navi-jp)

Path of Exile 2（PoE2）向けの日本語初心者攻略サイト。ビルド不要のプレーンな静的サイト
（HTML / CSS / vanilla JS のみ、依存パッケージなし）です。

## 構成

```
index.html                 トップページ
guides/beginner.html       初心者ガイド
guides/version-1-0.html    1.0リリース・基本無料化・デュエリスト情報まとめ
guides/currency-trading.html  通貨・トレード解説
guides/builds/index.html   ビルド記事一覧
guides/builds/*.html       クラス別スタータービルド記事（自動追加、下記参照）
classes/index.html         クラス診断ツール + 全7クラス概要
about.html / privacy.html / disclaimer.html / contact.html  各種固定ページ（お問い合わせ窓口なし）
assets/css/style.css       共通スタイル
assets/js/main.js          ナビ開閉・クラス診断ロジック
robots.txt / sitemap.xml   SEO関連
.github/workflows/deploy.yml  GitHub Pages自動デプロイ（要: 下記セットアップ）
.claude/hooks/session-start-tasks.sh  セッション開始時の自動運用フック（下記参照）
company/memory/            経営判断・アイデア・ルールの記録（company.md, decisions.md, ideas.md, rules.md,
                            content-queue.md, affiliate.md）
```

## 自動運用（SessionStartフック）

Claude Codeでこのリポジトリのセッションを開始するたびに `.claude/hooks/session-start-tasks.sh` が実行され、
以下を確認して必要ならその回のセッションへタスクを自動的に提示します。

- **ビルド記事の追加**: `company/memory/content-queue.md` に残っている未着手のクラス別記事を1本だけ作成し、
  一覧ページ・サイトマップを更新してcommit・pushする（連投防止のため前回実行から12時間は再実行しない）。
- **アフィリエイト登録の確認**: `company/memory/affiliate.md` が `pending_human_action` のままなら、
  セッション冒頭で一度だけユーザーに進捗を確認する。

キューが尽きたら `company/memory/content-queue.md` に新しい行を追加すれば、次回セッション以降も
自動で拾われます。

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

1. **本番サイトのURL確認（未回答）**
   - Search Console / AdSenseの申請は別途（ChatGPT経由で）対応済みとのことですが、このリポジトリからは
     実際の公開URLが分かりません。`sitemap.xml` は現在プレースホルダードメイン
     （`https://poe2-build-navi.example/`）のままです。実URLが分かり次第、一括置換してください。

2. **収益化（アフィリエイト）— 一部未着手**
   - AdSenseは申請済みとのことなので対応不要です。アフィリエイト（ASP）登録は未着手です。
   - 登録には個人情報・銀行口座・税務情報の入力と規約同意が必要なため、AIは申込みの最終送信は行いません
     （経営指示書のHUMAN APPROVAL GATEに該当）。利用したいASP（A8.net／もしもアフィリエイト／
     楽天アフィリエイト／Amazonアソシエイト等）が決まったら `company/memory/affiliate.md` に追記してください。
     サイト側の受け皿（アフィリエイト表記・プライバシーポリシー）は用意済みです。

3. **SNS運用**
   - X（旧Twitter）等での情報発信は、アカウント開設・投稿ルールの承認後に開始してください。

## 経営コンテキスト

このリポジトリの事業判断の経緯は `company/memory/` 以下に記録しています。特に
`company/memory/decisions.md` に、なぜこの事業・技術構成・コンテンツ方針を選んだかの理由を残しています。
