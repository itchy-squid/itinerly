import { firestore } from '../../config/firebase';
import { collection, getDocs } from "firebase/firestore";

const projectsRef = collection(firestore, "projects");

export const projectService = {
  
  async fetchProjects() {
    const querySnapshot = await getDocs(projectsRef);

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