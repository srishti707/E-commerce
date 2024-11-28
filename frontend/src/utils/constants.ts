export const server_URI="http://localhost:6969";
//authentication api endpoints

export const signup_API = server_URI+"/api/v1/customer/signup";
export const login_API =server_URI +"/api/v1/customer/login";
export const forgot_password_API=server_URI +"/api/v1/customer/forgot-password";
export const reset_password_API=server_URI +"/api/v1/customer/reset-password";
//product api endpoints
export const homePage_API=server_URI +"/api/v1/product/homepage";
export const getAll_API=server_URI + "/api/v1/product/getAll";
export const getProduct_API=server_URI + "/api/v1/product/getProduct";
//cart endpoints
export const cartItem_API=server_URI +"/api/v1/customer/cart/add";
export const getcart_API=server_URI +"/api/v1/customer/cart/get";
export const deleteCartItem_API=server_URI +"/api/v1/customer/cart/delete";