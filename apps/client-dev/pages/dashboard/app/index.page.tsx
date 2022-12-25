/**
 * meta data 정의
 */
import {
  Button,
  Card,
  CardBody,
  CardContainer,
  CardFooter,
  CardHeader,
  Column,
  Grid,
  Table,
} from "@elf-framework/ui";

import { Body } from "~/component/site/Body";
import { Header } from "~/component/site/Header";
import { FrontMatter } from "~/types/site";

export const frontmatter: FrontMatter = {
  title: "App",
  layout: "DashboardReadLayout",
};

export default function Page() {
  return (
    <div style={{ minWidth: 0 }}>
      <Header sticky>
        <h3>Sticky Header</h3>
        <div></div>
        <div>
          Buttons:{" "}
          <Button size="small" variant="primary">
            sample
          </Button>
        </div>
      </Header>
      <Body>
        <Grid columns={3} style={{ gap: 24 }}>
          <Column>
            <Card wide full>
              <CardContainer>
                <CardHeader title="Total Active Users"></CardHeader>
                <CardBody>1</CardBody>
              </CardContainer>
            </Card>
          </Column>
          <Column>
            <Card wide full>
              <CardContainer>
                <CardHeader title="Total Installed"></CardHeader>
                <CardBody>2</CardBody>
              </CardContainer>
            </Card>
          </Column>
          <Column>
            <Card wide full>
              <CardContainer>
                <CardHeader title="Total Downloads"></CardHeader>
                <CardBody>3</CardBody>
              </CardContainer>
            </Card>
          </Column>
          <Column>
            <Card wide full>
              <CardContainer>
                <CardHeader title="Total Installed"></CardHeader>
                <CardBody style={{ flex: "1 1 auto" }}>
                  <Grid columns={[1, 1]} style={{ gap: 24, height: 300 }}>
                    {/* <Panel
                    mode="stroke"
                    style={{
                      backgroundColor: "red",
                      color: "var(--color-white)",
                      fontWeight: "bold",
                    }}
                  >
                    fdsafds
                  </Panel>
                  <Panel mode="stroke">fdsafds</Panel>
                  <Panel mode="stroke">fdsafds</Panel>
                  <Panel mode="stroke">fdsafds</Panel> */}
                  </Grid>
                </CardBody>
              </CardContainer>
            </Card>
          </Column>
          <Column span={2}>
            <Card wide full>
              <CardContainer>
                <CardHeader title="Total Downloads"></CardHeader>
                <CardBody>3</CardBody>
              </CardContainer>
            </Card>
          </Column>
        </Grid>

        <Grid columns={[2, 1]} style={{ gap: 24, marginTop: 24, height: 400 }}>
          <Column>
            <Card wide full>
              <CardContainer
                style={{
                  display: "flex",
                }}
              >
                <CardHeader
                  title="Total Downloads"
                  style={{ flex: "none", marginBottom: 10 }}
                  actions={[
                    <Button variant="primary" size="small" iconOnly>
                      B
                    </Button>,
                  ]}
                ></CardHeader>
                <CardBody
                  style={{
                    flex: "1 1 auto",
                  }}
                  compact
                >
                  <Table
                    quiet
                    style={{ flex: "1 1 auto" }}
                    selectionStyle="checkbox"
                    columns={[
                      {
                        title: "Name",
                        key: "name",

                        style: {
                          textAlign: "left",
                          cellAlign: "flex-end",
                        },
                        tools: ["↓"],
                      },
                      { title: "Age", key: "age" },
                      { title: "Address", key: "address" },
                    ]}
                    data={[
                      {
                        name: "John Brown",
                        age: 32,
                        address: "New York No. 1 Lake Park",
                        selected: true,
                      },
                      {
                        name: "Jim Green",
                        age: 42,
                        address: "London No. 1 Lake Park",
                        selected: true,
                      },
                      {
                        name: "Joe Black",
                        age: 32,
                        address: "Sidney No. 1 Lake Park",
                      },
                      {
                        name: "Jim Red",
                        age: 32,
                        address: "London No. 2 Lake Park",
                      },
                    ]}
                  />
                </CardBody>

                <CardFooter
                  noDivider
                  style={{
                    flex: "none",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  View all
                </CardFooter>
              </CardContainer>
            </Card>
          </Column>
          <Column>
            <Card wide full>
              <CardContainer
                style={{
                  display: "flex",
                }}
              >
                <CardHeader
                  title="Total Downloads"
                  style={{ flex: "none", marginBottom: 10 }}
                  actions={[
                    <Button variant="primary" size="small" iconOnly>
                      B
                    </Button>,
                  ]}
                ></CardHeader>
                <CardBody
                  compact
                  style={{
                    flex: " 1 1 auto",
                  }}
                >
                  <Table
                    quiet
                    style={{ flex: "1 1 auto" }}
                    columns={[
                      { title: "Name", key: "name" },
                      { title: "Age", key: "age" },
                      { title: "Address", key: "address" },
                    ]}
                    data={[
                      {
                        name: "John Brown",
                        age: 32,
                        address: "New York No. 1 Lake Park",
                      },
                      {
                        name: "Jim Green",
                        age: 42,
                        address: "London No. 1 Lake Park",
                      },
                      {
                        name: "Joe Black",
                        age: 32,
                        address: "Sidney No. 1 Lake Park",
                      },
                      {
                        name: "Jim Red",
                        age: 32,
                        address: "London No. 2 Lake Park",
                      },
                    ]}
                  />
                </CardBody>

                <CardFooter
                  noDivider
                  style={{
                    flex: "none",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  View all
                </CardFooter>
              </CardContainer>
            </Card>
          </Column>
        </Grid>
      </Body>
    </div>
  );
}
