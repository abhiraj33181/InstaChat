import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { dummyUserProfile } from '@/assets/assets'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/ProfileScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Avatar from '@/components/Avatar';
import { LinearGradient } from 'expo-linear-gradient';


export default function profile() {

  const { auth } = { auth: { user: dummyUserProfile } }

  const user = auth.user;

  const [editMode, setEditMode] = useState(false)
  const [profileName, setProfileName] = useState(auth.user?.name || "")
  const [profileHandle, setProfileHandle] = useState(auth.user?.handle || "")
  const [profileBio, setProfileBio] = useState(auth.user?.bio || "")
  const [avatarUri, setAvatarUri] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const displayAvatar = avatarUri || user?.avatar;

  const pickAvatar = async () => { }

  const saveProfile = async () => { }

  const handleLogout = async () => { }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          {!editMode && (
            <TouchableOpacity style={styles.editBtn} onPress={() => setEditMode(true)}>
              <Ionicons name='pencil' size={16} color={Colors.primary} />
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={editMode ? pickAvatar : undefined} activeOpacity={editMode ? 0.7 : 1}>
            <View style={styles.avatarWrapper}>
              <Avatar name={user?.name || "?"} src={displayAvatar} size={100} />
              {editMode && (
                <View style={styles.cameraOverlay}>
                  <Ionicons name='camera' size={22} color='#fff' />
                </View>
              )}
            </View>
          </TouchableOpacity>

          {!editMode && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userHandle}>@{user?.handle}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              {user?.bio && (
                <Text style={styles.userBio}>{user?.bio}</Text>
              )}
            </View>
          )}
        </View>

        {/* Edit Form */}
        {editMode && (
          <View style={styles.form}>

            {/* Name */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>NAME</Text>
              <TextInput
                style={styles.input}
                value={profileName}
                onChangeText={setProfileName}
                placeholder='Your name'
                placeholderTextColor={Colors.outlineVariant}
                autoCapitalize='words'
              />
            </View>

            {/* Handle */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>HANDLE</Text>
              <View style={styles.handleRow}>
                <Text style={styles.atSign}>@</Text>
                <TextInput
                  style={[styles.input, styles.handleInput]}
                  value={profileHandle}
                  onChangeText={(v) => setProfileHandle(v.toLowerCase().replace(/\s/g, ""))}
                  placeholder='username'
                  placeholderTextColor={Colors.outlineVariant}
                  autoCapitalize='none'
                />
              </View>
            </View>


            {/* Bio */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>BIO</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={profileBio}
                onChangeText={setProfileBio}
                placeholder='Tell us about yourself...'
                placeholderTextColor={Colors.outlineVariant}
                multiline
                numberOfLines={3}
              />
            </View>


            {/* Save Button */}
            <TouchableOpacity onPress={saveProfile} disabled={loading} style={styles.saveWrapper} activeOpacity={0.88}>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.saveBtn}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.primary} />
                ) : (
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>


            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>


          </View>
        )}

        {/* Profile Options */}

        {/* Sign out */}
      </ScrollView>

    </SafeAreaView>
  )
}