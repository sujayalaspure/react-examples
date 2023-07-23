import React from "react"
import styled from "styled-components"
import DIFFViewer from "./DIFFViewer"

const obj = {
  auth: {
    type: "bearer",
    bearer: [
      {
        key: "token",
        value: "3eef4793-dfc0-47eb-a6e9-8bd5eaeb7bc7",
        type: "string",
      },
    ],
  },
  event: [
    {
      listen: "prerequest",
      script: {
        type: "text/javascript",
        exec: [""],
      },
    },
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: ['pm.environment.set("variable_key", "variable_value");'],
      },
    },
  ],
  variable: [
    {
      key: "token",
      value: "3eef4793-dfc0-47eb-a6e9-8bd5eaeb7bc7",
    },
    {
      key: "base_url",
      value: "https://api-staging.netradyne.com",
      type: "string",
    },
  ],
}

const keys = ["event.1.listen", "event.1.script", "event.1.script.exec.0", "variable.0.value", "variable.1.value"]
Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
  s = s.replace(/^\./, "") // strip a leading dot
  var a = s.split(".")
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return
    }
  }
  return o
}

/**
 * @deprecated
 * @returns
 */
function DIFFUI() {
  const missingKeys = new Set(keys)
  // const flattenObject = (obj, level) => {
  //   let arr = []

  //   if (typeof obj === "object") {
  //     Object.keys(obj).forEach((key) => {
  //       if (typeof obj[key] === "object" && obj[key] !== null) {
  //         // if (isNaN(key))
  //         arr.push({
  //           id: _.uniqueId(),
  //           keyValue: key,
  //           level,
  //           type: Array.isArray(obj[key]) ? "array" : typeof obj[key],
  //           children: [
  //             ...flattenObject(obj[key], level + +isNaN(key)).map((subKey) => ({
  //               ...subKey,
  //               keyValue: `${key}.${subKey.keyValue}`,
  //             })),
  //           ],
  //         })
  //       } else {
  //         arr.push({ id: _.uniqueId(), keyValue: key, level, type: typeof obj[key], value: obj[key] })
  //       }
  //     })
  //   }
  //   return arr
  // }

  const flattenObject1 = (obj, level) => {
    let arr = []
    if (typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          arr.push({ keyValue: key, level, type: Array.isArray(obj[key]) ? "array" : typeof obj[key] })
          arr.push(
            ...flattenObject1(obj[key], level + 1).map((subKey) => ({
              ...subKey,
              keyValue: `${key}.${subKey.keyValue}`,
            }))
          )
        } else {
          arr.push({ keyValue: key, level, type: typeof obj[key], value: obj[key] })
        }
      })
    }
    return arr
  }

  const flattenArray = flattenObject1(obj, 1)

  console.log(flattenArray)

  const RenderObject = ({ obj }) => {
    console.log(obj)
    const lastKey = obj.keyValue.split(".").pop()
    return (
      <CodeFormatRow isMiss={missingKeys.has(obj.keyValue)} level={obj.level}>
        {!isNaN(lastKey) ? "{" : `"${lastKey}" : ${obj.type === "array" ? "[" : "{"}`}
        {obj.children.map((item, index) => {
          if (item.type === "array" || item.type === "object") return <RenderObject obj={item} />
          return (
            <CodeFormatRow isMiss={missingKeys.has(item.keyValue)} level={item.level}>
              {!isNaN(item.keyValue.split(".").pop())
                ? `"${item.value}"`
                : `"${item.keyValue.split(".").pop()}" : "${item.type === "string" ? item.value : item.type}"`}
            </CodeFormatRow>
          )
        })}
        {obj.type === "array" ? "]" : "}"}
      </CodeFormatRow>
    )
  }

  // let bracketArr = []

  // const RenderItem = ({ item, prevItem }) => {
  //   const lastKey = item.keyValue.split(".").pop()

  //   if (item.level >= (prevItem.level || 0) && item.type !== "string")
  //     bracketArr.push({ value: item.type === "array" ? "]" : "}", level: item.level })
  //   console.log("prevKey", item.level, prevItem.level, lastKey, item.type, bracketArr)
  //   const temp = bracketArr
  //   if (item.level < prevItem.level) {
  //     bracketArr = []
  //   }
  //   return (
  //     <CodeFormatRow isMiss={missingKeys.has(item.keyValue)} level={item.level}>
  //       {item.level < prevItem.level &&
  //         temp.reverse().map(({ value, level }, index) => {
  //           return (
  //             <CodeFormatRow key={index} level={level}>
  //               {value}
  //             </CodeFormatRow>
  //           )
  //         })}
  //       {isNaN(lastKey) && `"${lastKey}" : `}
  //       {item.type === "string" ? `"${item.value}"` : item.type === "array" ? "[" : "{"}
  //     </CodeFormatRow>
  //   )
  // }

  console.log("--------------------------------------")

  return (
    <Container>
      <DIFFViewer missingKeysSet={missingKeys} jsonArray={flattenArray} />
      <div className="json">
        <pre>{JSON.stringify(obj, null, 2)}</pre>
      </div>
    </Container>
  )
}

export default DIFFUI

const Container = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0 30px;
  gap: 10px;

  .json {
    /* border: 1px solid green; */
    /* width: 50%; */
    /* flex: 1; */
    height: 90%;
    overflow: scroll;
  }
`

const CodeFormatRow = styled.pre`
  padding-left: ${(_) => _.level * 10}px;
  color: ${(_) => (_.isMiss ? "red" : "black")};
`
