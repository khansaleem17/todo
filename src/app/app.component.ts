import { Component, OnInit } from '@angular/core';
import { ServerDataService } from './server-data.service';

import { Todo } from './todo';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'app';
  todos: Todo[] = [];
  name: string;
  id = 1;
  todo: Todo;
  pri='';
  priority='';
  chk='';
  todoDone:false;
  selectedRow : Number;
  constructor(private dataService: ServerDataService) {

    

  }

  public createTodo() {
      this.todo =  new Todo({
       id: this.id,
       name: this.name,
       pri:this.pri,
       date: new Date() 
      });

    this.dataService.createTodo(this.todo).subscribe(
      (newTodo) => {
        this.todos = this.todos.concat(newTodo);
      }
    );
    ++this.id;
    this.name='';
  }

public deleteTodo(todo) {
  this.todo = todo;
  this.dataService.deleteTodo(this.todo.id)
  .subscribe(
    (_) => {
      this.todos = this.todos.filter((t) => t.id !== this.todo.id);
    }
  );
}

public updateTodo(todo) {
this.name=todo.name;
let newArray=[];
//const input = prompt('Enter the new title');
  this.todo =  new Todo({
    id: todo.id,
    name: this.name,
    date: new Date()
   });
  
 this.dataService.updateTodo(this.todo).subscribe(

 
   (newTodo) => {
        this.todos = this.todos.concat(newTodo);
   }
 );
 this.dataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
}
  public ngOnInit() { //alert('yes');
  
     
    this.dataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }


public SortIt(){
if(this.priority=="0"){
  this.todos.sort( function(name1, name2) {
    if ( name1.pri < name2.pri ){
      return -1;
    }else if( name1.pri > name2.pri ){
        return 1;
    }else{
      return 0;	
    }
});
}else if(this.priority=="1") {
  this.todos.sort( function(name1, name2) {
    if ( name1.pri > name2.pri ){
      return -1;
    }else if( name1.pri < name2.pri ){
        return 1;
    }else{
      return 0;	
    }
});
}  
else if(this.priority=="desc") {
  this.todos.sort( function(name1, name2) {
    if ( name1.date > name2.date ){
      return -1;
    }else if( name1.date < name2.date ){
        return 1;
    }else{
      return 0;	
    }
});
}  
else if(this.priority=="asc") {
  this.todos.sort( function(name1, name2) {
    if ( name1.date < name2.date ){
      return -1;
    }else if( name1.date > name2.date ){
        return 1;
    }else{
      return 0;	
    }
});
}  
}

  public toggleDone(event,index){
   if(event.target.checked)
  {
      this.selectedRow = index;
  }else{
    this.selectedRow = -1;
  }
    
  }
  

  toggleTitle(todo) {
  alert(todo.id);
  }

}


