import {
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ToolsTable,
  TagsTable,
  ToolTagsTable,
  ToolUserProfilesTable,
} from "../config/config.js";
import Tool from "../models/Tool.js";
import Tag from "../models/Tag.js";
import ToolTag from "../models/ToolTag.js";
import ToolUserProfile from "../models/ToolUserProfile.js";
import responseHandler from "../handlers/response.handler.js";

export const getToolsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const toolsDocs =
      status === "all"
        ? await getDocs(ToolsTable)
        : await getDocs(query(ToolsTable, where("status", "==", status)));
    const tools = [];
    for (const toolDoc of toolsDocs.docs) {
      const tool = Tool.getData(toolDoc);

      const toolUserProfileDocs = await getDocs(
        query(ToolUserProfilesTable, where("toolId", "==", toolDoc.id))
      );
      const toolUserProfile = ToolUserProfile.getData(
        toolUserProfileDocs.docs[0]
      );
      tool.userProfile = toolUserProfile;

      tools.push(tool);
    }

    responseHandler.ok(res, tools);
  } catch (error) {
    responseHandler.error(res);
  }
};

export const getTags = async (req, res) => {
  try {
    const tagsDocs = await getDocs(TagsTable);
    const tags = [];
    for (const doc of tagsDocs.docs) {
      const tag = Tag.getData(doc);
      tags.push(tag);
    }

    // Sort tags by createdAt ASC
    tags.sort((a, b) => a.createdAt - b.createdAt);

    responseHandler.ok(res, tags);
  } catch (error) {
    responseHandler.error(res);
  }
};

export const getApprovedToolsByTagName = async (req, res) => {
  try {
    const { tagName } = req.params;

    const tagsDocs = await getDocs(
      query(TagsTable, where("name", "==", tagName))
    );
    const tag = Tag.getData(tagsDocs.docs[0]);

    const toolTagDocs = await getDocs(
      query(ToolTagsTable, where("tagId", "==", tag.id))
    );
    const tools = [];
    for (const toolTagDoc of toolTagDocs.docs) {
      const toolTag = ToolTag.getData(toolTagDoc);

      const toolsDocs = await getDocs(
        query(ToolsTable, where("id", "==", toolTag.toolId))
      );
      for (const toolDoc of toolsDocs.docs) {
        const tool = Tool.getData(toolDoc);

        if (tool.status !== "approved") continue;

        const toolUserProfileDocs = await getDocs(
          query(ToolUserProfilesTable, where("toolId", "==", toolDoc.id))
        );
        const toolUserProfile = ToolUserProfile.getData(
          toolUserProfileDocs.docs[0]
        );
        tool.userProfile = toolUserProfile;

        tools.push(tool);
      }
    }

    responseHandler.ok(res, tools);
  } catch (error) {
    responseHandler.error(res);
  }
};

export const addTool = async (req, res) => {
  try {
    const {
      name,
      description,
      link,
      videoURL,
      imageURL,
      userProfileName,
      instagramURL,
      youtubeURL,
      tiktokURL,
      tagsIdList,
    } = req.body;

    const tool = new Tool(
      name,
      description,
      link,
      videoURL,
      imageURL,
      "pending"
    );
    const toolDoc = await addDoc(ToolsTable, tool.toObject());

    const toolUserProfile = new ToolUserProfile(
      userProfileName,
      instagramURL,
      youtubeURL,
      tiktokURL,
      toolDoc.id
    );
    await addDoc(ToolUserProfilesTable, toolUserProfile.toObject());

    for (const tagId of tagsIdList) {
      const toolTag = new ToolTag(toolDoc.id, tagId);
      await addDoc(ToolTagsTable, toolTag.toObject());
    }

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

export const updateToolStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await updateDoc(doc(ToolsTable, id), { status });

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};
