import { useRef } from "react";
import { addTask } from "../store/taskSlice";
import DashboardSectionFormComponent from "./DashboardSectionFormContainer";
import Input from "./Input";
import Button from "./Button";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Form = () => {
  const dispatch = useAppDispatch();
  const input = useRef<HTMLInputElement>(null);

  const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const task = data.get("newTask") as string;
    if (!task) {
      alert("Error: You didn't provide any value");
      return;
    }
    dispatch(addTask(task));
    if (input.current) {
      input.current.value = "";
    }
  };

  return (
    <DashboardSectionFormComponent onSubmit={handleCreateNewTask}>
      <Input ref={input} name="newTask" type="text" />
      <Button type="submit">Add</Button>
    </DashboardSectionFormComponent>
  );
};

export default Form;
