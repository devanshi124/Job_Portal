import {createSlice} from '@reduxjs/toolkit';
import { all } from 'axios';
import { SearchCode } from 'lucide-react';
import { set } from 'mongoose';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    allAppliedJobs: [],
    singleJob:null,
    searchJobByText: '',
    SearchedQuery: '',
    
   
  },
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload;
    },
    setSingleJob(state, action) {
      state.singleJob = action.payload;
    },
    setAllAdminJobs(state, action) {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText(state, action) {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs(state, action) {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery(state, action) {
      state.SearchedQuery = action.payload;
    }
  },
});

export const { setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;