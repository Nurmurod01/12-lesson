export function addTodo(newTodo, array) {
    const newArray = [...array];
    newArray.push(newTodo);
    return newArray;
}

export function deleteTodo(todoId, array) {
    const result = array.filter(({ id }) => todoId !== id);
    return result;
}

// export function deleteTodo(id, list) {
//     return list.filter((todo) => todo.id !== id);
// }

export function editTodo(list, updatedTodo) {
    const result = list.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
    );

    return result;
}
