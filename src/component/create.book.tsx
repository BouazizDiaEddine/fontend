import Book,{pubYear}  from '../model/book.model'
import {useEffect, useState} from "react";
import "./create.book.style.css"
interface BookDetails {
    Title: string;
    Author: string;
    NumberInShelf: number;
    NumberBorrowed: number;
    Isbn: string;
    PublicationYear: pubYear;
}


const CreateBook= () =>{

    const [newBook, setNewBook] = useState<BookDetails>({
        Title: '',
        Author: '',
        NumberInShelf: 0,
        NumberBorrowed: 0,
        Isbn:"",
        PublicationYear:{Year: 1960, Month: "July"},
    });


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

                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="numberInShelf">Number in Shelf:</label>
                <input
                    type="number"
                    name="NumberInShelf"
                    id="numberInShelf"
                    value={newBook.NumberInShelf}

                    required
                />
            </div>
            <div className="form-group" id="publicationYear">
                <label htmlFor="publicationYearYear">Publication Year (Optional):</label>
                <input
                    type="number"
                    name="PublicationYearYear"
                    id="publicationYearYear"
                    value={newBook.PublicationYear.Year}

                />
                <input
                    type="text"
                    name="PublicationYearMonth"
                    id="publicationYearMonth"
                    value={newBook.PublicationYear.Month}

                />
            </div>
            <div className="form-group">
                <label htmlFor="isbn">ISBN (Optional):</label>
                <input
                    type="text"
                    name="Isbn"
                    id="isbn"
                    value={newBook.Isbn}

                />
            </div>
            <div className="form-group">
                <input type="button" value="back" />
                <input type="submit" value="Create" />
            </div>
        </form>
    )
}

export default CreateBook;
