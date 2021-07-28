import React from 'react'
import { StatusBar, Image, Animated, View, StyleSheet } from 'react-native'
import { data } from './content/data'
import { CONSTANTS } from './content/constants'

const renderBackground = (scrollX) =>
  data.map((image, index) => {
    const inputRange = [
      (index - 1) * CONSTANTS.width,
      index * CONSTANTS.width,
      (index + 1) * CONSTANTS.width,
    ]

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    })

    return (
      <Animated.Image
        key={`index-${index}`}
        source={{ uri: image }}
        blurRadius={50}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity,
          },
        ]}
      />
    )
  })

const renderItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item }} style={styles.imageItem} />
    </View>
  )
}

export default () => {
  const scrollX = React.useRef(new Animated.Value(0)).current

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  )

  return (
    <View style={styles.wrapper}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {renderBackground(scrollX)}
      </View>
      <Animated.FlatList
        pagingEnabled
        horizontal={true}
        data={data}
        onScroll={onScroll}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  item: {
    width: CONSTANTS.width,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  imageItem: {
    width: CONSTANTS.imageW,
    height: CONSTANTS.imageH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
})
