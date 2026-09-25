# 4D Research Presentation - Main Website

研究発表のメインサイトです。GitHub Pages でそのまま配信できる静的HTML/CSS/JS構成です。

## 公開するフォルダ

GitHub Pages の Source を `Deploy from a branch` にし、`main` ブランチの `/docs` を指定してください。

## ページ構成

- `docs/index.html` — トップ。学科紹介 / 発表内容 / 予約への入口
- `docs/department.html` — 学科紹介の詳細
- `docs/presentations.html` — 発表内容の詳細一覧
- `docs/assets/css/site.css` — 共通デザイン。VIVANT参考ページの黒・濃灰・赤、英字大見出し、固定ナビ等を研究発表向けに再構成
- `docs/assets/js/site.js` — 共通の軽量JS

## まず変更する場所

1. `docs/index.html` の開催日・場所・トップ文言
2. `docs/department.html` の学科紹介本文
3. `docs/presentations.html` の研究テーマカード
4. メインHEROは `docs/assets/img/hero-denshi.png`（配信用は `.webp`）を同名で置換
5. その他の写真を `docs/assets/img/` に追加して、各HTMLのプレースホルダーを画像へ置換

詳細は `project-docs/EDITING_GUIDE.md` を参照してください。

## 予約ページへのリンク

初期値は以下です。

`https://gifukosen-4d-kosensai.github.io/reservation/`

リポジトリ名や公開URLを変えた場合は、HTML内のこのURLを一括置換してください。

## ローカル確認

ルートで次を実行し、表示されたURLの `/docs/` を開いてください。

```bash
python -m http.server 5500
```

`file://` 直開きよりHTTPサーバー経由を推奨します。
