import "./create.book.style.css"
import pubYear  from '../model/pubYear.model'
import React, {FormEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';
import BookService from "../service/book.service";
import {useTheme} from "../context/theme/theme.context";
import {toast} from "react-toastify";
import Modal from "./modal";
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
        BookService.createBook(newBook).then((response)=>{
            if (response.Status){
                toast.success(response.Messages);
            }else toast.error(response.Messages);
        })
        handleBack()
    };
    const handleFormSubmit =  (event: FormEvent<HTMLFormElement> ) => {
            event.preventDefault()

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

    const { theme } = useTheme();
    return (
        <form onSubmit={handleSubmit}
              style={{
                  ...theme
              } as React.CSSProperties}>
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
            <div  id="inShlefBorrowed">
                <div className="form-group" >
                    <label htmlFor="numberInShelf">Copies available:</label>
                <input
                    type="number"
                    name="NumberInShelf"
                    id="numberInShelf"
                    min="0"
                    value={newBook.NumberInShelf}
                    onChange={handleBookChange}
                    style={{ marginRight: '10px' }}
                /></div>
                <div className="form-group">
                    <label htmlFor="numberInShelf">Copies Borrowed:</label>
                <input
                    type="number"
                    name="NumberBorrowed"
                    id="NumberBorrowed"
                    min="0"
                    value={newBook.NumberBorrowed}
                    onChange={handleBookChange}
                />
            </div>
            </div>
            <div className="form-group" id="publicationYear">
                <label htmlFor="publicationYearYear">Publication Date (Optional):</label>
                <input
                    type="number"
                    name="Year"
                    id="Year"
                    min="1000"
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
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
                modalMessage={"are you sure you want to Create: "+newBook.Title+" Author: "+newBook.Author}
            />
        </form>
    )
}

export default CreateBook;
