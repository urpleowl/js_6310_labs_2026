import { useMemo, useState } from 'react'

type Habit = {
  id: string
  name: string
  best: number
  history: Record<string, boolean>
}

const STORAGE_KEY = 'habit-tracker-demo-v1'

function iso(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function seedStreak(
  today: Date,
  length: number,
  includeToday: boolean,
): Record<string, boolean> {
  const history: Record<string, boolean> = {}
  const start = includeToday ? 0 : 1
  for (let i = start; i < start + length; i += 1) {
    history[iso(addDays(today, -i))] = true
  }
  return history
}

function olderDays(
  today: Date,
  from: number,
  to: number,
  pattern: (offset: number) => boolean,
): Record<string, boolean> {
  const history: Record<string, boolean> = {}
  for (let i = from; i <= to; i += 1) {
    if (pattern(i)) history[iso(addDays(today, -i))] = true
  }
  return history
}

function initialHabits(today: Date): Habit[] {
  return [
    {
      id: 'workout',
      name: 'Утренняя зарядка',
      best: 11,
      history: {
        ...olderDays(today, 6, 110, (i) => i % 3 !== 0),
        ...seedStreak(today, 4, false),
      },
    },
    {
      id: 'reading',
      name: 'Чтение книг',
      best: 21,
      history: {
        ...olderDays(today, 13, 110, (i) => i % 4 !== 0),
        ...seedStreak(today, 12, true),
      },
    },
  ]
}

function loadHabits(today: Date): Habit[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialHabits(today)
    const parsed = JSON.parse(raw) as Habit[]
    if (!Array.isArray(parsed) || parsed.length === 0) return initialHabits(today)
    return parsed
  } catch {
    return initialHabits(today)
  }
}

function streakEnding(history: Record<string, boolean>, end: Date): number {
  let count = 0
  const cursor = new Date(end)
  if (!history[iso(cursor)]) cursor.setDate(cursor.getDate() - 1)
  while (history[iso(cursor)]) {
    count += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return count
}

function weeksOf(today: Date, weeks: number): Date[][] {
  const end = new Date(today)
  const day = end.getDay()
  const mondayOffset = day === 0 ? 6 : day - 1
  const lastMonday = addDays(end, -mondayOffset)
  const start = addDays(lastMonday, -(weeks - 1) * 7)
  const columns: Date[][] = []
  for (let w = 0; w < weeks; w += 1) {
    const column: Date[] = []
    for (let d = 0; d < 7; d += 1) column.push(addDays(start, w * 7 + d))
    columns.push(column)
  }
  return columns
}

const HEAT_TONES = [
  'var(--heat-0)',
  'var(--heat-1)',
  'var(--heat-2)',
  'var(--heat-3)',
  'var(--heat-4)',
]

export default function App() {
  const today = useMemo(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])
  const todayKey = iso(today)
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits(today))
  const [activeId, setActiveId] = useState('workout')
  const active = habits.find((h) => h.id === activeId) ?? habits[0]
  const columns = useMemo(() => weeksOf(today, 16), [today])

  function persist(next: Habit[]) {
    setHabits(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function mark(id: string) {
    persist(
      habits.map((habit) => {
        if (habit.id !== id || habit.history[todayKey]) return habit
        const history = { ...habit.history, [todayKey]: true }
        const current = streakEnding(history, today)
        return { ...habit, history, best: Math.max(habit.best, current) }
      }),
    )
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <span className="badge">HABIT</span>
          <p className="topbar-hint">Демонстрация компонентов UI-библиотеки</p>
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <div>
            <h1>Трекер привычек</h1>
            <p>Отметьте день или выберите карточку, чтобы увидеть её дни.</p>
          </div>
          <span className="count-pill">Привычек: {habits.length}</span>
        </div>

        <section className="cards">
          {habits.map((habit) => {
            const done = Boolean(habit.history[todayKey])
            const current = streakEnding(habit.history, today)
            const selected = habit.id === active.id
            return (
              <article
                key={habit.id}
                className={`card${selected ? ' selected' : ''}`}
              >
                <div className="card-head">
                  <button
                    type="button"
                    className="card-title"
                    onClick={() => setActiveId(habit.id)}
                  >
                    {habit.name}
                  </button>
                  <span className={`status ${done ? 'done' : 'waiting'}`}>
                    {done ? 'Сегодня готово' : 'Ждёт отметки'}
                  </span>
                </div>
                <div className="stats">
                  <div className="stat">
                    <p className="stat-label">Текущая серия</p>
                    <p className="stat-value">{current}</p>
                  </div>
                  <div className="stat">
                    <p className="stat-label">Лучшая серия</p>
                    <p className="stat-value">{habit.best}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`mark-btn${done ? ' done' : ''}`}
                  disabled={done}
                  onClick={() => mark(habit.id)}
                >
                  {done ? 'Выполнено ✓' : 'Отметить выполненным'}
                </button>
              </article>
            )
          })}
        </section>

        <section className="heatmap-panel">
          <div className="heatmap-head">
            <div>
              <p className="heatmap-kicker">Тепловая карта отметок</p>
              <h2>{active.name}</h2>
            </div>
            <div className="legend">
              <span>Меньше</span>
              {HEAT_TONES.map((color) => (
                <span
                  key={color}
                  className="legend-cell"
                  style={{ background: color }}
                />
              ))}
              <span>Больше</span>
            </div>
          </div>
          <div className="heatmap-body">
            <div className="heatmap-grid">
              {columns.map((column) => (
                <div key={iso(column[0])} className="heatmap-col">
                  {column.map((day) => {
                    const key = iso(day)
                    const future = day > today
                    const done = Boolean(active.history[key])
                    const background = future
                      ? 'transparent'
                      : done
                        ? 'var(--heat-3)'
                        : 'var(--heat-0)'
                    return (
                      <span
                        key={key}
                        className="cell"
                        title={
                          future
                            ? key
                            : `${key}: ${done ? 'выполнено' : 'не выполнено'}`
                        }
                        style={{ background }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer">
          UI Library v1.0.0 — Демонстрационное приложение
        </footer>
      </main>
    </div>
  )
}
