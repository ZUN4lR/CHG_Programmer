import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Alert } from 'react-native';
import { theme_clr_1, theme_clr_1_2_bright } from '../../../style_sheet/styles';

const DefaultLoading = ({ visible,custom_time=0 }) => {
  const [showLoader, setShowLoader] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowLoader(true); // Show loader when visible is true
      const timer = setTimeout(() => {
        setShowLoader(false); // Hide loader after 10 seconds
        Alert.alert(`Something Went Wrong`);
      }, custom_time>1?custom_time:20000); // 10 seconds

      return () => clearTimeout(timer); // Clear timer if component unmounts or visible changes
    } else {
      setShowLoader(false); // Immediately hide loader if visible is false
    }
  }, [visible]);

  return (
    <Modal
      visible={showLoader}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme_clr_1_2_bright} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
});

export default DefaultLoading;
