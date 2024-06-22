export const categories = [
    { key: 1, value: "Repas + Boisson + Dessert" },
    { key: 2, value: "Repas + Boisson" },
    { key: 3, value: "Repas + Dessert" },
  ];

export const createMenu = (name: string, category: number, price: number, id_dish: number, id_user: number) => {
    try {
      const response = fetch(
        "http://localhost:4000/menu/createMenu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name_menu: name, 
            category: category, 
            price_menu: price, 
            id_restorer: id_user,
            id_dish: id_dish
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  export const updateMenu = (id_menu: number, name: string, category: number, price: number, id_dish: number, id_user: number) => {
    try {
      const response = fetch(
        "http://localhost:4000/menu/updateMenu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_menu: id_menu,
            name_menu: name, 
            category: category, 
            price_menu: price, 
            id_restorer: id_user,
            id_dish: id_dish
            
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };