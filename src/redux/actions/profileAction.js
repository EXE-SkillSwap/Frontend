import { getUserProfile } from "@/api/services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
  "profile/getProfile", //action type
  async (_, { rejectWithValue }) => {
    try {
      const reponse = await getUserProfile();
      return reponse.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
