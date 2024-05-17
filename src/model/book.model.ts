export default class Book {
    BookId     ?:    number
    Title      :     string
    Author      :    string
    PublicationYear? : pubYear
    Isbn       ?:     string
    NumberInShelf :  number
    NumberBorrowed? : number


    constructor(BookId: number, Title: string, Author: string,  numberInShelf: number  ){
        this.BookId=BookId;
        this.Title=Title;
        this.Author=Author;
        this.NumberInShelf=numberInShelf;
    }

}

class pubYear {
    Year !: number
    Month !: string
}


