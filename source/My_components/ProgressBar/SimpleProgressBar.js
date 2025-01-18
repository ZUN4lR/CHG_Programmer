import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { app_clr_cyan, dark_white, Poppins_Bold, theme_clr_1_2, theme_clr_1_2_bright, theme_clr_2, width } from '../../../style_sheet/styles';
import * as Animatable from 'react-native-animatable';
import { generateRandomNumbers } from '../../../HelperFunctions/Functions';

const SimpleProgressBar = ({ visible = true, total = 0 }) => {
    const [showLoader, setShowLoader] = useState(visible);
    const [barvalue, setBarvalue] = useState(0);

    const [no_list] = useState(() => generateRandomNumbers(0, 90, 10));

    useEffect(() => {
        if (visible) {
            setShowLoader(true);
            let index = 0;

            const interval = setInterval(() => {
                if (index < no_list.length) {
                    setBarvalue(no_list[index]);
                    index += 1;
                } else {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setShowLoader(false);
        }
    }, [visible, no_list]);

    const fadeInOut = {
        0: {
            opacity: 1,
            backgroundColor: theme_clr_1_2_bright,
        },
        0.5: {
            opacity: 0.5,
            backgroundColor: app_clr_cyan,
        },
        1: {
            opacity: 1,
            backgroundColor: theme_clr_1_2_bright,
        },
    };

    return (
        <Modal visible={showLoader} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.main_view}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            height: 10,
                            overflow: 'hidden',
                            width: width / 1.5,
                        }}
                    >
                        <Animatable.View
                            animation={fadeInOut}
                            duration={2000}
                            easing="ease-in-out"
                            iterationCount="infinite"
                            style={{
                                backgroundColor: theme_clr_1_2_bright,
                                borderRadius: 3,
                                height: 10,
                                width: ((barvalue ? barvalue : 0) / (total ? total : 100)) * (width / 1.5),
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        
                    <Text style={{ color: '#fff', fontSize: 15, fontFamily: Poppins_Bold }}
                        >
                            {'Uploading..   ' + barvalue + '%'}
                         </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    main_view: {
        backgroundColor: theme_clr_2,
        width: width / 1.2,
        paddingVertical: 30,
        borderRadius: 15,
        gap: 10,
        borderWidth: 0.5,
        borderColor: dark_white,
        alignItems: 'center',
    },
});

export default SimpleProgressBar;
