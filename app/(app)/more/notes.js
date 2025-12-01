import { Plus, Save, StickyNoteIcon, X } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { NoteItem } from '../../../components/NoteItem';
import { NotesContext, NotesProvider } from '../../../context/NotesContext';

// --- CUSTOM HOOK ---
const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be within Provider");
  return ctx;
};



// --- COMPONENT: MODAL (Input) ---
const NoteModal = ({ visible, onClose, editingNote, onSave }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (visible) {
      setText(editingNote ? editingNote.content : '');
    }
  }, [visible, editingNote]);

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingNote ? 'Edit Note' : 'New Note'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            multiline
            placeholder="Write something brilliant..."
            placeholderTextColor="#9CA3AF"
            value={text}
            onChangeText={setText}
            autoFocus={true} // Focus automatically when modal opens
            textAlignVertical="top"
          />

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveBtn, !text.trim() && styles.disabledBtn]}
              onPress={handleSave}
              disabled={!text.trim()}
            >
              <Save size={18} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.saveBtnText}>
                {editingNote ? 'Update' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// --- SCREEN: MAIN UI ---
function App() {
  const { notes, addNote, updateNote, deleteNote, loading } = useNotes();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreate = () => {
    setEditingNote(null);
    setModalVisible(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setModalVisible(true);
  };

  const onSave = (text) => {
    if (editingNote) {
      updateNote(editingNote.id, text);
    } else {
      addNote(text);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notes</Text>
          <Text style={styles.headerSubtitle}>{notes.length} entries</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem note={item} onEdit={handleEdit} onDelete={deleteNote} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <StickyNoteIcon size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No notes yet.</Text>
            <Text style={styles.emptySubtext}>Tap + to add one.</Text>
          </View>
        }
      />

      {/* FAB (Floating Action Button) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreate}
        activeOpacity={0.8}
      >
        <Plus size={32} color="white" />
      </TouchableOpacity>

      <NoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        editingNote={editingNote}
        onSave={onSave}
      />
    </SafeAreaView>
  );
};



// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Space for FAB
  },
  // FAB Styles
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  saveBtn: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledBtn: {
    backgroundColor: '#A5B4FC',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  closeBtn: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  }
});

export default function NotesScreen() {
  return (
    <NotesProvider>
      <App />
    </NotesProvider>
  );
}