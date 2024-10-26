import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getHeaders } from "./TokenManagement"

const BACKEND_URL = import.meta.env.VITE_API_URL

function CreateBook({ getAllBooks }) {
  const navigate = useNavigate()
  const bookRef = useRef()
  const warningRef = useRef()

  const createNewBook = async (event) => {
    event.preventDefault()
    try {
      const headers = getHeaders()

      await axios.post(
        `${BACKEND_URL}/api/v1/books/`,
        {
          subject: bookRef.current.value,
        },
        { withCredentials: true, headers }
      )

      bookRef.current.value = ""

      getAllBooks()
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login")
      } else if (error.response.status === 404) {
        navigate("/not-found")
      } else if (error.response.status === 400) {
        warningRef.current.innerText = "Please provide the book name"
        setTimeout(() => {
          warningRef.current.innerText = ""
        }, 3000)
      }
    }
  }

  return (
    <>
      <div ref={warningRef} className="warning-message"></div>
      <div className="container book-input-container">
        <input
          ref={bookRef}
          type="text"
          placeholder="Enter the book name"
          required
        />
        <button onClick={createNewBook} className="btn btn-success">
          Create Folder
        </button>
      </div>
    </>
  )
}

export default CreateBook
