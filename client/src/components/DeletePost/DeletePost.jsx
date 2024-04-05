import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./DeletePost.module.css";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSelector, useDispatch } from "react-redux";
import {
  AllProducts,
  deleteProduct,
  updateProduct,
  ProductDetail,
} from "../../redux/action";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { message } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeletePost() {
  const dispatch = useDispatch();
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const allProducts = useSelector((state) => state.allProducts);
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const productDetails = useSelector((state) => state.productDetails);

// Al principio de la función DeletePost
useEffect(() => {
  setData((prevOrder) => ({
    ...prevOrder,
    product: productDetails.product,
    details: productDetails.details,
    price: productDetails.price,
    price_send: productDetails.price_send,
  }));
}, [productDetails]);

// Dentro de handleOpen, solo necesitas abrir el modal, 
// ya que el efecto anterior se encargará de actualizar los datos.
const handleOpen = (productId) => {
  setOpen(true);
  dispatch(ProductDetail(productId));
};
  const handleClose = () => setOpen(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    product: "",
    price: "",
    price_send: "",
    details: "",
  });
  useEffect(() => {
    try {
      dispatch(AllProducts());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get("page");
    setCurrentPage(pageParam ? parseInt(pageParam) : 1);
  }, [location.search]);
  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const offset = (currentPage - 1) * productsPerPage;

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.category === selectedCategory)
    : allProducts;

  const sortedProducts = allProducts.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Obtener todas las categorías únicas de los productos
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const handleDeleteProduct = (productId) => {
    try {
      dispatch(deleteProduct(productId)); 
      
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(async () => {
        window.location.reload()
      }, 1000);
    }
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Publicación actualizada",
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

     dispatch(updateProduct(productDetails.id, data));
    } catch (error) {
      console.error("Error al crear actualización:", error);
      // Manejo de error, muestra un mensaje de error, etc.
    }finally {
      setLoading(false);
      success();

      setTimeout(async () => {
        window.location.reload()
      }, 1000);
    }
  };

  return (
    <div className={`bg-white ${styles.Catalogo_container}`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className={styles.select_category}>
          <div className="mt-2.5">
            <select
              className={` ${styles.select_border}  block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">seleccionar categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ${styles.card}`}
        >
          {currentProducts.map((product) => (
            <div>
              <Link to={`/detalles/${product.id}`} key={product.id}>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.imageFile[0]}
                      alt={product.imageAlt}
                      style={{ backgroundColor: product.backgroundColor }}
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <label className={styles.text_title}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.product}
                        </label>
                      </h3>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <label className={styles.text_title}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          €{product.price}
                        </label>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  ":hover": { backgroundColor: "red" },
                }}
                onClick={() => handleDeleteProduct(product.id)}
              >
                Eliminar
              </Button>{" "}
              {/* Botón para eliminar un producto */}
              <Button
                variant="contained"
                onClick={() => handleOpen(product.id)}
              >
                Actualizar
              </Button>{" "}
              {/* Botón para eliminar un producto */}
            </div>
          ))}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Nombre del producto
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              name="product"
                              id="product"
                              onChange={(e) =>
                                setData({ ...data, product: e.target.value })
                              }
                              value={data.product}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="price"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Precio
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 sm:text-sm">
                                €
                              </span>
                            </div>
                            <input
                              type="number"
                              step="0.01" // Esto permite números con dos decimales
                              name="price"
                              id="price"
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                              onChange={(e) =>
                                setData({ ...data, price: e.target.value })
                              }
                              value={data.price}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="price"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Precio de envio
                          </label>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 sm:text-sm">
                                €
                              </span>
                            </div>
                            <input
                              type="number"
                              step="0.01" // Esto permite números con dos decimales
                              name="price_send"
                              id="price_send"
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                              onChange={(e) =>
                                setData({ ...data, price_send: e.target.value })
                              }
                              value={data.price_send}
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="details"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Detalles del producto
                          </label>
                          <div className="mt-2.5">
                            <textarea
                              name="details"
                              id="details"
                              rows={4}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={""}
                              value={data.details}
                              onChange={(e) =>
                                setData({ ...data, details: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-10">
                        <button
                          type="submit"
                          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {loading ? "Publicando.." : "Publicar"}
                        </button>
                        {contextHolder}
                      </div>
                    </div>
                  </form>
                </Box>
              </Modal>
        </div>

        <Pagination
          count={Math.ceil(allProducts.length / productsPerPage)}
          sx={{ marginTop: "16px" }}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${location.pathname}?page=${item.page}`}
              {...item}
              style={{ color: "black", fontSize: "20px" }} // Personaliza el color de los números
            />
          )}
        />
      </div>
    </div>
  );
}
