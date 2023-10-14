import { firestore } from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const activitiesRef = collection(firestore, "expenses");

const propertyNames = {
  activityId: 'activityId'
};

const queryOperators = {
  equals: '==',
  in: 'in'
}

export const expensesService = {
  
  async fetchExpenses(activityIds) {
    const querySnapshot = await getDocs(
      query(activitiesRef,
        where(propertyNames.activityId, queryOperators.in, activityIds))
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
