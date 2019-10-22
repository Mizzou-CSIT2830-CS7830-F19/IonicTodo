import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo";

import { Storage } from "@ionic/storage";

@Injectable({
	providedIn: "root"
})
export class DataService {
	todoArray = [];

	constructor(private storage: Storage) {
		this.getData("todos").then(todos => {
			if (todos) {
				this.todoArray = todos;
			}
		});
	}
	getData(name: string) {
		console.log("get data");
		return this.storage.get(name);
	}
	saveData(name: string, data: Todo[]) {
		console.log("set data");
		this.storage.set(name, data);
	}

	addTodo(value) {
		if (value !== "") {
			let dataObject: Todo = {
				todo: value,
				done: false
			};

			this.todoArray.push(dataObject);
			this.saveData("todos", this.todoArray);

			return this.todoArray;
		} else {
			alert("Field required!");
		}
	}
	deleteItem(todo) {
		for (let i = 0; i < this.todoArray.length; i++) {
			if (todo == this.todoArray[i]) {
				this.todoArray.splice(i, 1);

				this.saveData("todos", this.todoArray);

				console.log("delete item");

				return this.todoArray;
			}
		}
	}
}
