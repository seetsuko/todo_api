import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, Text, CheckboxGroup, Flex, Button } from "@chakra-ui/react";
import { Task } from "./component/Task";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");

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

  const createTask = async () => {
    await axios
      .post("http://localhost:3010/tasks", {
        name: name,
        is_done: false,
      });
    setName("");
    fetch();
  };

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
          <Flex mb="24px">
            <input
              placeholder="タスク名を入力"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを作成
              </Button>
            </Box>
          </Flex>
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
