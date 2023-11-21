import React, { useEffect, useState } from 'react'
import { getHistory } from '../service/allapi'
import { Link } from 'react-router-dom'



function Watchhistory() {

    const [history, setHistory]=useState([])

    const getwatchHistory=async()=>{
     const{data} = await getHistory()
     console.log(data);

     setHistory(data)
     
    }

    console.log(history);

    useEffect(() => {
      getwatchHistory()
       
     }, [])


  return (
    <>
    <div className=' align-item-center  text-align-center '>

      <h1>watch history</h1>

      <Link to={'/home'} style={{textDecoration:"none",fontSize:"20px",fontWeight:"bolder"}}>
            Back
      </Link>
      </div>

      <table className='table-shadow border rounded m-3 p-5'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Url</th>
            <th>Date</th>
          </tr>
        </thead >

        <tbody>
         

          {
            history?.map((item,index)=>(

              <tr> 
            <td>{index+1}</td>
            <td>{item.cardName}</td>
            <td>{item.url}</td>
            <td>{item.date}</td>
            </tr>
              
            ))
          }
          
        </tbody>
      </table>
     
    </>
  )
}

export default Watchhistory