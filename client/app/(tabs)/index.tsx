import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Conversation, UserStory } from '@/types'
import { useRouter } from 'expo-router'
import { dummyConversationData } from '@/assets/assets'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '@/assets/styles/MessagesScreen.styles'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import StoriesBar from '@/components/StoriesBar'
import StoryViewer from '@/components/StoryViewer'

export default function MessagesScreen() {

  const [conversation, setConversation] = useState<Conversation[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null)

  const router = useRouter();

  const fetchConversation = () => {
    setLoading(true)
    setTimeout(() => {
      setConversation(dummyConversationData as any)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchConversation()
  }, [])

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Conversations
        </Text>

        <View style={styles.headerRight}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{conversation.length}</Text>
          </View>
        </View>

      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name='search' size={16} color={Colors.outlineVariant} />
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder='Search conversation' placeholderTextColor={Colors.outlineVariant} />

        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name='close-circle' size={16} color={Colors.outlineVariant}/>
          </TouchableOpacity>
        )}

      </View>


      {/* Stories */}
      <StoriesBar onViewStory={(us) => setSelectedStory(us)} />

      {selectedStory && <StoryViewer userStory={selectedStory} onClose={() => setSelectedStory(null)} />}

      {/* Divider */}
        <View style={styles.divider} />
      {/* Conversation List */}

    </SafeAreaView>
  )
}