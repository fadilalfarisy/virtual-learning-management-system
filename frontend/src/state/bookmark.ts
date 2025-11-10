import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bookmark {
  id: string;
  title: string;
  channel: string;
  link: string;
}

interface BookmarkState {
  bookmarks: Bookmark[];
}

const initialValue: BookmarkState = {
  bookmarks: [],
};

const initialState = () => {
  const bookmarkLocalStorage = localStorage.getItem("bookmarks");
  if (!bookmarkLocalStorage) return initialValue;
  const bookmarkJSON: BookmarkState = JSON.parse(bookmarkLocalStorage);
  return bookmarkJSON;
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmark: (state) => {
      const bookmarkList = localStorage.getItem("bookmarks");
      if (bookmarkList) state.bookmarks = JSON.parse(bookmarkList);
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks.push(action.payload);
    },
    deleteBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id != action.payload
      );
    },
  },
});

export const { addBookmark, deleteBookmark } = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;
