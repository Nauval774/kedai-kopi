document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      {id: 1, name: 'Robusta Brazil', img: 'product.jpg', price: 20000 }, 
      {id: 2, name: 'Arabica Blend', img: 'product.jpg', price: 25000 }, 
      {id: 3, name: 'Primo Passo', img: 'product.jpg', price: 30000 }, 
      {id: 4, name: 'Aceh Gayo', img: 'product.jpg', price: 35000 }, 
      {id: 5, name: 'Sumatra Mandheling', img: 'product.jpg', price: 40000 }, 
      ]
  }));
  
  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yg sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      
      //jika blm ada / cart kosong
      if (!cartItem) {
      this.items.push({...newItem, quantity: 1, total: newItem.price});
      this.quantity++;
      this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda/sama
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
            
          }
        })
      }
    },
    remove(id) {
      //ambil item yg di remove berdasar id
      const cartItem = this.items.find((item) => item.id === id);
      
      // jika item lebih dari satu
      if(cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          //jika bukan barang yg diklik
          if(item.id !== id) {
            return item
          } else {
            item.quantity--;
            item.total = item.price * item.quantity
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      
        
      } else if (cartItem.quantity === 1) {
        //jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
      
    }
  });
});

//form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
  for(let i = 0; i < form.elements.length; i++) {
    if(form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove('disabled');
      checkoutButton.classList.add('disabled');
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombl CO di diklik
checkoutButton.addEventListener('click', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open('http://wa.me/6281322854271?text=' + encodeURIComponent(message));
});

//format pesan WA 
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity}x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(obj.total)}
Terima Kasih.`;
};

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};