import React, { useState, useCallback } from "react";
import { View, TextInput } from 'react-native';
import { debounce } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../constants';
import { inputs } from '../../styles'

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const Search = ({value, onChange}: Props) => {
  const [query, setQuery] = useState(value || '');
  const debouncedSave = useCallback(
    debounce((nextValue: string) => onChange(nextValue), 1000),
    [],
  );
  const handleChange = (text: string) => {
    setQuery(text);
    debouncedSave(text);
  };

  return (
    <View style={inputs.searchContainer}>
      <TextInput
        placeholder="Search... (#tag, title)"
        value={query}
        onChangeText={handleChange}
        style={inputs.search}
      />
      <View style={inputs.searchIconContainer}>
        <Icon name='search' size={20} color={COLORS.white} />
      </View>
    </View>
  );
};
