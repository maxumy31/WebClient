import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  contacts: [],
  searchQuery: "",
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {

    addContact: {
      prepare: (id, name, email, phone) => ({
        payload: {
          id: id,
          name,
          email,
          phone,
        },
      }),

      reducer: (state, action) => {
        state.contacts.push(action.payload);
      },
    },

    removeContact(state, action) {
      state.contacts = state.contacts.filter(contact => contact.id != action.payload)
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    }
  },
});

export const { addContact, removeContact, setSearchQuery } = contactsSlice.actions;
export default contactsSlice.reducer;