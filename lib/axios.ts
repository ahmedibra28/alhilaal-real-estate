// 'use server'
import instance from 'axios'

import { getCookie } from 'cookies-next'

const axios = instance.create({
    baseURL: 'http://localhost:3000/api',
    responseType: 'json',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('next-auth.session-token')}`,
    },
    withCredentials: true,
})

// format the response to only return the data
instance.interceptors.response.use(
    (response) => response.data,
    (error) =>
        Promise.reject(
            (error.response && error.response.data) || 'Something went wrong',
        ),
)

export default axios
