import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  showAddTask !: boolean
  subscription !: Subscription

  text !: string;
  day !: string;
  reminder : boolean = false;

  @Output() addNewTask : EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe((value)=>{
      this.showAddTask = value})
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (!this.text){
      alert("please insert Task")
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder : this.reminder
    }
    
    this.addNewTask.emit(newTask);

    this.text = "";
    this.day = "";
    this.reminder = false;

  }

}
