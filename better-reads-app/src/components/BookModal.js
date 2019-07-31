import React,{useState, useEffect} from "react";
import Axios from "axios";
import { Card, Image, Dimmer, Loader } from 'semantic-ui-react'

const BookModal = ({isbn}) => {
    const [book, addBook] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (isbn) {
           Axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                .then(data=>{
                    addBook(data.data.items[0].volumeInfo)
                    setIsLoading(false)
                })
       }
    }, [isbn])

    return (isLoading) ? (
        <Dimmer inverted active>
          <Loader inverted > Loading </Loader>
        </Dimmer>
      )
      : (
        <>
            <div>{book.description}</div>
            <div>{book.pageCount} pages</div>
            <div>Rating: {book.averageRating}/5</div>
            <div>Maturity Rating: {book.maturityRating}</div>
        </>
    )
}

export default BookModal;