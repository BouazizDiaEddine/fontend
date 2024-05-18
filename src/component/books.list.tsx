import "./books.style.css"
import Book from "../model/book.model";
import {useEffect, useState} from "react";
import BookService from "../service/book.service";
const BookList =()=>{
    const [listBooks, setListBooks] = useState<Book[]>([]);

    const deleteHandel = (event: React.MouseEvent<HTMLButtonElement>,bookId: number | undefined ) => {
            BookService.deleteBook(bookId)
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await BookService.getAllBooks<Book>();
            if (response.Status) {
                const books = response.Data.map((b: any) => new Book(b.BookId, b.Title, b.Author,b.PublicationYear , b.Isbn,b.NumberInShelf,b.NumberBorrowed));
                setListBooks(books);
            } else {
                //todo : dialog to tell something went wrong
                console.error("Error fetching books:", response.Messages, response.Exception);
            }
        };

        fetchData();
    }, []);


    return(
        <div>
            <table>
                <tr>
                    <th>Book ID</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Available copies</th>
                </tr>
                {listBooks.map((book)=>{
                    return (
                        <tr key ={book.BookId}>
                            <td>{book.BookId}</td>
                            <td>{book.Author}</td>
                            <td>{book.Title}</td>
                            <td>{book.NumberInShelf}</td>
                            <td className="tdtable">
                                <div className="divtd">
                                    <button type="button" value="View">View</button>
                                    <button type="button" value="Edit">Edit</button>
                                    <button type="button" value="Delete" onClick={(event) => deleteHandel(event, book.BookId)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    )
                    }
                )}

            </table>
        </div>
    )
}
export default BookList
