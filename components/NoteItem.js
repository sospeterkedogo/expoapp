import { Edit2, Trash2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- COMPONENT: NOTE ITEM (Optimized) ---
export const NoteItem = React.memo(({ note, onEdit, onDelete }) => {
  const date = new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardText} numberOfLines={4}>
          {note.content}
        </Text>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => onEdit(note)} style={styles.iconBtn}>
            <Edit2 size={20} color="#4F46E5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.iconBtn}>
            <Trash2 size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.cardDate}>{date}</Text>
    </View>
  );
});

NoteItem.displayName = 'NoteItem';

// --- STYLES ---
const styles = StyleSheet.create({
  // Card Styles
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 24,
    marginRight: 12,
  },
  cardActions: {
    flexDirection: 'column', // Stack icons vertically on mobile if space is tight, or row
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 12,
    fontWeight: '500',
  },

});