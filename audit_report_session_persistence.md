# Forensic Audit: Session Persistence & Data Materialization
**Status:** Diagnostic Complete | **Phase:** Remediation Planning

## 1. Executive Summary
The investigation into the "Intelligence Inside" chatbot funnel has identified a systemic failure in the data persistence layer. While the frontend correctly captures user choices (qualification data), the backend session snapshots are frequently incomplete or inconsistent. This is not due to a single bug, but rather a collision between two different architectural patterns (Legacy Flat Updates vs. Modern Event Projections).

## 2. Root Cause Analysis (The "Fatal Three")

### A. The Persistence Race Condition
Every user interaction triggers two simultaneous network requests from the frontend:
1. `POST /session/update`: Sends the full `sessionData` object to update the "Legacy Flat" columns.
2. `POST /session/events`: Sends a batch of events to be ingested into the `session_events` table.

**The Conflict:** The backend `ingest_events` method triggers a projection layer that calculates the session state from events and saves it. Simultaneously, `update_session` writes its own data. Since they share no coordination, the "dumb" update often overwrites the "smart" projection, leading to lost fields.

### B. Semantic & Translation Drift
*   **Key Mismatch:** The frontend uses `main_goal` internally, but the backend expects `entry_flow`. While remapped in the API client, the event projection layer still sees `main_goal`, leading to "Ghost Fields" in the JSONB that don't materialize in columns.
*   **Value Corruption:** The frontend translates raw slugs (e.g., `company`) into Italian labels (e.g., `Azienda`) before persistence. However, the event stream uses raw slugs.
*   **The Result:** Downstream branching logic (which checks for `target == 'company'`) fails because the database contains the string `"Azienda"`.

### C. Whitelist Bottleneck
Both the Frontend (`apiClient.ts`) and Backend (`dp.py`) employ strict hardcoded allow-lists for session columns.
*   Newer qualification dimensions (e.g., `conti_check`, `reliability_depth`) were never added to these lists.
*   **The Result:** These fields are silently dropped during the serialization process, even if they are present in the application state.

## 3. Data Flow Mapping

| Layer | Component | Action | Result |
| :--- | :--- | :--- | :--- |
| **UX** | `AssistantWidget` | Captures `target`, `geografia`, `obiettivo` | Correct local state |
| **API** | `apiClient.ts` | Remaps keys + Translates values to Italian | **Data Mutation** |
| **BE** | `app.py` | Receives payload -> calls `update_session` | **Overwrites Projection** |
| **DB** | `PG_DB` | Checks `_FLAT_SESSION_COLUMNS` whitelist | **Data Loss (Filtering)** |

## 4. Remediation Roadmap

### Phase 1: Vocabulary Normalization (Immediate)
- [ ] **Remove Value Remapping:** Stop translating slugs to Italian labels in `apiClient.ts`. The DB must store the canonical slug.
- [ ] **Align Keys:** Ensure `main_goal` is remapped to `entry_flow` in both the event stream and the persistence payload.

### Phase 2: Schema De-bottlenecking
- [ ] **Dynamic Projection:** Modify `_apply_event_projections` in `dp.py` to automatically mirror any event `field_key` to a matching database column if it exists, removing the need for a manual whitelist.
- [ ] **Derivation Logic:** Update `_slug_from_entry_flow` to recognize both technical slugs and legacy labels.

### Phase 3: Transactional Integrity
- [ ] **Atomic Updates:** Transition the frontend to rely primarily on `ingestEvents` for state updates, using `updateSession` only for non-event metadata (e.g., node position).

## 5. Verification Metrics
Success will be measured by:
1. `sessions` table snapshots having 0% NULL rate for `target`, `geografia`, and `obiettivo` in completed sessions.
2. `qualification_state` JSONB keys matching the column names exactly.
3. Successful branching in the 5-step linear funnel based on technical slugs.

---
**Developer Note:** This audit serves as the ground truth for the refactoring work in the `f6ddd7f9` (Architecting Progressive Lead Funnel) branch.
