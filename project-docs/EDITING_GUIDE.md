# 複数人開発・編集ガイド

## 役割分担しやすい場所

| 担当 | 主に触るファイル | 内容 |
|---|---|---|
| トップ担当 | `docs/index.html` | 開催概要、トップ文言、3つの導線 |
| 学科紹介担当 | `docs/department.html` | 学科紹介本文、特徴、写真 |
| 発表担当 | `docs/presentations.html` | 発表テーマの追加・修正 |
| デザイン担当 | `docs/assets/css/site.css` | 色、余白、カード、ナビ、レスポンシブ |
| 予約担当 | 別リポジトリ `reservation` | 予約UIとAPIサーバー |

## メインHEROの差し替え方

トップのHEROは次の2ファイルです。

- `docs/assets/img/hero-denshi.webp` — 通常ブラウザで優先表示
- `docs/assets/img/hero-denshi.png` — フォールバック兼元画像

現在は「電子制御工学科 専門展 DENSHI」の砂丘ビジュアルを設定済みです。画像を更新する場合は、同じファイル名で2形式を置き換えるのが最も簡単です。HTML側は `docs/index.html` の `★メインHERO画像` コメント付近です。

PCの横長画面では画像上端を維持して下側をトリミングし、スマートフォンでは画像本来の縦横比でほぼ全体が表示されるよう `site.css` で調整しています。

## 写真の差し替え方

写真は `docs/assets/img/` に置きます。ファイル名は半角英数字とハイフンを推奨します。

例: `research-robot-01.webp`

現在のグレー背景プレースホルダーはCSSで描画しています。画像へ変える場合は、HTMLの対象要素に次のようなスタイルを設定できます。

```html
<div class="feature-card__visual" style="background:url('./assets/img/research-robot-01.webp') center/cover"></div>
```

## 発表テーマを増やす

`presentations.html` にある `article.research-item` を丸ごと複製します。HTML中に `★発表追加` コメントがあります。

## コンフリクトを減らす運用

1人が全ファイルを触るのではなく、上表のページ単位で担当を分けるとGitの競合を減らせます。デザイン変更は `site.css` に集中するため、CSS担当の変更中は他メンバーが大規模なCSS整形をしない運用を推奨します。

## ブランチ例

- `feature/top-copy`
- `feature/department`
- `feature/presentation-a`
- `fix/mobile-nav`

`main` へ直接大量変更せず、Pull Requestで表示確認してからマージしてください。

## VIVANT参考デザインについて

参考ページの雰囲気を強く残しつつ、TBSロゴ、番組ロゴ、俳優写真、番組固有のコピーは本サイトには含めていません。学校イベント用の独自タイトル・写真へ差し替えて運用してください。
