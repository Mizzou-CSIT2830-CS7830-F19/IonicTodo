import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Todo } from "../../interfaces/todo";
import { DataService } from "src/app/services/data.service";

@Component({
	selector: "app-todo",
	templateUrl: "./todo.page.html",
	styleUrls: ["./todo.page.scss"]
})
export class TodoPage implements OnInit {
	private todoForm: FormGroup;

	todoArray = [];

	constructor(
		private formBuilder: FormBuilder,
		private dataService: DataService
	) {
		this.todoForm = this.formBuilder.group({
			todo: ["", Validators.required],
			done: false
		});

		this.dataService.getData("todos").then(todos => {
			this.todoArray = todos;
		});
	}

	addTodo(value) {
		this.todoArray = this.dataService.addTodo(value);
		console.log(this.dataService.todoArray);
		// if (value !== "") {
		// 	let dataObject: Todo = {
		// 		todo: value,
		// 		done: false
		// 	};
		// 	this.todoArray.push(dataObject);
		// } else {
		// 	alert("Field required!");
		// }
	}

	deleteItem(todo) {
		this.todoArray = this.dataService.deleteItem(todo);
		// for (let i = 0; i < this.todoArray.length; i++) {
		// 	if (todo == this.todoArray[i]) {
		// 		this.todoArray.splice(i, 1);

		// 		console.log("delete item");
		// 	}
		// }
	}

	todoSubmit(value: Todo) {
		this.todoArray = this.dataService.addTodo(value);
		this.todoForm.reset();
		// if (value.todo !== "") {
		// 	this.todoArray.push(value);
		// } else {
		// 	alert("Field Required");
		// }
	}

	ngOnInit() {}
}
