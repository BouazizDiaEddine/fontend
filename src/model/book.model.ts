import pubYear from "./pubYear.model";
export default class Book {
    BookId?    :    number
    Title      :     string
    Author      :    string
    PublicationYear : pubYear
    Isbn       :     string
    NumberInShelf :  number
    NumberBorrowed? : number

    constructor(BookId: number, Title: string, Author: string, publicationYear : pubYear, isbn : string,numberInShelf: number,numberBorrowed : number  ){
        this.BookId=BookId;
        this.Title=Title;
        this.Author=Author;
        this.NumberInShelf=numberInShelf;
        this.PublicationYear=publicationYear;
        this.Isbn=isbn;
        this.NumberBorrowed=numberBorrowed;
    }


}



