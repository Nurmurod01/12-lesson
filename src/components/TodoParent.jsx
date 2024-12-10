import TodoItem from "./TodoItem";
import { deleteTodo, editTodo } from "../crud";
export default function TodoParent({
    list,
    setList,
    setConfirmDeleted,
    setDeletedTodoId,
    setConfirmEdited,
    setEditedTodoId,
}) {
    return (
        <ul className="grid grid-cols-3 gap-5">
            {list.length > 0 ? (
                list.map(({ todoName, id, todoBody, todoStatus }) => {
                    return (
                        <li key={id}>
                            <TodoItem
                                setDeletedTodoId={setDeletedTodoId}
                                setConfirmDeleted={setConfirmDeleted}
                                setConfirmEdited={setConfirmEdited}
                                setEditedTodoId={setEditedTodoId}
                                id={id}
                                editTodo={editTodo}
                                deleteTodo={deleteTodo}
                                setList={setList}
                                list={list}
                                title={todoName}
                                description={todoBody}
                                status={todoStatus}
                            ></TodoItem>
                        </li>
                    );
                })
            ) : (
                <li className="text-center">No data</li>
            )}
        </ul>
    );
}
