import PropTypes from "prop-types"
import React from "react"
import { CodeFormatRow } from "./style"

RenderContentRow.propTypes = {
  lineNumber: PropTypes.number,
  keyValue: PropTypes.string,
  level: PropTypes.number,
  value: PropTypes.string,
  refObj: PropTypes.object,
  isMissing: PropTypes.bool,
}

function RenderContentRow({ lineNumber, keyValue, level, value, refObj, isMissing }) {
  let ref = null
  if (isMissing) {
    ref = React.createRef()
    refObj[keyValue] = ref
  }
  const lastKey = keyValue.split(".").pop()

  return (
    <>
      <tr ref={ref}>
        <td className="lineNumber">{lineNumber}</td>
        <td>
          <CodeFormatRow level={isNaN(lastKey) ? level : level + 1} isMiss={isMissing}>
            {isNaN(lastKey) && (
              <>
                <span className="Key">"{lastKey}"</span>
                <span className="colon"> : </span>
              </>
            )}
            <span className="Value">{value}</span>
          </CodeFormatRow>
        </td>
      </tr>
    </>
  )
}

export default RenderContentRow
