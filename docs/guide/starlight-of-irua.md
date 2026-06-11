---
title: Starlight of Irua | イルアの星光
sidebarTitle: Starlight of Irua
order: 1
---

# Starlight of Irua | イルアの星光

> 옷장, 토글, 분위기 파티클을 검지 손끝 하나로. ✦

[Booth에서 보기](https://vulpeculakitsune.booth.pm/items/5647776)

![Starlight of Irua 파티클 프리뷰](/starlight-of-irua.png)

## ✨ 무엇을 하는 기믹인가요?

이 기믹은 손동작으로 의상과 악세서리를 빠르게 바꾸는 Object Menu System입니다.
Modular Avatar 기반으로 제작되었으며, 설정은 Build 또는 Play 시 자동 적용됩니다.

## 📦 준비물

- Unity 2022.3.22f1
- VRChat Avatar SDK | ↑ 3.10.x
- Modular Avatar | ↑ 1.17.x
- liltoon Shader
- `Starlight of Irua [LeftHand].prefab` 또는 `Starlight of Irua [RightHand].prefab`
- `Starlight of Irua [Object Menu System].prefab`

::: warning 동작 주의사항
- 이 에셋은 **PhysBone 시스템**을 사용합니다. PhysBone 인터랙션이 비활성화되어 있으면 정상 동작하지 않습니다.
- 이 에셋은 **Particle System**을 사용합니다. VRChat 그래픽 설정에서 `Particle Limit`가 켜져 있으면 정상 동작하지 않을 수 있습니다.
:::

## 🛠 설치 / 설정

![Starlight of Irua 메뉴 시스템 인스펙터](/starlight-of-irua-menu-system.png)

### 1. 기본 도입

아바타 Root에 원하는 손 방향 Prefab과 `Starlight of Irua [Object Menu System].prefab`을 넣어주세요.

### 2. Outfit Switch 설정

`Starlight Menu System`의 `Outfit Switch`에는 4개의 고정 슬롯이 있습니다.
각 색상 슬롯에, 그 색이 선택되었을 때 표시할 의상 오브젝트를 넣어주세요.

- Blue / Red / Green / Yellow 4칸 고정입니다.
- 스위칭은 4개 중 1개만 켜지는 방식입니다.
- 지정한 의상 오브젝트는 Build 시 해당 `Switch Target` 아래로 이동합니다.

### 3. Accessory Toggle 설정

`Accessory Toggle`에도 4개의 고정 슬롯이 있습니다.
각 슬롯에 켜고 끌 악세서리, 옷 파츠, 추가 오브젝트를 넣어주세요.

- 토글은 각 슬롯이 서로 독립적으로 동작합니다.
- 필요하면 `Invert`를 사용해 ON/OFF 조건을 반대로 적용할 수 있습니다.

### 4. 부가 기능

필요한 기능만 체크해서 사용하세요.

- `Object Toggle`: 다른 오브젝트를 함께 켜거나 끕니다.
- `Shape Changer`: 옷에 가려지는 몸 메쉬를 블렌드쉐이프로 줄이거나 삭제합니다.
- `Mesh Cutter`: 메쉬 일부를 잘라 관통을 줄입니다.
- `Material Swap`: 같은 머티리얼을 한 번에 다른 머티리얼로 바꿉니다.
- `Material Setter`: 특정 메쉬의 특정 머티리얼 슬롯만 바꿉니다.

### 5. Setup Outfit 경고

의상 오브젝트에 `Setup Outfit` 경고가 뜨면, Modular Avatar의 `Setup Outfit`으로 먼저 준비한 뒤 사용하는 것을 권장합니다.
특히 스킨드 메시 의상은 이 과정이 필요할 수 있습니다.

### 6. 적용

별도의 Apply 버튼은 없습니다.
Build 하거나 Play Mode에 들어가면 자동 적용됩니다.

## 🎮 실제 조작 방법

모든 조작은 검지 끝으로 수행합니다.

### 1. 메뉴 열기 / 닫기

팔찌의 로고 부분을 1초간 터치하면 메뉴가 열립니다.
한 번 더 터치하면 메뉴가 닫힙니다.
또한 아바타가 충분히 이동하면 자동으로 종료될 수 있습니다.

### 2. 의상 바꾸기

각 문양을 1초간 터치하면 `SwitchTarget`이 변경됩니다.
선택한 색상에 맞춰 팔찌와 중앙 링의 색도 함께 바뀝니다.

### 3. 토글 바꾸기

각 문양을 중앙 방향으로 드래그하면 `ToggleTarget` 상태가 변경됩니다.

### 4. 파티클 사용

중앙을 터치하면 파티클이 발사됩니다.
또한 각 문양의 시작점에서 시계 방향 또는 반시계 방향으로 원을 그리면, 해당하는 파티클이 발동합니다.
