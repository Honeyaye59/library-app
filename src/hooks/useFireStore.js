// import React from 'react'
import { useEffect, useRef, useState } from 'react';
// import { useState } from 'react';
import { collection, serverTimestamp, where } from 'firebase/firestore';
import { query, onSnapshot } from 'firebase/firestore';
import { orderBy, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export default function UseFireStore() {
    // get collection
    let GetCollection = (colName, _q) => {
    let qRef =     useRef(_q).current
        
        let [error, setError] = useState('');
        let [data, setData] = useState([]);
        let [loading, setLoading] = useState(false)
        useEffect(() => {
            setLoading(true)
            let ref = collection(db, colName);
            let queries = []
            
            if(qRef){
                queries.push(where(...qRef))
            }
            queries.push(orderBy('date', 'desc'))
            let q = query(ref, ...queries)
            // getDocs(q).then(docs => {
            //   if(docs.empty){
            //     setError("No Result found")
            //     setLoading(false)
            //   }else {
            //     let books = []
            //   docs.forEach(doc => {
            //     let book = {
            //       id: doc.id,
            //       ...doc.data()
            //     }
            //     books.push(book)
            //     setLoading(false)
            //     setError('')





            //   })
            //   setBooks(books)
            //   }


            // })
            // Realtime DB
            onSnapshot(q, docs => {
                if (docs.empty) {
                    setError("No Result found")
                    setLoading(false)
                } else {
                    let collectionData = []
                    docs.forEach(doc => {
                        let document = {
                            id: doc.id,
                            ...doc.data()
                        }
                        collectionData.push(document)
                        setLoading(false)
                        setError('')





                    })
                    setData(collectionData)
                }


            })
        }, [colName, qRef])

        return { data, error, loading }

    }
    let getDocument = (colName, id) => {
        let [error, setError] = useState('');
        let [data, setData] = useState(null);
        let [loading, setLoading] = useState(false);
        useEffect(()=>{
            setLoading(true)
            let ref = doc(db, colName, id);
            // getDoc(ref).then(doc => {
            //   if(doc.exists()){
            //     let book = {
            //       id: doc.id,
            //       ...doc.data()
            //     }
            //     console.log(book)
            //     setBook(book)
            //     setLoading(false)
            //     setError('')
            //   }else {
            //     setError('No Book Detail Found')
            //     setLoading(false)
            //   }
              
            // })
            onSnapshot(ref, doc => {
              if(doc.exists()){
                let document = {
                  id: doc.id,
                  ...doc.data()
                }
                
                setData(document)
                setLoading(false)
                setError('')
              }else {
                setError('No Book Detail Found')
                setLoading(false)
              }
              
            })
          }, [id])

          return { data, error , loading}
    }
    // create document
    let createDocument = async(colName, data) => {
        data.date = serverTimestamp()
        let ref = collection(db, colName);
    return addDoc(ref, data)

    }
    // delete document
    let deleteDocument = async(colName, id) => {
        // eslint-disable-next-line no-undef
    let ref = doc(db, colName, id);
    // eslint-disable-next-line no-undef
    return deleteDoc(ref);
    // setBooks(prevBooks => (
    //   prevBooks.filter(book => book.id !== id)
    // ))

    }
    // update document
    let updateDocument = async(colName, id, data) => {
        data.date = serverTimestamp()

        let ref = doc(db, colName, id);
    return updateDoc(ref, data)
    }


    return { GetCollection, getDocument,  createDocument, deleteDocument, updateDocument }
}
