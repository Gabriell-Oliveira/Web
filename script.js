class User {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.borrowedItems = 0;
        this.maxItems = type === 'aluno' ? 3 : type === 'professor' ? 5 : 0;
        this.returnTime = type === 'aluno' ? 15 : type === 'professor' ? 30 : null;
    }
}

class Item {
    constructor(type, title, author, year, quantity) {
        this.type = type;
        this.title = title;
        this.author = author;
        this.year = year;
        this.quantity = quantity;
        this.borrowed = 0; 
    }
}

const users = [];
const items = [];

function addUser() {
    const name = document.getElementById("userName").value;
    const type = document.getElementById("userType").value;

    if (!name || !type) {
        alert("Preencha todos os campos!");
        return;
    }

    users.push(new User(name, type));
    document.getElementById("userForm").reset();
    displayUsers();  
    alert(`Usuário ${name} (${type}) adicionado!`);
}

function addItem() {
    const type = document.getElementById("itemType").value;
    const title = document.getElementById("itemTitle").value;
    const author = document.getElementById("itemAuthor").value;
    const year = parseInt(document.getElementById("itemYear").value);
    const quantity = parseInt(document.getElementById("itemQuantity").value);

    if (!title || !author || !year || !quantity) {
        alert("Preencha todos os campos!");
        return;
    }

    items.push(new Item(type, title, author, year, quantity));
    document.getElementById("itemForm").reset();
    displayItems();  
}

function displayItems() {
    const itemTable = document.getElementById("itemTable").getElementsByTagName("tbody")[0];
    itemTable.innerHTML = ""; 

    items.forEach((item, index) => {
        const row = itemTable.insertRow();
        row.insertCell(0).innerText = item.type.charAt(0).toUpperCase() + item.type.slice(1);
        row.insertCell(1).innerText = item.title;
        row.insertCell(2).innerText = item.author;
        row.insertCell(3).innerText = item.year;
        row.insertCell(4).innerText = item.quantity;

        const actionCell = row.insertCell(5);
        const borrowButton = document.createElement("button");
        borrowButton.innerText = "Emprestar";
        borrowButton.className = 'borrow-button';
        borrowButton.onclick = () => borrowItem(index);
        if (item.quantity <= 0) {
            borrowButton.classList.add("disabled");
            borrowButton.innerText = "Indisponível";
        }
        actionCell.appendChild(borrowButton);

        const returnButton = document.createElement("button");
        returnButton.innerText = "Devolver";
        returnButton.className = 'return-button';
        returnButton.onclick = () => returnItem(index);
        actionCell.appendChild(returnButton);
    });
}

function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; 

    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} (${user.type}) - Itens emprestados: ${user.borrowedItems}`;
        userList.appendChild(li);
    });
}

function borrowItem(itemIndex) {
    const userName = prompt("Digite o nome do usuário:");
    const user = users.find(u => u.name === userName);

    if (!user) {
        alert("Usuário não encontrado!");
        return;
    }

    if (user.type === "visitante") {
        alert("Visitantes não podem emprestar itens.");
        return;
    }

    if (user.borrowedItems >= user.maxItems) {
        alert(`${user.name} atingiu o limite de empréstimos!`);
        return;
    }

    const item = items[itemIndex];
    if (item.quantity > 0) {
        item.quantity--;
        item.borrowed++;
        user.borrowedItems++;
        alert(`Empréstimo realizado! ${user.name} deve devolver em ${user.returnTime} dias.`);
        displayItems();  
        displayUsers();  
    } else {
        alert("Item indisponível para empréstimo.");
    }
}

function returnItem(itemIndex) {
    const userName = prompt("Digite o nome do usuário:");
    const user = users.find(u => u.name === userName);
    const item = items[itemIndex];

    if (!user) {
        alert("Usuário não encontrado!");
        return;
    }

    if (item.borrowed > 0) {
        item.quantity++;
        item.borrowed--;
        user.borrowedItems--;
        alert(`Item devolvido com sucesso!`);
        displayItems();  
        displayUsers();  
    } else {
        alert("Nenhum item emprestado para devolver.");
    }
}
function displayItems() {
    const itemTable = document.getElementById("itemTable").getElementsByTagName("tbody")[0];
    itemTable.innerHTML = ""; 

    items.forEach((item, index) => {
        const row = itemTable.insertRow();
        const typeCell = row.insertCell(0);
        typeCell.innerText = item.type.charAt(0).toUpperCase() + item.type.slice(1);

        
        if (item.type === 'livro') {
            row.classList.add('livro');
        } else if (item.type === 'revista') {
            row.classList.add('revista');
        } else if (item.type === 'dvd') {
            row.classList.add('dvd');
        }

        row.insertCell(1).innerText = item.title;
        row.insertCell(2).innerText = item.author;
        row.insertCell(3).innerText = item.year;
        row.insertCell(4).innerText = item.quantity;

        const actionCell = row.insertCell(5);
        const borrowButton = document.createElement("button");
        borrowButton.innerText = "Emprestar";
        borrowButton.className = 'borrow-button';
        borrowButton.onclick = () => borrowItem(index);
        if (item.quantity <= 0) {
            borrowButton.classList.add("disabled");
            borrowButton.innerText = "Indisponível";
        }
        actionCell.appendChild(borrowButton);

        const returnButton = document.createElement("button");
        returnButton.innerText = "Devolver";
        returnButton.className = 'return-button';
        returnButton.onclick = () => returnItem(index);
        actionCell.appendChild(returnButton);
    });
}
