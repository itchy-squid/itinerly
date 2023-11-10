import { db } from '../../config/firebase';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const collectionName = "activities";
const collectionRef = collection(db, "activities");

const propertyNames = {
  projectId: 'projectId'
};

const queryOperators = {
  equals: '=='
}

export const activitiesService = {
  
  async fetchActivities(projectId) {
    const querySnapshot = await getDocs(
      query(collectionRef,
        where(propertyNames.projectId, queryOperators.equals, projectId))
    );

    const docs = querySnapshot.docs.map(
      (doc) => {
        const data = doc.data();
        const model = {
          ...data, 
          start: data.start?.toDate().toISOString(),
          id: doc.id 
        };

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
    const docRef = doc(db, collectionName, activity.id);
    await updateDoc(docRef, {
      name: activity.name,
      description: activity.description,
      locationId: activity.locationId,
      projectId: activity.projectId,
      start: activity.start ? new Date(activity.start) : undefined,
      duration: activity.duration
    });
  }
};
