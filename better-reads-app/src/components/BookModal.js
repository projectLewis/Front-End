import React,{useState, useEffect} from "react";
import Axios from "axios";


const BookModal = ({isbn}) => {
    const [book, addBook] = useState()
    useEffect(() => {
        if (isbn) {
           Axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                .then(data=>{
                    addBook(data.data.items[0].volumeInfo.description)
                })
       }
    }, [isbn])

    return (
        <div>{book}</div>
    )
}

export default BookModal;