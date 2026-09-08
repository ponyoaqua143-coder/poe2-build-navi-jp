# Build Article Content Queue

Cloud Codeのセッション開始時に自動実行されるフック（.claude/hooks/session-start-tasks.sh）が
この一覧を見て、未着手（[pending]）の記事を1本ずつ作成する。作成後は該当行を [done] に更新すること。

新しい行を追加する場合もこの形式（`- [pending] <ファイルパス> | <タイトル> | <メモ>`）に従う。

## 序盤スタータービルド記事

- [done] guides/builds/warrior-starter.html | ウォリアー：序盤スタータービルドの考え方 | 2026-09-08 作成
- [done] guides/builds/ranger-starter.html | レンジャー：序盤スタータービルドの考え方 | 2026-09-08 作成
- [pending] guides/builds/mercenary-starter.html | マーサリー：序盤スタータービルドの考え方 | クロスボウ/グレネードの立ち回り
- [pending] guides/builds/monk-starter.html | モンク：序盤スタータービルドの考え方 | 機動力・回避を活かす立ち回り
- [pending] guides/builds/sorceress-starter.html | ソーサレス：序盤スタータービルドの考え方 | 範囲元素魔法・低耐久のケア
- [pending] guides/builds/witch-starter.html | ウィッチ：序盤スタータービルドの考え方 | ミニオン運用の考え方
- [pending] guides/builds/huntress-starter.html | ハントレス：序盤スタータービルドの考え方 | 槍を使ったコンボ的な立ち回り

## 作成ルール（既存記事に必ず合わせる）

1. 構成は「結論→理由→具体的な進め方→比較→注意点→次の行動」で統一する。
2. 特定のスキル名・数値は明言しすぎない。パッチで変わるため、判断軸（何を優先するか）を中心に書く。
3. ページ冒頭に `<p class="note">最終更新日：YYYY年M月D日。...</p>` を入れる。
4. 既存ページ（guides/builds/warrior-starter.html等）と同じHTML構造・CSSクラス・ナビゲーション（フッター含む）をコピーして流用する。
5. 作成後は必ず:
   - guides/builds/index.html の該当カードを「準備中」から実際の記事リンクに更新する
   - sitemap.xml に新しいURLを追加する（placeholderドメイン `https://poe2-build-navi.example/` のまま。実ドメインが判明したらまとめて置換する）
   - このファイルの該当行を `[pending]` → `[done]` に変更する
   - company/memory/.last-content-run に現在のUnix epoch秒を書き込む
   - git commit & push する（1記事＝1コミットを基本とする）
6. 記事を1つ追加したら、その回のセッションではそれ以上追加しない（キューは1セッション1本が目安）。
