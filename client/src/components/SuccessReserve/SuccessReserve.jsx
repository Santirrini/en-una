import React, { useEffect, useState } from "react";
import { Card, Typography, Descriptions, Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../Images/Logo.png";

const { Title, Text } = Typography;

const SuccessReserve = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  const [transaction, setTransaction] = useState(null);
  const [formData, setFormData] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedResponse = localStorage.getItem("paymentResponse");
    const storedForm = localStorage.getItem(`form_${userId}`);
    const storedCart = localStorage.getItem(`cart_${userId}`);

    const paymentResponse = storedResponse ? JSON.parse(storedResponse) : null;
    const form = storedForm ? JSON.parse(storedForm)?.[0]?.formData : null;
    const cart = storedCart ? JSON.parse(storedCart) : [];

    setTransaction(paymentResponse);
    setFormData(form);
    setCartItems(cart);
  }, [userId]);

  const handleRemoveAll = () => {
    localStorage.removeItem(`cart_${userId}`);
    localStorage.removeItem(`form_${userId}`);
    localStorage.removeItem("orderId");
    localStorage.removeItem("paymentResponse");
    navigate("/");
  };

  const toBase64 = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      );

  const generatePDF = async () => {
    const doc = new jsPDF();
    const logoBase64 = await toBase64(Logo);
    const logoSize = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = (pageWidth - logoSize) / 2;

    doc.addImage(logoBase64, "PNG", centerX, 10, logoSize, logoSize);
    doc.setFontSize(18);
    doc.setTextColor(80, 0, 117);
    doc.text("Comprobante de Reserva", pageWidth / 2, 70, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const paymentRows = [
      ["Monto", `S/${transaction?.response?.order[0]?.amount}`],
      ["Número de pedido", transaction?.transactionId],
      ["Código de autorización", transaction?.response?.order[0]?.codeAuth],
      [
        "Método de pago",
        transaction?.response?.payMethod === "CARD"
          ? "Tarjeta"
          : transaction?.response?.payMethod,
      ],

      [
        "Marca",
        transaction?.response?.card?.brand === "VS"
          ? "VISA"
          : transaction?.response?.card?.brand,
      ],

      ["Número de tarjeta", transaction?.response?.card?.pan],
    ];

    const reserveRows = [
      ["Restaurante", formData?.name],
      ["Ubicación", formData?.location],
      ["Área", formData?.area],
      ["Fecha", formData?.date],
      ["Hora", formData?.hours],
      ["Número de personas", formData?.peoples],
    ];

    doc.autoTable({
      startY: 80,
      head: [["Detalle de Pago", "Información"]],
      body: paymentRows,
      theme: "grid",
      styles: { fontSize: 11, halign: "center" },
      headStyles: { fillColor: [80, 0, 117], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [245, 245, 245] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Detalle de Reserva", "Información"]],
      body: reserveRows,
      theme: "grid",
      styles: { fontSize: 11, halign: "center" },
      headStyles: { fillColor: [80, 0, 117], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [245, 245, 245] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
    });

    if (cartItems.length > 0) {
      const items = cartItems.map((item) => [
        item.name,
        `S/${item.price}`,
        item.quantity,
      ]);
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Producto", "Precio", "Cantidad"]],
        body: items,
        theme: "grid",
        styles: { fontSize: 11, halign: "center" },
        headStyles: { fillColor: [80, 0, 117], textColor: [255, 255, 255] },
        bodyStyles: { fillColor: [245, 245, 245] },
        alternateRowStyles: { fillColor: [255, 255, 255] },
      });
    }

    doc.save("comprobante_reserva.pdf");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        flexWrap: "wrap",
      }}
      data-oid="uvw-66u"
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          margin: "10px",
        }}
        data-oid="8hja5.b"
      >
        <div
          style={{ textAlign: "center", marginBottom: "20px" }}
          data-oid="7q4o7_v"
        >
          <img
            src={require("../../Images/Logo.png")}
            alt="EnUna Logo"
            style={{
              width: "150px",
              maxWidth: "100%",
              height: "auto",
              margin: "auto",
            }}
            data-oid="jz7fnu1"
          />
        </div>

        <Title
          level={3}
          style={{ textAlign: "center", color: "#500075" }}
          data-oid="l47026l"
        >
          Reserva exitosa
        </Title>

        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "20px",
          }}
          data-oid="qas8knf"
        >
          Completaste con éxito el proceso de reserva por{" "}
          <b data-oid="cv1g0vl">S/{transaction?.response?.order[0]?.amount}</b>.
        </Text>

        <Descriptions
          title="Detalles del pago"
          bordered
          column={1}
          data-oid="b8r86vh"
        >
          <Descriptions.Item label="Número de pedido" data-oid="szpjbk0">
            {transaction?.transactionId}
          </Descriptions.Item>
          <Descriptions.Item label="Código de autorización" data-oid="et5dt95">
            {transaction?.response?.order[0]?.codeAuth}
          </Descriptions.Item>
          <Descriptions.Item label="Método de pago" data-oid="x2gsq8t">
            {transaction?.response?.payMethod === "CARD"
              ? "Tarjeta"
              : transaction?.response?.payMethod}
          </Descriptions.Item>
          <Descriptions.Item label="Marca" data-oid="fx6wuy_">
            {transaction?.response?.card?.brand === "VS"
              ? "VISA"
              : transaction?.response?.card?.brand}
          </Descriptions.Item>
          <Descriptions.Item label="Número de tarjeta" data-oid="qj9:ia.">
            {transaction?.response?.card?.pan}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Detalles de la reserva"
          bordered
          column={1}
          style={{ marginTop: 20 }}
          data-oid="xc2s:7-"
        >
          <Descriptions.Item label="Restaurante" data-oid="wml7iay">
            {formData?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Ubicación" data-oid="62qq1m-">
            {formData?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Área" data-oid="otjz-vw">
            {formData?.area}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha" data-oid="whgh9ah">
            {formData?.date}
          </Descriptions.Item>
          <Descriptions.Item label="Hora" data-oid="h2g3bji">
            {formData?.hours}
          </Descriptions.Item>
          <Descriptions.Item label="N° de personas" data-oid="cg9z_gr">
            {formData?.peoples}
          </Descriptions.Item>
        </Descriptions>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            display: "grid",
            justifyContent: "center",
            gap: "10px",
          }}
          data-oid="tfoghk_"
        >
          <Button
            onClick={generatePDF}
            style={{
              backgroundColor: "#00B894",
              borderColor: "#00B894",
              color: "white",
              width: "100%",
              maxWidth: "300px",
            }}
            data-oid="h1yir1c"
          >
            Descargar comprobante
          </Button>

          <Button
            onClick={handleRemoveAll}
            style={{
              backgroundColor: "#500075",
              borderColor: "#500075",
              color: "white",
              width: "100%",
              maxWidth: "300px",
            }}
            data-oid="rwzcbc:"
          >
            Volver al inicio
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SuccessReserve;
