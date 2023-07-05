//* Selecionando itens
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//* Editando as opções
let editElement;
let editFlag = false;
let editID = "";

//* Escutadores de eventos
//* Submit form
form.addEventListener('submit', addItem)

//* Limpando itens
clearBtn.addEventListener('click', clearItems)


//* Funções
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        const element = document.createElement('article');
        //* Adicionando class
        element.classList.add('grocery-item');
        //* Adicionando id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
                    <p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
        `;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        //* Acrescentar no filho
        list.appendChild(element);
        //* Mostrar alerta
        displayAlert('item added to the list', 'success');
        //* mostrar container
        container.classList.add('show-container');
        //* adicionando ao local de armazenamento
        addToLocalStorage(id, value);
        //* Definindo a volta para o padrão
        setBackToDefault();
    }
    else if(value && editFlag){
        console.log('editing')
    }
    else{
        displayAlert('please enter value', 'danger')
    }
}
//* Mostrando alerta
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //* Removendo alerta
    setTimeout(function() {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}

//* Limpando Itens
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
    // localStorage.removeItem('list');
}

//* deletando function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    //* Removendo do armazenamento local
    //* removeFromLocalStorage(id);
}
//* editando function
function editItem() {
    const element = e.currentTarget.parentElement.parentElement;
    //* Definindo edição do item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //* Definindo forma de valor
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

//* Definindo a volta para o padrão
function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

//* Armazenamento local
function addToLocalStorage(id, value) {
    // console.log('added to local storage');
}
function removeFromLocalStorage(id) {

}