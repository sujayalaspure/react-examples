import React, { useEffect, useState } from "react"

function useDiff() {
  const [missingKeys, setMissingKeys] = useState({
    compOne: [],
    compTwo: [],
    totalCount: 0,
  })

  let fileOneContent = null
  let fileTwoContent = null

  const compareContent = (fileOne, fileTwo) => {
    console.log("compareContent")
    fileOneContent = JSON.parse(fileOne)
    fileTwoContent = JSON.parse(fileTwo)

    const arr1 = flattenObject(fileOneContent)
    const arr2 = flattenObject(fileTwoContent)

    console.time("compare completed in")
    const arrSet1 = new Set(flattenObject(fileOneContent))
    const arrSet2 = new Set(flattenObject(fileTwoContent))
    const comp1 = arr1.filter((item) => !arrSet2.has(item))
    const comp2 = arr2.filter((item) => !arrSet1.has(item))
    console.timeEnd("compare completed in")
    console.log(`File 1 has ${comp1.length} unique keys`)
    console.log(`File 2 has ${comp2.length} unique keys`)
    setMissingKeys({
      compOne: comp1,
      compTwo: comp2,
      totalCount: comp1.length + comp2.length,
    })
    return {
      compOne: comp1,
      compTwo: comp2,
      totalCount: comp1.length + comp2.length,
    }
  }

  const flattenObject = (obj) => {
    const flattened = []
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattened.push(...flattenObject(obj[key]).map((subKey) => `${key}.${subKey}`))
      } else {
        flattened.push(key)
      }
    })
    return flattened
  }

  return {
    one: 1,
    compareContent,
    missingKeys,
  }
}

export default useDiff
