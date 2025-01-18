import React, { useCallback, useEffect } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { interpolate, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Pixel, theme_clr_7_faded } from "../../../style_sheet/styles";
import Board from "../Board/Board";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function CardSlider({ list }) {
    const scale = 0.5;

    const RIGHT_OFFSET = -width / 2;
    const ITEM_WIDTH = width / 1.2 * scale;
    const ITEM_HEIGHT = width / 1.2 * scale;

    const PAGE_HEIGHT = height * 1.1;
    const PAGE_WIDTH = width;
    // Custom animation style for the carousel
    const animationStyle = useCallback((value) => {
        "worklet";

        const translateY = interpolate(value, [-1, 0, 1], [-ITEM_HEIGHT, 0, ITEM_HEIGHT]);
        const right = interpolate(value + 1, [-1, 0.5, 1], [RIGHT_OFFSET / 5, -RIGHT_OFFSET * .5, RIGHT_OFFSET / 5]);
        const scaleValue = interpolate(value + 1, [-1, 0, 1], [0.5, 1.2, 0.5]);
        const opacity = interpolate(value + 1, [-1, 0, 1], [0.2, 1, 0.2]);
        // const backgroundColor = interpolate(
        //   value+1,
        //   [-1, 0, 1],
        //   [255, 200, 255], // Change the RGB values dynamically
        // );

        return {
            transform: [{ translateY }, { scale: scaleValue }],
            right,
            opacity,
            //   backgroundColor: `rgba(255, ${backgroundColor}, ${backgroundColor}, 1)`, // Dynamic color
        };
    }, [RIGHT_OFFSET]);      


    return (
        <View style={{ flex: 1,zIndex:1 }}>
            <Carousel
                loop
                vertical
                style={{
                    justifyContent: "center",
                    width: PAGE_WIDTH,
                    height: PAGE_HEIGHT - height / 6,
                }}
                width={ITEM_WIDTH}
                pagingEnabled={false}
                height={ITEM_HEIGHT}
                data={list}
                renderItem={({ item, index }) => {

                    // ()=>selectedval(item.name);
                    
                    const animatedStyle = useAnimatedStyle(() => animationStyle(index));

                    return (
                        <View key={item} style={[{ flex: 1}, animatedStyle]}>
                      
                      
                            <Board name={item.name} />
                        </View>
                    );
                }}
                customAnimation={animationStyle}
            />
        </View>
    );
}

export default CardSlider;

const styles = StyleSheet.create({
})