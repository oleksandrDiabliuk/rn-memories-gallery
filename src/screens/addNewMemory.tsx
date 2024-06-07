import React, { useState } from "react";
import { View } from "react-native";
import { NavBar } from '../components/navBar/navbar';
import { AddNewMemoryForm } from '../components/forms'
import { ROUTES } from '../constants';
import { saveMemory } from '../services/firebaseDB';
import { MemoryCreate } from '../types';
import { RouteParamsListProps } from '../routes'
import { addNewMemory } from '../styles';

export const AddNewMemory = ({navigation}: RouteParamsListProps<ROUTES.ADD_NEW_MEMORY>) => {
  const [loading, setLoading] = useState(false);
  const onProfile = () => {
    navigation.navigate(ROUTES.PROFILE);
  };
  const onSuccess = () => {
    setLoading(false);
    navigation.navigate(ROUTES.HOME);
  };
  const handleCreate = async (memory: MemoryCreate) => {
    setLoading(true);

    try {
      await saveMemory(memory, onSuccess);
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
