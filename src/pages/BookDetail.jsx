// import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';

import useTheme from '../hooks/useTheme';
import { useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { useEffect } from 'react';
import UseFireStore from '../hooks/useFireStore';

export default function BookDetail() {
    let params = useParams();
    console.log(params);
    
    // let url = `http://localhost:3001/books/${params.id}`;
    // let { data: book, loading, error} = useFetch(url);


  let {id} = useParams()

  let { getDocument } = UseFireStore()
  
  let {data: book, error, loading } = getDocument('books', id)

    let {isDark} = useTheme();

 

    
  return (
    <>
        {error && <div>{error}</div>}
        {loading && <div>loading..........</div>}
        {book && (
            <div className={`grid grid-cols-2 h-screen ${isDark ? 'text-white' : ''}`}>
                <div>
                  <img src={book.cover} alt="" className='w-[80%] h-[400px]'/>
                </div>
                <div className='space-y-4'>
                  <h1 className='text-3xl font-bold'>{book.title}</h1>
                  <div>
                    {
                      book.categories.map(caty => (
                        <span className='bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2' key={caty}>{caty}</span>
                      ))
                    }
                  </div>
                  <p>{book.description}</p>
                </div>
                
            </div>
        )}
    </>
  )
}
