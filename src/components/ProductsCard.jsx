import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button,
  Page,
} from "@shopify/polaris";

// import { ResourcePicker, Toast, useAppBridge } from "@shopify/app-bridge-react";
import { ResourcePicker, useAppBridge } from "@shopify/app-bridge-react";

// import Router from "koa-router";

import { gql, useMutation } from "@apollo/client";

import { userLoggedInFetch } from "../App";
// import axios from "axios";

const PRODUCTS_QUERY = gql`
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        title
      }
    }
  }
`;

export function ProductsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const [populateProduct, { loading }] = useMutation(PRODUCTS_QUERY);
  const [productCount, setProductCount] = useState(0);
  const [hasResults, setHasResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const updateProductCount = useCallback(async () => {
    const orders = await fetch("/orders").then((res) => res.json());
    console.log("orders", orders);
    setProductCount(orders);
  }, []);

  useEffect(() => {
    updateProductCount();
  }, []);

  const handeleSelectProd = (payload) => {
    setIsOpen(false);
    console.log(payload.selection);
    setProductsList(payload.selection);
  };

  useEffect(() => {
    (async () => {
      // const date = await testOrderList()
      // console.log(date)
      // try{
      // const res = await  axios.get('https://shyftae.myshopify.com/admin/api/2022-04/orders.json?status=any')
      // console.log(res)
      // }catch(e){
      // }
    })();
  }, []);

  return (
    <>
      {/* {toastMarkup} */}
      <Card title="Product Counter" sectioned>
        <Page
          title="Product Selector"
          primaryAction={{
            content: "Select product",
            onAction: () => setIsOpen(true),
          }}
        >
          <ResourcePicker
            resourceType="Product"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onSelection={handeleSelectProd}
          />
        </Page>
        {productsList.map((item, index) => (
          <div key={index}>
            <div>handle:{item.handle}</div>
            <div>vendor:{item.vendor}</div>
          </div>
        ))}
      </Card>
    </>
  );
}
