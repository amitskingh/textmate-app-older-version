// Books.js
import { useEffect, useState } from "react"
import BookItem from "./BookItem"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CreateBook from "./CreateBook"
import { getHeaders } from "./TokenManagement"

const BACKEND_URL = import.meta.env.VITE_API_URL

function Books() {
  const navigate = useNavigate()
  let [bookList, setBookList] = useState([])

  const getAllBooks = async () => {
    try {
      const headers = getHeaders()
      // console.log("Fetching books...")
      const response = await axios.get(`${BACKEND_URL}/api/v1/books`, {
        withCredentials: true,
        headers: headers,
      })
      // console.log("Books fetched successfully:", response)
      const totalBook = response.data
      const newBookList = totalBook.map((item) => ({
        bookId: item._id,
        bookName: item.subject,
      }))
      setBookList(newBookList)
    } catch (error) {
      // console.error("Error fetching books:", error)
      if (error.response) {
        // console.error("Response status:", error.response.status)
      }
      if (error.response.status === 401) {
        navigate("/login")
      } else if (error.response.status === 404) {
        navigate("/not-found")
      } else {
        navigate("/")
      }
    }
  }

  useEffect(() => {
    getAllBooks()
  }, [])

  const handleDeleteButton = async (event, bookId) => {
    event.preventDefault()
    try {
      const headers = getHeaders()
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/books/${bookId}`,
        {
          withCredentials: true,
          headers: headers,
        }
      )
      const newBookList = bookList.filter(
        (item) => item.bookId !== response.data._id
      )
      setBookList(newBookList)
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login")
      } else if (error.response.status === 404) {
        navigate("/not-found")
      }
    }
  }

  return (
    <>
      <center className="book-section container">
        <CreateBook getAllBooks={getAllBooks} />
        <div></div>
        <div className="book-list">
          {bookList.map((item) => (
            <BookItem
              handleDeleteButton={handleDeleteButton}
              key={item.bookId}
              bookId={item.bookId}
              bookName={item.bookName}
            />
          ))}
        </div>
      </center>
    </>
  )
}

export default Books
