import "./books.style.css"
import Book from "../model/book.model";
import {useEffect, useState} from "react";
import BookService from "../service/book.service";
import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from "react-router-dom";
import BookDetail from "./book.detail";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


    const fetchData =  () => {
        BookService.getAllBooks<Book>().then((response) => {
            if (response.Status) {
                const books = response.Data.map((b: any) => new Book(b.BookId, b.Title, b.Author, b.PublicationYear, b.Isbn, b.NumberInShelf, b.NumberBorrowed));
                setListBooks(books);
            } else {
                toast.error(response.Messages);
            }
        });
    }


    useEffect(() => {
        fetchData();
    }, []);

    const deleteHandel = async (event: React.MouseEvent<HTMLButtonElement>,bookId: number | undefined ) => {
        event.preventDefault()
        const  response= await BookService.deleteBook(bookId)
        if (response.Status){
            toast.success(response.Messages);
            fetchData()
        }else toast.error(response.Messages);
    };

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
