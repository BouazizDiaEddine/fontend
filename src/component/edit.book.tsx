import pubYear  from '../model/pubYear.model'
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import BookService from "../service/book.service";
import Book from "../model/book.model";
import {toast} from "react-toastify";
import Modal from "./modal";
import {useTheme} from "../context/theme/theme.context";

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


    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        if (id) {
            let myId: number = parseInt(id);
             BookService.updateBook(myId, editBook).then((response)=>{
                 if (response.Status){
                     handleBack();
                     toast.success(response.Messages);
                 }else {
                     toast.error(response.Messages);
                     fetchData();
                 }});
        }
    };

    const fetchData =  () => {
        if (id) {
            let myId: number = parseInt(id);
              BookService.getBook<Book>(myId).then((response)=>{
            if (response.Status) {
                const b = response.Data;
                setEditBook(new Book(b.BookId, b.Title, b.Author, b.PublicationYear, b.Isbn, b.NumberInShelf, b.NumberBorrowed));
                setEditYear(b.PublicationYear);
            } else {
                toast.error(response.Messages);
                return null;
            }});
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

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

    const { theme } = useTheme();

    return (

            <form onSubmit={handleSubmit}
                  style={{
                      ...theme
                  } as React.CSSProperties}>
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
                    min="0"
                    value={editBook.NumberInShelf}
                    onChange={handleBookChange}
                    style={{ marginRight: '10px' }}
                />
                <label htmlFor="numberInShelf">Number Borrowed:</label>
                <input
                    type="number"
                    name="NumberBorrowed"
                    id="NumberBorrowed"
                    min="0"
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
                    min="1000"
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
                    minLength={10}
                    maxLength={10}
                    onChange={handleBookChange}
                />
            </div>
            <div className="form-group">
                <button type="button" value="back" onClick={handleBack} >Back</button>
                <button type="submit">Edit</button>

            </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onConfirm={handleModalConfirm}
                    modalMessage={"are you sure you want to edit: "+editBook.Title}
                />
        </form>
    )
}

export default EditBook;
