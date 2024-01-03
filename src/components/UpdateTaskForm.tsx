import { saveChanges, stopEditing } from "../store/taskSlice";
import DashboardSectionFormComponent from "./DashboardSectionFormContainer";
import Input from "./Input";
import Button from "./Button";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Form = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const editedTask = useAppSelector((state) => state.tasks.editedTask);
  const dispatch = useAppDispatch();

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const content = data.get("task") as string;
    if (!content) alert("Task have to include 1 sign at least");
    else dispatch(saveChanges(content));
  };

  const handleStopEditingTask = (
    e: React.FocusEvent<HTMLFormElement, Element>,
  ) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    dispatch(stopEditing());
  };

  const editedTaskValue = tasks.find((task) => task.id === editedTask)!;

  return (
    <DashboardSectionFormComponent
      onSubmit={handleUpdateTask}
      onBlur={handleStopEditingTask}
    >
      <Input
        defaultValue={editedTaskValue.task}
        autoFocus
        name="task"
        type="text"
      />
      <Button type="submit">Save</Button>
    </DashboardSectionFormComponent>
  );
};

export default Form;
