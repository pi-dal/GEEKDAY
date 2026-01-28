# Countdown Switch After Registration Deadline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** After 2026-01-31 23:59, switch the homepage countdown target to 2026-02-23 10:00 and change the label from “截止报名” to “距离开幕Kick Off”.

**Architecture:** Keep countdown rendering unchanged, but compute the active target datetime and label based on `now`. Use explicit ISO datetimes (with timezone) to avoid environment-dependent parsing.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup lang="ts">`

### Task 1: Locate countdown + label source

**Files:**
- Inspect: `components/**`, `pages/**`

**Step 1: Search for strings**

Run: `rg -n "截止报名|倒计时|countdown|Kick\\s*Off" components pages`

Expected: Finds the component that renders the countdown label and target time.

### Task 2: Implement date/label switch logic

**Files:**
- Modify: (found in Task 1)

**Step 1: Define explicit datetimes**

- `registrationDeadline = 2026-01-31T23:59:00+08:00`
- `kickoffTime = 2026-02-23T10:00:00+08:00`

**Step 2: Compute active values**

- If `now <= registrationDeadline`: label “截止报名”, target `registrationDeadline`
- Else: label “距离开幕Kick Off”, target `kickoffTime`

**Step 3: Ensure countdown never goes negative**

- Clamp remaining seconds at `>= 0` (or ensure component already handles it)

### Task 3: Sanity-check build

**Files:**
- N/A

**Step 1: Build**

Run: `pnpm -s build`

Expected: Exit code 0.

