#!/bin/bash
# Publish the current Drive App files to GitHub Pages.
set -e
SRC="${BUDGET_APP_SRC:?Set BUDGET_APP_SRC to your local source folder, e.g. export BUDGET_APP_SRC=~/path/to/App}"
REPO=~/budget-app-pages
cp "$SRC"/index.html "$SRC"/budget-planner.html "$SRC"/credit-card-tracker.html "$SRC"/manifest.json "$SRC"/sw.js "$SRC"/firebase-messaging-sw.js "$REPO"/
cd "$REPO"
git add -A
git commit -q -m "update ${1:-$(date +%Y-%m-%d)}" || { echo "no changes"; exit 0; }
git push -q
echo "pushed → https://hanbaeklyu.github.io/family-budget/budget-planner.html (live in ~1 min)"
