import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const NativeSelectorScreen = () => {
  const [selected, setSelected] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
    { key: '8', value: 'Fruits' },
    { key: '9', value: 'Gadgets' },
    { key: '10', value: 'Home Appliances' },
    { key: '11', value: 'Medical Products' },
    { key: '12', value: 'Sports' },
    { key: '13', value: 'Toys' },
    { key: '14', value: 'Vehicles' },
    { key: '15', value: 'Watches' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dropdown with Search</Text>
      
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        onSelect={() => console.log(selected)}
        search={true}
        searchPlaceholder="Search items..."
        placeholder="Select an item"
        maxHeight={300}
        boxStyles={styles.boxStyle}
        inputStyles={styles.inputStyle}
        dropdownStyles={styles.dropdownStyle}
        dropdownItemStyles={styles.dropdownItemStyle}
        dropdownTextStyles={styles.dropdownTextStyle}
        searchicon={<Text>🔍</Text>}
        arrowicon={<Text>▼</Text>}
        notFoundText="No items found"
      />

      {selected && (
        <View style={styles.selectedView}>
          <Text style={styles.selectedLabel}>Selected:</Text>
          <Text style={styles.selectedValue}>{selected}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  boxStyle: {
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  inputStyle: {
    fontSize: 16,
    color: '#333',
  },
  dropdownStyle: {
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'white',
  },
  dropdownItemStyle: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  selectedView: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E8F4FD',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  selectedLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
});

export default NativeSelectorScreen;