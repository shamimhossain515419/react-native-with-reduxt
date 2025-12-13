
React Native CLI + Redux Toolkit + RTK Query Setup
I wrote it fully optimized for GitHub with perfect formatting, headings, badges, and instructions.

🟦 React Native With Redux Toolkit (RTK Query) – Boilerplate

A modern React Native CLI starter template with:

⚡ Redux Toolkit (RTK)

🔥 RTK Query for API calls

🧱 Redux Slice Architecture

🚀 Clean Folder Structure

🎯 Ready for production apps

📦 Tech Stack
Library	Purpose
React Native CLI	Core framework
Redux Toolkit	Global state management
RTK Query	API fetching & caching
React Redux	Provider integration
📁 Project Structure
src
 ├── redux
 │    ├── slices
 │    │     └── adminAuthSlice.js
 │    ├── api
 │    │     └── baseApi.js
 │    ├── rootReducer.js
 │    └── store.js
 ├── navigation
 │    └── Navigation.jsx
 ├── components
 │    └── TestComponent.jsx
 └── App.js

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/shamimhossain515419/react-native-with-reduxt.git
cd react-native-with-reduxt

2️⃣ Install dependencies
npm install

3️⃣ Start Metro Bundler
npm start

4️⃣ Run Android
npm run android

🧰 Redux Toolkit Setup
Slice Example (adminAuthSlice.js)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aside: false,
  name: "Admin",
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    navbarToggle: (state) => {
      state.aside = !state.aside;
    },
  },
});

export const { navbarToggle } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

🌐 RTK Query Setup
baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://your-api-url.com/api",
  }),
  endpoints: () => ({}),
});

🏗 Store Setup
store.js
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

🧩 Root Reducer
import { combineReducers } from "@reduxjs/toolkit";
import adminAuthReducer from "../redux/slices/adminAuthSlice";
import { baseApi } from "../redux/api/baseApi";

export const reducer = combineReducers({
  adminAuth: adminAuthReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

🔄 Provider Setup
App.js
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

🧪 Testing Redux Connection
TestComponent.jsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { navbarToggle } from "../redux/slices/adminAuthSlice";

export default function TestComponent() {
  const aside = useSelector((state) => state.adminAuth.aside);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Aside: {aside ? "TRUE" : "FALSE"}</Text>
      <Button title="Toggle" onPress={() => dispatch(navbarToggle())} />
    </View>
  );
}

🏁 Features Included

✔ Modern Redux Toolkit setup
✔ RTK Query base API system
✔ Modular folder architecture
✔ Test component to verify Redux working
✔ Clean & production-ready configuration

📜 License

This project is open-source and available under the MIT License.
