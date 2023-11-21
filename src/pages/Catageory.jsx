import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCatagories, deleteCategory, getVideo, getVideos, getallCategories, updateCatagories } from '../service/allapi'
import { Trash2 } from 'react-feather';
import Videocard from './Videocard';









function Category() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[allCategory,setallCategory]=useState([])
  const [categoryItem,setcatergoryItem]=useState({
    id:"",
    name:"",
    allVideos:[]
  })

  const addCategoryForm = (e) => {
    const { name, value } = e.target;
    setcatergoryItem({ ...categoryItem, [name]: value });
  };
  
console.log(categoryItem);

const handleAddCategory=async(e)=>{
  e.preventDefault()
  const {id,name}= categoryItem

  if (!id || !name) {
    toast.warn("please fill compeletly")
  }
  else
  { 
    const response=await addCatagories(categoryItem)
    
    console.log(response);
    toast.success("uploaded successfully")
    categoryList()
    setShow(false)

  }
  
}

// get all categories

const categoryList=async()=>{

  const response = await getallCategories()

 //  console.log(response.data);
  setallCategory(response.data)
  console.log(allCategory);



  }

  useEffect(() => {

   categoryList()

   
  }, [])

  const handleDeletecategory=async(e,id)=>{

    e.preventDefault()
    console.log(id);

   await deleteCategory(id)

   categoryList() 
  }

  const dragover=e=>{
    e.preventDefault()
    console.log("gragging over ");
  }

  const dropped = async (e,categoryId)=>{
    console.log(categoryId);

    let sourceCardId=e.dataTransfer.getData("cardId")

    console.log("sourcecardid",sourceCardId);

    // logic to implement adding card in the given catagory

    let {data} = await getVideos(sourceCardId)

    // console.log(response);

    console.log("source video data",data);

    let selectedCategory=allCategory.find(item=>item.id==categoryId)

    console.log("target category details",selectedCategory);

    selectedCategory.allVideos.push(data)

    console.log('updated target category detaild',selectedCategory);

       await updateCatagories(categoryId,selectedCategory)

       categoryList()

  }

  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn m-2' style={{backgroundColor:"#fad203"}}>
          Add Category
        </div>

        {
          allCategory?.map(item=>(
            <div droppable onDragOver={e=>dragover(e)} 
            onDrop={e=>dropped(e,item?.id)}
            
            className="d-flex justify-content-between border rounded mt-2 p-3">
              <h4>{item.name}</h4>
              <span onClick={e=>handleDeletecategory(e,item?.id)}>  <Trash2 color="red"/></span>

              <Row>
                    {
  
                      item?.allVideos.map((card)=>(
                        <Col className='p-3 mb-1 sm={12}'>
                        <Videocard insertCategory={true} card={card}/>
                        </Col>
                      ))
                    }                  
                  </Row>
            </div>
          ))
        }

      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <FloatingLabel className='mb-2' controlId="floatingId" label="Id">
        <Form.Control type="text" placeholder="Id" onChange={addCategoryForm} name="id" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingId" label="Category">
        <Form.Control type="text" placeholder="Category" onChange={addCategoryForm} name='name' />
      </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
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
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

    </>
    
  )
}

export default Category 