# AI 出題規則與限制總覽

> 此文件整理自 `worker/src/lib/promptBuilder.js`，為系統送給 Gemini 的所有指令摘要。

---

## 一、AI 身份設定

> 你是一位精確的 STOTT PILATES 考官。請產出精煉的雙語解析。確保輸出是一個結構完整的 JSON 對象。

---

## 二、雙語術語格式規範

所有動作名稱與解剖術語必須使用以下格式：

```
中文名稱 (English Name)
```

範例：`腹橫肌 (Transversus Abdominis)`、`大象姿 (Elephant)`、`骨盆擺放 (Pelvic Placement)`

---

## 三、各科目出題重點

### IMP — Essential & Intermediate Matwork
- 呼吸模式（側胸廓呼吸）
- 骨盆與脊椎中立位
- 重力對動作的影響、Powerhouse 啟動順序
- 常見代償（髖屈肌過度使用、頸部張力）
- 典型動作：Roll Up、Single Leg Stretch、Teaser

**出題類型（每次隨機選一）**
- A) 呼吸與肋骨控制類
- B) 骨盆中立 vs 印記類
- C) 代償識別與矯正類
- D) 指導語精準度類

---

### IR — Essential & Intermediate Reformer
- 彈簧設定（輕/中/重對阻力路徑的影響）
- Carriage 安全操作、卸力技術（Deloading Springs）
- 常見代償（骨盆旋轉、腰椎塌陷）
- 典型動作：腳部練習、百次拍擊、大象姿

**出題類型（每次隨機選一）**
- A) 彈簧設定與生物力學類
- B) 安全操作程序類
- C) 動作離心控制類
- D) 情境模擬客戶代償類

---

### ICCB — Cadillac · Chair · Barrels
- Cadillac 安全鍊操作（Trapeze bar 限制）
- Chair 平衡挑戰（雙腳/單腳踏板）
- Barrels 脊椎弧度適應（Kyphosis/Lordosis 矯正）

**出題類型（每次隨機選一）**
- A) 安全鍊/彈簧鉤使用時機
- B) Chair 踏板阻力設定
- C) Barrel 脊椎適應類
- D) 情境模擬安全判斷類

---

### 五大原則 (PRINCIPLES) 深度專區
考查「小綠本」理論，極度精確：
1. **Breathing（呼吸）**：側胸廓呼吸機制、呼氣啟動時機
2. **Pelvic Placement（骨盆擺放）**：中立位 vs 印記位適用情境
3. **Rib Cage Placement（肋骨位置）**：Rib Flare 成因與矯正
4. **Scapular Movement & Stabilisation（肩胛動作與穩定）**：六個方向動作、前鋸肌角色
5. **Head & Cervical Placement（頭頸位置）**：頸椎自然曲線、捲腹支撐原則

> 禁止出模糊概念題。必須考查具體解剖機制或數據。

**出題類型（每次隨機選一）**
- A) 原則間交互影響
- B) 指導語有效 vs 無效辨別
- C) 具體解剖學機制
- D) 不同族群應用差異

---

### 解剖學 (ANATOMY) 深度專區
1. 肌肉起止點（精確到附著骨骼部位）
2. 關節分類與動作方向（關節面、運動平面）
3. 主動肌 / 拮抗肌 / 協同肌
4. 離心控制 (Eccentric Control) 在 Pilates 的應用
5. 代償模式的解剖學解釋

> 干擾項必須使用真實但有細微邏輯錯誤的解剖數據。

**出題類型（每次隨機選一）**
- A) 起止點精確考查
- B) 主動肌/拮抗肌配對
- C) 代償模式解剖解釋
- D) 運動平面與關節分類

---

## 四、考官高頻考點

| 考點 | 內容 |
|------|------|
| 安全性 | Cadillac 安全鍊時機、Chair 彈簧等級、Reformer Stopper 設定 |
| 五大原則交互 | 呼氣同時影響肋骨與腹橫肌、骨盆切換邏輯 |
| 代償觀察 | Rib Flare、Scapular Elevation、髂腰肌主導、頸部過屈 |
| 離心控制 | 彈簧/踏板回彈階段的控制肌群 vs 向心收縮 |
| 指導語精準性 | 有效 vs 無效指導語辨別 |

---

## 五、反模式規則（防止出題偏差）

### 規則一：正確答案位置隨機化
- 正確答案（correctId）必須隨機分配在 A、B、C、D
- **嚴格禁止**正確答案固定在 A
- 目標分布：A/B/C/D 各約 25%

### 規則二：選項長度均衡
- 四個選項長度差距在 ±10 字以內
- **嚴格禁止**正確答案明顯長於其他選項

### 規則三：干擾項必須「專業但有微小邏輯錯誤」
- 使用正確術語，但在細節製造錯誤：
  - 將「吸氣」改為「呼氣」（或反之）
  - 將正確肌肉換成解剖位置相近但功能不同的肌肉（前鋸肌→胸小肌）
  - 將數字改為相近但錯誤的值
  - 將動作階段調換（推出→回收）
- **嚴格禁止**出現明顯錯誤選項（如「讓學員隨便做」）
- **嚴格禁止**正確答案是唯一「溫柔、鼓勵性」描述

### 規則四：題目類型多樣化（每次隨機選一）
- 【情境題】：真實客戶狀況，問最適處理方式
- 【知識題】：直接考解剖數據/動作名稱/原則機制
- 【指導語辨別題】：四個指導語，問哪個最有效或會造成代償
- 【反向題】：「以下哪個描述是錯誤的？」

### 規則五：PRINCIPLES & ANATOMY 精準度
- 禁止出模糊概念題
- 必須考查具體解剖數據、起止點或神經控制機制

---

## 六、官方動作譯名對照表

| 英文 | 中文 |
|------|------|
| Footwork | 腳部練習 |
| Hundred | 百次拍擊 |
| Elephant | 大象姿 |
| Mermaid | 美人魚姿 |
| Long Stretch | 直線伸展 |
| Down Stretch | 向下伸展 |
| Up Stretch | 向上伸展 |
| Knee Stretches | 膝部伸展 |
| Leg Circles | 雙腿畫弧 |
| Short Spine | 脊椎捲曲 |
| Long Spine | 脊椎伸展 |
| Hip Lift | 髖部上抬 |
| Hip Rolls | 髖部起伏 |
| Running | 跑步運動 |
| Semicircle | 半弧 |
| Side Splits | 側劈叉 |
| Front Splits | 前劈叉 |
| Back Splits | 後劈叉 |
| Coordination | 協調性 |
| Chest Expansion | 胸部擴張 |
| Stomach Massage | 腹部按摩 |
| Round Back (Short Box) | 弓背（盒子橫放）|
| Straight Back (Short Box) | 直背（盒子橫放）|
| Twist (Short Box) | 扭轉（盒子橫放）|
| Tree (Short Box) | 樹姿（盒子橫放）|

> 完整清單見 `worker/src/lib/promptBuilder.js` 的 `OFFICIAL_MOVEMENTS`

---

## 七、官方解剖術語對照表

| 英文 | 中文 |
|------|------|
| Transversus Abdominis | 腹橫肌 |
| Rectus Abdominis | 腹直肌 |
| Internal Oblique | 腹內斜肌 |
| External Oblique | 腹外斜肌 |
| Multifidus | 多裂肌 |
| Quadratus Lumborum | 腰方肌 |
| Diaphragm | 橫膈膜 |
| Serratus Anterior | 前鋸肌 |
| Pectoralis Minor | 胸小肌 |
| Trapezius | 斜方肌 |
| Rhomboids | 菱形肌 |
| Levator Scapulae | 提肩胛肌 |
| Psoas Major | 腰大肌 |
| Iliacus | 髂肌 |
| Gluteus Maximus | 臀大肌 |
| Gluteus Medius | 臀中肌 |
| Gluteus Minimus | 臀小肌 |
| Piriformis | 梨狀肌 |
| Rectus Femoris | 股直肌 |
| Biceps Femoris | 股二頭肌 |
| Multifidus | 多裂肌 |
| Rotator Cuff | 旋轉肌袖 |
| Sternocleidomastoid | 胸鎖乳突肌 |
| Frontal Plane | 額狀面 |
| Sagittal Plane | 矢狀面 |
| Transverse Plane | 水平面 |

> 完整清單見 `worker/src/lib/promptBuilder.js` 的 `OFFICIAL_ANATOMY`

---

## 八、輸出格式規範

**出題 API（`/api/generate`）**
```json
{
  "id": "string",
  "category": "IMP | IR | ICCB",
  "scenario": "最多2句話",
  "choices": [
    { "id": "A", "text": "選項（各選項長度相近）" },
    { "id": "B", "text": "選項" },
    { "id": "C", "text": "選項" },
    { "id": "D", "text": "選項" }
  ],
  "correctId": "A | B | C | D"
}
```

**解析 API（`/api/rationale`）— 按「查看解析」才呼叫**
```json
{
  "explanation": "100字以內：為何正確 + 各錯誤選項的細微錯誤",
  "principles": [
    { "name": "原則英文名", "zh": "原則中文名", "relevance": "與本題關聯（1-2句）" }
  ],
  "anatomy": [
    { "term": "英文術語", "role": "功能說明（20字內）" }
  ]
}
```

---

*最後更新：對應 Worker Version `040ef97e`*
