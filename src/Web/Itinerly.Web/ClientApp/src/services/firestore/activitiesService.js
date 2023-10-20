import { firestore } from '../../config/firebase';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const collectionName = "activities";
const collectionRef = collection(firestore, "activities");

const propertyNames = {
  projectId: 'projectId'
};

const queryOperators = {
  equals: '=='
}

export const activitiesService = {
  
  async fetchActivities(itineraryId) {
    const querySnapshot = await getDocs(
      query(collectionRef,
        where(propertyNames.projectId, queryOperators.equals, itineraryId))
    );

    const docs = querySnapshot.docs.map(
      (doc) => {
        const data = doc.data();

        const model = {
          ...data,
          id: doc.id
        };

        if(data.start) {
          model.start = data.start.toDate();
        }

        return model;
      });

      return docs;
    },

  async addActivities(activities) {
    
    await Promise.all(
      activities.map(async (activity) => {
        // added
        if(!activity.isDeleted) {
          await addDoc(collectionRef, activity);
        }

        // added then immediately deleted.
        // dont send it to the server. save money.
        else await Promise.resolve();
      })
    )
  },

  // Add a new post
  async updateActivity(activity) {
    const docRef = doc(firestore, collectionName, activity.id);
    await updateDoc(docRef, activity);
  }
};
