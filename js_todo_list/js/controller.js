/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
"use strict";

var allCollabs = ["Aardvark", "Beaver", "Cheetah", "Dolphin", "Elephant", "Flamingo", "Giraffe", "Hippo"];
var allPriorities = ["Low", "Medium", "High"];

var myToDoListModel = new toDoList();
var myToDoListView = new ToDoListView(myToDoListModel);

function addTask() {
    if (!document.querySelector("#newTaskForm").checkValidity()) {
        alert("Must enter the task title and date!");
        return;
    }
    let title = document.querySelector("#taskTitle").value;
    let collab = document.querySelector("#collab").selectedOptions[0].value;
    let priority = document.querySelector("#priority").selectedOptions[0].value;
    let date = document.querySelector("#dueDate").value;
    let a = date;
    let newTask = new Task(title, collab, priority, a);
    myToDoListModel.add(newTask);
}

function cleanList() {
    myToDoListModel.cleanList();
}

function populateSelectOption(elementId, optionsArray) {
    let menu = document.querySelector(elementId);
    for (let artist of optionsArray) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", artist);
        newOption.innerHTML = artist;
        menu.appendChild(newOption);
    }
}

window.onload = function() {
    populateSelectOption("#collab", allCollabs);
    populateSelectOption("#priority", allPriorities);
}