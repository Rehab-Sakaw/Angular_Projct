import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostVM } from '../ViewModel/post-vm';
import { environment } from 'src/environments/environment';
import { CommentVM } from '../ViewModel/comment-vm';
import { CategoryVM } from '../ViewModel/category-vm';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  GetAllArticle():Observable<Array<PostVM>>{
    const ApiUrl = `${environment.API_Url}api/Post`;
    const token= localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('access_token')
      })};
      console.log(httpOptions);
    return this.http.get<Array<PostVM>>(ApiUrl,httpOptions);
  }

  GetAllArticleByCatID(ID:number):Observable<Array<PostVM>>{
    const ApiUrl = `${environment.API_Url}api/Post/${ID}`;
    const token = localStorage.getItem('userToken');
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':`${token}`,'Accept':' */*' })};
    return this.http.get<Array<PostVM>>(ApiUrl , httpOptions);
  }

  GetAllCategory():Observable<Array<CategoryVM>>{
    const ApiUrl = `${environment.API_Url}api/Category`;
    const token = localStorage.getItem('userToken');
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':`${token}`,'Accept':' */*' })};
    return this.http.get<Array<CategoryVM>>(ApiUrl , httpOptions);
  }

  CreateArticle(post:PostVM){
    const ApiUrl = `${environment.API_Url}api/Post`;
    //const token = localStorage.getItem('userToken');
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json','Accept':' */*' })};
    return this.http.post(ApiUrl,post,httpOptions);
  }

  AddComment(comment:CommentVM){
    const ApiUrl = `${environment.API_Url}api/Comment`;
    const token = localStorage.getItem('userToken');
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':`${token}`,'Accept':' */*' })};
    return this.http.post(ApiUrl,comment,httpOptions);
  }
}
