import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddHistory, deleteVideo } from '../service/allapi';
import { v4 as uuidv4 } from 'uuid';



function Videocard({ card, handleDeleteStatus,insertCategory }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () =>{ 
        setShow(true);

        // to generate id automaticaly
        const uid=uuidv4()
        console.log(uid);

        // to generate system date and time

        let cardTime=new Date() 
        console.log(cardTime);

        const {caption,url}=card

        if(uid!="",caption!="",url!="",cardTime!=""){

            const body={
                id:uid,cardName:caption,url,date:cardTime
            }

          const response =  await AddHistory(body)

        }
       
    }

    //   function definition

    const removeItem = async (id) => {
        const response = await deleteVideo(id)

        // console.log(response);

        if (response.status >= 200 && response.status < 300) {
            handleDeleteStatus(true)
        }
    }

    const dragStarted=(e,id)=>{
        console.log("drag start at and id "+id);
        e.dataTransfer.setData("cardId",id)
    }

    return (

        <>
            <div>
                <Card draggable onDragStart={e=>dragStarted(e,card?.id)} 
                className='shadow'>
                    <Card.Img onClick={handleShow} variant="top" src={card?.thumbnail} width={200} height={200} />
                    <Card.Body>
                        <Card.Title>
                        
                            <span>{card?.caption}</span>
                            {
                                insertCategory?"":
                                <Trash2 onClick={() => removeItem(card?.id)} color='red' style={{ float: 'right' }} />
                            }
                            
                        </Card.Title>

                    </Card.Body>
                </Card>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{card?.caption}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe width={'100%'} height={'400px'} src={card?.url} title={card?.caption} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Modal.Body>

                </Modal>
             
            </div>
        </>

    )
}

export default Videocard