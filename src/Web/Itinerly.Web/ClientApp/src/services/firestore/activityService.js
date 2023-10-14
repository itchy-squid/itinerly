import { firestore } from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const activitiesRef = collection(firestore, "activities");

const propertyNames = {
  itineraryId: 'itineraryId'
};

const queryOperators = {
  equals: '=='
}

export const activityService = {
  
  async getActivities(itineraryId) {
    const querySnapshot = await getDocs(
      query(activitiesRef,
        where(propertyNames.itineraryId, queryOperators.equals, itineraryId))
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
  async addActivity(post) {
    //const docRef = await db.collection("posts").add(post);
    //return docRef.id;
  },

  // Update a post
  async updateActivity(id, post) {
    //await db.collection("posts").doc(id).set(post);
    //return id;
  },

  // Delete a post
  async deleteActivity(id) {
    //await db.collection("posts").doc(id).delete();
    //return id;
  }
};
