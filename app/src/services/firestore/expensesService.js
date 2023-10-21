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
    
    await Promise.all(
      expenses.map(async ({id, ...expense}) => {
        // update
        if (id) {
          const docRef = doc(firestore, collectionName, id);
          await updateDoc(docRef, expense);
        }

        // added
        else if(!expense.isDeleted) {
          await addDoc(collectionRef, expense);
        }

        // added then immediately deleted.
        // dont send it to the server. save money.
        else await Promise.resolve();
      })
    )
  }
};
