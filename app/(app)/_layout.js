import { Tabs } from "expo-router";
import { Gamepad2, House, MoreHorizontal, User } from "lucide-react-native";
import { Platform } from 'react-native';

export default function AppTabLayout() {
  return (
    <Tabs
      screenOptions={{
        // 1. Typography & Colors: Clean, professional Indigo brand color
        tabBarActiveTintColor: "#4F46E5", // Indigo-600
        tabBarInactiveTintColor: "#9CA3AF", // Gray-400
        headerTitleAlign: "center",
        
        // 2. Tab Bar Styling: Remove default gray background, add subtle border
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6', // Very subtle gray
          height: Platform.OS === 'ios' ? 85 : 65, // Taller for better touch targets
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
        },
        
        // 3. Header Styling: Flat, clean, no ugly drop shadows
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0, // Remove Android shadow
          shadowOpacity: 0, // Remove iOS shadow
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: '#111827',
          fontSize: 18,
        },
        
        // 4. UX: consistent labeling
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size }) => <House size={24} color={color} strokeWidth={2.5} />
        }} 
      />
      
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={24} color={color} strokeWidth={2.5} />
        }} 
      />
      
      <Tabs.Screen 
        name="games" 
        options={{ 
          title: "Games",
          tabBarIcon: ({ color, size }) => <Gamepad2 size={24} color={color} strokeWidth={2.5} />
        }} 
      />
      
      <Tabs.Screen 
        name="more" 
        options={{ 
          title: "More",
          tabBarIcon: ({ color, size }) => <MoreHorizontal size={24} color={color} strokeWidth={2.5} />
        }} 
      />
    </Tabs>
  );
}