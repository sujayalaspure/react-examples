import { useState } from "react"

function useDiff() {
  const [missingKeys, setMissingKeys] = useState({
    compOne: [],
    compTwo: [],
    totalCount: 0,
    timeTaken: 0,
  })

  const [metaData, setMetaData] = useState({
    fileOne: {
      name: "",
      size: 0,
    },
    fileTwo: {
      name: "",
      size: 0,
    },
    timeTakenToCompare: 0,
  })

  const compareContent = (files) => {
    const { fileOne, fileTwo } = files
    console.log("compareContent")

    const t1 = performance.now()
    const arr1 = flattenObject(fileOne.content)
    const arr2 = flattenObject(fileTwo.content)

    const arrSet1 = new Set(arr1)
    const arrSet2 = new Set(arr2)
    const comp1 = arr1.filter((item) => !arrSet2.has(item))
    const comp2 = arr2.filter((item) => !arrSet1.has(item))
    const t2 = performance.now()
    console.log(`compare completed in ${t2 - t1} milliseconds`)
    setMissingKeys({
      compOne: comp1,
      compTwo: comp2,
      totalCount: comp1.length + comp2.length,
      timeTaken: t2 - t1,
    })
    setMetaData({
      fileOne: {
        name: fileOne.name,
        size: bytesToSize(fileOne.file.size),
      },
      fileTwo: {
        name: fileTwo.name,
        size: bytesToSize(fileTwo.file.size),
      },
      t1,
      t2,
      timeTakenToCompare: t2 - t1,
    })
    return {
      compOne: comp1,
      compTwo: comp2,
      totalCount: comp1.length + comp2.length,
      timeTaken: t2 - t1,
    }
  }

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes === 0) return "0 Byte"
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
  }

  const flattenObject = (obj) => {
    let arr = []
    if (typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          arr.push(key)
          arr.push(...flattenObject(obj[key]).map((subKey) => `${key}.${subKey}`))
        } else {
          arr.push(key)
        }
      })
    }
    return arr
  }
  // eslint-disable-next-line no-extend-native
  String.prototype.trunc = function (n) {
    if (this.length < n) return this
    return this.slice(0, n / 2 - 1) + (this.length > n ? "..." : "") + this.slice(this.length - n / 2 + 1, this.length)
  }

  const clearComparison = () => {
    setMissingKeys({
      compOne: [],
      compTwo: [],
      totalCount: 0,
    })
    setMetaData({
      fileOne: {
        name: "",
        size: 0,
      },
      fileTwo: {
        name: "",
        size: 0,
      },
      timeTakenToCompare: 0,
    })
  }

  return {
    one: 1,
    compareContent,
    missingKeys,
    clearComparison,
    metaData,
  }
}

export default useDiff
