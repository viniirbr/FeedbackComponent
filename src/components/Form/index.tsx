import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, TextInput } from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { styles } from './styles';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCancelled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedbackSent }: Props) {
    const [screenshot, setScreeshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("")
    
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
        .then(uri => setScreeshot(uri))
    }

    function handleScreenshotRemove() {
        setScreeshot(null);
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return;
        }

        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            })

            onFeedbackSent();
            
        } catch(error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCancelled}>
                    <ArrowLeft
                        size={24}
                        weight='bold'
                        color={theme.colors.surface_secondary}
                         />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image source={feedbackTypeInfo.image} style={styles.image}/>
                    <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
                </View>
            </View>
            <TextInput 
            multiline 
            style={styles.input}
            placeholder="Algo não está funcionando bem? Conte com detalhes o que está acontecendo." 
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
            onChangeText={setComment}/>

            <View style={styles.footer}>
                <ScreenshotButton 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}/>
            </View>
            <Button 
            onPress={handleSendFeedback}
            isLoading={isSendingFeedback}/>
        </View>
    );
}