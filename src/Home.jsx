// src/App.js

import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './Home.css';

const Home = () => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    clientName: '',
    clientEmail: '',
    invoiceDate: '',
    dueDate: '',
    itemName: '',
    itemQuantity: '',
    itemPrice: '',
    items: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      ...invoiceDetails,
      [name]: value,
    });
  };

  const handleAddItem = () => {
    if (
      invoiceDetails.itemName.trim() === '' ||
      invoiceDetails.itemQuantity.trim() === '' ||
      invoiceDetails.itemPrice.trim() === ''
    ) {
      // Don't add an item if any of the fields are empty
      return;
    }

    const newItem = {
      name: invoiceDetails.itemName,
      quantity: invoiceDetails.itemQuantity,
      price: invoiceDetails.itemPrice,
    };

    setInvoiceDetails((prevDetails) => ({
      ...prevDetails,
      items: [...prevDetails.items, newItem],
      itemName: '',
      itemQuantity: '',
      itemPrice: '',
    }));
  };

  const generateInvoice = () => {
    const itemDetailsHTML = invoiceDetails.items.map(
      (item, index) => `
        <tr key=${index}>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
        </tr>
      `
    );

    const invoiceHTML = `
      <div style="font-family: 'Arial', sans-serif;">
        <h2 style="color: #4caf50; text-align: center;">Invoice</h2>
        <div>
          <strong>Client Name:</strong> ${invoiceDetails.clientName}
        </div>
        <div>
          <strong>Client Email:</strong> ${invoiceDetails.clientEmail}
        </div>
        <div>
          <strong>Invoice Date:</strong> ${invoiceDetails.invoiceDate}
        </div>
        <div>
          <strong>Due Date:</strong> ${invoiceDetails.dueDate}
        </div>
        <div class="item-list">
          <h3>Item Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead style="background-color: #4caf50; color: white;">
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item Name</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemDetailsHTML.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const pdfOptions = {
      margin: 10,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(invoiceHTML).set(pdfOptions).save();
  };

  return (
    <div className="App">
     
      <h1>Invoice Generator</h1>
      <form>
        <label>
          Client Name:
          <input
            type="text"
            name="clientName"
            value={invoiceDetails.clientName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Client Email:
          <input
            type="email"
            name="clientEmail"
            value={invoiceDetails.clientEmail}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Invoice Date:
          <input
            type="date"
            name="invoiceDate"
            value={invoiceDetails.invoiceDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={invoiceDetails.dueDate}
            onChange={handleInputChange}
          />
        </label>
        <h3>Item Details</h3>
        <label>
          Item Name:
          <input
            type="text"
            name="itemName"
            value={invoiceDetails.itemName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="itemQuantity"
            value={invoiceDetails.itemQuantity}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="itemPrice"
            value={invoiceDetails.itemPrice}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-container">
          <button type="button" className="btn btn-primary" onClick={handleAddItem}>
            Add Item
          </button>
          <button type="button" className="btn btn-success" onClick={generateInvoice}>
            Generate Invoice
          </button>
        </div>
      </form>
      {invoiceDetails.items.length > 0 && (
        <div className="item-list">
          <h3>Item List</h3>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
