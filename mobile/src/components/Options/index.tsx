import React from 'react';
import { Text, View } from 'react-native';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Copyright } from '../Copyright';
import { FeedbackType } from '../Widget';
import { Option } from './Option';
import { styles } from './styles';

interface Props {
  onSelect: (option: FeedbackType) => void;
}

export function Options({ onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu Feedback</Text>
      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => (
            <Option 
              key={key}
              onPress={() => onSelect(key as FeedbackType)}
              title={value.title}
              image={{
                source: value.image,
              }}
            />
          ))
        }
      </View>
      <Copyright />
    </View>
  );
}
