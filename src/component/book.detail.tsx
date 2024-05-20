import "../index.css"
import React, {useState} from "react";
import Book from "../model/book.model";
import pubYear from "../model/pubYear.model";
import {useTheme} from "../context/theme/theme.context";

type Props={
    onClose:()=>void;
    detailBook :Book;
}
const BookDetail=(props : Props)=>{
    const { theme } = useTheme();
    return(
        <div className="modal"
        >
    <div className="modal-content"
         style={{
             ...theme
         } as React.CSSProperties}>
        <div className="header-detail"><h2>Book Details</h2>
        <span className="close" onClick={props.onClose}>Close</span></div>
        <p><strong>Book ID:</strong> {props.detailBook.BookId}</p>
        <p><strong>Title:</strong> {props.detailBook.Title}</p>
        <p><strong>Author:</strong> {props.detailBook.Author}</p>
        <p><strong>Publication Date:</strong> {props.detailBook.PublicationYear.Month}-{props.detailBook.PublicationYear.Year} </p>
        <p><strong>ISBN:</strong> {props.detailBook.Isbn}</p>
        <p><strong>Number in Shelf:</strong> {props.detailBook.NumberInShelf}</p>
        <p><strong>Number Borrowed:</strong> {props.detailBook.NumberBorrowed}</p>
    </div>
        </div>)
}

export default BookDetail;
