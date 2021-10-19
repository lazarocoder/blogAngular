import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { PostPayload } from '../add-post/post-payload';

// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: PostPayload = new PostPayload();
  permaLink: Number;

  constructor(private activatedRoute: ActivatedRoute, private postService: AddPostService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res => {
      this.permaLink = res["params"].id;
      if (this.permaLink) {
        this.postService.getPublicPost(this.permaLink).subscribe((data: PostPayload) => {
          this.post = data;
        }, (err: any) => {
          console.log('Failure response!');
        });
      }
    });

  }

}
