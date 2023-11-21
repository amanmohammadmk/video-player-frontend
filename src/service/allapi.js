import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonrequest";


// add video

export const addVideo=async(body)=>{
  return await commonRequest("POST",`${BASE_URL}/videos`,body)

}


// get video

export const getVideo=async()=>{
  return await commonRequest("GET",`${BASE_URL}/videos`,"")
}


// delete

export const deleteVideo=async(id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

// add catagories

export const addCatagories=async(body)=>{
  return await commonRequest("POST",`${BASE_URL}/categories`,body)
}

// get all category

export const getallCategories=async()=>{
 return await commonRequest("GET",`${BASE_URL}/categories`,"")
}

// delete category

export const deleteCategory=async(id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/categories/${id}`,{})
}


// get history

export const getHistory=async()=>{
 return await commonRequest("GET",`${BASE_URL}/watchhistory`,"")
}

// add history

export const AddHistory=async(body)=>{
  return await commonRequest("POST",`${BASE_URL}/watchhistory`,body)
 }


//  get single card details

export const getVideos=async(id)=>{
  return await commonRequest("GET",`${BASE_URL}/videos/${id}`,"")
}

// to update card details in category section

export const updateCatagories=async(id,body)=>{
  return await commonRequest("PUT",`${BASE_URL}/categories/${id}`,body)
}