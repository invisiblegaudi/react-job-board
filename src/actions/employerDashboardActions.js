import axios from 'axios';
import {ROOT_URL} from './index';
import jwt from 'jsonwebtoken';

import setAuth from '../utils/utils';

export const GET_ALL_JOBS = "GET_ALL_JOBS";
export const GET_JOB_BY_ID = "GET_JOB_BY_ID";
export const GET_THIS_EMPLOYER_JOBS_SUCCESS = "GET_THIS_EMPLOYER_JOBS_SUCCESS";
export const FETCHING_THIS_EMPLOYER_JOBS = "FETCHING_THIS_EMPLOYER_JOBS";
export const REGISTER_EMPLOYER_SUCCESS = "REGISTER_EMPLOYER_SUCCESS";
export const EDITING_JOB_POST = "EDITING_JOB_POST";
export const EDITING_JOB_POST_SUCCESS = "EDITING_JOB_POST_SUCCESS";

/*What are some of the actions you expect the dashboard to require?
 * Get all jobs
 * Get all applicants
 * view job details
 * edit job details
 * delete job
 * view applicants per job
 * view applicant details*/

export function fetchingThisEmployerInfo() {
    return {
        type: FETCHING_THIS_EMPLOYER_JOBS,
        payload: "fetching jobs"
    }
}

export function registerEmployerSuccess(){
    return{
        type: REGISTER_EMPLOYER_SUCCESS,
        payload: "employer registered"
    }
}

export function getThisEmployerJobsSuccess(jobs) {
    return {
        type: GET_THIS_EMPLOYER_JOBS_SUCCESS,
        payload: jobs
    }
}

export function editingJobPost(){
    return{
        type: EDITING_JOB_POST,
        payload: 'editing job post'
    }
}

export function editingJobPostSuccess(jobPost){
    return{
        type: EDITING_JOB_POST_SUCCESS,
        payload: jobPost
    }
}

export function saveJobPost(jobPostInfo, userId) {

    return dispatch => {

        dispatch(editingJobPost());

        axios.post(`${ROOT_URL}user/dashboard/${userId}/createjob`, jobPostInfo)
            .then((response) => {

                dispatch(editingJobPostSuccess(response.data.jobPost));

            })
            .catch((error) => {
                // dispatch(registerUserError(error));
                console.log("there was an error trying to save the job..", error);
            });
    }

};

export function submitEmployerRegistration(employerInfo){
    console.log("will be making a post request with the following info.", employerInfo);

    return dispatch => {
        dispatch(fetchingThisEmployerInfo());
        axios.post(`${ROOT_URL}employer/register`, employerInfo)
            .then((response) => {
            /*TODO need to dispatch the response to set the state with the employer info and user info*/
            /*recieving {token, employer}*/
                console.log(response);
            })
            .catch((error)=> console.log(error))
    }
}

//This will be called when the user logs in and goes into the dashboard IF the account is an employer account
export function getThisEmployerInfo(userId, employerId) {

    return dispatch => {
        dispatch(fetchingJobs);
        axios.get(`${ROOT_URL}employer/dashboard/${employerId}/employerhome`)
            .then((response) => {
                dispatch(getThisEmployerJobsSuccess(response));
            })
            .catch((error) => {
            })

    }

}