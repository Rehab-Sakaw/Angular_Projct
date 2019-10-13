import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/Services/post.service';
import { PostVM } from 'src/app/ViewModel/post-vm';
import { CommentVM } from 'src/app/ViewModel/comment-vm';
import { Router } from '@angular/router';
import { CategoryVM } from 'src/app/ViewModel/category-vm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Posts:PostVM[];
  Category:CategoryVM[];
  newComment:CommentVM;
  Description:string;
  constructor(private http:HttpClient , private PostService:PostService , private router:Router) { }

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

}
