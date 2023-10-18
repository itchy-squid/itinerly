import { firestore } from '../../config/firebase';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const collectionName = "expenses";
const collectionRef = collection(firestore, collectionName);

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
      query(collectionRef,
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
    const updates = expenses.filter(e => e.id).map(async ({id, ...expense}) => {})

    await Promise.all(
      expenses.map(async ({id, ...expense}) => {
        if (id) {
          const docRef = doc(firestore, collectionName, id);
          await updateDoc(docRef, expense);
        }
        else {
          await addDoc(collectionRef, expense);
        }
      })
    )
  }
};
