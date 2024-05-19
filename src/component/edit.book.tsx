import pubYear  from '../model/pubYear.model'
import React, {FormEvent, useEffect, useState} from "react";
import "./create.book.style.css"
import {useNavigate, useParams} from 'react-router-dom';
import BookService from "../service/book.service";
import Book from "../model/book.model";
import Response from "../model/response.model";

const EditBook= () =>{
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const handleBack = () => {
        navigate('/');
    }

    const [editYear , setEditYear]=useState<pubYear>({
        Year: 196,
        Month: 'July',
    })

    const [editBook, setEditBook] = useState<Book>({
        Title: '',
        Author: '',
        NumberInShelf: 0,
        NumberBorrowed: 0,
        Isbn:"",
        PublicationYear:{Year: editYear.Year, Month: editYear.Month},
    });

    useEffect(() => {
            const fetchData = async () => {
                if (id) {
                    let myId: number = parseInt(id);
            const response = await BookService.getBook<Book>(myId);
                    if (response.Status) {
                        const b = response.Data;
                        setEditBook(new Book(b.BookId, b.Title, b.Author, b.PublicationYear, b.Isbn, b.NumberInShelf, b.NumberBorrowed));
                        setEditYear(b.PublicationYear);
                    } else {
                        console.error('Error fetching book:', response.Messages, response.Exception);
                        return null;
                    }
                }
                };
        fetchData();
    }, []);

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
            if (id) {
                let myId: number = parseInt(id);
            const response = await BookService.updateBook(myId, editBook);
            if (response.Status) {
                console.log("done")
            } else console.log("notdone")
        }
         handleBack();
    };


    const handleBookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        let numValue: string | number = value;
        if (name === "NumberBorrowed" || name === "NumberInShelf" ) {
            numValue = parseInt(value);
        }
        setEditBook({ ...editBook, [name]: numValue });
    };


    const handlePubYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        let numValue: string | number = value;
        if (name === "Year"  ) {
            numValue = parseInt(value);
        }
        setEditYear({ ...editYear, [name]: numValue });
        editBook.PublicationYear=editYear;
        setEditBook(editBook)

    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h2>Edit Book </h2>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="Title"
                    id="title"
                    value={editBook.Title}
                    onChange={handleBookChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    name="Author"
                    id="author"
                    value={editBook.Author}
                    onChange={handleBookChange}
                    required
                />
            </div>
            <div className="form-group" id="inShlefBorrowed">
                <label htmlFor="numberInShelf">Number in Shelf:</label>
                <input
                    type="number"
                    name="NumberInShelf"
                    id="numberInShelf"
                    value={editBook.NumberInShelf}
                    onChange={handleBookChange}
                    style={{ marginRight: '10px' }}
                />
                <label htmlFor="numberInShelf">Number Borrowed:</label>
                <input
                    type="number"
                    name="NumberBorrowed"
                    id="NumberBorrowed"
                    value={editBook.NumberBorrowed}
                    onChange={handleBookChange}
                />
            </div>
            <div className="form-group" id="publicationYear">
                <label htmlFor="publicationYearYear">Publication Date (Optional):</label>
                <input
                    type="number"
                    name="Year"
                    id="Year"
                    value={editYear.Year}
                    onChange={handlePubYearChange}
                />
                <input
                    type="text"
                    name="Month"
                    id="Month"
                    value={editYear.Month}
                    onChange={handlePubYearChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="isbn">ISBN (Optional):</label>
                <input
                    type="text"
                    name="Isbn"
                    id="isbn"
                    value={editBook.Isbn}
                    onChange={handleBookChange}
                />
            </div>
            <div className="form-group">
                <button type="button" value="back" onClick={handleBack} >Back</button>
                <button type="submit">Edit</button>

            </div>
        </form>
    )
}

export default EditBook;
