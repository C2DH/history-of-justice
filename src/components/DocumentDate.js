import React from 'react'
import { useDate } from '../hooks/date'

const DocumentDate = ({
  doc,
  separator=null,
  className = 'DocumentDate',
  ...rest
}) => {
  const { parseDate } = useDate()

  if (!doc || !doc.data || !doc.data.start_date) {
    return null
  }

  const hasEndDate =
    typeof doc.data.end_date === 'string' &&
    doc.data.end_date !== doc.data.start_date

  return (
    <>
    <span className={className} {...rest}>
      {parseDate(doc.data.start_date)}
      {hasEndDate && <span> &mdash; {parseDate(doc.data.end_date)}</span>}
    </span>
    {typeof separator === 'string' && <>&nbsp;{separator}&nbsp;</>}
    </>
  )
}

export default DocumentDate
