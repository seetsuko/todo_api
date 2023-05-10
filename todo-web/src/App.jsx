import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, Text, CheckboxGroup } from "@chakra-ui/react";
import { Task } from "./component/Task";

export const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetch = async () => {
    axios
      .get("http://localhost:3010/tasks")
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      });
  };

  useEffect(() => {
    fetch();
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
