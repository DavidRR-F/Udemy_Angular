import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  // for service defed error to unsub
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    // for setting up error in service
    this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.onFetchPosts();
  }
  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }
  

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // send post json to api url
    this.postService.createAnStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {//set error message (not in service)
      this.error = error.message;
      // error status code
      // this.error = error.status;
      console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      console.log('Posts Deleted');
      this.loadedPosts = [];
    });
  }
}
