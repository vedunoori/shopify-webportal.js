import React, { useCallback, useEffect, useState } from "react";
import {
  IndexTable,
  TextStyle,
  Card,
  useIndexResourceState,
  Frame,
  Loading,
  Page,
  Button,
  Modal,
  TextContainer,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import { preSaveBookingAPI } from "../apiUrls/BulkBookingApis/BookingListApis";
function CreateOrders() {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [orderList, setOrderList] = useState([]);
  const [loader, setloader] = useState(false);
  const [selectdItems, setSelectedItems] = useState([]);
  const [active, setActive] = useState(false);

  const getOrderList = useCallback(async () => {
    setloader(true);
    const { body } = await fetch("/orders").then((res) => res.json());
    setOrderList(body.orders);
    setloader(false);
  }, []);

  // console.log('orderList', orderList);

  useEffect(() => {
    getOrderList();
  }, []);

  const resourceName = {
    singular: "orderList",
    plural: "orderList",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orderList);
  useEffect(() => {
    if (selectedResources.length && orderList.length) {
      const slctdArry = [];
      const values = [...orderList];
      for (let i = 0; i < selectedResources.length; i++) {
        const data = values.find((item) => item.id === selectedResources[i]);
        slctdArry.push(data);
      }
      setSelectedItems(slctdArry);
    } else {
      setSelectedItems([]);
    }
    return () => {};
  }, [selectedResources]);

  console.log("selectdItems", selectdItems);

  const handleChange = useCallback(() => setActive(!active), [active]);
  const handleclickCreate = () => {
    setActive(true);
  };

  const preSaveBooking = async (bkngData) => {
    try {
      const res = await preSaveBookingAPI(bkngData);
      if (res.bkstat === "Failed") {
      } else {
        console.log(res);
        setActive(false);
        // saveBooking(bkngData, res.data.bkrefid);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleCreateBook = () => {
    const pkpDtl = {
      add: "Abu Dhabi Mall - Abu Dhabi - United Arab Emirates",
      addtl: "Near KFC outlet",
      bkref: "sd",
      ccamt: 0,
      cnam: "Abu Dhabi",
      email: "covidwave@gmail.com",
      hbid: "Abu_Dhabi",
      imgs: [],
      isclct: false,
      jd: "sdsd",
      lat: "24.4959241",
      lon: "54.3832259",
      name: "covidwave its danger",
      ph: "98666500264",
      prc: 0,
      slot: "8 PM - 10 PM",
      teamid: "abu-dhabi",
      tim: "2022-06-27 23:00:00",
      vat: 0,
    };
    const dlvObj = selectdItems.map((item) => ({
      bkref: "ew",
      name: item.shipping_address.name,
      add: "Abu Dhabi Mall - Abu Dhabi - United Arab Emirates", //item.shipping_address.address1
      cnam: "Abu Dhabi",
      email: item.contact_email, // "covidwave@gmail.com",
      ph: "98668451455", //item.shipping_address.phone,
      jd: "sd", //item.shipping_address.address2,
      tim: "2022-06-28 17:00:00",
      ccamt: 0,
      isclct: false,
      addtl: "fdfd", // item.shipping_address.address2,
      lat: 24.4959241,
      lon: 54.3832259,
      slot: "9 AM - 5 PM",
      imgs: [],
      vat: 0.5,
      wght: "below 4Kg",
      prc: item.current_subtotal_price, // 10.5,
      hbid: "Abu_Dhabi",
      teamid: "abu-dhabi",
    }));

    const finalObj = {
      apptyp: "DESKTOP_WEB",
      bkngcnct: { phn: "98554646448" },
      crby: 1,

      bktyp: "Next Day",
      chnl: "C2C",
      cur: "AED",
      dlvcnt: 1,
      dom: "AE",
      ispr: false,
      manual: "yes",
      pkpcnt: 1,
      paytim: "2022-06-27 16:53:17",
      paytyp: "cash",
      prcty: "Dubai",
      prmApl: "",
      prmcde: "",
      ptyp: "collect at delivery",
      tamt: 10.5,
      vat: 0.5,
      vtyp: "Bike",
      usr: {
        email: "ds@gmail.com",
        name: "erre",
        phn: "+971986668451",
      },
      pkp: [pkpDtl],
      dlv: dlvObj,
    };
    const bookingReqObj = Object.assign({}, finalObj);
    console.log(bookingReqObj);
    preSaveBooking(bookingReqObj, "InProgress");
  };

  // selectedResources

  // const activator = <Button onClick={handleChange}>Open</Button>;

  const rowMarkup =
    orderList &&
    orderList.length > 0 &&
    orderList.map((items, index) => (
      <IndexTable.Row
        id={items.id}
        key={items.id}
        selected={selectedResources.includes(items.id)}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">
            {items?.shipping_address?.name}
          </TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {items?.shipping_address?.first_name}{" "}
          {items?.shipping_address?.last_name}
        </IndexTable.Cell>
        <IndexTable.Cell>{items?.shipping_address?.latitude}</IndexTable.Cell>
        <IndexTable.Cell>{items?.shipping_address?.longitude}</IndexTable.Cell>
        <IndexTable.Cell>{items?.shipping_address?.address1}</IndexTable.Cell>
        <IndexTable.Cell>{items?.shipping_address?.address2}</IndexTable.Cell>
        <IndexTable.Cell>{items?.shipping_address?.country}</IndexTable.Cell>
        <IndexTable.Cell>{items?.shipping_address?.zip}</IndexTable.Cell>
        <IndexTable.Cell>{items?.shipping_address?.company}</IndexTable.Cell>
        <IndexTable.Cell>
          {items?.subtotal_price} {items?.currency}
        </IndexTable.Cell>
      </IndexTable.Row>
    ));
  return (
    <>
      <Card title="Orders List">
        <IndexTable
          resourceName={resourceName}
          itemCount={orderList.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Profile" },
            { title: "Name" },
            { title: "latitude" },
            { title: "longitude" },
            { title: "address1" },
            { title: "address2" },
            { title: "country" },

            { title: "zip" },
            { title: "company" },
            { title: "Price" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
        {loader && (
          <div style={{ height: "100px" }}>
            <Frame>
              <Loading />
            </Frame>
          </div>
        )}
      </Card>
      <Card title="Actions" sectioned>
        {/* <Page
                    // title="Product Selector"
                    
                >
                     <Button primary>Save theme</Button>
                </Page> */}
        <span>
          <Button primary onClick={handleclickCreate}>
            Create booking
          </Button>
        </span>
        <span>{/* <Button destructive>Delete theme</Button> */}</span>
      </Card>

      <Modal
        // activator={activator}
        open={active}
        onClose={handleChange}
        title="Confirm Create Booking"
      >
        <Modal.Section>
          <TextContainer>
            <h6>Booking created </h6>
          </TextContainer>
          <Button primary onClick={handleCreateBook}>
            Yes
          </Button>
        </Modal.Section>
      </Modal>
    </>
  );
}

export default CreateOrders;
