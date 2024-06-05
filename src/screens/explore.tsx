import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { NavBar } from '../components/navBar/navbar';
import { TagItem } from '../components/explorer';
import { ROUTES } from '../constants';
import { Tag } from '../types';
import { getMemories } from '../services/firebaseDB';
import { getTags } from '../utils';
import { main } from '../styles';

export const Explore = ({navigation}) => {
  const [memoriesTags, setMemories] = useState<Tag>({});
  const isFocused = useIsFocused();
  const refreshMemories = async () => {
    try {
      const memoriesData = await getMemories();
      const tags = getTags(memoriesData);

      setMemories(tags);
    } catch(error) {
      throw error;
    }
  };

  const onProfile = () => {
    navigation.navigate(ROUTES.PROFILE);
  };

  const onDetails = (tag: Tag) => {
    navigation.navigate(ROUTES.TAG_DETAILS, {tag});
  };

  useEffect(() => {
    if (isFocused) {
      refreshMemories();
    }
  }, [isFocused]);

  return (
    <View style={main.container}>
      <NavBar
        title="Explore"
        onProfile={onProfile}
      />
      <ScrollView contentContainerStyle={main.list}>
        <View style={main.tagsContainer}>
          {Object.keys(memoriesTags).filter((tag: string) => memoriesTags[tag].length > 1).map((tagKey: string, index) => (
            <TagItem
              tagKey={tagKey}
              key={tagKey}
              images={memoriesTags[tagKey]}
              onDetails={onDetails}
            />
          ))}
          </View>
      </ScrollView>
    </View>
  )
};
