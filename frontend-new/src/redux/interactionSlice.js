import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hcpName: "",
  interactionType: "",
  date: "",
  time: "",
  attendees: "",
  topics: "",
  sentiment: "",
  materialsShared: false,
  samplesDistributed: false,
  outcomes: "",
  followUp: "",
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,

  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    updateMultipleFields(state, action) {
      Object.assign(state, action.payload);
    },

    updateInteraction(state, action) {
      Object.assign(state, action.payload);
    },

    clearInteraction() {
      return initialState;
    },
  },
});

export const {
  updateField,
  updateMultipleFields,
  updateInteraction,
  clearInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;