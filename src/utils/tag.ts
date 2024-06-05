import { Tag, Memory } from '../types';

export const getTags = (memories: Memory[]): Tag => {
  const tags = memories.reduce((accumulator: Tag, currentValue: Memory) => {
    let newTag = {...accumulator};
    currentValue.tags.forEach((tag: string) => {
      if (!newTag[tag]) {
        newTag[tag] = currentValue.media_urls;
      } else {
        currentValue.media_urls.forEach((url: string) => {
          newTag[tag].push(url);
        });
      }
    });

    return newTag;
  }, {});

  return tags;
};
