import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import Axios from "axios";


const BookModal = ({isbn}) => {
    // const [isbn, setIsbn] = useState(0)
    // useEffect(() => {
    //     if (isbn) {
    //        Axios.get()
    //    }
    // }, [input])
    return (
        <div>{isbn}</div>
    )
}

export default BookModal;