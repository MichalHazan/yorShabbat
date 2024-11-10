import React from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { XCircle } from 'lucide-react';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageModal = ({ visible, onClose }: LanguageModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <XCircle color="gray" size={24} />
            </TouchableOpacity>
            {/* Language modal content */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default LanguageModal;