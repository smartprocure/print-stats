import convertHrtime from 'convert-hrtime'
import prettyMs from 'pretty-ms'
import numeral from 'numeral'
import util from 'node:util'

/**
 * Get stats about rows.
 */
export const stats = (label = 'Stats') => {
  const startTime = process.hrtime.bigint()
  let numRows = 0
  let numErrors = 0
  const incRows = (amount = 1) => {
    numRows += amount
  }
  const incErrors = (amount = 1) => {
    numErrors += amount
  }
  const getCurrent = () => {
    const currentTime = process.hrtime.bigint()
    const { milliseconds: millisElapsed, seconds: secondsElapsed } =
      convertHrtime(currentTime - startTime)
    const rate = Math.floor(numRows / secondsElapsed)
    return util.format(
      '%s: Rows %s | Errors %s | Rate %s rec/sec | Elapsed %s',
      label,
      numeral(numRows).format('0,0'),
      numeral(numErrors).format('0,0'),
      numeral(rate).format('0,0'),
      prettyMs(millisElapsed)
    )
  }
  const print = () => {
    console.info(getCurrent())
  }
  return { getCurrent, print, incRows, incErrors }
}
