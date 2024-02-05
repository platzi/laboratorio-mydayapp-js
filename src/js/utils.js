import { main, footer, newTodoInput, firstLi } from './constants';

main.classList.add('hidden');
footer.classList.add('hidden');

/* 
    [chromium] › app.spec.js:117:3 › Item › should allow me to edit an item ========================
    [chromium] › app.spec.js:151:3 › Editing › should trim entered text ============================
    [chromium] › app.spec.js:207:3 › Clear completed button › should be hidden when there are no items that are completed    
    [chromium] › app.spec.js:217:3 › Persistence › should persist its data =========================
*/



// function handleHashChange() {
//     const hash = window.location.hash;

//     switch (hash) {
//         case '#/':
//             allFilterLink?.addEventListener('click', (event) => {
//                 event.stopPropagation();
//                 showAllTasks();
//             });
//             allFilterLink.classList.add('selected');
//             pendingFilterLink.classList.remove('selected');
//             completedFilterLink.classList.remove('selected');
//             break;
//         case '#/pending':
//             pendingFilterLink?.addEventListener('click', (event) => {
//                 event.stopPropagation();
//                 showPendingTasks();
//             })
//             allFilterLink.classList.remove('selected');
//             pendingFilterLink.classList.add('selected');
//             completedFilterLink.classList.remove('selected');
//             break;
//         case '#/completed':
//             completedFilterLink?.addEventListener('click', (event) => {
//                 event.stopPropagation();
//                 showCompletedTasks();
//             })
//             allFilterLink.classList.remove('selected');
//             pendingFilterLink.classList.remove('selected');
//             completedFilterLink.classList.add('selected');
//             break;
//     }

//     showAllTasks();
// }