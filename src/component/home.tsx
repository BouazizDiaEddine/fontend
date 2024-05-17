import "./home.style.css"
import React, {useContext, useEffect, useState} from 'react';
import BookService from "../service/book.service";
import Book from "../model/book.model"
import BooksList from "./books.list";
const Home =()=>{


    const [listBooks, setListBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await BookService.getAllBooks<Book>();
            if (response.Status) {
                const books = response.Data.map((b: any) => new Book(b.BookId, b.Title, b.Author, b.NumberInShelf));
                setListBooks(books);
            } else {
                //todo : dialog to tell something went wrong
                console.error("Error fetching books:", response.Messages, response.Exception);
            }
        };

        fetchData();
    }, []);


    return(
        <>
        <article
        className="article-header">
            <header>
                <h1>Byfood Library</h1>
            </header>
        </article>
        <section className="section-content">
            <div>this is content part</div>
            <BooksList list ={listBooks}/>
        </section>
        </>
    )
}

export default Home
