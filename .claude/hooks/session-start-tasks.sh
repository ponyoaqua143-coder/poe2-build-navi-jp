#!/bin/bash
# SessionStart hook: surfaces standing operational tasks (next queued build
# article, affiliate registration follow-up) as context when a new Claude
# Code session opens on this repo. See company/memory/content-queue.md and
# company/memory/affiliate.md for the state this reads.
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
QUEUE_FILE="$PROJECT_DIR/company/memory/content-queue.md"
STATE_FILE="$PROJECT_DIR/company/memory/.last-content-run"
AFFILIATE_FILE="$PROJECT_DIR/company/memory/affiliate.md"
MIN_INTERVAL=43200 # 12 hours, avoids adding an article on every rapid re-open

NOW_EPOCH=$(date +%s)
SHOULD_RUN_CONTENT=1
if [ -f "$STATE_FILE" ]; then
  LAST=$(cat "$STATE_FILE" 2>/dev/null || echo 0)
  case "$LAST" in
    ''|*[!0-9]*) LAST=0 ;;
  esac
  DIFF=$((NOW_EPOCH - LAST))
  if [ "$DIFF" -lt "$MIN_INTERVAL" ]; then
    SHOULD_RUN_CONTENT=0
  fi
fi

CONTEXT=""

if [ "$SHOULD_RUN_CONTENT" = "1" ] && [ -f "$QUEUE_FILE" ]; then
  NEXT_LINE=$(grep -m1 '^\- \[pending\]' "$QUEUE_FILE" || true)
  if [ -n "$NEXT_LINE" ]; then
    CONTEXT="自動運用タスク（ビルド記事キュー）: company/memory/content-queue.md に未着手の記事があります -> ${NEXT_LINE}
同ファイル末尾の作成ルールに従って1本だけ作成し、guides/builds/index.html とsitemap.xmlを更新し、
company/memory/content-queue.md の該当行を [done] に、company/memory/.last-content-run を現在時刻(epoch秒)に更新して、
commitしてpushしてください。ユーザーから他の指示がある場合はそちらを優先してください。"
  fi
fi

if [ -f "$AFFILIATE_FILE" ] && grep -q '^status: pending_human_action' "$AFFILIATE_FILE" 2>/dev/null; then
  NOTE="アフィリエイト連携: company/memory/affiliate.md がpending_human_actionのままです。ユーザーがまだ「本番サイトURL」と「利用したいASP」に回答していない場合は、会話の早い段階で一度確認してください（すでに回答済み・対応済みなら再確認は不要です）。"
  if [ -n "$CONTEXT" ]; then
    CONTEXT="$CONTEXT

$NOTE"
  else
    CONTEXT="$NOTE"
  fi
fi

if [ -n "$CONTEXT" ]; then
  jq -n --arg ctx "$CONTEXT" '{hookSpecificOutput: {hookEventName: "SessionStart", additionalContext: $ctx}}'
else
  echo '{}'
fi
