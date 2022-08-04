import convertHrtime from 'convert-hrtime'
import prettyMs from 'pretty-ms'
import numeral from 'numeral'
import util from 'node:util'

export const stats = (label: string = 'Stats') => {
  const startTime = process.hrtime.bigint()
  let numRows = 0
  let numErrors = 0
  const incRows = () => {
    numRows++
  }
  const incErrors = () => {
    numErrors++
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
  return { calculate: getCurrent }
}
