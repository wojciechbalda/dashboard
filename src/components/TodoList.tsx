import styled from "styled-components";
import TaskComponent from "./TaskComponent";
import Title from "./Title";
import Container from "./Container";
import AddTaskForm from "./NewTaskForm";
import UpdateTaskForm from "./UpdateTaskForm";
import Message from "./Message";
import { useAppSelector } from "../hooks/useAppSelector";
import Grid from "./Grid";

const TaskList = styled.ul`
  display: grid;
  grid-auto-rows: min-content;
  gap: 0.5rem;
  list-style: none;
  flex-grow: 1;
  overflow-y: auto;
  height: 100%;
`;

const TodoList = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const editedTask = useAppSelector((state) => state.tasks.editedTask);
  const isAnyTaskEdited = !!editedTask;

  return (
    <Container>
      <Title>TODO LIST</Title>
      <Grid>
        {!isAnyTaskEdited && <AddTaskForm />}
        {isAnyTaskEdited && <UpdateTaskForm />}
        {tasks.length !== 0 && (
          <TaskList>
            {tasks.map((task) => (
              <TaskComponent
                taskId={task.id}
                key={task.id}
                taskContent={task.task}
                isAnyTaskEdited={isAnyTaskEdited}
              />
            ))}
          </TaskList>
        )}
        {tasks.length == 0 && (
          <Message>Enter a task and click add button</Message>
        )}
      </Grid>
    </Container>
  );
};

export default TodoList;
