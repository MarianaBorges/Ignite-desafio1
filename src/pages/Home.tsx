import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Props{
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    const verifyTask = tasks.find((t) => t.title === newTaskTitle);

    if(!!verifyTask){
      Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome');
    }else{
      const newTask = {
        id:  new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks(oldTask => [...oldTask, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(t =>
      t.id === id
        ? { ...t, done: !t.done }
        : t
    );
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',[
      {
        text: "Sim",
        onPress: () =>{
          setTasks(oldTask => oldTask.filter(
            task=>task.id !== id
          ));
        }
      },
      { text: "Não", onPress: () => {}}
    ]);
  }

  function handleEditTask(editTask:Props){
    const updateTasks = tasks.map(t =>
      t.id === editTask.taskId
        ? { ...t, title: editTask.taskNewTitle }
        : t
    );
    setTasks(updateTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})