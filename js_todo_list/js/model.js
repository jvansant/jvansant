/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

class Task {
    constructor(name, collab, priority, dueDate) {
        this._name = name;
        this._collab = collab;
        this._priority = priority;
        this._dueDate = dueDate;

        this._removed = false;
    }

    get name() {
        return this._name;
    }

    get collab() {
        return this._collab;
    }

    get priority() {
        return this._priority;
    }

    get dueDate() {
        return this._dueDate;
    }

    get removed() {
        return this._removed;
    }

    set removed(newValue) {
        this._removed = newValue;
    }

    toString() {
        return `${this._name} (${this._collab}) by ${this._priority} (${this._dueDate})`;
    }
}

class Subject {
    constructor() {
        this.handlers = [];
    }

    subscribe(func) {
        this.handlers.push(func);
    }

    unsubscribe(func) {
        this.handlers = this.handlers.filter(item => item !== func);
    }

    publish(msg, obj) {
        let scope = obj || window;
        for (let func of this.handlers) {
            func(scope, msg);
        }
    }
}

class toDoList extends Subject {
    constructor() {
        super();
        this.allTasks = [];
    }

    add(aTask) {
        this.allTasks.push(aTask);
        this.publish("New task is added", this);
    }

    cleanList() {
        this.allTasks = this.allTasks.filter(aTask => !aTask.removed);
        this.publish("The list is cleaned up", this);
    }

    toString() {
        return `${this.allTasks}`;
    }

    get size() {
        return this.allTasks.length;
    }

    [Symbol.iterator]() {
        var idx = -1;
        return {
            next: () => ({value: this.allTasks[++idx], done: !(idx in this.allTasks)})
        };
    }
}
