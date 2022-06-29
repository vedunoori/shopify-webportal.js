import axios from "axios";
import APIURL from "../apiUrlConstants";

export const getpartnerList = async () => {
  try {
    const { data } = await axios.get(APIURL.GET_PARTNER_LIST);
    console.log(data);
    if (data.success) {
      return data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const preSaveBookingAPI = async (bkngData) => {
  const config = {
    url: APIURL.PRE_PERSISTANCE_API,
    method: "post",
    data: bkngData,
  };
  try {
    const { data } = await axios(config);
    console.log(data);
    if (data.success) {
      return data.data;
    }
  } catch (err) {
    console.log(err);
  }
};
