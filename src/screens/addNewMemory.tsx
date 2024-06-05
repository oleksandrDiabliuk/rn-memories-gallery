import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavBar } from '../components/navBar/navbar';
import { AddNewMemoryForm } from '../components/forms'
import { ROUTES } from '../constants';
import { getMemories, saveMemory } from '../services/firebaseDB';
import { MemoryCreate } from '../types';
import { addNewMemory } from '../styles';

export const AddNewMemory = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const onProfile = () => {
    navigation.navigate(ROUTES.PROFILE);
  };
  const onSuccess = () => {
    navigation.navigate(ROUTES.HOME);
  };
  const handleCreate = async (memory: MemoryCreate) => {
    setLoading(true);

    try {
      await saveMemory(memory, onSuccess);
      setLoading(false);
    } catch(error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <View style={addNewMemory.container}>
      <NavBar
        title="Add New Memory"
        onProfile={onProfile}
      />
      <View style={addNewMemory.wrapper}>
        <AddNewMemoryForm
          loading={loading}
          handleCreate={handleCreate}
        />
      </View>
    </View>
  )
};
