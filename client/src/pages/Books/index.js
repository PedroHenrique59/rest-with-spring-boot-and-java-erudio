import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import logo from '../../assets/logo.svg'

export default function Books() {

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    async function logout(){
        localStorage.clear();
        navigate('/')
    }

    async function editBook(id){
        try{
            navigate(`/book/new/${id}`)

        }catch (err) {
            alert('Edit book failed! Try again.')
        }
    }

    async function deleteBook(id){
        try{
            await api.delete(`api/book/v1/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            
            setBooks(books.filter(book => book.id !== id))

        }catch (err) {
            alert('Delete failed! Try again.')
        }
    }

    async function fetchMoreBooks(){

        const response = await api.get('api/book/v1', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                page: page,
                size: 2,
                direction: 'asc'
            }
        });
        
        if(!response.data._embedded) return;

        setBooks([ ...books, ...response.data._embedded.bookVOList])
        setPage(page + 1);
    }

    useEffect(() => {
        fetchMoreBooks();
    }, [])
    
    /*
        api.get('api/book/v1', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                page: 1,
                limit: 4,
                direction: 'asc'
            }
        }).then(response => {
            setBooks(response.data._embedded.bookVOList)
        })
    }, []);
    */

    return (
        <div className="book-container">
            <header>
                <img src={logo} alt="Erudio" />
                <span>Welcome, <strong>{username.toUpperCase()}</strong>!</span>
                <Link className="button" to="/book/new/0">Add New Book</Link>
                <button type="button" onClick={logout}>
                    <FiPower size={18} color="#251FC5"></FiPower>
                </button>
            </header>
            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Author:</strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                        <button type="button" onClick={() => editBook(book.id)}>
                            <FiEdit size={20} color="#251FC5" />
                        </button>

                        <button type="button" onClick={() => deleteBook(book.id)}>
                            <FiTrash2 size={20} color="#251FC5" />
                        </button>

                    </li>
                ))}
            </ul>

            <button className="button" type="button" onClick={fetchMoreBooks}>Load More</button>            

        </div>
    );

}