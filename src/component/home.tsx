import "./home.style.css"
import React, {useContext, useEffect, useState} from 'react';
import BookService from "../service/book.service";
import Book from "../model/book.model"
import BooksList from "./books.list";
import { BrowserRouter as Router, Route, Link,Routes } from "react-router-dom";
import createBook from "./create.book";
import EditBook from "./edit.book";
const Home =()=>{

    return(
        <>
            <Router>
        <article
        className="article-header">
      <nav>
            <div>
                <ul>
                    <li>
                        <Link to={'/'} className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to={'/create'} className="nav-link">Create</Link>
                    </li>
                </ul>
            </div>
        </nav>
            <header>
                <h1>Byfood Library</h1>
            </header>
        </article>
        <section className="section-content">

                <div>
                    <Routes>
                        <Route path="/edit/:id" Component={ EditBook } />
                        <Route path='/' Component={  BooksList } />
                        <Route path='/create' Component={ createBook } />
                    </Routes>
                </div>

        </section>
        </Router>
        </>
    )
}

export default Home
