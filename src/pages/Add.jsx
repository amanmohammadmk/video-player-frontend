import React from 'react'
import { PlusCircle } from 'react-feather'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add({ handleRes }) {

  const [UploadData, setuploadData] = useState({
    id: "", caption: "", thumbnail: "", url: ""
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e) => {

    const { name, value } = e.target
    // console.log(e.target.value);

    setuploadData({ ...UploadData, [name]: value })
  }

  console.log(UploadData);

  // original url (copied url) : https://www.youtube.com/watch?v=KqD9ph4mhQk

  // src (stored url) : src="https://www.youtube.com/embed/KqD9ph4mhQk"


  const extractUrl = (e) => {

    let youtubeUrl = e.target.value
    if (youtubeUrl.includes("v=")) {
      let index = youtubeUrl.indexOf("v=")
      console.log(index);

      let videoUrl = youtubeUrl.substring(index + 2, index + 13)
      console.log(videoUrl);

      let videoData = UploadData

      videoData.url = ` https://www.youtube.com/embed/${videoUrl}`
      setuploadData(videoData)
    }

    console.log();

  }

  // define handleAdd

  const handleAdd = async () => {
    // destructure uploadData state

    const { id, caption, thumbnail, url } = UploadData

    if (!id || !caption || !thumbnail || !url) {
      toast("please fill compeletly")
    }
    else {

      // make an api call
      const response = await addVideo(UploadData)
      if (response.status >= 200 && response.status < 300) {

        toast.success("new video upload succefully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        })

        setShow(false)
      } else {
        toast.warn(" provide a uniqe id!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }

    }

  }

  return (

    <>

      <div onClick={handleShow}>
        <PlusCircle color='#fad203' size={90}></PlusCircle>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingId" label="Uploading video id">
              <Form.Control type="text" placeholder="Video id" name="id" onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading video Caption">
              <Form.Control type="text" placeholder="Video caption" name="caption" onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingImage" label="Uploading video Cover image url">
              <Form.Control type="text" placeholder="Video cover image url" name="thumbnail" onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingLink" label="Uploading video Link">
              <Form.Control type="text" placeholder="Video Link" name="url" onChange={extractUrl} />
            </FloatingLabel>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <ToastContainer />


    </>


  )
}

export default Add