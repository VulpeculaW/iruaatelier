---
title: Nebula Staff | 星雲の杖
sidebarTitle: Nebula Staff
order: 2
---

# Nebula Staff | 星雲の杖

> Action Menu なしで、手の操作だけで扱う星光の魔法の杖。✦

[Boothで見る](https://vulpeculakitsune.booth.pm/items/6052328)

![Nebula Staff プレビュー](/nebula-staff.jpg)

## ✨ このギミックでできること

このギミックは、すべての相互作用を **Action Menu の操作なし** で、手の動きだけで行える魔法の杖パーティクルです。
Modular Avatar ベースで作られており、設定は Build または Play 時に自動適用されます。

Modular Avatar についての詳細は [公式ドキュメント](https://modular-avatar.nadena.dev) をご参照ください。

## 📦 パッケージ構成

すべてのパッケージのギミックは同じです。杖のデザインと、紫水晶の色が含まれるかどうかに違いがあります。

- **Digital Full Package** — すべてのデザイン + 紫水晶の色を含む
- **Digital Tradition Pack** — トラディションデザイン
- **Digital Modern Pack** — モダンデザイン

## 🧰 必要なもの

- Unity 2022.3.22f1
- VRChat Avatar SDK | ↑ 3.7.0
- Modular Avatar | ↑ 1.9.15
- パッケージに含まれる Nebula Staff Prefab

::: warning 動作に関する注意
- 本アセットは **Particle System** を利用しています。VRChat のグラフィック設定で `Particle Limit` が有効だとパーティクルが表示されないことがあります。**OFF** に設定してください。
- 本アセットは **相互作用ギミック** を利用しています。VRChat の設定で `Interaction`（Self Interaction）を **ON** にしてください。
- VRChat の仕様変更により、自分自身のパーティクルは鏡やカメラに投影されているときだけシミュレーションされます。第三者の視点では正常に表示されます。
:::

## 🛠 導入 / 設定

### 1. 基本導入

アバター Root に、パッケージに含まれる Nebula Staff Prefab を入れてください。

提供された Prefab を、アバターの手と背中の位置に適切に合わせてください。

### 2. 適用

Apply ボタンはありません。
Build または Play Mode に入ると自動で適用されます。

## 🎮 実際の操作方法

すべての操作は Action Menu なしで、手の動きで行います。

### 1. 杖召喚 (Summon Staff)

背中にある杖の `Core` 部分を手で Grab します。

### 2. 杖の解錠 (Release Staff)

杖の飾りの先を掴んで引きます。

### 3. ノーマルショット (Normal Shot)

杖を持っている手で Grab します。

### 4. チャージング・ショット (Charging Shot)

真ん中にある玉を杖の `Core` に入れ、杖を一度回します。

### 5. 魔法モード (Magic Mode)

杖を素早く時計回り（左手は反時計回り）に回します。

### 6. 傘モード (Umbrella Mode)

魔法モードのとき、杖を垂直に1秒以上立てます。

### 7. 傘モード解除 (Turn off Umbrella Mode)

杖を水平に1秒以上倒します。

## ❓ よくある質問

**Q. パーティクルが見えません。**
A. VRChat のグラフィック設定で `Particle Limit` を確認してください。この設定が **OFF** になっているとパーティクルが正常に表示されます。

**Q. 相互作用ギミックが作動しません。**
A. VRChat の設定で `Interaction` を **ON** に変えてください。

**Q. 鏡やカメラでパーティクルが異常に表示されます。**
A. VRChat の仕様変更により、自分自身のパーティクルは鏡やカメラに投影されているときだけシミュレーションされます。第三者の視点では正常に表示されます。
