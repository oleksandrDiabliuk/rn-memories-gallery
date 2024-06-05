import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { NavBar } from '../components/navBar/navbar';
import { MemoryItem } from '../components/home';
import { Search } from '../components/inputs';
import { ROUTES } from '../constants';
import { getMemories, searchMemories } from '../services/firebaseDB';
import { Memory } from '../types';
import { main } from '../styles';

export const Home = ({navigation}) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchValue, setSearch] = useState<string>("");
  const isFocused = useIsFocused();
  const onProfile = () => {
    navigation.navigate(ROUTES.PROFILE);
  };
  const refreshMemories = async () => {
    try {
      const memoriesData = await getMemories();
      setMemories(memoriesData);
    } catch(error) {
      throw error;
    }
  };
  const handleDetails = (memory: Memory) => {
    navigation.navigate(ROUTES.MEMORY_DETAILS, {memory});
  };
  const handleSearch = async (search: string) => {
    try {
      console.log('SREFCSVSREVSRV -> ', search)
      if (search) {
        const memoriesData = await searchMemories(search);
        setSearch(search);
        setMemories(memoriesData);
      } else {
        refreshMemories(); 
      }
    } catch(error) {
      throw error;
    }
  };

  useEffect(() => {
    if (isFocused) {
      refreshMemories();
    }
  }, [isFocused]);

  return (
    <View style={main.container}>
      <NavBar
        title="Memories"
        onProfile={onProfile}
      />
      <ScrollView contentContainerStyle={main.list}>
        <Search
          value={searchValue}
          onChange={handleSearch}
        />
        {memories.map(memory => (
          <MemoryItem key={memory.id} memory={memory} onDetails={handleDetails} />
        ))}
      </ScrollView>
    </View>
  )
};
