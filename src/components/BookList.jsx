/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
import Book from '../assets/atomic-habit.jpg';
// import useFetch from '../hooks/useFetch';
import { db } from '../firebase/Firebase';
import { Link,  useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme'
// import { collection,  deleteDoc,  doc,  getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg'
import UseFireStore from '../hooks/useFireStore';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function BookList() {
  let location = useLocation();
  let params = new URLSearchParams(location.search)

  let {GetCollection , deleteDocument} = UseFireStore()

  let deleteBook = async(e, id) => {
    e.preventDefault()
    console.log(id);
    await deleteDocument('books', id)
    
    
  }

  // eslint-disable-next-line no-unused-vars
  let editBook = (e, id) => {
    e.preventDefault()
  }
  
  
    // eslint-disable-next-line no-unused-vars
    let search = params.get('search')
    // let url = `http://localhost:3001/books${search ? `?q=${search}` : ""}`;
    // const url = `http://localhost:3001/books${search ? `?q=${search}` : ""}`;
    // let { data: books , loading , error } = useFetch(url)
  // console.log(books);

 

 let {user} = useContext(AuthContext)
  let { data : books, error, loading } = GetCollection('books', ['uid', '==', user.uid])
  
  
    if(error){
        return;
    }
    let {isDark } = useTheme();
  return (
    <div>
        {loading && <p>Loading.......</p>}
   {!!books &&  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
    {
      books.map(book => (
        <Link className={`border border-9 p-4 cursor-pointer ${isDark ? 'bg-card text-white border-primary' : ''}`} key={book.id}to={`/books/${book.id}`}>
          <img src={book.cover} alt="" className="w-full h-72"/>
          <div className="text-center space-y-2 mt-3">
          <h1>{book.title}</h1>
          <p>{book.desc}</p>
          <div className="flex flex-wrap justify-between items-center">
           <div>
           {
              book.categories.map(i => (
                <span className="mx-1 my-2 text-white rounded-full px-2 py-1 text-sm bg-blue-500" key={i}>{i}</span>
              ))
            }
           </div>
           <div  className='flex justify-evenly items-center'>
            <Link to={`/edit/${book.id}`}>
            <img src={editIcon} alt=""/>
            </Link>
            <img src={deleteIcon} alt="" onClick={(e)=>deleteBook(e, book.id)}/>
           
           </div>
          </div>
          </div>
        </Link>
      ))
    }
  </div>}
   {books && books.length === 0 && <p className='text-center text-xl text-gray-500'>No Result Found</p>}
    </div>
  )
}
