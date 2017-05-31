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
  constructor(private http: Http) { }

  /**
   * Retrieves single Todo lists
   */
  getTodoList(_id: string): Observable<TodoList> {
    console.log('about to call GET/ ' + TODO_API + '/' + _id);
    return this.http
      .get(TODO_API + '/' + _id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  /**
   * Retrieves all Todo lists
   */
  getTodoLists(): Observable<TodoList[]> {
    console.log('about to call ' + TODO_API);
    return this.http
      .get(TODO_API)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  /**
   * creates new instance of Todo List
   * @param {Object} body - the body of the POST
   */
  createTodoList(body): Observable<TodoList> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('inside service with body : ' + JSON.stringify(body));
    return this.http
      .post(TODO_API, body, options)
      .map((response: Response) => {
        let res = response.json();
        let newList = res.todoList;
        console.log('1.) service responds with ' + JSON.stringify(res));
        console.log('2.) service responds with ' + JSON.stringify(newList));
        return newList;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')
      );

  }

  /**
   * adds new Todo to list
   * @param _id ID for todo list we want append with new todo
   * @param description description of todo
   */
  addTodo(_id: number, description: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { 'description': description };
    let path = TODO_API + '/' + _id + '/add';

    return this.http.put(path, body, options)
      .map(
      (response: Response) => {
        console.log('foo: ' + JSON.stringify(response.json()));
        return response.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))
  }


  /**
   * toggle completed status for specific todo in a given list
   * Service by /todolists/:todoList_id/complete/:todoId'
   * @param listId 
   * @param todoId 
   */
  toggleTodoCompleteStatus(listId: number, todoId: number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let path = TODO_API + '/' + listId + '/complete/' + todoId;

    return this.http.put(path, options)
      .map(
      (response: Response) => {
        console.log('foo: ' + JSON.stringify(response.json()));
        return response.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))

  }

  /**
   * Removes single Todo from list
   * Serviced by '/todolists/:todoList_id/remove/:todoId'
   * @param listId Id for Todo List
   * @param todoId Id for Todo to be removed
   */
  removeTodo(listId: number, todoId: number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let path = TODO_API + '/' + listId + '/remove/' + todoId;

    return this.http.delete(path, options)
      .map(
      (response: Response) => {
        console.log('foo: ' + JSON.stringify(response.json()));
        return response.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))

  }

  /**
   * Delete a Todo List
   * @param listId Id of the List to be deleted
   */
  removeTodoList(listId: number) {
    let path = TODO_API + '/' + listId;

    return this.http.delete(path)
      .map((response: Response) => {
        console.log('DDT 1 ==> ' + JSON.stringify(response.status));
        console.log('DDT  2==> ' + JSON.stringify(response.json()));
        return response.status;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }

}