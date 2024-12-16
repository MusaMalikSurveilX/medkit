import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { Chat } from '@/types/database';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SIDEBAR_WIDTH = Dimensions.get('window').width * 0.85;

type ChatSidebarProps = {
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export const ChatSidebar = ({ 
  chats, 
  currentChatId, 
  onChatSelect, 
  onNewChat,
  isOpen,
  onClose,
}: ChatSidebarProps) => {
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: withSpring(isOpen ? 0 : -SIDEBAR_WIDTH, {
        damping: 20,
        stiffness: 90,
      }),
    }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 0.5 : 0),
    display: isOpen ? 'flex' : 'none',
  }));

  return (
    <>
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <TouchableOpacity style={styles.overlayTouch} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[
        styles.container, 
        { paddingTop: insets.top }, 
        animatedStyle
      ]}>
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
          >
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.newChatButton} 
          onPress={onNewChat}
        >
          <MaterialIcons name="add" size={24} color="#fff" style={styles.newChatIcon} />
          <Text style={styles.newChatText}>New chat</Text>
        </TouchableOpacity>

        <ScrollView style={styles.chatList}>
          {chats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={[
                styles.chatItem,
                currentChatId === chat.id && styles.activeChatItem,
              ]}
              onPress={() => {
                onChatSelect(chat.id);
                onClose();
              }}
            >
              <MaterialIcons 
                name="chat" 
                size={20} 
                color={currentChatId === chat.id ? '#cbc7f4' : '#666'} 
                style={styles.chatIcon}
              />
              <View style={styles.chatInfo}>
                <Text 
                  style={[
                    styles.chatTitle,
                    currentChatId === chat.id && styles.activeChatTitle,
                  ]}
                  numberOfLines={1}
                >
                  {chat.title}
                </Text>
                <Text style={styles.chatPreview} numberOfLines={1}>
                  {chat.last_message || 'No messages yet'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 1,
  },
  overlayTouch: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    zIndex: 2,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cbc7f4',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  newChatIcon: {
    marginRight: 8,
  },
  newChatText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  chatList: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  activeChatItem: {
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderLeftColor: '#cbc7f4',
  },
  chatIcon: {
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeChatTitle: {
    color: '#cbc7f4',
  },
  chatPreview: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 