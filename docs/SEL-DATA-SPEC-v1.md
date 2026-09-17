# Pikmin SEL 學習與成長歷程：資料規格 v1

日期：2026-09-17

## 核心原則

1. **學生固定識別以班級代碼為準**：特殊班級一班一位學生，因此 `studentId/classId` 使用三位班級代碼，例如 `202`。學生每天可更換暱稱、皮克敏屬性與成長階段，不因此建立新學生。
2. **目前狀態與歷史紀錄分離**：目前狀態方便快速顯示；歷史紀錄採 append-only（新增、不覆蓋），用於觀察改變歷程。
3. **活動可擴充**：所有活動紀錄使用共同 envelope：`module + activityId + activityVersion + timestamp + data`。未來新增 SEL 活動、情境、欄位或 SEL6，不必重建整個資料庫。
4. **教材版本可追溯**：`activityVersion` 保存學生作答當時使用的活動版本。
5. **觀察事實優先**：保存學生實際選擇、操作與結果；系統不自動進行心理診斷。
6. **原始事件保留**：報表、統計與「目前狀態」可由事件推導，但不能取代歷史事件。

## 統一活動紀錄 envelope

```js
{
  recordId: "evt_<uuid>",
  studentId: "202",
  module: "SEL3",
  activityId: "scenario_01",
  activityVersion: 1,
  occurredAt: "server timestamp",
  clientOccurredAt: "ISO-8601",
  sessionId: "session_<uuid>",
  schemaVersion: 1,
  data: { /* 活動自己的資料 */ }
}
```

`data` 是擴充區；新增活動可有自己的欄位，而不改共同 envelope。

## SEL1 自我覺察

每次學生完成／儲存屬性卡時新增事件，至少保存：

```js
{
  module: "SEL1",
  activityId: "self_card",
  data: {
    nickname: "學生當日自選名稱",
    spirit: "blue",
    stage: "bud",
    strengths: ["選項ID或文字"],
    challenges: ["選項ID或文字"],
    note: "..."
  }
}
```

目的：比較不同日期學生如何描述自己的優勢、需要協助的挑戰，以及自我呈現的改變。

## SEL2 自我管理

8 大情緒調節活動各自有固定 `activityId`。每次操作形成事件：

```js
{
  module: "SEL2",
  activityId: "bubble", // 例
  data: {
    startedAt: "ISO-8601",
    completedAt: "ISO-8601",
    completed: true,
    performance: {},
    choices: {},
    durationMs: 0
  }
}
```

`performance`、`choices` 由不同活動自行擴充。目的：知道學生選了哪種調節策略、使用頻率及操作表現，而不只保存總分。

## SEL3 社會知覺

情境必須有穩定 `scenarioId`，同一情境跨日期才能比較：

```js
{
  module: "SEL3",
  activityId: "scenario_01",
  activityVersion: 1,
  data: {
    scenarioId: "scenario_01",
    see: { answerId: "...", answerTextSnapshot: "..." },
    think: { answerId: "...", answerTextSnapshot: "..." },
    ask: { answerId: "...", answerTextSnapshot: "..." },
    act: { answerId: "...", answerTextSnapshot: "..." },
    completed: true
  }
}
```

保存 `answerTextSnapshot` 是為了教材日後改版時仍能知道學生當時看到並選了什麼。

## SEL4 人際合作

```js
{
  module: "SEL4",
  activityId: "campus_mission_01",
  data: {
    missionId: "campus_mission_01",
    partners: [
      { type: "yellow", count: 2 },
      { type: "purple", count: 1 }
    ],
    requirementsSnapshot: {},
    result: {
      requirementMet: true,
      actualPower: 0,
      requiredPower: 0
    },
    attempts: 1,
    completed: true
  }
}
```

目的：觀察學生如何選擇合作夥伴、理解分工與任務條件，以及策略是否隨經驗改變。

## SEL5 負責任決策

```js
{
  module: "SEL5",
  activityId: "challenge_01",
  data: {
    challengeId: "challenge_01",
    selectedAnswer: {
      answerId: "...",
      answerTextSnapshot: "..."
    },
    adventure: {
      scenarioId: "organize_01",
      completion: 0,
      completed: false,
      attempts: 1
    }
  }
}
```

目的：保存學生在挑戰題的選擇與情境收納冒險的完成歷程。

## Firestore 建議結構

```text
classes/{classId}
  students/{studentId}
    current/profile
    activityRecords/{recordId}
```

`students/{studentId}` 可放低敏感度、快速顯示用摘要，例如目前暱稱、目前皮克敏與最後更新時間；完整歷程放 `activityRecords`。

教師帳號與班級授權另外放：

```text
teachers/{uid}
  classAccess/{classId}
```

Security Rules 必須限制只有獲授權教師可讀班級資料；學生端僅能寫入允許的班級／活動資料。正式 Firebase 上線前再依實際登入流程定稿規則。

## 目前探險員

`activeStudentId` 是**裝置／瀏覽器 session 狀態**，不可作為全班共用 Firestore 欄位，避免多台學生電腦互相覆蓋「目前是誰」。

建議使用：

```js
sessionStorage.setItem("pikmin_sel_active_student", "202");
```

畫面顯示班級代碼＋當前暱稱／皮克敏，例如：`🌱 目前探險員：202｜藍皮克敏`。

## 舊資料遷移

既有 `pikmin_sel_classroom_records_v1` 中每筆 `rec_...` 是歷史紀錄 ID，不是學生 ID。遷移時：

- 從 `name` 前三碼解析 `studentId/classId`。
- 保留原 `rec_...` 為 `legacyRecordId`。
- 後方名稱保存為該次 SEL1 的 `nickname` snapshot。
- `spirit/stage/strengths/weaknesses/note` 轉為 SEL1 歷史事件。
- 舊 `sel2/sel3/sel4/sel5` 只能標記為 legacy aggregate；因舊資料沒有完整活動明細，不可反推學生當時實際選項。
- 原始 JSON 備份保持不動，不上傳公開 GitHub。

## 家長／教師成長報告

報表由相同事件資料產生，不另建一套真實來源。需支援：

- 個別學生與日期區間
- SEL1 優勢／挑戰的時間變化
- SEL2 使用過的調節策略與操作表現
- SEL3 同一 scenarioId 的四階段跨時間比較
- SEL4 夥伴選擇、任務條件與結果
- SEL5 答案選擇與收納冒險完成度
- 教師觀察文字
- 網頁檢視、A4 列印、PDF 匯出

報表呈現學生實際紀錄與變化，不自動下心理診斷結論。

## 實作順序

1. 建立目前探險員與 session-based `activeStudentId`。
2. 建立統一 `recordActivity()` 本機事件層，先寫入 localStorage，保持 Firebase 尚未接上時仍可運作。
3. 逐一接 SEL1～SEL5 的操作事件，一次一個模組並驗證網站。
4. 建立 Firebase Auth / Firestore / Security Rules。
5. 將 `recordActivity()` 增加雲端同步，不改各 SEL 活動呼叫方式。
6. 遷移舊資料。
7. 建立教師成長軌跡與家長列印／PDF。