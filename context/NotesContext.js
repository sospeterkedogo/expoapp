import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Platform,
} from 'react-native';

// --- CONSTANTS ---
const STORAGE_KEY = '@notes_app_data_v1';

// --- CONTEXT: THE BRAIN ---
export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Load Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Storage failed:", e);
        Alert.alert("Error", "Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Save Data (Triggered by state change)
  useEffect(() => {
    const saveData = async () => {
      if (loading) return; // Don't save empty array during load
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.error("Save failed:", e);
      }
    };
    saveData();
  }, [notes, loading]);

  // CRUD OPERATIONS
  const addNote = useCallback((content) => {
    if (!content.trim()) return;
    const newNote = {
      id: Date.now().toString(), // Simple ID for RN
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
  }, []);

  const updateNote = useCallback((id, newContent) => {
    if (!newContent.trim()) return;
    setNotes(prev => prev.map(note =>
      note.id === id
        ? { ...note, content: newContent.trim(), updatedAt: new Date().toISOString() }
        : note
    ));
  }, []);

  const deleteNote = useCallback((id) => {
    if (Platform.OS === 'web') {
      if (window.confirm("Are you sure you want to delete this note?")) {
        setNotes(prev => prev.filter(n => n.id !== id));
      }
    } else {
      Alert.alert(
        "Delete Note",
        "Are you sure? This cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => setNotes(prev => prev.filter(n => n.id !== id))
          }
        ]
      );
    }
  }, []);

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, loading }}>
      {children}
    </NotesContext.Provider>
  );
};