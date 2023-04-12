import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hooks/use-http";

function App() {
  const transformedTask = (data) => {
    const loadedTask = [];
    for (const taskKey in data) {
      loadedTask.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTask);
  };

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(
      {
        url: "https://react-http-7e647-default-rtdb.firebaseio.com/tasks.json",
      },
      transformedTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
