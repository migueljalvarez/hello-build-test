import {
  addDoc,
  getDocs,
  getDoc,
  collection,
  query,
  limit,
  startAt,
  startAfter,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase/firebaseConfig";
import axios from "../utils/axios";
import queryRepository from "../graphql/repositories.js";
const url = "https://api.github.com/graphql";
const firestoreCollection = "Repositories";
var firtsDocument = null;
var lastDocument = null;

const addToFavoritesRepositories = async (data) => {
  try {
    const repository = await addDoc(collection(db, firestoreCollection), {
      repositoryId: data.id,
      name: data.name,
      description: data.description,
      url: data.url,
      owner: data.owner.login,
      forkCount: data.forkCount,
    });
    const doc = await getDoc(repository);
    const result = {
      id: repository.id,
      ...doc.data(),
    };
    return result;
  } catch (error) {
    throw error;
  }
};

const get = async (limit, cursor) => {
  const result = await axios.post(url, {
    query: queryRepository(limit, cursor),
  });

  const { data } = result.data;
  const { repositories } = data.viewer;
  return repositories;
};

const getFavoritesRepositories = async (lim, dispatch, types) => {
  try {
    const repositoryRef = collection(db, firestoreCollection);
    const q = query(repositoryRef, limit(lim), orderBy("repositoryId", "asc"));

    onSnapshot(q, async (snapshot) => {
      const favRepositories = [];
      lastDocument = snapshot.docs[snapshot.docs.length - 1];
      firtsDocument = snapshot.docs[0];

      snapshot.docs.forEach((doc) => {
        favRepositories.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const { size } = await getDocs(repositoryRef);
      dispatch({
        type: types.favRepositories,
        payload: {
          totalCount: size,
          lists: favRepositories,
        },
      });
    });
  } catch (error) {
    throw error;
  }
};

const nextFavoritesList = async (lim, dispatch, types) => {
  try {
    const repositoryRef = collection(db, firestoreCollection);
    const q = query(
      repositoryRef,
      orderBy("repositoryId", "asc"),
      startAfter(lastDocument),
      limit(lim)
    );
    onSnapshot(q, async (snapshot) => {
      const favRepositories = [];

      snapshot.docs.forEach((doc) => {
        favRepositories.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const { size } = await getDocs(repositoryRef);
      dispatch({
        type: types.favRepositories,
        payload: {
          totalCount: size,
          lists: favRepositories,
        },
      });
    });
  } catch (error) {
    throw error;
  }
};

const prevFavoritesList = async (lim, dispatch, types) => {
  try {
    console.log(firtsDocument)
    const repositoryRef = collection(db, firestoreCollection);
    const q = query(
      repositoryRef,
      orderBy("repositoryId", "asc"),
      startAfter(firtsDocument),
      startAt(firtsDocument),
      limit(lim)
    );

    onSnapshot(q, async (snapshot) => {
      const favRepositories = [];

      snapshot.docs.forEach((doc) => {
        favRepositories.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const { size } = await getDocs(repositoryRef);
      dispatch({
        type: types.favRepositories,
        payload: {
          totalCount: size,
          lists: favRepositories,
        },
      });
    });
  } catch (error) {
    throw error;
  }
};
console.log(firtsDocument)
export {
  get,
  addToFavoritesRepositories,
  getFavoritesRepositories,
  nextFavoritesList,
  prevFavoritesList,
};
