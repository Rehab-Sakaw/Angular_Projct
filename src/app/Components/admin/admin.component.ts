import { Component, OnInit } from '@angular/core';
import { PostVM } from 'src/app/ViewModel/post-vm';
import { CategoryVM } from 'src/app/ViewModel/category-vm';
import { CommentVM } from 'src/app/ViewModel/comment-vm';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/Services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  Posts:PostVM[];
  Category:CategoryVM[];
  newComment:CommentVM;
  Description:string;
  PDescription:string;
  Title:string;
  catID:number;


  constructor(private http:HttpClient, private PostService:PostService , private router:Router) { }

  ngOnInit() {
    this.PostService.GetAllArticle().subscribe(
      
      posts=>{this.Posts=posts;console.log(this.Posts);},
      err=>{console.log(err);}
    );

    this.PostService.GetAllCategory().subscribe(
      categories=>{this.Category=categories;console.log(this.Category);},
      err=>{console.log(err);}
    );
  }

  AddComment(ID:number){
    const NComment = new CommentVM();
    NComment.UserName = localStorage.getItem('UserName');
    NComment.PostID = ID;
    NComment.Description = this.Description;
    console.log(NComment);
    this.PostService.AddComment(NComment).subscribe(
      data=>{
        console.log(data);
        window.location.reload();
      },
      err=>{console.log(err)}
    );
  }

  CatPosts(CID:number){
    this.PostService.GetAllArticleByCatID(CID).subscribe(
      posts=>{this.Posts=posts;console.log(this.Posts);},
      err=>{console.log(err);}
    );
  }

  AddPost(){
    const NPost = new PostVM();
    NPost.UserName = localStorage.getItem('UserName');
    NPost.Title = this.Title;
    NPost.Description = this.PDescription;
    NPost.CategoryID = this.catID
    console.log(NPost);
    this.PostService.CreateArticle(NPost).subscribe(
      data=>{
        console.log(data);
        window.location.reload();
      }, 
      err=>{console.log(err)}
    );
    
  }
 

}
