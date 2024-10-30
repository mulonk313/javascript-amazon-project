export const orders = JSON.parse(localStorage.getItem('orders')) ||  [];

export function addOrder(order) {
    orders.unshift(order); //unshift kanei thn paraggelia na phgaine panta prwth ston pinaka
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}