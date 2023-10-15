import { firestore } from '../../config/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const collectionName = "activities";
const collectionRef = collection(firestore, "activities");

const propertyNames = {
  projectId: 'projectId'
};

const queryOperators = {
  equals: '=='
}

export const activitiesService = {
  
  async getActivities(itineraryId) {
    const querySnapshot = await getDocs(
      query(collectionRef,
        where(propertyNames.projectId, queryOperators.equals, itineraryId))
    );

    const docs = querySnapshot.docs.map(
      (doc) => {
        const data = doc.data();

        return {
          ...data,
          id: doc.id,
          start: data.start.toDate()
        };
      });

      return docs;
    },

  // Add a new post
  async updateActivity(activity) {
    const docRef = doc(firestore, collectionName, activity.id);
    await updateDoc(docRef, activity);
  }
};
