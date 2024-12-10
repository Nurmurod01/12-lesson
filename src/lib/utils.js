import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function validation(obj) {
  let checker;

  if (obj.todoStatus === "") {
    checker = "Topshiriq holatini belgilang";
  }

  if (obj.todoBody === "") {
    checker = "Topshiriq haqida yozing";
  }

  if (obj.todoName === "") {
    checker = "Topshiriq nomini yozing";
  }

  return checker;
}
