import "./books.style.css"
import Book from "../model/book.model";
import {useEffect, useState} from "react";
import BookService from "../service/book.service";
import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from "react-router-dom";
import BookDetail from "./book.detail";
const BookList =()=>{
    const navigate = useNavigate();
    const [listBooks, setListBooks] = useState<Book[]>([]);
    const [showBookDetail, setShowBookDetail] = useState<boolean>(false);
    const [bookDetail,setBookDetail]=useState<Book>({
        Title: '',
        Author: '',
        NumberInShelf: 0,
        NumberBorrowed: 0,
        Isbn:"",
        PublicationYear:{Year: 1900, Month:'Mars'},
    })
    const viewBook =(book:Book)=>{
        setShowBookDetail(true);
        setBookDetail(book);
    }
    const closeBookView=()=>{
        setShowBookDetail(false);
    }

    const deleteHandel = (event: React.MouseEvent<HTMLButtonElement>,bookId: number | undefined ) => {
            BookService.deleteBook(bookId)
    };

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


    useEffect(() => {
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
                                    <button type="button" value="View" onClick={()=>viewBook(book)} >View</button>
                                    <button type="button" value="Edit" onClick={() => navigate(`/edit/${book.BookId}`)} >Edit</button>
                                    <button type="button" value="Delete" onClick={(event) => deleteHandel(event, book.BookId)}>Delete</button>

                                </div>
                            </td>
                        </tr>
                    )
                    }
                )}

            </table>
            {showBookDetail && <BookDetail onClose={closeBookView} detailBook={bookDetail}/>}
        </div>
    )
}
export default BookList
