"use client";
import { NextUIProvider } from "@nextui-org/system";
import { Card, CardBody } from "@nextui-org/card";
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
} from "@nextui-org/react";
import Footer from "../components/footer/footer";
import { decodeAccessToken } from "../utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu } from "../types/menu";
import { categories, createMenu, updateMenu } from "./utils";
import { Article } from "../types/article";
import MoonLoader from "react-spinners/MoonLoader";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<any>({ id: 0, value: "" });
  const [dish, setDish] = useState<any>();
  const [allDish, setAllDish] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const [decoded, setDecoded] = useState<any>();
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const decoded = decodeAccessToken(accessToken);

  useEffect(() => {
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

        const filteredArticles = data
          .filter(
            (article: Article) => article.id_restorer === decoded?.id_user
          )
          .map((article: any) => {
            return {
              id_dish: article.id_article,
              name_article: article.name_article,
            };
          });
        setAllDish(filteredArticles);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch menus.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchMenus = async () => {
        try {
          const response = await fetch("http://localhost:4000/menu/getMenus", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          const filteredMenu: Menu = data.filter(
            (menu: Menu) => menu.id_menu === id
          )[0];
          setName(filteredMenu.name_menu);
          setPrice(filteredMenu.price_menu);
          setCategory({
            id: filteredMenu.category,
            value: categories.find(
              (cat: any) => cat.key === filteredMenu.category
            )?.value,
          });
          setDish({
            id: filteredMenu.id_dish,
            value: allDish.find(
              (cat: any) => cat.id_dish == filteredMenu.id_dish
            )?.name_article,
          });
        } catch (err) {
          console.error(err);
          setError("Failed to fetch menus.");
        }
      };
      fetchMenus();
    }
  }, [allDish]);

  const handleCategorySelectionChange = (keys: any) => {
    const selectedKey = Number(Array.from(keys)[0]);
    const selectedValue = categories.find(
      (cat) => cat.key === selectedKey
    )?.value;
    setCategory({ id: selectedKey, value: selectedValue });
  };

  const handleDishSelectionChange = (keys: any) => {
    const selectedKey = Number(Array.from(keys)[0]);
    const selectedValue = allDish.find(
      (dish) => dish.id_dish === selectedKey
    )?.name_article;
    setDish({ id: selectedKey, value: selectedValue });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      updateMenu(id, name, category!.id, price!, dish!.id, decoded?.id_user);
    } else {
      createMenu(name, category!.id, price!, dish!.id, decoded?.id_user);
    }
    router.push("/menu_page")
  };

  if (loading) {
    return (
      <div className="flex justify-center m-14">
        <MoonLoader
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
      <div className="flex flex-grow justify-center items-center">
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
                          {category.value || "Catégorie"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Category"
                        selectionMode="single"
                        // selectedKeys={category.id}
                        onSelectionChange={handleCategorySelectionChange}
                      >
                        {categories.map((category) => (
                          <DropdownItem
                            className="text-black"
                            key={category.key}
                          >
                            {category?.value}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="capitalize">
                          {dish?.value || "Plat Principal"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dish"
                        selectionMode="single"
                        // selectedKeys={dish?.id}
                        onSelectionChange={handleDishSelectionChange}
                      >
                        {allDish.map((dish) => (
                          <DropdownItem
                            className="text-black"
                            key={dish.id_dish}
                          >
                            {dish.name_article}
                          </DropdownItem>
                        ))}
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
      </div>
  );
}
