import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import EventTags from './EventTags';

export default function EventTagsList({ tags, onRemove }) {
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <EventTags
            tagname={tag.tagname}
            key={tag.id}
            {...tag}
            onRemove={onRemove}
          />
        ))}
      </View>
    </ScrollView>
  );
}
