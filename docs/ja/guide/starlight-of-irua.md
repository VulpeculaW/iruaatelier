---
title: Starlight of Irua | イルアの星光
sidebarTitle: Starlight of Irua
order: 1
---

# Starlight of Irua | イルアの星光

> 衣装、トグル、雰囲気のパーティクルを人差し指の指先ひとつで。✦

[Boothで見る](https://vulpeculakitsune.booth.pm/items/5647776)

![Starlight of Irua パーティクルプレビュー](/starlight-of-irua.png)

## ✨ このギミックでできること

このギミックは、手の操作で衣装やアクセサリーを素早く切り替える Object Menu System です。
Modular Avatar ベースで作られており、設定は Build または Play 時に自動適用されます。

## 📦 必要なもの

- Unity 2022.3.22f1
- VRChat Avatar SDK | ↑ 3.10.x
- Modular Avatar | ↑ 1.17.x
- liltoon Shader
- `Starlight of Irua [LeftHand].prefab` または `Starlight of Irua [RightHand].prefab`
- `Starlight of Irua [Object Menu System].prefab`

::: warning 動作に関する注意
- 本アセットは **PhysBone システム** を利用しています。PhysBone のインタラクションが無効の場合、正常に動作しません。
- 本アセットは **Particle System** を利用しています。VRChat のグラフィック設定で `Particle Limit` が有効な場合、正常に動作しないことがあります。
:::

## 🛠 導入 / 設定

![Starlight of Irua メニューシステムのインスペクター](/starlight-of-irua-menu-system.png)

### 1. 基本導入

アバター Root に、使いたい手方向の Prefab と `Starlight of Irua [Object Menu System].prefab` を入れてください。

### 2. Outfit Switch 設定

`Starlight Menu System` の `Outfit Switch` には、4つの固定スロットがあります。
各色スロットに、その色が選ばれた時に表示したい衣装オブジェクトを入れてください。

- Blue / Red / Green / Yellow の4枠固定です。
- スイッチは4つのうち1つだけ ON になります。
- 指定した衣装オブジェクトは Build 時に対応する `Switch Target` の子へ移動します。

### 3. Accessory Toggle 設定

`Accessory Toggle` にも4つの固定スロットがあります。
各スロットに ON/OFF したいアクセサリー、衣装パーツ、追加オブジェクトを入れてください。

- 各トグルは独立して動作します。
- 必要なら `Invert` で ON/OFF 条件を反転できます。

### 4. 追加機能

必要な機能だけ有効にして使ってください。

- `Object Toggle`: 他のオブジェクトを一緒に ON/OFF します。
- `Shape Changer`: 衣装の下に隠れる素体メッシュをブレンドシェイプで縮小または削除します。
- `Mesh Cutter`: メッシュの一部を切って貫通を減らします。
- `Material Swap`: 同じマテリアルをまとめて別のマテリアルに置き換えます。
- `Material Setter`: 特定メッシュの特定マテリアルスロットだけ変更します。

### 5. Setup Outfit 警告

衣装オブジェクトに `Setup Outfit` の警告が出た場合は、Modular Avatar の `Setup Outfit` で先に準備してから使うことをおすすめします。
特にスキンメッシュ衣装では必要になることがあります。

### 6. 適用

Apply ボタンはありません。
Build または Play Mode に入ると自動で適用されます。

## 🎮 実際の操作方法

すべての操作は人差し指の先で行います。

### 1. メニューを開く / 閉じる

ブレスレットのロゴ部分を1秒間タッチするとメニューが開きます。
もう一度タッチすると閉じます。
また、アバターが十分に移動すると自動で終了する場合があります。

### 2. 衣装を切り替える

各模様を1秒間タッチすると `SwitchTarget` が切り替わります。
選択した色に合わせて、ブレスレットと中央リングの色も変わります。

### 3. トグルを切り替える

各模様を中央方向へドラッグすると `ToggleTarget` の状態が変わります。

### 4. パーティクルを使う

中央をタッチするとパーティクルが発射されます。
また、各模様の開始位置から時計回りまたは反時計回りに円を描くと、対応するパーティクルが発動します。
