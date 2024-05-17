import "./books.style.css"
import Book from "../model/book.model";

type Props = {
    list : Book[];
};

const BookList =(props:Props)=>{

const {list}=props;
    return(
        <div>
            <table>
                <tr>
                    <th>Book ID</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Available copies</th>
                </tr>
                {list.map((book)=>{
                    return (
                        <tr key ={book.BookId}>
                            <td>{book.BookId}</td>
                            <td>{book.Author}</td>
                            <td>{book.Title}</td>
                            <td>{book.NumberInShelf}</td>
                            <td>
                                <div>
                                    <input type="button" value="View"></input>
                                    <input type="button" value="Edit"></input>
                                    <input type="button" value="Delete"></input>
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
