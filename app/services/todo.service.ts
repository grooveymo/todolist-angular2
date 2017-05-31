import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Todo } from '../models/Todo.interface';
import { TodoList } from '../models/TodoList.interface';

const TODO_API: string = 'http://localhost:9090/api/todolists';

@Injectable()
export class TodoService {
  constructor(private http: Http) {}

 /**
  * Retrieves all Todo lists
  */
  getTodoLists(): Observable<TodoList[]> {
      console.log('about to call ' + TODO_API);
    return this.http
      .get(TODO_API)
      .map((response: Response) => response.json())
      .catch((error : any) =>  Observable.throw(error.json().error || 'Server error');

  }

/**
 * creates new instance of Todo List
 * @param {Object} body - the body of the POST
 */
 createTodoList(body) : Observable<TodoList> {
     let headers = new Headers({'Content-Type' : 'application/json'});
     let options = new RequestOptions({headers : headers});

     console.log('inside service with body : ' + JSON.stringify(body));
     return this.http
     .post(TODO_API, body, options)
     .map((response : Response) => {
         let res = response.json();
         let newList = res.todoList; 
         console.log('1.) service responds with ' + JSON.stringify(res));
         console.log('2.) service responds with ' + JSON.stringify(newList));
          return newList; 
        })
     .catch((error : any) =>  Observable.throw(error.json().error || 'Server error')
    );

 }




}