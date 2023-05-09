import { useEffect, useState } from "react";
import { Box, Center, Text, CheckboxGroup } from "@chakra-ui/react";
import { Task } from "./component/Task";

export const App = () => {
  const initialTasks = [
    {
      name: "買い物",
      isDone: true,
    },
    {
      name: "ランニング",
      isDone: false,
    },
    {
      name: "プログラミングの勉強",
      isDone: false,
    },
  ];

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  const toggleIsDone = (index) => {
    const taskCopy = [...tasks];
    const isDone = taskCopy[index].isDone;
    taskCopy[index].isDone = !isDone;
    setTasks(taskCopy);
  };

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              タスク一覧
            </Text>
          </Box>
          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  index={index}
                  name={task.name}
                  isDone={task.isDone}
                  toggleIsDone={toggleIsDone}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};
