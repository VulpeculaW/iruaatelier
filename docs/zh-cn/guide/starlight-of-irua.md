---
title: Starlight of Irua | イルアの星光
sidebarTitle: Starlight of Irua
order: 1
---

# Starlight of Irua | イルアの星光

> 服装、开关、氛围粒子，只需食指指尖即可掌控。✦

[在 Booth 查看](https://vulpeculakitsune.booth.pm/items/5647776)

![Starlight of Irua 粒子预览](/starlight-of-irua.png)

## ✨ 这个机关可以做什么

这是一个通过手部操作来切换服装和饰品的 Object Menu System。
它基于 Modular Avatar 制作，设置会在 Build 或进入 Play Mode 时自动应用。

## 📦 需要准备

- Unity 2022.3.22f1
- VRChat Avatar SDK | ↑ 3.10.x
- Modular Avatar | ↑ 1.17.x
- liltoon Shader
- `Starlight of Irua [LeftHand].prefab` 或 `Starlight of Irua [RightHand].prefab`
- `Starlight of Irua [Object Menu System].prefab`

::: warning 运行注意事项
- 本资产使用 **PhysBone 系统**。若 PhysBone 交互被禁用，将无法正常工作。
- 本资产使用 **Particle System**。若在 VRChat 图形设置中启用了 `Particle Limit`，可能无法正常工作。
:::

## 🛠 安装 / 设置

![Starlight of Irua 菜单系统 Inspector](/starlight-of-irua-menu-system.png)

### 1. 基本导入

把你需要的手部方向 Prefab 和 `Starlight of Irua [Object Menu System].prefab` 放到 Avatar Root 下。

### 2. Outfit Switch 设置

`Starlight Menu System` 有 4 个固定的 `Outfit Switch` 槽位。
请把每个颜色对应要显示的服装对象放进对应槽位。

- 槽位固定为 Blue / Red / Green / Yellow。
- 服装切换是排他式的，4 个里同时只会有 1 个生效。
- 指定的服装对象会在 Build 时移动到对应的 `Switch Target` 下。

### 3. Accessory Toggle 设置

`Accessory Toggle` 也有 4 个固定槽位。
请把要开关的饰品、服装部件或其他对象放进各自槽位。

- 每个 Toggle 都是独立工作的。
- 如有需要，可以使用 `Invert` 反转 ON/OFF 条件。

### 4. 附加功能

只开启你真正需要的功能。

- `Object Toggle`: 同时开关其他对象。
- `Shape Changer`: 通过 BlendShape 缩小或删除被衣服遮住的身体网格部分。
- `Mesh Cutter`: 裁掉部分网格，减少穿模。
- `Material Swap`: 批量把一种材质替换成另一种材质。
- `Material Setter`: 只修改某个指定网格上的某个材质槽。

### 5. Setup Outfit 警告

如果服装对象出现 `Setup Outfit` 警告，建议先用 Modular Avatar 的 `Setup Outfit` 进行准备后再使用。
对于带蒙皮的服装，这一点尤其重要。

### 6. 应用

没有单独的 Apply 按钮。
在 Build 或进入 Play Mode 时会自动应用。

## 🎮 实际操作方法

所有操作都使用食指指尖完成。

### 1. 打开 / 关闭菜单

将手指在手环 Logo 位置停留 1 秒即可打开菜单。
再次触碰一次即可关闭菜单。
当角色有足够移动时，菜单也可能自动关闭。

### 2. 切换服装

将手指在某个图案上停留 1 秒，可切换 `SwitchTarget`。
手环和中央圆环的颜色也会同时变成所选颜色。

### 3. 切换 Toggle 状态

将某个图案向中心拖动，可改变 `ToggleTarget` 的状态。

### 4. 使用粒子效果

触碰中心可发射粒子效果。
也可以从每个图案的起点画顺时针或逆时针圆形手势，触发对应的粒子效果。
