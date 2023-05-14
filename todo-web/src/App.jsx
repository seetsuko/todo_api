import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, Text, CheckboxGroup, Flex, Button, Input } from "@chakra-ui/react";
import { Task } from "./component/Task";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetch = async () => {
    axios
      .get("http://localhost:3010/tasks")
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  const createTask = async () => {
    if (name === "") {
      setErrorMessage("入力してください");
    } else {
      await axios
        .post("http://localhost:3010/tasks", {
          name: name,
          is_done: false,
        })
        .catch((err) => {
          console.log(err);
        });
      setName("");
      setErrorMessage("");
      fetch();
    }
  };

  const toggleIsDone = async (id, index) => {
    const isDone = tasks[index].is_done;
    await axios
      .put(`http://localhost:3010/tasks/${id}`, {
        is_done: !isDone,
      });
    fetch();
  };

  const destroyTask = async (id) => {
    await axios
      .delete(`http://localhost:3010/tasks/${id}`);
    fetch();
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
            <Input
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
          {errorMessage}
          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  index={index}
                  id={task.id}
                  name={task.name}
                  isDone={task.is_done}
                  toggleIsDone={toggleIsDone}
                  destroyTask={destroyTask}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};
