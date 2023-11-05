/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { CodeFormatRow, DiffViewerContainer } from "./style"
import RenderContentRow from "./RenderContentRow"

const DIFFViewer = forwardRef(({ missingKeysSet, jsonArray }, ref) => {
  let bracketArr = []
  let refObj = {}
  let lineNumber = 2

  useImperativeHandle(ref, () => ({
    scrollToVisible: (key) => {
      if (key) {
        const ref = refObj[key]
        if (ref) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
          ref.current.classList.add("highlight")
          setTimeout(() => {
            ref.current.classList.remove("highlight")
          }, 2000)
        }
      }
    },
  }))

  return (
    <DiffViewerContainer>
      <table>
        <tbody>
          <tr>
            <td className="lineNumber">1</td>
            <td>
              <CodeFormatRow level={0}>{isNaN(jsonArray[0].keyValue) ? "{" : "["}</CodeFormatRow>
            </td>
          </tr>
          {jsonArray.map(({ type, keyValue, level, value }, index) => {
            let bracketsToRender = []
            let valueToDisplay = type === "object" ? "{" : type === "array" ? "[" : `"${value}",`

            if (bracketArr.length > 0 && bracketArr[bracketArr.length - 1].level >= level) {
              const totalBRemove = bracketArr[bracketArr.length - 1].level - level + 1
              for (let i = 0; i < totalBRemove; i++) {
                const bracket = bracketArr.pop()
                bracketsToRender.push(
                  <tr key={lineNumber}>
                    <td className="lineNumber">{lineNumber++}</td>
                    <td>
                      <CodeFormatRow level={bracket.level + 1}>{bracket.value},</CodeFormatRow>
                    </td>
                  </tr>
                )
              }
            }

            if (type === "array") {
              bracketArr.push({ value: "]", level: level })
            }
            if (type === "object") {
              bracketArr.push({ value: "}", level: level })
            }

            return (
              <>
                {bracketsToRender.map((item) => item)}
                <RenderContentRow
                  isMissing={missingKeysSet.has(keyValue)}
                  refObj={refObj}
                  key={index}
                  lineNumber={lineNumber++}
                  value={valueToDisplay}
                  {...{ keyValue, level }}
                />
              </>
            )
          })}
          {bracketArr.length > 0 &&
            bracketArr.toReversed().map((bracket) => (
              <tr key={lineNumber}>
                <td className="lineNumber">{lineNumber++}</td>
                <td>
                  <CodeFormatRow level={bracket.level + 1}>{bracket.value},</CodeFormatRow>
                </td>
              </tr>
            ))}
          <tr>
            <td className="lineNumber">{lineNumber}</td>
            <td>
              <CodeFormatRow level={0}>{isNaN(jsonArray[0].keyValue) ? "}" : "]"}</CodeFormatRow>
            </td>
          </tr>
        </tbody>
      </table>
    </DiffViewerContainer>
  )
})

DIFFViewer.propTypes = {
  missingKeysSet: PropTypes.object,
  jsonArray: PropTypes.arrayOf(PropTypes.object),
}
export default DIFFViewer
