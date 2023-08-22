import "./css/base.css";
import * as nodos from './js/nodos.js'//nodos
import * as utils from "./js/utils.js";//logica
//relacion directa con el Usuario

window.addEventListener('load', () => {
    utils.haveTask();
});// charge page


// pending task count
window.addEventListener('load', () => {
    utils.showPendingShurkut();
});

nodos.imputNewToDo.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        if (!nodos.imputNewToDo.value) {
            prompt('you most chose a task name');
        } else {
            let taskName = (nodos.imputNewToDo.value).trim();
            let newTask = {
                "id": utils.createId(),
                "title": `${taskName}`,
                "completed": false
            };
            console.log(newTask)
            utils.createTask(newTask);
            console.log(`su tarea ${nodos.imputNewToDo.value} ha sido guardada`);


            // add to ul "TO DO - area"
            utils.insertTaskinList(newTask, nodos.ulMain);

            // clean input ToDo
            nodos.imputNewToDo.value = '';
            // utils.checkIsFirstTask();
            // console.log('estyo aca donde implemente')
            // TRAAAATANDO DE QUE SE RECARGE LA PAGINA UNA VEZ SE CREE LA PRIMER TAREA!!!!!
        };
    }
});

nodos.clearCompletedBtn.addEventListener('click', () => {
    utils.clearCompleted();
    location.reload();
});

nodos.hashAllBtn.addEventListener('click', () => {
    nodos.ulMain.innerHTML = '';
    location.hash = '#/'
    utils.showTaskForHash();
});
nodos.hashPendingBtn.addEventListener('click', () => {
    nodos.ulMain.innerHTML = '';
    location.hash = '#/pending'
    utils.showTaskForHash();
});
nodos.hashcompletedBtn.addEventListener('click', () => {
    nodos.ulMain.innerHTML = '';
    location.hash = '#/completed'
    utils.showTaskForHash();
});

