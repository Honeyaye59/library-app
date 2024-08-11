
import  { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../contexts/AuthContext'

import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebase/Firebase';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

import UseFireStore from '../hooks/useFireStore';
import { uploadBytes , ref, getDownloadURL} from 'firebase/storage';



export default function Create() {
  let {id} = useParams()
  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");
  let [newCategory, setNewCategory] = useState('')
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState('')

  let {createDocument, updateDocument} = UseFireStore()
  
  

  useEffect(()=>{
    // Edit Form
    if(id){
      setIsEdit(true)
      let ref = doc(db, 'books', id);
      getDoc(ref).then(doc => {
        if(doc.exists()){
          let {title, desc, categories} = doc.data();
          setTitle(title);
          setDesc(desc);
          setCategories(categories)
          
          
          
        }
        
      })
      // Create form
    }else {
      setIsEdit(false)
      setTitle('');
          setDesc('');
          setCategories([])
    }
  }, [])

  // let {setPostData, data: book} = useFetch("http://localhost:3001/books", "POST")

  let navigate = useNavigate();

  let addCategory = (e) => {
    if(newCategory && categories.includes(newCategory)){
      setNewCategory('')
      return;
    }
    setCategories(prevCategories => [newCategory, ...prevCategories]);
    setNewCategory("")
  }

  let {user } = useContext(AuthContext);

  let uploadToFirebase = async(file) => {
    let uniqueFileName = Date.now().toString() + '_' + file.name
    let path = `/covers/${user.uid}/${uniqueFileName}`
    let storageRef = ref(storage, path)
   await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef, )

  }

  let submitForm = async(e) => {
    e.preventDefault();

    let url = await uploadToFirebase(file)
   
    console.log(url)
    let newBook = {
      title,
      desc,
      categories,
      uid: user.uid,
      cover: url
    }

    // store in firebase
   if(isEdit){
    await updateDocument('books', id, newBook)
   }else {
    await createDocument('books', newBook)
   }

    navigate('/')
   
    
  }
  // useEffect(()=>{
  //   if(book){
  //     navigate('/')
  //   }
    
  // }, [book])
  let handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
    
  }
  let handlePreviewImage = (file) => {
    console.log(file);
    
    let fileReader = new FileReader;
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPreview(fileReader.result)
    }
    
  }
  useEffect(()=>{
    if(file){
      handlePreviewImage(file)
      
    }
  }, [file])
  return (
   <div className='h-screen'>
     <form className="w-full max-w-lg mx-auto mt-5" onSubmit={submitForm}>

<div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      Book Title
    </label>
    <input value={title} onChange={e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="book title" />

  </div>
</div>
<div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      Book Description
    </label>
    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="book description" value={desc} onChange={e => setDesc(e.target.value)} />
    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
  </div>
</div>

<div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      Categories
    </label>
    <div className='flex items-center space-x-2'>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="book category" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
      <button className='bg-primary p-1 rounded-lg mb-3' onClick={addCategory} type='button'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>
    </div>



  </div>
  <div className="flex flex-wrap">
      {
        categories.map(i => (
          <span className="mx-1 my-2 text-white rounded-full px-2 py-1 text-sm bg-primary" key={i}>{i}</span>
        ))
      }
    </div>
    <div className="w-full px-3 my-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      Choose Cover Photo
    </label>
    <input  onChange={handlePhotoChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="file" placeholder="book title" />

    {!!preview && <img src={preview} alt="" className='mt-5'/>}

  </div>
</div>


<button className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center g-2 w-full justify-center'>

  <span className='hidden md:block'>{isEdit ? 'Edit' : 'Create'} Book</span>

</button>
</form>
   </div>
  )
}
