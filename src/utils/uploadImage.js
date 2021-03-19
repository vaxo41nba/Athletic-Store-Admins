import * as firebase from 'firebase';
import 'firebase/firestore';
import uriToBlob from './uriToBlob';

const uploadImage = async (name, uri) => {
  let blob = await uriToBlob(uri);
  // console.log(JSON.stringify(blob._data));

  firebase
    .storage()
    .ref('testing') // name of the file
    .put(blob)

    .then((snapshot) => {
      //You can check the image is now uploaded in the storage bucket
      console.log(JSON.parse(snapshot));
    })
    .catch((e) => console.log('uploading image error => ', e));
};

export default uploadImage;
