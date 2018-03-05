var separator = '!+=-*//*-=+!';


if (localStorage.getItem('todo') == (null || '')) {
    localStorage.setItem('todo','');
}
// ZA ADD BUTTON
document.getElementById('add').addEventListener('click', function () {
    addTodo();
});

// ZA COMPLETE BUTTONE KOJI TRENUTNO POSTOJE
var btns = document.getElementsByClassName('remove');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', removeTodo, {once: true});
}

// ZA ENTER NA INPUT
document.getElementById('unos').addEventListener('keydown', checkEnter);

// DODA TO-DO NA LISTU
// NE RADI NISTA AKO JE INPUT PRAZAN
// KREIRA SVE ELEMENTE KOJE SE NALAZE U <li>
// I DODA IH U <ol>
// I DODA EVENT LISTENERA NA BUTTON;
// VRATI FOCUS NA INPUT
function addTodo(text = '') {
    // text JE TU DA NA LOAD DODA IZ LOCAL SVE TO-DO STO IMA
    // A KAD DODAJES IZ INPUTA ONDA DODAJE INPUT
    if (document.getElementById('unos').value === "" && text === '') {
        return;
    }
    if (text === '') {
        var inp = document.getElementById('unos');
        text = inp.value;
        addLocal(inp.value);
    }

    var list = document.getElementsByTagName('ol')[0];
    var span = document.createElement('span');
    var button = document.createElement('button');
    var li = document.createElement('li')
    span.setAttribute('class', 'quest');
    span.innerText = text;
    button.setAttribute('class', 'remove');
    button.innerText = "Complete";
    button.addEventListener('click', removeTodo)
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);

    // DODA TO-DO U LOCAL STORAGE

    try {
        // RESETUJE INPUT
        inp.value = '';
        inp.focus();
    } catch (e) {}

}

// UKLANJA TO-DO SA LISTE I IZ LOCAL, BRISE <li>;
function removeTodo(e) {
    var valu = e.target.parentNode.firstChild.textContent;
    removeLocal(valu);
    e.target.parentElement.remove();
}

// AKO JE ENTER DODAJ TO-DO
function checkEnter(e) {
    if (e.keyCode === 13) {
        addTodo();
    }
}

// DODA U LOCAL STORAGE
function addLocal(text) {
    localStorage.setItem("todo", localStorage.getItem('todo') + separator + text);
}

// DODA TO-DO KAD SE PAGE LOADA
function loadTodo() {
    if (localStorage.length === 0) {
        return;
    }
    var todos = localStorage.getItem('todo').split(separator);
    for (var i = 0; i < todos.length; i++) {
        if (todos[i] !== '') {
            addTodo(todos[i]);
        }
    }
}
// UKLANJA IZ LOCAL STORAGE TAJ TO-DO
function removeLocal(text) {
    var todos = localStorage.getItem('todo').split(separator);
    for(var i =0; i<todos.length;i++){
        if(todos[i]===text){
            todos.splice(i,1);
            break;
        }
    }
    localStorage.setItem('todo', todos.join(separator));
}

