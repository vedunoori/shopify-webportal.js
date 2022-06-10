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
