import pubYear  from '../model/pubYear.model'
import React, {FormEvent, useEffect, useState} from "react";
import "./create.book.style.css"
import { useNavigate } from 'react-router-dom';
import BookService from "../service/book.service";
import Book from "../model/book.model";
import Response from "../model/response.model";
interface BookDetails {
    Title: string;
    Author: string;
    NumberInShelf: number;
    NumberBorrowed: number;
    Isbn: string;
    PublicationYear: pubYear;
}

interface PubYearDetails {
    Year : number
    Month : string
}


const CreateBook= () =>{
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }

    const [newYear , setNewYear]=useState<PubYearDetails>({
        Year: 1960,
        Month: 'July',
    })

    const [newBook, setNewBook] = useState<BookDetails>({
        Title: '',
        Author: '',
        NumberInShelf: 0,
        NumberBorrowed: 0,
        Isbn:"",
        PublicationYear:newYear,
    });

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement> ) => {
            event.preventDefault()
            const response = await BookService.createBook(newBook);
            if (response.Status){
                console.log("done")
            }else console.log("notdone")

    };


    const handleBookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        let numValue: string | number = value;
        if (name === "NumberBorrowed" || name === "NumberInShelf" ) {
            numValue = parseInt(value);
        }
        setNewBook({ ...newBook, [name]: numValue });
    };


    const handlePubYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        let numValue: string | number = value;
        if (name === "Year"  ) {
            numValue = parseInt(value);
        }
        setNewYear({ ...newYear, [name]: numValue });
        newBook.PublicationYear=newYear;
        setNewBook(newBook)

    };


    return (
        <form onSubmit={handleFormSubmit}>
            <h2>Create New Book</h2>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="Title"
                    id="title"
                    value={newBook.Title}
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
                    value={newBook.Author}
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
                    value={newBook.NumberInShelf}
                    onChange={handleBookChange}
                    style={{ marginRight: '10px' }}
                />
                <label htmlFor="numberInShelf">Number Borrowed:</label>
                <input
                    type="number"
                    name="NumberBorrowed"
                    id="NumberBorrowed"
                    value={newBook.NumberBorrowed}
                    onChange={handleBookChange}
                />
            </div>
            <div className="form-group" id="publicationYear">
                <label htmlFor="publicationYearYear">Publication Date (Optional):</label>
                <input
                    type="number"
                    name="Year"
                    id="Year"
                    value={newYear.Year}
                    onChange={handlePubYearChange}
                />
                <input
                    type="text"
                    name="Month"
                    id="Month"
                    value={newYear.Month}
                    onChange={handlePubYearChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="isbn">ISBN (Optional):</label>
                <input
                    type="text"
                    name="Isbn"
                    id="isbn"
                    value={newBook.Isbn}
                    onChange={handleBookChange}
                />
            </div>
            <div className="form-group">
                <button type="button" value="back" onClick={handleBack} >Back</button>
                <button type="submit">Create</button>

            </div>
        </form>
    )
}

export default CreateBook;
