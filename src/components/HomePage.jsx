import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Caption,
  DropZone,
  Thumbnail,
  Button,
  Checkbox,
  Form,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

import trophyImgUrl from "../assets/home-trophy.png";

import { ProductsCard } from "./ProductsCard";

export function HomePage() {
  const [partnerList, setPartnerList] = useState([]);
  const [newsletter, setNewsletter] = useState(false);
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");
  const getTodoList = async () => {
    try {
      const res = await axios.get(
        `https://stage-api.shyftclub.com/v1.0/partner/retrieve_list?page=${0}`
      );
      setPartnerList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("partnerList", partnerList);

  useEffect(() => {
    const fetchData = () => {
      getTodoList();
    };
    fetchData();
  }, []);

  const handleChange = useCallback((value) => setEmail(value), []);

  const handleSubmit = useCallback((_event) => {
    setEmail("");
    setNewsletter(false);
    console.log(_event);
  }, []);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    []
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png, csv"];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: "0" }}>
      <Stack vertical>
        {files.map((file, index) => (
          <Stack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteMinor
              }
            />
            <div>
              {file.name} <Caption>{file.size} bytes</Caption>
            </div>
          </Stack>
        ))}
      </Stack>
    </div>
  );

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <Heading element="h1">Delivery Details</Heading>

                <Layout>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Customer Name *"
                      type="text"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Email Id *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Contact Number *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Area-Emirate *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Full Postal Address *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Booking Reference *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Date & Slot *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="No. of Items *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Item Description *"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      label="Cash to be collected (AED)"
                      type="email"
                      autoComplete="email"
                    />
                  </Layout.Section>
                </Layout>

                <Button submit primary>
                  Place Booking
                </Button>
              </FormLayout>

              <div style={{ margin: "20px 0" }}>OR</div>

              <FormLayout>
                <Heading element="h1">Bulk Upload</Heading>
                <DropZone onDrop={handleDropZoneDrop}>
                  {uploadedFiles}
                  {fileUpload}
                </DropZone>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
        {/* <Layout.Section secondary>
          <ProductsCard />
        </Layout.Section> */}
      </Layout>
    </Page>
  );
}
