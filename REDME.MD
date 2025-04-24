data real (API), ganti setTimeout dengan fetch/axios:

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.example.com/data");
      const data = await res.json();
      // Set data ke state
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);

siapin ini "GET /api/search?query=parfum" buat search parfume


CART : AMBIL DATA DARI BE :
 useEffect(() => {
  fetch('/api/cart', {
    headers: {
      Authorization: `Bearer ${userToken}`, // jika pakai auth
    },
  })
    .then(res => res.json())
    .then(data => setCartItems(data.items))
    .catch(err => console.error('Failed to fetch cart', err));
}, []);


HAPUS ITEM DARI CART : 
const handleRemove = async (id) => {
  try {
    await fetch(`/api/cart/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    setCartItems(cartItems.filter(item => item.id !== id));
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
};


 ADD ITEM KE CART : 
 const addToCart = async (product) => {
  await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ productId: product.id, quantity: 1 }),
  });

  // Optional: refresh cart
};

