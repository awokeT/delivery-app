import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };

export default async function loginRequest(email, password) {
  const { data } = await axios({
    method: 'POST',
    url: 'http://localhost:3001/login',
    headers,
    data: {
      email,
      password,
    },
  });
  return data;
}

export async function getProducts() {
  const { data } = await axios({
    method: 'GET',
    url: 'http://localhost:3001/products',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
  });
  return data;
}

export async function checkoutRequest(request, products) {
  const { data } = await axios({
    method: 'POST',
    url: 'http://localhost:3001/sale',
    headers: {
      ...headers,
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    data: {
      products,
      request,
    },
  });
  return data.id;
}

export async function getCustomerOrders(token, userId) {
  const { data } = await axios({
    method: 'POST',
    url: 'http://localhost:3001/customer/orders',
    headers: {
      ...headers,
      Authorization: token,
    },
    data: { userId },
  });
  return data;
}

export async function getOrderById(saleId) {
  const { id, role, token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await axios({
    method: 'POST',
    url: `http://localhost:3001/customer/orders/${saleId}`,
    headers: {
      ...headers,
      Authorization: token,
    },
    data: { userId: id, role },
  });
  return data;
}

export async function getSellers() {
  const { data } = await axios({
    method: 'GET',
    url: 'http://localhost:3001/sale/sellers',
    headers: { Authorization: JSON.parse(localStorage.getItem('user')).token },
  });
  return data;
}

export async function getSellerById(sellerId) {
  const { data } = await axios({
    method: 'GET',
    url: `http://localhost:3001/sale/sellers/${sellerId}`,
    headers: { Authorization: JSON.parse(localStorage.getItem('user')).token },
  });
  return data;
}

export async function updateSaleStatus(saleId) {
  const { data } = await axios({
    method: 'PUT',
    url: `http://localhost:3001/customer/orders/${saleId}`,
    headers: { Authorization: JSON.parse(localStorage.getItem('user')).token },
  });
  return data;
}

export async function getOrders(token, role) {
  const { data } = await axios({
    method: 'POST',
    url: 'http://localhost:3001/orders',
    headers: {
      Authorization: token,
    },
    data: { type: role },
  });
  return data;
}

export async function checkout(checkoutInfo) {
  const { data } = await axios.post('http://localhost:3001/checkout', { data: checkoutInfo })
    .then()
    .catch((e) => console.error(e));
  return data;
}
