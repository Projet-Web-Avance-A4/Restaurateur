export function updateStatusToInProgress(order_id: number) {
  const updateOrderStatus = () => {
    try {
      const response = fetch(
        "http://localhost:4000/order/updateOrderStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idOrder: order_id,
            newStatus: "in_progress",
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  updateOrderStatus();
}

export function deteleArticle(id_article: number) {
  const deteleArticle = () => {
    try {
      const response = fetch(
        "http://localhost:4000/article/deleteArticle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_article: id_article,
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  deteleArticle();
}

export function deleteMenu(id_menu: number) {
  const deleteMenu = () => {
    try {
      const response = fetch(
        "http://localhost:4000/menu/deleteMenu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_menu: id_menu,
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  deleteMenu();
}