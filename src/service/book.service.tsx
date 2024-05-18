import axios from "axios";
import Response from "../model/response.model";

import Book from "../model/book.model"
export default class BookService {

    private static baseURL: string = "http://localhost:8080";
    public static async getAllBooks<T>(): Promise<Response> {
        let res = await axios.get<Array<T>>(this.baseURL + "/books")
            .then((response: any) => {
                const result = response.data;
                if(result){
                    return new Response(true, result  as Array<T>, "Books were retrieved successfully", "");
                }else{
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res
    }


    public static getBook<T>( param: number): Promise<Response> {
        let res = axios.get<T>(this.baseURL + "/book/" + param)
            .then((response: any) => {
                const result = response.data;
                if(result && result.success){
                    return new Response(true, result.data , "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }


    public static createBook<T>( obj: Book): Promise<Response> {

        let res = axios.post(this.baseURL + "/book/" ,obj)
            .then(response => {
                const result = response.data;
                if(result){
                    return new Response(true, result.data , "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }



}
