import pubYear  from '../model/pubYear.model'
import {useEffect, useState} from "react";
import "./create.book.style.css"
import { useNavigate } from 'react-router-dom';
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
        navigate('/');  // Navigate to /home using history.push
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
        PublicationYear:{Year: newYear.Year, Month: newYear.Month},
    });



    const handleBookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewBook({ ...newBook, [name]: value });
    };


    const handlePubYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewYear({ ...newYear, [name]: value });
        setNewBook(newBook);
    };


    return (
        <form>
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
                <input type="button" value="back" onClick={handleBack} />
                <input type="submit" value="Create" />
            </div>
        </form>
    )
}

export default CreateBook;
