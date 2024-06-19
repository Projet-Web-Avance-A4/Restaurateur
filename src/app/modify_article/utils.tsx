export const createArticle = (name: string, category: string, price: number, id_user: number) => {
    try {
      const response = fetch(
        "http://localhost:4000/article/createArticle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name_article: name, 
            category_article: category, 
            price_article: price, 
            id_restorer: id_user
            
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  export const updateArticle = (id_article: number, name: string, category: string, price: number, id_user: number) => {
    try {
      const response = fetch(
        "http://localhost:4000/article/updateArticle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_article: id_article,
            name_article: name, 
            category_article: category, 
            price_article: price, 
            id_restorer: id_user
            
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };