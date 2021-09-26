import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase/firebaseConfig";
import axios from "axios";
import queryRepository from "../graphql/repositories.js";
import searchRepository from "../graphql/search";

const url = "https://api.github.com/graphql";
const firestoreCollection = "Repositories";
var firtsDocument = null;
var lastDocument = null;

const get = async (limit, cursor) => {
  const result = await axios.post(
    url,
    {
      query: queryRepository(limit, cursor),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("github-access-token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = result.data;
  const { repositories } = data.viewer;
  return repositories;
};

const addToFavoritesRepositories = async (user, data) => {
  try {
    const docs = await isFavoriteRepository(data.id);
    if (docs.length > 0) {
      throw new Error("This repository was previously bookmarked");
    } else {
      const repository = await addDoc(collection(db, firestoreCollection), {
        repositoryId: data.id,
        name: data.name,
        description: data.description,
        url: data.url,
        owner: data.owner.login,
        uid: user.uid,
        isFav: true,
      });
      const doc = await getDoc(repository);
      const result = {
        id: repository.id,
        ...doc.data(),
      };
      return result;
    }
  } catch (error) {
    throw error;
  }
};

const isFavoriteRepository = async (id) => {
  try {
    const q = query(
      collection(db, firestoreCollection),
      where("repositoryId", "==", id)
    );

    const fav = [];
    const result = await getDocs(q);
    if (result.size > 0) {
      result.docs.forEach((doc) => {
        fav.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return fav;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

const getFavoritesRepositories = async (user, lim, dispatch, types) => {
  try {
    lim = lim ? lim : 10000;
    const repositoryRef = collection(db, firestoreCollection);
    const q = query(
      repositoryRef,
      limit(lim),
      orderBy("repositoryId", "asc"),
      where("uid", "==", user.uid)
    );

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

const removeFavoritesRepositories = async (id) => {
  try {
    const data = await deleteDoc(doc(db, firestoreCollection, id));
    if (!data) {
      return { deleted: true };
    }
  } catch (error) {
    throw error;
  }
};

const searchRepositories = async (searchText, limit, cursor) => {
  const username = localStorage.getItem("screenName");
  const result = await axios.post(
    url,
    {
      query: searchRepository(username, searchText, limit, cursor),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("github-access-token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = result.data;
  const { repositories } = data;
  return repositories;
};

const searchFavoriteRepositoriesOnFirestore = async (
  searchText,
  lim,
  dispatch,
  types
) => {
  const repositoryRef = collection(db, firestoreCollection);
  const q = query(repositoryRef, orderBy("repositoryId", "asc"), limit(lim));

  onSnapshot(q, async (snapshot) => {
    const favRepositories = [];

    snapshot.docs.forEach((doc) => {
      favRepositories.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    const regexp = new RegExp(searchText, "i");
    const docs = favRepositories.filter((doc) => regexp.test(doc.name));
    const { size } = await getDocs(repositoryRef);
    dispatch({
      type: types.favRepositories,
      payload: {
        totalCount: size,
        lists: docs,
      },
    });
  });
};
export {
  addToFavoritesRepositories,
  get,
  getFavoritesRepositories,
  isFavoriteRepository,
  nextFavoritesList,
  prevFavoritesList,
  removeFavoritesRepositories,
  searchFavoriteRepositoriesOnFirestore,
  searchRepositories,
};
