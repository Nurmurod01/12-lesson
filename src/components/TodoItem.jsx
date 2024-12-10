import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TodoItem({
    title,
    setDeletedTodoId,
    setConfirmDeleted,
    setConfirmEdited,
    setEditedTodoId,
    id,
    editTodo,
    list,
    setList,
    description,
    status,
}) {
    function editedTodo(todoId) {
        // const todo = list.find(({ id }) => id === todoId);
        // const newTodoName = prompt("Yangi ma'lumotni kiriting", todo.todoName);
        // const newTodo = { todoName: newTodoName, id: todoId };
        // setList(editTodo(newTodo, list));
    }

    function defineStatus(status) {
        if (status === "bajarilmagan") {
            return "destructive";
        } else if (status === "jarayonda") {
            return "outline";
        } else {
            return "default";
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    <>
                        <p>{description}</p>
                        <strong>
                            Holati:{" "}
                            {
                                <Badge variant={defineStatus(status)}>
                                    {status}
                                </Badge>
                            }
                        </strong>
                    </>
                }
            </CardContent>
            <CardFooter>
                <div className="gap-2 flex">
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger
                                className={buttonVariants({
                                    variant: "destructive",
                                    size: "icon",
                                })}
                                onClick={() => {
                                    setConfirmDeleted(true);
                                    setDeletedTodoId(id);
                                }}
                            >
                                <TrashIcon />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>O'chirish</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger
                                className={buttonVariants({
                                    variant: "outline",
                                    size: "icon",
                                })}
                                onClick={() => {
                                    setConfirmEdited(true);
                                    setEditedTodoId(id);
                                }}
                            >
                                <Pencil1Icon />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tahrirlash</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardFooter>
        </Card>
    );
}
