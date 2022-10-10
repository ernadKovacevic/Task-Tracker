import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  
  
  constructor(
    private taskService : TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks)=>{
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task)
    .subscribe(
      ()=>(this.tasks = this.tasks.filter((t)=>t.id !== task.id)))

  }

  setReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.setReminder(task).subscribe();
  }

  addTask(task: Task){
    this.taskService.addNewTask(task).subscribe((task)=>{
      this.tasks.push(task);
      console.log(task)
    });
  }

}
