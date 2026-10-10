import { TextInput, Tooltip } from '@neonanomaly/lunchbox'

import { dimensions } from '@/content/rubric/dimensions'
import { scenarios } from '@/content/rubric/scenarios'
import { frozenStatement } from '@/content/rubric/frozen'
import type { FailureReason } from '@/lib/fetch/result'
import type { Answer } from '@/lib/jev/types'

import { AcceptPlaceholder } from './accept-placeholder'
import { demoPath } from './path'
import { ResultKeys } from './result-keys'
import { Rubric } from './rubric'
import { Verdict } from './verdict'
import { ScoredEvent } from './scored-event'
import { ScoringIcon } from './scoring-icon'
import { SmallPrint } from './small-print'
import { TryAgain } from './try-again'
import { maxStatementLength, scoreStatement } from './score'
import styles from './style.module.css'

const failureNotes: Record<FailureReason, string> = {
  unauthorized: 'No key is configured, so nothing can be scored live.',
  'invalid-request': 'Jev rejected the request.',
  'rate-limited': 'Jev is rate limiting. Try again shortly.',
  overloaded: 'Jev is overloaded. Try again shortly.',
  timeout: 'Jev did not answer in time.',
  network: 'The request never reached Jev.',
  'server-error': 'Jev returned an error.',
  'bad-response': 'Jev answered in a shape this page cannot read.',
}

// Rounded up and in minutes: the exact millisecond is nobody's business and
// a wait of zero minutes reads as broken.
const minutesFrom = (waitMs: number) => {
  const minutes = Math.max(1, Math.ceil(waitMs / 60000))
  return minutes === 1 ? 'a minute' : `${minutes} minutes`
}

// One reading per scenario, all from the same response.
const readingsFrom = (answers: Readonly<Record<string, Answer>>) =>
  scenarios.flatMap(({ id, label }) => {
    const answer = answers[id]
    return answer?.type === 'noul'
      ? [{ id, label, percent: Math.round(answer.noul * 100) }]
      : []
  })

const ScoredRubric = async ({ statement }: { statement: string }) => {
  const scoring = await scoreStatement(statement)

  if (scoring.state === 'throttled') {
    return (
      <div className={styles.failure} role="status">
        <p className={styles.failureHeading}>Not scored.</p>
        <p className={styles.failureNote}>
          That is a lot of statements. Try another in{' '}
          {minutesFrom(scoring.waitMs)}.
        </p>
      </div>
    )
  }

  if (scoring.state === 'failed') {
    return (
      <div className={styles.failure} role="status">
        <p className={styles.failureHeading}>Not scored.</p>
        <p className={styles.failureNote}>{failureNotes[scoring.reason]}</p>
      </div>
    )
  }

  const readings = readingsFrom(scoring.result.answers)

  return (
    <div className={styles.result}>
      <ScoredEvent
        live={scoring.live}
        length={statement.length}
        percent={readings[0]?.percent ?? 0}
      />

      <Verdict readings={readings} />
      <Rubric
        answers={scoring.result.answers}
        model={scoring.result.model}
        live={scoring.live}
        raw={scoring.raw}
      />
    </div>
  )
}

// No client component anywhere. The statement lives in the query string, so the
// form is plain HTML, the scoring happens on the server, and every result is a
// link someone can send to somebody else.
export const IsItAbsurd = ({ statement }: { statement: string }) => {
  const asked = statement !== ''

  return (
    <section className={asked ? styles.answered : styles.start}>
      {asked ? (
        <>
          {/* Shares a transition name with the field it replaces, so the
              browser morphs one into the other across the navigation. The
              quotes come from the element, so the text stays the statement. */}
          <p className={styles.asked}>
            <q>{statement}</q>
          </p>
        </>
      ) : (
        <div>
          <h1 className={styles.intro}>
            Feedback for your most unhinged statements
          </h1>

          <form className={styles.form} action={demoPath} method="get">
            <TextInput
              className={styles.field}
              type="text"
              aria-label="statement"
              name="statement"
              placeholder={frozenStatement}
              maxLength={maxStatementLength}
              autoComplete="off"
              start={
                <Tooltip label="Write something you think is absurd">
                  <ScoringIcon />
                </Tooltip>
              }
              end={
                <button className={styles.submit} type="submit">
                  score it
                </button>
              }
            />
          </form>

          <p className={styles.graded}>
            graded on:{' '}
            {dimensions.map((each, index) => (
              <span key={each.id}>
                {index === 0 ? null : ', '}
                <Tooltip describes side="top" label={each.gloss}>
                  <span className={styles.dimension}>{each.label}</span>
                </Tooltip>
              </span>
            ))}
          </p>
        </div>
      )}

      {asked ? <ScoredRubric statement={statement} /> : null}

      {asked ? <TryAgain /> : null}

      <SmallPrint />

      {asked ? <ResultKeys /> : <AcceptPlaceholder field="statement" />}
    </section>
  )
}
