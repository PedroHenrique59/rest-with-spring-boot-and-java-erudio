import React, {useState, useEffect} from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import logo from '../../assets/logo.svg'

export default function NewBook(){
    
    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');  
    const [launchDate, setLaunchDate] = useState('');  
    const [price, setPrice] = useState('');  
    const [title, setTitle] = useState('');  

    const navigate = useNavigate();
    
    const {bookId} = useParams();

    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
            title,
            author,
            launchDate,
            price
        }
        
        try{
            
            if(bookId === '0'){
                await api.post('api/book/v1', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                navigate('/books');  
            }else{
                data.id = bookId;
                await api.put('api/book/v1', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                navigate('/books');  
            }
   
        }catch(err){
            alert('Error while recording Book! Try again!');
        }
    }

    async function loadBook() {
        try{        
            const response = await api.get(`api/book/v1/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            
            let adjustedDate = response.data.launchDate.split('T', 10)[0];
                
            setId(response.data.id)
            setAuthor(response.data.author)
            setLaunchDate(adjustedDate)
            setPrice(response.data.price)
            setTitle(response.data.title) 
               
        }catch(err){
            alert('Error recovering Book! Try again')
            navigate('/books')
        }
    }

    useEffect(() => {
        if(bookId === '0') return;
        else loadBook();
    }, [bookId])

    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logo} alt="Erudio"/>
                    <h1>{bookId === '0' ? 'Add New Book' : 'Update Book'}</h1>
                    <p>Enter the book information and click on {bookId === '0' ? "'Add'" : "'Update'"}!</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251FC5"/>
                        Back to Book
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    
                    <input placeholder="Title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    />
                    
                    <input placeholder="Author" 
                    value={author} 
                    onChange={e => setAuthor(e.target.value)}
                    />
                    
                    <input type="date" 
                    value={launchDate}
                    onChange={e => setLaunchDate(e.target.value)}
                    />
                    
                    <input placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />

                    <button className="button" type="submit">{bookId === '0' ? 'Add' : 'Update'}</button>  
                </form>
            </div>
        </div>
    );
}