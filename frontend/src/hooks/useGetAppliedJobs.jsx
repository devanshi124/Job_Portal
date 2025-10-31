import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetAppliedJobs = () => {
    console.log("Hook component mounted");

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            console.log("📡 About to fetch applied jobs...");
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                console.log("Fetched applied jobs:", res.data);

                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;