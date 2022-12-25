import { useEffect, useState } from "@elf-framework/sapa";
import { Button, Flex, InputEditor } from "@elf-framework/ui";
import axios from "axios";

import { Body } from "~/component/site/Body";
import { Header } from "~/component/site/Header";
import { FrontMatter } from "~/types/site";

/**
 * meta data 정의
 */
export const frontmatter: FrontMatter = {
  title: "Product",
  layout: "DashboardReadLayout",
};

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Page({ filename, title }: FrontMatter) {
  const [products, setProducts] = useState<Product[]>(null);

  useEffect(() => {
    (async () => {
      if (products) return;

      const res = await axios("/data/api/products.json");

      setProducts(res.data.data);
    })();
  }, [products]);

  return (
    <div class="page">
      <Header>
        <div class="left">Title</div>
        <div class="center">
          <div class="search">
            <InputEditor type="text" placeholder="Search" />
          </div>
        </div>
        <div class="right">
          <Button
            variant="primary"
            onClick={() => {
              setProducts([
                ...products,
                {
                  id: products.length + 1,
                  name: "New Product",
                  price: 1000,
                },
              ]);
            }}
          >
            Button
          </Button>
        </div>
      </Header>
      <Body>
        <p>This is body text of {title} page.</p>
        <p>Please edit this page at apps/client-dev/pages/{filename}</p>

        <p>
          {products &&
            products.map((product) => (
              <Flex style={{ border: "1px solid black", marginBottom: 10 }}>
                <div style={{ flex: "none", width: 100 }}>{product.name}</div>
                <div style={{ flex: "1 1 auto" }}>{product.price}</div>
              </Flex>
            ))}
        </p>
      </Body>
    </div>
  );
}
