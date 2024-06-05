import { doc, setDoc, collection, query, getDocs, orderBy, limit, deleteDoc, where, or } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import { MemoryCreate, Attachment } from '../types';
import { HASHTAG_REGEX } from '../constants';

const uriToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      // return the blob
      resolve(xhr.response);
    };
    
    xhr.onerror = function() {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    
    xhr.send(null);
  });
}

export const getMediaUrl = async (url: string) => {
  try {
    const fileRef = ref(storage, url);
    const media = await getDownloadURL(fileRef);
    console.log(url, media)

    return media;
  } catch(error) {
    throw error;
  }
};

export const getMemories = async () => {
  try {
    let memories = [] as any[];
    const querySnapshot = await getDocs(collection(db, "memories"));

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const memory = {
        ...docData,
        id: doc.id,
        date: new Date(docData.date.seconds * 1000),
      };
      memories.push(memory);
    });

    return memories;
  } catch(error) {
    console.log(error)
    throw(error);
  }
};

export const saveMedia = async (media: Attachment[], onSuccess: () => void) => {
  try {
    media.forEach(async (file, index) => {
      const fileRef = ref(storage, `/media/${file.filename}`);
      const data = await uriToBlob(file.data);
      console.log('uriToBlob -> ', data, 'file.type -> ', file.type)
      const res = await uploadBytes(fileRef, data);
      if (res && index === 0) {
        onSuccess();
      }
      console.log('uploadBytes -> ', res)
    });
  } catch(error) {
    console.log(error)
    throw error;
  };
};

export const saveMemory = async (memory: MemoryCreate, onSuccess: () => void) => {
  try {
    const {
      title,
      tags,
      description,
      date,
      mediaForSend,
    } = memory;

    const requestData = {
      title,
      tags,
      description,
      date,
      media_urls: mediaForSend.map(file => `/media/${file.filename}`),
    };
    const memoriesRef = collection(db, 'memories');

    await setDoc(doc(memoriesRef), requestData);

    if (mediaForSend.length > 0) {
      await saveMedia(mediaForSend, onSuccess);
    } else {
      onSuccess();
    }
  } catch(error) {
    console.log(error)
    throw(error);
  }
};

export const deleteMemory = async (id: string, onSuccess: () => void) => {
  try {
    await deleteDoc(doc(db, 'memories', id));
    
    onSuccess();
  } catch(error) {
    console.log(error)
    throw(error);
  }
};

export const searchMemories = async (search: string) => {
  try {
    let memories = [] as any[];
    let hashtagsArray = [] as string[];

    const hashtags = search?.toLowerCase().match(HASHTAG_REGEX) || [];
    if (hashtags) {
      hashtags.forEach((item) => hashtagsArray.push(item.substring(1)));
    }
    const q = hashtagsArray.length > 0 ? or(where("title", "==", search), where("tags", "array-contains-any", hashtagsArray)) : where("title", "==", search);
    const querySnapshot = query(collection(db, "memories"), q);
    const querySnap = await getDocs(querySnapshot);

    querySnap.forEach((doc) => {
      const docData = doc.data();
      const memory = {
        ...{id: doc.id},
        ...docData,
        ...{
          date: new Date(docData.date.seconds * 1000),
        }
      };
      memories.push(memory);
    });

    return memories;
  } catch(error) {
    throw error;
  }
};
