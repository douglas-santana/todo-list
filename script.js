const listTask = document.querySelector('#lista-tarefas');

// Adiciona a tarefa na lista
const inputTask = document.querySelector('#texto-tarefa');
const btnAddTask = document.querySelector('#criar-tarefa');

btnAddTask.addEventListener('click', () => {
  const listLi = document.createElement('li');
  listLi.innerText = inputTask.value;
  listTask.appendChild(listLi);
  inputTask.value = '';
});

// Ao clicar no item recebe uma cor de fundo
const listItems = listTask.childNodes;
listTask.addEventListener('click', (e) => {
  for (let index = 0; index < listItems.length; index += 1) {
    listItems[index].style.backgroundColor = 'rgba(133, 133, 48, 0)';
  }
  if (e.target.localName === 'li') { e.target.style.backgroundColor = 'rgb(128, 128, 128)'; }
});

// Excluir item
const btnDeleteSelected = document.querySelector('#excluir-item');
btnDeleteSelected.addEventListener('click', () => {
  for (let index = 0; index < listItems.length; index += 1) {
    if (listItems[index].style.backgroundColor === 'rgb(128, 128, 128)') {
      listItems[index].remove();
    }
  }
});

// Ao clica duas vezes no item ele é marcado
listTask.addEventListener('dblclick', (e) => {
  if (e.target.localName === 'li') { e.target.classList.toggle('completed'); }
});

// Remove apenas os itens marcados
const btnRemoveCompleted = document.querySelector('#remover-finalizados');
btnRemoveCompleted.addEventListener('click', () => {
  document.querySelectorAll('.completed').forEach((item) => item.remove());
});

// Remove todos os itens da lista
const btnClearAllTasks = document.querySelector('#apaga-tudo');
btnClearAllTasks.addEventListener('click', () => {
  listTask.innerHTML = '';
  localStorage.clear();
});

// Salva a lista no local storage
const btnSalveList = document.querySelector('#salvar-tarefas');
btnSalveList.addEventListener('click', () => {
  const itemSalved = [listItems[0].textContent];
  for (let index = 1; index < listItems.length; index += 1) {
    itemSalved.push(listItems[index].textContent);
  }
  localStorage.setItem('itemsSaved', itemSalved);
});

// Permanecer itens salvos depois de recarregar a pagina
function loadListSaved() {
  if (localStorage.length > 0) {
    const listSaved = localStorage.getItem('itemsSaved').split(',');
    for (let index = 0; index < listSaved.length; index += 1) {
      const listLi = document.createElement('li');
      listTask.appendChild(listLi);
      listLi.innerText = listSaved[index];
    }
  }
}

window.onload = () => {
  loadListSaved();
};
