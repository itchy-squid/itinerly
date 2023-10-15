import { firestore } from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const expensesRef = collection(firestore, "expenses");

const propertyNames = {
  projectId: 'projectId'
};

const queryOperators = {
  equals: '==',
  in: 'in'
}

export const expensesService = {
  
  async fetchExpenses(projectId) {
    const querySnapshot = await getDocs(
      query(expensesRef,
        where(propertyNames.projectId, queryOperators.equals, projectId))
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
