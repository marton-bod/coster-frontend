import Cookies from 'universal-cookie';

export const getMonthList = () => {
    const currDate = new Date()
    const currYear = currDate.getFullYear()
    const currMonth = currDate.getMonth() + 1
    let monthList = []
    for (let i = currMonth; i >= 1; i -= 1) {
        monthList.push(currYear + "-" + i)
    }
    for (let i = 0; i < 12 - currMonth; i += 1) {
        monthList.push((currYear - 1) + "-" + (12 - i))
    }
    return monthList
};

export const getCurrentMonth = () => {
    const currDate = new Date()
    return currDate.getFullYear() + "-" + (currDate.getMonth() + 1)
}

export const generateAuthHeaders = () => {
    const cookies = new Cookies()
    return { headers: 
        { 
            auth_id: cookies.get('auth_id'), 
            auth_token: cookies.get('auth_token') 
        }
    }
}

export const getErrorDisplayMessage = (error) => {
    return error.response && error.response.data
    ? error.response.data.errorMsg.split("\n")[0] 
    : "Unexpected error occurred. Please try again later!"
}

export const persistAuthCookies = (id, token) => {
    const cookies = new Cookies();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    cookies.set('auth_id', id, { path: '/', expires: tomorrow });
    cookies.set('auth_token', token, { path: '/', expires: tomorrow });
}
