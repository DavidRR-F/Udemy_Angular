import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'https://udemy-practice-api-default-rtdb.firebaseio.com/posts.json';
  error = new Subject<string>();

  createAnStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content};
    //can define response datatypes right after request (in post/get methods)
    this.http.post<{name: string}>(this.url, postData, {
      observe: 'body', // get specific objects from request
      // body is defualt Others: status, response, headers, etc
      responseType: 'json' // choose response type text,json(default),etc
    })
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts(){
    /*let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');*/

    //get request for all posts
    //using pipe map to push jsonified string to our array and use encryption key as primary key
    return this.http.get(this.url, {
      headers: new HttpHeaders({"Custom-Header": "Hello"}), // add headers
      params: new HttpParams().set('print', 'pretty') // add params
      // or params: searchParams
    })
    .pipe(
      map((responseData: {[key: string]: Post}) => {
        const postsArray: Post[] = [];
        for (const key in responseData){
          // check that response has key as its own property
          if(responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        // an observable to catch generic error handling tasks
        return throwError(errorRes);
      })
    );
  }

  deletePosts() {
    return this.http.delete(this.url, {
      observe: 'events' // observe the entire request event
    }).pipe(tap(event => { // tap runs observable action without the need to return 
      console.log(event);
      // check if u got a response or other observables
      if (event.type === HttpEventType.Response){
        console.log(event.body);
      }
      if (event.type === HttpEventType.Sent){
        // stuff
      }
    }));
  }

  constructor(private http: HttpClient) { }
}
