import { toast, Toaster } from "sonner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoParent from "./components/TodoParent";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import { deleteTodo } from "./crud";
import { editTodo } from "./crud";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function App() {
    const [list, setList] = useState(
        JSON.parse(localStorage.getItem("todos")) || []
    );

    const [confirmDeleted, setConfirmDeleted] = useState(false);
    const [deletedTodoId, setDeletedTodoId] = useState(null);
    const [confirmEdited, setConfirmEdited] = useState(false);
    const [editedTodoId, setEditedTodoId] = useState(null);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(list));
    }, [list]);

    return (
        <>
            <Header list={list} setList={setList} />
            <main className="grow">
                <div className="container mx-auto py-10">
                    <TodoParent
                        setDeletedTodoId={setDeletedTodoId}
                        setConfirmDeleted={setConfirmDeleted}
                        setConfirmEdited={setConfirmEdited}
                        setEditedTodoId={setEditedTodoId}
                        setList={setList}
                        list={list}
                    ></TodoParent>
                </div>
            </main>
            <Footer />
            <Dialog open={confirmDeleted} onOpenChange={setConfirmDeleted}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rostan ham o'chirmoqchimisiz</DialogTitle>
                        <DialogDescription>
                            O'ylab ish qiling, keyin orqaga qaytarib bo'lmaydi
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3">
                        <Button
                            onClick={() => setConfirmDeleted(false)}
                            variant="outline"
                        >
                            Yo'q
                        </Button>
                        <Button
                            onClick={() => {
                                if (deletedTodoId) {
                                    setList(deleteTodo(deletedTodoId, list));
                                    setDeletedTodoId(null);
                                    setConfirmDeleted(false);
                                    toast.success(
                                        "Ma'lumot muvaffaqiyatli o'chirildi"
                                    );
                                }
                            }}
                            variant="destructive"
                        >
                            Ha
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={confirmEdited} onOpenChange={setConfirmEdited}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ma'lumotni o'zgartirish</DialogTitle>
                        <DialogDescription>
                            Ma'lumotlarni o'zgartirish uchun formani to'ldiring
                            va saqlang.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updatedTodo = {
                                id: editedTodoId,
                                name: formData.get("todoName"),
                                body: formData.get("todoBody"),
                                status: formData.get("todoStatus"),
                            };
                            console.log("updatedTodo: ", updatedTodo);

                            const result = editTodo(list, updatedTodo);
                            console.log("result: ", result);

                            setList(result);
                            setEditedTodoId(null);
                            setConfirmEdited(false);
                            toast.success(
                                "Ma'lumot muvaffaqiyatli o'zgartirildi"
                            );
                        }}
                        className="flex items-center justify-center flex-col py-10"
                    >
                        <div className="grid w-full mb-5 items-center gap-1.5">
                            <Label htmlFor="todo">Topshiriq nomi</Label>
                            <Input
                                autoComplete="off"
                                type="text"
                                id="todo"
                                name="todoName"
                                placeholder="Topshiriq nomini kiriting"
                                defaultValue={
                                    list.find(
                                        (todo) => todo.id === editedTodoId
                                    )?.name || ""
                                }
                            />
                        </div>
                        <div className="grid w-full mb-5 items-center gap-1.5">
                            <Label htmlFor="todoBody">Topshiriq haqida</Label>
                            <Textarea
                                id="todoBody"
                                name="todoBody"
                                placeholder="Topshiriq haqida qisqacha yozing"
                                defaultValue={
                                    list.find(
                                        (todo) => todo.id === editedTodoId
                                    )?.body || ""
                                }
                            />
                        </div>
                        <Select
                            name="todoStatus"
                            defaultValue={
                                list.find((todo) => todo.id === editedTodoId)
                                    ?.status || "bajarilmagan"
                            }
                        >
                            <SelectTrigger className="w-full mb-5">
                                <SelectValue placeholder="Statusni belgilang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bajarilmagan">
                                    Bajarilmagan
                                </SelectItem>
                                <SelectItem value="jarayonda">
                                    Jarayonda
                                </SelectItem>
                                <SelectItem value="bajarilgan">
                                    Bajarilgan
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex justify-end gap-3 w-full">
                            <Button
                                onClick={() => setConfirmEdited(false)}
                                variant="outline"
                            >
                                Bekor qilish
                            </Button>
                            <Button
                                className="w-full"
                                type="submit"
                                variant="destructive"
                                onClick={() => {
                                    if (editedTodoId) {
                                        setConfirmEdited(false);
                                    }
                                }}
                            >
                                Saqlash
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Toaster position="top-center" richColors />
        </>
    );
}
