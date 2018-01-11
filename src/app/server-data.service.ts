import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Todo } from './todo';
@Injectable()
export class ServerDataService {

  constructor(private http: Http) { }

  public getAllTodos(): Observable<Todo[]> {
        return this.http.get('/todo').map(res => {
        const todos = res.json();
        return todos.map((todo) => new Todo(todo));
      }).catch(this.handleError);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
    .post('/todo', todo)
    .map(resp => {
      return new Todo(resp.json());
    })
    .catch(this.handleError);
  }

  public deleteTodo(todoId: number): Observable<null> {
    return this.http.delete('/todo/' + todoId)
    .map(resp => null)
    .catch(this.handleError);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
    .put('/todo/' + todo.id, todo)
    .map(resp => {
      return new Todo(resp.json());
    })
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}



