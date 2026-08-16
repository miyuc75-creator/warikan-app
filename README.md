# 割り勘計算アプリ (warikan-app)

合計金額と参加人数から割り勘を計算する Web アプリです。通常の均等割りに加え、一部の人の支払額を指定して残りを自動で割り勘できます。

## 機能

- 通常の均等割り勘
- 一部の人数・金額を指定した割り勘
- 1円・10円・100円単位の端数処理
- 計算結果の LocalStorage 保存と履歴再利用
- 計算成功時の効果音

## 技術スタック

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- LocalStorage

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## デプロイ（Vercel）

1. [Vercel](https://vercel.com) に GitHub アカウントでログイン
2. 「Add New Project」→ `miyuc75-creator/warikan-app` をインポート
3. フレームワークは Next.js を自動検出 → Deploy

または CLI:

```bash
npx vercel --prod
```

## リポジトリ

https://github.com/miyuc75-creator/warikan-app
