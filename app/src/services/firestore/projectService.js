import { firestore } from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const collectionRef = collection(firestore, "projects");

const propertyNames = {
  userId: 'userId'
};

const queryOperators = {
  equals: '=='
}

export const projectService = {

  async fetchProjects(userId) {
    if(!userId) throw 'User must be defined';

    const querySnapshot = await getDocs(
      query(collectionRef,
        where(propertyNames.userId, queryOperators.equals, userId))
    );

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