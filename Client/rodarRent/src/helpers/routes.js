const routesHelper = {
    landing: '/',
    cars: '/cars',
    login: '/login',
    register: '/register',
    aboutUs: '/aboutUs',
    contact: '/contact',
    dashboardCustomer: '/customer/:id',
    allCustomers: '/allCustomers',
    allBookings: '/allBookings',
    detail: '/cars/:id',
    booking: '/booking',
    admin: '/admin',
    bookingByIdCustomer: '/myBookings',
}

export const API_BASE_URL = 'http://localhost:3001';

export const getCustomerDetailsUrl = (customerId) => `${API_BASE_URL}/customers/${customerId}`;
export const getBookingsByIdCustomerUrl = (customerId) => `${API_BASE_URL}/booking/filter?CustomerId=${customerId}`;
export default routesHelper