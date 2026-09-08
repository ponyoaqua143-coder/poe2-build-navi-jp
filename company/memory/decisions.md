# Decisions Log

## 2026-09-08: 主力事業をPoE2ビルドナビに決定
- 背景: リポジトリが空の状態で初期化。リポジトリ名が既に事業ドメインを示していたため、
  ゼロから事業候補を探索するのではなく、この事業を主力事業として採用。
- Opportunity Score（概算）:
  - Demand: 高（2026年12月11日の1.0/基本無料化で新規流入急増が確実に見込める）
  - Competition: 高（Game8, Gamerch等の大手攻略メディアが「最強ビルド」領域を支配）
  - Monetization: 中〜高（広告+アフィリエイトの型は確立済みジャンル）
  - Speed: 高（静的サイトで即日公開可能）
  - Authority Fit: 新規サイトのため権威性ゼロからのスタート（弱み）
  - Trend: 高（1.0リリースに向けて9月〜12月で検索需要が右肩上がりの見込み）
  - Cost: 低（静的サイト、追加費用ほぼなし）
  - Risk: 低〜中（ゲームコンテンツ・商標の扱いに注意。著作権侵害を避け非公式である旨を明記）
  - 総合: 高得点。ただし「最強ビルド」網羅では大手に勝てないため、
    1.0リリース前情報・診断ツールで差別化する方針を採用。
- 決定: 会社資源の100%を本事業に投入（他事業が存在しないため）。

## 2026-09-08: 技術スタックをプレーン静的HTML/CSS/JSに決定
- 理由: ビルド依存を持たせず、どのホスティング（GitHub Pages/Vercel/Cloudflare Pages）にも
  即デプロイ可能にするため。ページ数が少ない初期段階ではNext.js等のフレームワーク導入コストが
  見合わない。将来的にページ数が増え、テンプレート管理が煩雑になった場合はSSG導入を再検討する。

## 2026-09-08: 1.0/デュエリスト情報の書き方について
- リスク: Path of Exile 2 1.0の詳細（デュエリストの具体的スキル、無料化の正確な範囲）は
  2026年9月時点で一部未確定（Exilecon 2026が11/7-9開催予定でそこから詳細発表見込み）。
- 対応: 断定を避け、「判明している事実」と「未確定」を明示的に分けて記載。最終更新日を明記し、
  Exilecon後に更新する前提のページ構成にした。

## 2026-09-08: お問い合わせ窓口を設けない方針に確定
- ユーザー指示により、個別の問い合わせ窓口（メール等）は設置しないことを確定。
  contact.html / privacy.html の記載を「窓口なし」で一貫させた。

## 2026-09-08: ビルド記事の自動追加をSessionStartフックで自動化
- 背景: ユーザーから「Claude Codeを開いたら自動でビルド記事の追加とアフィリエイト登録が進むようにしてほしい」
  との依頼。
- 実装: `.claude/hooks/session-start-tasks.sh` を追加し、`.claude/settings.json` のSessionStartフックに登録。
  セッション開始時に company/memory/content-queue.md の未着手記事を検出し、次のセッションへ
  「1記事だけ作成してcommit・pushする」タスクを自動的にコンテキスト注入する。連投を避けるため
  前回実行から12時間未満なら記事追加タスクは注入しない（company/memory/.last-content-run で管理）。
- 初回分としてウォリアー・レンジャーの序盤スタータービルド記事を作成済み。残り5クラス分はキュー登録。
- 検証: 生のフックスクリプトを合成stdinでパイプテスト済み（pending検出時／12時間以内の再実行抑制時の
  両方を確認）。`jq -e` でsettings.jsonのスキーマも検証済み。SessionStartはターン内で発火させて
  検証できないため、実際の発火は次回セッション開始時に確認が必要。

## 2026-09-08: 本番サイトはChatGPT版（poe2-build-navi-jp.github.io）と判明、リポジトリ未特定
- ユーザーからサイトのZIP（`poe2-build-navi-jp.github.io-main`）を受領し中身を精査。
- 内容: 8クラス（ウォリアー/モンク/レンジャー/マーサリー/ソーサレス/ウィッチ/ハントレス/ドルイド）対応。
  ドルイドは0.4.0パッチ"The Last of the Druids"で追加された実在クラスと確認済み（誤情報ではない）。
  クラスごとに1本、Lv1〜Endgameまで8段階の育成ロードマップを持つビルド記事、data/builds.json・
  data/classes.jsonを元にtools/generate-pages.mjsで静的HTMLを生成する構成。scripts/test-site.mjsによる
  データ整合性の自動テストがあり実行して合格を確認済み（8クラス・8ビルド・必須フィールド・ステージ数など）。
  ads.txt・Search Console確認用ファイル・sitemap・robots・プライバシー/利用規約/編集方針/運営者情報ページも
  揃っている。品質・作り込みは私が最初に作ったMVPより大幅に上。
- 重大な制約: `baseUrl: https://poe2-build-navi-jp.github.io` がgenerate-pages.mjs・sitemap・canonical・
  JSON-LD等に直書きされている。GitHub Pagesのユーザーページ（`<account>.github.io`）はリポジトリ名と
  アカウント名が一致している必要があるため、このサイトは `poe2-build-navi-jp` という名前の**別の
  GitHubアカウント**上の `poe2-build-navi-jp.github.io` リポジトリで運用されていると推測される。
  今セッションが接続しているのは `ponyoaqua143-coder` アカウントのみで、別アカウントのリポジトリは
  同一セッションでは扱えない（add_repoで cross-tier エラー）。
- 判断: このZIPの中身を `ponyoaqua143-coder/poe2-build-navi-jp` にそのまま持ち込んでGitHub Pages公開すると、
  URLが変わり（`ponyoaqua143-coder.github.io/poe2-build-navi-jp/` 等）、既存のSearch Console登録・
  AdSense審査・canonical URLとの整合性が崩れる。ドメインを維持したまま自動化するには、実際に
  `poe2-build-navi-jp.github.io` を配信しているリポジトリへの書き込みアクセスが必要。
- 次のアクション: ユーザーに、そのGitHubアカウントへのログイン可否と、Claude用GitHub連携をそちらにも
  接続できるか（または`ponyoaqua143-coder`へのリポジトリ移管が可能か）を確認する。回答が得られるまで、
  このリポジトリの内容をZIPの内容で上書きする作業は保留する。

## 2026-09-08: アフィリエイト登録は「登録の完了」までは自動化しない
- 理由: アフィリエイト登録には個人情報・銀行口座・税務情報の入力と規約同意が伴い、経営指示書の
  HUMAN APPROVAL GATE（認証情報変更・支払い・規約上リスクのある自動化）に該当するため。
- 対応: サイト側の受け皿（アフィリエイト表記・プライバシーポリシー記載）は用意済み。
  company/memory/affiliate.md に状態（pending_human_action）と、ユーザーに確認が必要な2項目
  （本番サイトURL／利用したいASP）を記録し、SessionStartフックが未回答の間は毎セッション冒頭で
  一度だけ確認を促すようにした。回答後、ASPへの実際の申込み送信は人間が行う前提。
