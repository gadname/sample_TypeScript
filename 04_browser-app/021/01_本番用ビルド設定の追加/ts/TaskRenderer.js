"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.TaskRenderer = void 0;
var dragula_1 = require("dragula");
var Task_1 = require("./Task");
var TaskRenderer = /** @class */ (function () {
    function TaskRenderer(todoList, doingList, doneList) {
        this.todoList = todoList;
        this.doingList = doingList;
        this.doneList = doneList;
    }
    TaskRenderer.prototype.append = function (task) {
        var _a = this.render(task), taskEl = _a.taskEl, deleteButtonEl = _a.deleteButtonEl;
        this.todoList.append(taskEl);
        return { deleteButtonEl: deleteButtonEl };
    };
    TaskRenderer.prototype.remove = function (task) {
        var taskEl = document.getElementById(task.id);
        if (!taskEl)
            return;
        if (task.status === Task_1.statusMap.todo) {
            this.todoList.removeChild(taskEl);
        }
        if (task.status === Task_1.statusMap.doing) {
            this.doingList.removeChild(taskEl);
        }
        if (task.status === Task_1.statusMap.done) {
            this.doneList.removeChild(taskEl);
        }
    };
    TaskRenderer.prototype.subscribeDragAndDrop = function (onDrop) {
        dragula_1["default"]([this.todoList, this.doingList, this.doneList]).on('drop', function (el, target, _source, sibling) {
            var newStatus = Task_1.statusMap.todo;
            if (target.id === 'doingList')
                newStatus = Task_1.statusMap.doing;
            if (target.id === 'doneList')
                newStatus = Task_1.statusMap.done;
            onDrop(el, sibling, newStatus);
        });
    };
    TaskRenderer.prototype.getId = function (el) {
        return el.id;
    };
    TaskRenderer.prototype.renderAll = function (taskCollection) {
        var todoTasks = this.renderList(taskCollection.filter(Task_1.statusMap.todo), this.todoList);
        var doingTasks = this.renderList(taskCollection.filter(Task_1.statusMap.doing), this.doingList);
        var doneTasks = this.renderList(taskCollection.filter(Task_1.statusMap.done), this.doneList);
        return __spreadArray(__spreadArray(__spreadArray([], todoTasks), doingTasks), doneTasks);
    };
    TaskRenderer.prototype.renderList = function (tasks, listEl) {
        var _this = this;
        if (tasks.length === 0)
            return [];
        var taskList = [];
        tasks.forEach(function (task) {
            var _a = _this.render(task), taskEl = _a.taskEl, deleteButtonEl = _a.deleteButtonEl;
            listEl.append(taskEl);
            taskList.push({ task: task, deleteButtonEl: deleteButtonEl });
        });
        return taskList;
    };
    TaskRenderer.prototype.render = function (task) {
        // <div class="taskItem">
        //   <span>タイトル</span>
        //   <button>削除</button>
        // </div>
        var taskEl = document.createElement('div');
        var spanEl = document.createElement('span');
        var deleteButtonEl = document.createElement('button');
        taskEl.id = task.id;
        taskEl.classList.add('task-item');
        spanEl.textContent = task.title;
        deleteButtonEl.textContent = '削除';
        taskEl.append(spanEl, deleteButtonEl);
        return { taskEl: taskEl, deleteButtonEl: deleteButtonEl };
    };
    return TaskRenderer;
}());
exports.TaskRenderer = TaskRenderer;
