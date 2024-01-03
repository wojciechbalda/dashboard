import { RiTaskLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import styled from "styled-components";
import { removeTask, startEditing } from "../store/taskSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Task = styled.li`
  border: 2px solid black;
  border-radius: 0.5rem;
  padding: 0 10px;
  background-color: #a6a4a4;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  padding: 1.5rem 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const TaskIcon = styled(RiTaskLine)`
  flex-shrink: 0;
`;

const ActionButtonsContainer = styled.div`
  height: 100%;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  padding: 0 0.3rem;
  height: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: inherit;
  display: inline-flex;
  align-items: center;
`;

type TaskComponentProps = {
  taskContent: string;
  isAnyTaskEdited?: boolean;
  taskId: string;
};

const TaskComponent = ({
  taskContent,
  isAnyTaskEdited,
  taskId,
}: TaskComponentProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Task>
        <Content>
          <TaskIcon />
          <span>{taskContent}</span>
        </Content>
        {!isAnyTaskEdited && (
          <ActionButtonsContainer>
            <ActionButton onClick={() => dispatch(removeTask(taskId))}>
              <AiFillDelete />
            </ActionButton>
            <ActionButton onClick={() => dispatch(startEditing(taskId))}>
              <AiOutlineEdit />
            </ActionButton>
          </ActionButtonsContainer>
        )}
      </Task>
    </>
  );
};

export default TaskComponent;
