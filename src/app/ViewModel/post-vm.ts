import { CommentVM } from './comment-vm';

export class PostVM {
     ID:number ;
     Title:string ;
     Description:string ;
     PostTime:Date ;
     CommentsCounter:number;
     CategoryID:number;
     CategoryName:string;
     USerID:number;
     UserName:string
     Comments:Array<CommentVM>
}
