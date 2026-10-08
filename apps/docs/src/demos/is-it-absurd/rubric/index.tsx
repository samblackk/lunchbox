import { dimensions } from '@/content/rubric/dimensions'
import type { Answer, ScoreAnswer } from '@/lib/jev/types'

import styles from './style.module.css'

const asPercent = (value: number) => `${Math.round(value * 100)}%`

// Jev returns a score as a position in the criteria list, so 2.57 of four
// criteria sits between the third and fourth. The legend names the steps.
const stepCount = (answer: ScoreAnswer) => Object.keys(answer.legend).length - 1

const nearestLabel = (answer: ScoreAnswer) =>
  answer.legend[String(Math.round(answer.score))] ?? 'no label'

const fillWidth = (answer: ScoreAnswer) => {
  const steps = stepCount(answer)
  if (steps <= 0) return '0%'
  return asPercent(Math.min(Math.max(answer.score / steps, 0), 1))
}

const Row = ({
  label,
  answer,
  placeholder,
}: {
  label: string
  answer: ScoreAnswer | undefined
  placeholder: string
}) => (
  <li className={styles.row}>
    <span className={styles.label}>{label}</span>

    <span className={styles.value}>
      {answer === undefined ? (
        <span className={styles.absent}>{placeholder}</span>
      ) : (
        <>
          <span className={styles.reading}>{nearestLabel(answer)}</span>
          <span
            className={styles.meter}
            role="img"
            aria-label={`${answer.score} of ${stepCount(answer)}`}
          >
            <span
              className={styles.fill}
              style={{ width: fillWidth(answer) }}
            />
          </span>
        </>
      )}
    </span>

    <span className={styles.confidence}>
      {answer === undefined ? '' : asPercent(answer.confidence)}
    </span>
  </li>
)

// Every row is a scale. The final boss is a noul, which has no confidence and
// no scale, so it is rendered on its own and never as a row.
const rowAnswer = (answer: Answer | undefined) =>
  answer?.type === 'score' ? answer : undefined

// Rows come from the dimension list rather than the response, so the order is
// stable and the table holds its shape while answers are still arriving.
export const Rubric = ({
  answers,
  placeholder = 'no answer',
}: {
  answers: Readonly<Record<string, Answer>>
  placeholder?: string
}) => (
  <ol className={styles.rubric}>
    <li className={styles.heading} aria-hidden="true">
      <span className={styles.label}>dimension</span>
      <span className={styles.value}>reading</span>
      <span className={styles.confidence}>confidence</span>
    </li>
    {dimensions.map((dimension) => (
      <Row
        key={dimension.id}
        label={dimension.label}
        answer={rowAnswer(answers[dimension.id])}
        placeholder={placeholder}
      />
    ))}
  </ol>
)
