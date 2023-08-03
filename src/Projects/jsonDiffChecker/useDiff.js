import { useState } from "react"

function useDiff() {
  const [isLoading, setIsLoading] = useState(false)
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
      flattenObject: [],
    },
    fileTwo: {
      name: "",
      size: 0,
      flattenObject: [],
    },
    timeTakenToCompare: 0,
  })

  const compareContent = (files) => {
    setIsLoading(true)
    const { fileOne, fileTwo } = files
    console.log("compareContent")
    try {
      const t1 = performance.now()
      const arr1 = flattenObject1(fileOne.content, 0)
      const arr2 = flattenObject1(fileTwo.content, 0)

      const arrSet1 = new Set(arr1.map((item) => item.keyValue))
      const arrSet2 = new Set(arr2.map((item) => item.keyValue))

      const comp1 = arr1.filter((item) => !arrSet2.has(item.keyValue))
      const comp2 = arr2.filter((item) => !arrSet1.has(item.keyValue))

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
          flattenObject: arr1,
        },
        fileTwo: {
          name: fileTwo.name,
          size: bytesToSize(fileTwo.file.size),
          flattenObject: arr2,
        },
        t1,
        t2,
        timeTakenToCompare: t2 - t1,
      })
      setIsLoading(false)
      return {
        compOne: comp1,
        compTwo: comp2,
        totalCount: comp1.length + comp2.length,
        timeTaken: t2 - t1,
        error: null,
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
    return {
      compOne: [],
      compTwo: [],
      totalCount: 0,
      timeTaken: 0,
      error: "Something went wrong",
    }
  }

  function bytesToSize(bytes) {
    if (!bytes) return 0
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes === 0) return "0 Byte"
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
  }

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

  // eslint-disable-next-line no-extend-native
  String.prototype.trunc = function (n) {
    if (this.length < n) return this
    return this.slice(0, n / 2 - 1) + (this.length > n ? "..." : "") + this.slice(this.length - n / 2 + 1, this.length)
  }

  const clearFileData = (name) => {
    console.log(name)
    setMissingKeys({
      ...missingKeys,
      [name]: [],
    })
    setMetaData({
      ...metaData,
      [name]: {
        name: "",
        size: 0,
        flattenObject: [],
      },
    })
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
    setIsLoading(false)
  }

  return {
    one: 1,
    compareContent,
    missingKeys,
    clearComparison,
    metaData,
    isLoading,
    clearFileData,
  }
}

export default useDiff
