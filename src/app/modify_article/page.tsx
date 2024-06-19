"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Header from "../components/header/header";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Spacer,
} from "@nextui-org/react";
import Footer from "../components/footer/footer";
import { decodeAccessToken } from "../utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Article } from "../types/article";
import { createArticle, updateArticle } from "./utils";

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<any>();

  useEffect(() => {
    if(id) {
        const accessToken = localStorage.getItem("accessToken");
        setDecoded(decodeAccessToken(accessToken));
        const fetchArticles = async () => {
          try {
            const response = await fetch(
              "http://localhost:4000/article/getArticles",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            console.log("data : ", data);
            const filteredArticle: Article = data.filter(
              (article: Article) => article.id_article === id
            )[0];
            console.log("filteredArticle : ", filteredArticle);
            setName(filteredArticle.name_article);
            setPrice(filteredArticle.price_article);
            setCategory(filteredArticle.category_article);
            console.log("end fetch Article : ", name, price, category);
          } catch (err) {
            console.error(err);
            setError("Failed to fetch menus.");
          }
        };
        fetchArticles();
    }
  }, []);

  const handleSelectionChange = (keys: any) => {
    const selectedKey = keys.values().next().value;
    setCategory(selectedKey);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      updateArticle(id, name, category, price, decoded?.id_user);
    } else {
      createArticle(name, category, price, decoded?.id_user);
    }
    router.push('/article_page')
  };

  return (
      <main className="flex flex-grow justify-center items-center">
        <div className="container mx-auto p-4 md:p-0">
          <div className="md:flex justify-center">
            <Card className="md:mr-4 mb-4 md:mb-0 w-full md:w-auto flex-grow max-w-3xl">
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <div>
                    <Input
                      className="text-black w-full"
                      isRequired
                      variant="bordered"
                      label={"Nom"}
                      size="md"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      className="text-black w-full"
                      isRequired
                      variant="bordered"
                      label={"Price"}
                      size="md"
                      type="number"
                      value={price.toString()}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="capitalize">
                          {category}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Category"
                        selectionMode="single"
                        selectedKeys={new Set([category])}
                        onSelectionChange={handleSelectionChange}
                      >
                        <DropdownItem className="text-black" key="repas">
                          Repas
                        </DropdownItem>
                        <DropdownItem className="text-black" key="boisson">
                          Boisson
                        </DropdownItem>
                        <DropdownItem className="text-black" key="dessert">
                          Dessert
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <Button type="submit" onClick={() => handleSubmit}>
                    Valider
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
  );
}
