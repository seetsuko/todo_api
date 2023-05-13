import { Box, Checkbox, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const Task = (props) => {
  return (
    <Box mb="16px">
      <Checkbox
        size="lg"
        colorScheme="blue"
        isChecked={props.isDone}
        onChange={() => {
          props.toggleIsDone(props.index);
        }}
      >
        <Text>{props.name}</Text>
      </Checkbox>
      <CloseIcon onClick={() => {
        props.destroyTask(props.id);
      }}
      />
    </Box>
  );
};
