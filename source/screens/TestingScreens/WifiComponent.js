import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

const WifiComponent = () => {
    useEffect(() => {
        // Listen for incoming shared files
        ReceiveSharingIntent.getReceivedFiles(
            (files) => {
                const updatedFiles = files.map((file) => {
                    let fileName = file.fileName;
                    const extensionMap = {
                        'application/octet-stream': '.bin',
                        'application/pdf': '.pdf',
                        // Add more mappings if needed
                    };

                    // Derive the extension if missing
                    if (!fileName.includes('.') || fileName.endsWith('.')) {
                        const extension = extensionMap[file.mimeType] || '';
                        fileName = `${fileName.replace(/\.$/, '')}${extension}`;
                    }

                    return { ...file, fileName };
                });

                console.log('Updated Files:', updatedFiles); // Logs with proper file extensions
            },
            (error) => {
                console.error(error);
            },
            'myGroupIdentifier' // Optional group identifier for iOS
        );

        // Clean up when the component is unmounted
        return () => {
            ReceiveSharingIntent.clearReceivedFiles();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text>React Native File Sharing Example</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WifiComponent;
