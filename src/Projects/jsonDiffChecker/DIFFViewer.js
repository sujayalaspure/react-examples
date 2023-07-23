import React, { forwardRef, useImperativeHandle } from "react"
import styled from "styled-components"
import { theme } from "./theme"

const DIFFViewer = forwardRef(({ missingKeysSet, jsonArray }, ref) => {
  let bracketArr = []
  let refObj = {}
  let lineNumber = 2
  // console.log(jsonArray)

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

  const RenderItem = ({ item, nextItem }) => {
    const lastKey = item.keyValue.split(".").pop()
    if (item.type === "array" || item.type === "object") {
      bracketArr.push({ value: item.type === "array" ? "]" : "}", level: item.level })
    }
    const ref = React.createRef()
    refObj[item.keyValue] = ref

    let levelDown = item.level - (nextItem.level || 0)
    let renderEnd = []
    if (levelDown > 0) {
      renderEnd = Array(levelDown)
        .fill(0)
        ?.map((item) => {
          const bracket = bracketArr.pop()
          return (
            <tr key={lineNumber}>
              <td className="lineNumber">{lineNumber++}</td>
              <td>
                <CodeFormatRow level={bracket.level + 1}>{bracket.value},</CodeFormatRow>
              </td>
            </tr>
          )
        })
    }
    console.log(lastKey, bracketArr, item.level, nextItem.level, levelDown)

    return (
      <>
        <tr ref={ref} key={item.keyValue}>
          <td className="lineNumber">{lineNumber++}</td>
          <td>
            <CodeFormatRow isMiss={missingKeysSet.has(item.keyValue)} level={item.level + 1}>
              {isNaN(lastKey) && (
                <>
                  <span className="Key">"{lastKey}"</span>
                  <span className="colon"> : </span>
                </>
              )}
              {item.type === "string" ? (
                <span className="Value">"{item.value}"</span>
              ) : item.type === "array" ? (
                "["
              ) : (
                "{"
              )}
              {item.level === nextItem.level && (item.type === "object" || item.type === "array")
                ? bracketArr.pop().value
                : ""}
              {item.level === nextItem.level && item.type !== "array" && item.type !== "object" && ","}
            </CodeFormatRow>
          </td>
        </tr>
        {renderEnd.map((item) => item)}
      </>
    )
  }

  return (
    <Container>
      <table>
        <tbody>
          <tr>
            <td className="lineNumber">1</td>
            <td>
              <CodeFormatRow level={0}>{"{"}</CodeFormatRow>
            </td>
          </tr>
          {jsonArray.map((item, index) => {
            return <RenderItem item={item} nextItem={jsonArray[index + 1] || {}} />
          })}
          {/* {console.log(bracketArr)} */}
          {/* {bracketArr.length > 0 &&
            bracketArr.toReversed().map((item) => {
              return (
                <tr key={lineNumber}>
                  <td className="lineNumber">{lineNumber++}</td>
                  <td>
                    <CodeFormatRow level={item.level}>{item.value}</CodeFormatRow>
                  </td>
                </tr>
              )
            })} */}
          <tr>
            <td className="lineNumber">{lineNumber}</td>
            <td>
              <CodeFormatRow level={0}>{"}"}</CodeFormatRow>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
})

export default DIFFViewer

const Container = styled.div`
  width: max-content;
  br {
    content: "";
    display: block;
    margin: 0.3rem 0;
  }
  tr {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .lineNumber {
    font-size: 0.8rem;
    margin-right: 0.5rem;
    text-align: right;
    min-width: 30px;
  }
  .highlight {
    border: 1px solid ${theme.COLOR.black};
    border-radius: 5px;
    background-color: ${theme.COLOR.syntaxBackgroundGreen};
  }
`

const CodeFormatRow = styled.code`
  width: fit-content;
  padding-left: ${(_) => _.level * 10}px;
  background-color: ${(_) => (_.isMiss ? theme.COLOR.syntaxBackgroundRed : "transparent")};
  display: flex;
  flex-wrap: nowrap;
  text-wrap: nowrap;
  color: ${(_) => (_.isMiss ? theme.COLOR.syntaxRed : theme.COLOR.black)};
  .Key {
    color: ${(_) => (_.isMiss ? theme.COLOR.syntaxRed : theme.COLOR.syntaxGreen)};
  }
  .Value {
    color: ${(_) => (_.isMiss ? theme.COLOR.syntaxRed : theme.COLOR.syntaxBlue)};
  }
`
