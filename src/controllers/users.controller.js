import {
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { UsersTable } from "../config/config.js";
import User from "../models/User.js";
import responseHandler from "../handlers/response.handler.js";
import jsonwebtoken from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { userUID, firstName, lastName } = req.body;

    const user = new User(userUID, firstName, lastName);
    // Save additional user data
    const userAddDoc = await addDoc(UsersTable, user.toObject());

    user.password = undefined;
    const token = jsonwebtoken.sign(
      { data: userAddDoc.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      id: userAddDoc.id,
      ...user,
      token,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

export const signIn = async (req, res) => {
  try {
    const { userUID } = req.body;

    const querySnapshot = await getDocs(
      query(UsersTable, where("userUID", "==", userUID))
    );
    if (querySnapshot.size === 0) return responseHandler.unauthorize(res);

    const user = querySnapshot.docs[0].data();
    user.password = undefined;
    const token = jsonwebtoken.sign(
      { data: querySnapshot.docs[0].id },
      process.env.SECRET_TOKEN,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      id: querySnapshot.docs[0].id,
      ...user,
      token,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userDoc = await getDoc(doc(UsersTable, req.user.id));
    if (!userDoc.exists()) return responseHandler.notFound(res);

    responseHandler.ok(res, User.getData(userDoc));
  } catch (error) {
    responseHandler.error(res);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const dataReq = req.body;

    const userRef = doc(UsersTable, id);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return responseHandler.notFound(res);

    dataReq.updatedAt = new Date();
    await updateDoc(userRef, dataReq);

    responseHandler.ok(res, {
      id,
      ...dataReq,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};
