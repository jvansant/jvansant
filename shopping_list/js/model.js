/* jshint esversion: 6 */
/* jshint node: true */
'use strict';
class Item{
    constructor(name, quantity, price, store, section, priority){
        this._name=name;
        this._quantity=quantity;
        this._price='$'+price;
        this._store=store;
        this._section=section;
        this._priority=priority;
        this._purchased=false;
    }

    get name(){
        return this._name;
    }

    get quantity(){
        return this._quantity;
    }

    get price(){
        return this._price;
    }

    get store(){
        return this._store;
    }

    get section(){
        return this._section;
    }

    get priority(){
        return this._priority;
    }

    get acquired(){
        return this._purchased;
    }

    set acquired(boole){
        this._purchased=boole;
    }

    toString(){
        return `${this._name}, ${this._price}`;
    }
}

class Subject {
    constructor() {
        this.handlers = [];
    }

    subscribe(fn) {
        this.handlers.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    publish(msg, someObj) {
        var scope = someObj || window;
        for (let fn of this.handlers) {
            fn(scope, msg);
        }
    }
}


class ShoppingList extends Subject {
    constructor() {
        super();
        this._allItems = [];
    }

    get allItems() {
        return this._allItems;
    }

    set allItems(arr){
        this._allItems=arr;
    }

    add(item) {
        this._allItems.push(item);
        this.publish("New item is added", this);
    }

    clearList(){
        this._allItems=[];
        this.publish("The list is cleared"+this._allItems, this);
    }

    cleanList() {
        let itemsArray = this._allItems;
        let newArray=[];
        for(let item of itemsArray){
            if(!item.acquired){
                newArray.push(item);
            }
            else{
                console.log(`${item} acquired. Removing from List.`);
            }
        }
        this._allItems=newArray;
        this.publish("The list is cleaned up"+this._allItems, this);
    }

    toString() {
        return `${this._allItems}`;
    }

    get size() {
        return this._allItems.length;
    }

    checked(){
        this.publish("Item is checked off the list.", this);
    }

    [Symbol.iterator]() {
        var idx = -1;
        return {
            next: () => ({value: this._allItems[++idx], done: !(idx in this._allItems)})
        };
    }
}
