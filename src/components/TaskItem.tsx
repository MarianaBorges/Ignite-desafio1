import React, { useState, useRef, useEffect } from 'react';
import {TextInput,Image, TouchableOpacity, View, Text, StyleSheet, } from 'react-native';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit.png';
import closeIcon from '../assets/icons/x.png';

import Icon from 'react-native-vector-icons/Feather';

interface Props{
    taskId: number;
    taskNewTitle: string;
}
export interface Task {
    id: number;
    title: string;
    done: boolean;
  }

interface TasksListProps {
    index:number;
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (editTask: Props) => void;
}
  

export function TaskItem({index,item, toggleTaskDone, removeTask, editTask}: TasksListProps) {
    const [isEdit, setIsEdit ] = useState(false);
    const [taskTitle, setTaskTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
        setIsEdit(true);
    }
    function handleCancelEditing(){
        setTaskTitle(item.title);
        setIsEdit(false);
    }
    function handleSubmitEditing(){
        const edit = {
            taskId: item.id,
            taskNewTitle: taskTitle,
        }
        editTask(edit);
        setIsEdit(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEdit) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEdit]);

  return (
    <View style={styles.container}>
        <View style={{width:'70%'}}>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={()=>toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                    editable={isEdit}
                    onSubmitEditing={handleSubmitEditing}
                    ref={textInputRef}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                />
              </TouchableOpacity>
            </View>
          <View style={styles.iconsContainer}>
            {
              isEdit ?
              (<TouchableOpacity
                testID={`trash-${index}`}
                onPress={()=> handleCancelEditing()}
              >
                
                <Icon name="x" size={24} color="#b2b2b2" />
              </TouchableOpacity>)
              :
              <TouchableOpacity
              testID={`trash-${index}`}
              onPress={()=>handleStartEditing()}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
            }

            <View style={styles.iconsDivider} />

            <TouchableOpacity
              testID={`trash-${index}`}
              onPress={()=>removeTask(item.id)}
              disabled={isEdit}
            >
               <Image source={trashIcon} style={{ opacity: isEdit ? 0.2 : 1 }} />
            </TouchableOpacity>
          </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center'
  },
  iconsContainer:{
    flexDirection:'row',
    paddingRight: 24,
  },
  iconsDivider:{
      width: 1, 
      backgroundColor:'#C4C4C4',
      marginHorizontal: 16,
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
      },
      taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
      },
      taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
      }
})