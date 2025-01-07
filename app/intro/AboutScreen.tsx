import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';


export default function AboutScreen() {
    const router = useRouter();
    return (
        <View className="flex-1 flex justify-end">

            {/* background image */}
            <Image
                source={require('../../assets/images/welcome.png')}
                className="h-full w-full absolute"
            />

            {/* content & gradient */}
            <View className="p-5 pb-10 space-y-8">
                
                <Text className="text-white font-bold text-5xl" style={{  }}>
                    Merhabaadfaos
                </Text>
                <Text className="text-neutral-200  font-medium" style={{  }}>
                    Merhaa
                </Text>
                <TouchableOpacity onPress={()=>router.replace("/(tabs)")} className="bg-red-500 mx-auto p-3 px-12 rounded-full"  >
                    <Text className=" font-bold text-white" style={{  }}>
                        Hadi Gidelim
                    </Text>
                </TouchableOpacity>



            </View>
        </View>
    )
}