import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import { theme } from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';
import { Options } from '../Options';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [isFeedbackSent, setIsFeedbackSent] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleResetFeedback() {
    setFeedbackType(null);
    setIsFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setIsFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight='bold'
          color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}>
        {
          isFeedbackSent
            ?
            <Success onSendAnotherFeedback={handleResetFeedback}/>
            :
            <>
              {
                feedbackType
                  ?
                  <Form
                    feedbackType={feedbackType}
                    onFeedbackCancelled={handleResetFeedback}
                    onFeedbackSent={handleFeedbackSent} />
                  :
                  <Options onFeedbackTypeChanged={setFeedbackType} />
              }
            </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);