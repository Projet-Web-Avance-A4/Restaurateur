"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Input, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Card, CardBody } from '@nextui-org/react';
import { decodeAccessToken } from '../utils/utils';
import { Article } from '../types/article';
import { createArticle, updateArticle } from './utils';

function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = Number(searchParams.get('id'))

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<any>();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setDecoded(decodeAccessToken(accessToken));

    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`http://localhost:4000/article/getArticles?id=${id}`);
          const data = await response.json();
          const filteredArticle: Article = data[0]; // Assuming data is an array with one article
          setName(filteredArticle.name_article);
          setPrice(filteredArticle.price_article);
          setCategory(filteredArticle.category_article);
        } catch (err) {
          console.error(err);
          setError('Failed to fetch article.');
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleSelectionChange = (keys: any) => {
    const selectedKey = keys.values().next().value;
    setCategory(selectedKey);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (id) {
      await updateArticle(id, name, category, price, decoded?.id_user);
    } else {
      await createArticle(name, category, price, decoded?.id_user);
    }
    router.push('/article_page');
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
                    label="Nom"
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
                    label="Price"
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
                <Button type="submit">Valider</Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function HomeWithSuspense() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}