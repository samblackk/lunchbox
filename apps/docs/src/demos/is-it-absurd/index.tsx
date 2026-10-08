import { TextInput, Tooltip } from '@neonanomaly/lunchbox'
import { Suspense } from 'react'

import { InfoIcon } from '@/components/info-icon'
import { finalBoss } from '@/content/rubric/dimensions'
import { frozenStatement } from '@/content/rubric/frozen'
import type { FailureReason } from '@/lib/fetch/result'
import type { Answer } from '@/lib/jev/types'

import { Rubric } from './rubric'
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

// The headline reading, and the page's only h1. A missing or wrong-typed answer
// says so rather than printing a number nobody computed.
const Verdict = ({ answer }: { answer: Answer | undefined }) => (
  <h1 className={styles.verdict}>
    {answer?.type === 'noul'
      ? `${Math.round(answer.noul * 100)}% ${finalBoss.label}.`
      : 'no verdict'}
  </h1>
)

const ScoredRubric = async ({ statement }: { statement: string }) => {
  const scoring = await scoreStatement(statement)

  if (scoring.state === 'failed') {
    return (
      <div className={styles.failure} role="status">
        <p className={styles.failureHeading}>Not scored.</p>
        <p className={styles.failureNote}>{failureNotes[scoring.reason]}</p>
      </div>
    )
  }

  return (
    <div className={styles.result}>
      <Rubric answers={scoring.result.answers} />
      <Verdict answer={scoring.result.answers[finalBoss.id]} />
      <details className={styles.response}>
        <summary className={styles.provenance}>
          {scoring.live
            ? `scored by ${scoring.result.model}`
            : `captured from ${scoring.result.model}, not scored live`}
        </summary>

        {/* Focusable so the scroll box can be reached by keyboard, which a
            plain overflow container cannot. */}
        <pre
          className={styles.code}
          tabIndex={0}
          role="region"
          aria-label="raw response"
        >
          {JSON.stringify(scoring.raw, null, 2)}
        </pre>
      </details>
    </div>
  )
}

// No client component anywhere. The statement lives in the query string, so the
// form is plain HTML, the scoring happens on the server, and every result is a
// link someone can send to somebody else.
export const IsItAbsurd = ({ statement }: { statement: string }) => (
  <section>
    <p className={styles.intro}>
      A simple tool for determining if you can say it in a board meeting.
    </p>

    <form className={styles.form} action="/is-it-absurd" method="get">
      <TextInput
        type="text"
        clearOnFocus
        aria-label="statement"
        name="statement"
        defaultValue={statement === '' ? frozenStatement : statement}
        placeholder={frozenStatement}
        maxLength={maxStatementLength}
        autoComplete="off"
        start={
          <Tooltip label="Write or paste a statement, then hit enter. It's not hard.">
            <InfoIcon />
          </Tooltip>
        }
        end={
          <button className={styles.submit} type="submit">
            score it
          </button>
        }
      />
    </form>

    <Suspense
      key={statement}
      fallback={<Rubric answers={{}} placeholder="scoring" />}
    >
      <ScoredRubric statement={statement} />
    </Suspense>
  </section>
)
