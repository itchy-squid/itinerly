import { db } from '../../config/firebase';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const collectionRef = collection(db, "projects");

const propertyNames = {
  id: 'id',
  userId: 'userId'
};

const queryOperators = {
  equals: '=='
}

export const projectService = {

  async fetchProjects(userId) {
    if(!userId) throw new Error('User must be defined');

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

  async fetchProject(projectId)
  {
    try{
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      return {
        ...data,
        id: docSnap.id
      };
    }
    catch(err)
    {
      throw err;
    }

  }

};
