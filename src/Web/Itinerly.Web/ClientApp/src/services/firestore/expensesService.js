import { firestore } from '../../config/firebase';
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";

const collectionName = "expenses";
const expensesRef = collection(firestore, collectionName);

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

  async updateExpenses(expenses) {
    await Promise.all(
      expenses.map(async ({id, ...expense}) => {
        const docRef = doc(firestore, collectionName, id);
        await updateDoc(docRef, expense);
      })
    )
  }
};
