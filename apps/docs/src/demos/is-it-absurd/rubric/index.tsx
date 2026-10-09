import { CodeBlock, Disclosure, Tooltip } from '@neonanomaly/lunchbox'

import { dimensions } from '@/content/rubric/dimensions'
import type { Answer, ScoreAnswer } from '@/lib/jev/types'

import { likeliestReading, segmentsOf } from './reading'
import styles from './style.module.css'

const asPercent = (value: number) => `${Math.round(value * 100)}%`

// Every criterion Jev put belief on, in scale order, sized by how much. The
// shape is the point: a reading split between two ends is a different thing
// from one that is merely uncertain, and a single number cannot say which.
const Distribution = ({ answer }: { answer: ScoreAnswer }) => {
  const segments = segmentsOf(answer)

  return (
    <span className={styles.meter} aria-hidden="true">
      {segments.map((segment) => (
        <span
          key={segment.index}
          className={
            segment.leading
              ? `${styles.segment} ${styles.leading}`
              : styles.segment
          }
          // Grown rather than sized, so the gaps between segments come out of
          // the bar instead of pushing the last one past its end.
          style={{ flexGrow: segment.probability }}
        />
      ))}
    </span>
  )
}

// Two different numbers sit in one row: how likely each reading is, and how
// sure Jev is of the whole call. Unlabelled they read as the same quantity
// disagreeing with itself.
const distributionTitle = 'How likely each reading is'
const confidenceTitle = 'How sure Jev is'

// Scale order, so the list reads the way the bar does, with the criterion
// the reading names called out.
const Breakdown = ({ answer }: { answer: ScoreAnswer }) => (
  <>
    <p className={styles.breakdownTitle}>{distributionTitle}</p>

    <ul className={styles.breakdown}>
      {segmentsOf(answer).map((segment) => (
        <li key={segment.index}>
          <span className={segment.leading ? undefined : styles.quiet}>
            {segment.label}
          </span>
          <span>{asPercent(segment.probability)}</span>
        </li>
      ))}
    </ul>

    <span className={styles.rule} aria-hidden="true" />

    <p className={styles.breakdownFooter}>
      <span>{confidenceTitle}</span>
      <span>{asPercent(answer.confidence)}</span>
    </p>
  </>
)

const summaryOf = (answer: ScoreAnswer) =>
  [
    `${distributionTitle}: `,
    segmentsOf(answer)
      .map((each) => `${each.label} ${asPercent(each.probability)}`)
      .join(', '),
    `. ${confidenceTitle}: ${asPercent(answer.confidence)}`,
  ].join('')

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
        // The whole readout is the target. A segment can be two percent of
        // the bar, which is a few pixels nobody will find, and the breakdown
        // only means anything read together anyway.
        <Tooltip
          block
          side="bottom"
          label={summaryOf(answer)}
          content={<Breakdown answer={answer} />}
        >
          <span className={styles.reading}>
            <q>{likeliestReading(answer)}</q>{' '}
            <span className={styles.confidence}>
              {asPercent(answer.confidence)} confident
            </span>
          </span>

          <Distribution answer={answer} />
        </Tooltip>
      )}
    </span>
  </li>
)

// Every row is a scale. A scenario is a noul, which has no confidence and no
// scale, so it is rendered with the verdict and never as a row.
const rowAnswer = (answer: Answer | undefined) =>
  answer?.type === 'score' ? answer : undefined

// Rows come from the dimension list rather than the response, so the order is
// stable whatever comes back. The source line sits inside the table because
// it is what the table is a reading of.
export const Rubric = ({
  answers,
  model,
  live,
  raw,
  placeholder = 'no answer',
}: {
  answers: Readonly<Record<string, Answer>>
  model: string
  live: boolean
  raw: unknown
  placeholder?: string
}) => (
  <div>
    <ol className={styles.rubric}>
      <li className={styles.heading} aria-hidden="true">
        <span className={styles.label}>dimension</span>
        <span className={styles.value}>reading</span>
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

    <Disclosure
      className={styles.response}
      label={
        live ? `scored by ${model}` : `captured from ${model}, not scored live`
      }
    >
      <CodeBlock label="raw response">{JSON.stringify(raw, null, 2)}</CodeBlock>
    </Disclosure>
  </div>
)
