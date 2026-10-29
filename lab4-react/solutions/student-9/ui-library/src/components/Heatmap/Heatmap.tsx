import React from 'react'

import styles from './Heatmap.module.css'

export interface HeatmapDay {
  date: string
  completed: boolean
}

export interface HeatmapProps {
  data: HeatmapDay[]
  startDate?: string
  endDate?: string
  className?: string
}

function getColor(intensity: number): string {
  if (intensity <= 0) return '#ebedf0'
  if (intensity === 1) return '#9be9a8'
  if (intensity === 2) return '#40c463'
  if (intensity === 3) return '#30a14e'

  return '#216e39'
}

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')

  return `${y}-${m}-${d}`
}

function getDaysInRange(start: Date, end: Date): string[] {
  const days: string[] = []
  const current = new Date(start)

  while (current <= end) {
    days.push(formatDate(current))
    current.setDate(current.getDate() + 1)
  }

  return days
}

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  startDate,
  endDate,
  className = '',
}) => {
  const dataMap = new Map<string, boolean>()

  data.forEach((item) => {
    dataMap.set(item.date, item.completed)
  })

  let rangeStart: Date
  let rangeEnd: Date

  if (startDate && endDate) {
    rangeStart = parseDate(startDate)
    rangeEnd = parseDate(endDate)
  } else if (data.length > 0) {
    const dates = data.map((d) => parseDate(d.date)).sort((a, b) => a.getTime() - b.getTime())

    rangeStart = dates[0]
    rangeEnd = dates[dates.length - 1]
  } else {
    rangeEnd = new Date()
    rangeStart = new Date()
    rangeStart.setDate(rangeStart.getDate() - 27)
  }

  const allDays = getDaysInRange(rangeStart, rangeEnd)
  const firstDayOfWeek = rangeStart.getDay()
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
  const paddedDays: (string | null)[] = Array(offset).fill(null).concat(allDays)

  return (
    <div className={`${styles.container} ${className}`} data-testid="heatmap">
      <div className={styles.grid} role="grid" aria-label="Тепловая карта отметок">
        {paddedDays.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className={styles.cellEmpty}
                aria-hidden="true"
              />
            )
          }

          const completed = dataMap.get(day) === true
          const intensity = completed ? 3 : 0

          return (
            <div
              key={day}
              className={styles.cell}
              style={{
                backgroundColor: getColor(intensity),
                borderColor: completed ? '#216e39' : '#d1d5db',
              }}
              role="gridcell"
              title={`${day}: ${completed ? 'выполнено' : 'не выполнено'}`}
              data-date={day}
              data-completed={completed ? 'true' : 'false'}
              data-testid={`heatmap-cell-${day}`}
            />
          )
        })}
      </div>

      <div className={styles.legend}>
        <span>Меньше</span>
        <div className={styles.legendCell} style={{ backgroundColor: getColor(0) }} />
        <div className={styles.legendCell} style={{ backgroundColor: getColor(1) }} />
        <div className={styles.legendCell} style={{ backgroundColor: getColor(2) }} />
        <div className={styles.legendCell} style={{ backgroundColor: getColor(3) }} />
        <div className={styles.legendCell} style={{ backgroundColor: getColor(4) }} />
        <span>Больше</span>
      </div>
    </div>
  )
}
