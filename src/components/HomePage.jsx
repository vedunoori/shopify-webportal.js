import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import axios from "axios";
import { useEffect, useState } from "react";

import trophyImgUrl from "../assets/home-trophy.png";

import { ProductsCard } from "./ProductsCard";

export function HomePage() {
  const [todoList, setTodoLisr] = useState([]);
  const getTodoList = async () => {
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${1}`)
      // .then((res) => { console.log('res', res) })
      // .catch((error) => {
      //     console.error(error);
      // })'
      setTodoLisr(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log("todoList", todoList)

  useEffect(() => {
    const fetchData = (() => {
      getTodoList();
    })
    fetchData();
  }, []);
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>welcome to Shyft App 🎉</Heading>
                  <table>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                    </tr>
                    {todoList.map((item) => (
                      <tr>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}

                  </table>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImgUrl}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
