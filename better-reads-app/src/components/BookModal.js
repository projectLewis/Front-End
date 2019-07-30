import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import Axios from "axios";


const BookModal = (props) => {
    // const [isbn, setIsbn] = useState(0)
    // useEffect(() => {
    //     if (isbn) {
    //        Axios.get()
    //    }
    // }, [input])
    return (
        <Modal open>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
        <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
        <Modal.Description>
        <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
            </Modal.Description>
        </Modal.Content>
        </Modal>
    )
}

export default BookModal;