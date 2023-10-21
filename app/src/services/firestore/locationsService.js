import { firestore } from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const collectionRef = collection(firestore, "locations");

const propertyNames = {
  projectId: 'projectId'
};

const queryOperators = {
  equals: '=='
}

export const locationsService = {
  
  async fetchLocations(projectId) {
    const querySnapshot = await getDocs(
      query(collectionRef,
        where(propertyNames.projectId, queryOperators.equals, projectId)));

    const docs = querySnapshot.docs.map(
      (doc) => {
        const data = doc.data();

        return {
          ...data,
          id: doc.id
        };
      });

      return docs;
    },

};