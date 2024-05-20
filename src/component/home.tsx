import "./home.style.css"
import React, {useContext, useEffect, useState} from 'react';
import BookService from "../service/book.service";
import Book from "../model/book.model"
import BooksList from "./books.list";
import { BrowserRouter as Router, Route, Link,Routes } from "react-router-dom";
import createBook from "./create.book";
import EditBook from "./edit.book";
import {useTheme} from "../context/theme/theme.context";
import {toast, ToastContainer} from "react-toastify";
const Home =()=>{




    const { theme, setCurrentTheme } = useTheme();

    const handleToggle = () => {
        // Check the current theme and set the opposite theme
        setCurrentTheme(currentTheme => (currentTheme === 'yellow' ? 'green' : 'yellow'));
    };



    return(
        <>
            <Router>
        <article
        className="article-header"
        style={{
            ...theme
        } as React.CSSProperties}>
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

                <button  style={{ backgroundColor: 'orange', color: 'white' }}
                    onClick={handleToggle}>
                    Switch Theme
                </button>

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
            <ToastContainer
                autoClose={3000}
                hideProgressBar={true}
            />
        </>
    )
}

export default Home
