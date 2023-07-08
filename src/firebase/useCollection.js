import { useState } from "react"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { firestoreDB } from "./firebase"

export function useCollection(collectionName) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const collectionRef = collection(firestoreDB, collectionName)

  const addDocument = async (data) => {
    // console.log("addDocument", data)
    try {
      const docRef = await addDoc(collectionRef, data)
      console.log("Document written with ID: ", docRef.id)
      return true
    } catch (e) {
      console.error("Error adding document: ", e)
      setError(e)
      return false
    }
  }

  const getDocuments = async () => {
    try {
      let tempData = []
      setIsLoading(true)
      const querySnapshot = await getDocs(collectionRef)
      querySnapshot.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() })
      })
      // console.log("tempData", tempData)
      setData(tempData)
    } catch (e) {
      console.error("Error getting documents: ", e)
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  const queryDocuments = async (searchString, field) => {
    const searchField = field || "description"
    // console.log("queryDocuments", searchString, searchField)

    if (!searchString) return
    try {
      let tempData = []
      setIsLoading(true)
      const q = query(collectionRef, where(searchField, "array-contains", searchString))
      let querySnapshot
      if (searchString === "all") {
        querySnapshot = await getDocs(collectionRef)
      } else {
        querySnapshot = await getDocs(q)
      }
      querySnapshot.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() })
      })
      // console.log("tempData", tempData)
      if (tempData.length === 0) setError("No data found")
      setData(tempData)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    isLoading,
    error,
    addDocument,
    getDocuments,
    queryDocuments,
  }
}

export default useCollection
