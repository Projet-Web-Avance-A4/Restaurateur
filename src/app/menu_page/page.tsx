"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CustomTable from "../components/table/table";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { FaBoxesStacked } from "react-icons/fa6";
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import { useEffect, useState } from "react";
import { Menu } from "../types/menu";
import { Article } from "../types/article";
import MoonLoader from "react-spinners/MoonLoader";
import { decodeAccessToken, dicoCategoryMenu } from "../utils/utils";
import ActionButtonModifyMenu from "../components/actionButtonTable/actionButtonModifyMenu";
import ActionButtonDeleteMenu from "../components/actionButtonTable/actionButtonDeleteMenu";

export default function Home() {
  const [menusList, setMenusList] = useState<Menu[]>([]);
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = decodeAccessToken(accessToken);
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:4000/menu/getMenus", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const filteredMenus = data.filter(
          (menu: Menu) => menu.id_restorer === decoded?.id_user
        );
        setMenusList(filteredMenus);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch menus.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = decodeAccessToken(accessToken);
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:4000/article/getArticles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        const filteredArticle = data.filter(
          (article: Article) => article.id_restorer === decoded?.id_user
        );
        setArticlesList(filteredArticle);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch menus.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);


  const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "price",
    "category",
    "dish_id",
    "actions", //Always here
  ];

  const items = menusList.map((item: Menu) => ({
    id: item.id_menu, //We always need an unique id, but it is never shown. Make sure to used an unique key as value.
    name: item.name_menu,
    price: item.price_menu,
    category: dicoCategoryMenu[item.category-1].value ,
    dish_id: articlesList.find((article) => article.id_article == item.id_dish)?.name_article,
  }));

  const columns = [
    { name: "Nom du Menu", uid: "name", sortable: true },
    { name: "Prix du Menu", uid: "price" },
    { name: "Type du Menu", uid: "category", sortable: true },
    { name: "Menu principal", uid: "dish_id", sortable: true },
    { name: "Actions", uid: "actions" }, //Always here
  ];

  const options: Options = {
    content: "menu(s) trouvé(s)", //Used for the number of items and when no items was found
    search_name: "Chercher par nom", //Title of the search bar
    search_uid: ["name"], //ALWAYS AN ARRAY, uid of the column to filter
    selection_mode: "none", //"none", "single" or "multiple"
    option_name: "Type du Menu", //Name of the option filter
    option_uid: "category", //ALWAYS A SINGLE STRING, uid of the column filtered with the option
    value_option: dicoCategoryMenu.map((category: any) => {return {name: category.value, uid: category.value }}),// uid need to be exactly the same as item's value. Name is the string to be printed
  };

  const props: propsTable = {
    columns: columns,
    options: options,
    items: items,
    INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
  };

  return (
    <NextUIProvider className="h-screen bg-beige flex flex-col">
      <Header title="Restaurateur" showMyAccount={true} showStats={false} />
      <main className="container mx-auto flex-grow">
        {loading && (
          <div className="flex justify-center m-14">
            <MoonLoader
              // color={blue}
              loading={true}
              // cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}

        {!loading && (
          <Card className="m-8">
            <CardHeader className="flex flex-row justify-between pb-0 pt-2 px-4 items-start">
              <h4 className="flex items-center font-bold text-large gap-2">
                <FaBoxesStacked />
                Vos Menus
              </h4>
              <Button
              as={Link}
              href="/modify_menu"
              >Ajouter un nouveau menu</Button>
            </CardHeader>
            <CardBody>
              <CustomTable
                props={props}
                actionButtons={[ActionButtonModifyMenu, ActionButtonDeleteMenu]}
              />
            </CardBody>
          </Card>
        )}
      </main>
      <Footer />
    </NextUIProvider>
  );
}
