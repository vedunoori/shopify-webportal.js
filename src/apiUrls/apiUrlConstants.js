const BASE_URL = `https://stage-api.shyftclub.com/v1.0`;

export default {
  GET_PARTNER_LIST: `${BASE_URL}/partner/retrieve_list?page=${0}`,
  PRE_PERSISTANCE_API: `${BASE_URL}/order/createOrder`,
};
