let imgUrl1 = 'https://images.unsplash.com/photo-1674741116744-c33be485c99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
let imgUrl2 = 'https://images.unsplash.com/photo-1675283490979-49d69389e54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
let imgUrl3 = 'https://images.unsplash.com/photo-1674845528922-bb05cadf3ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
let imgUrl4 = 'https://images.unsplash.com/photo-1674741250252-edb6a227c166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'

    const productos = [
        { id: 1, nombre: "Cooler", description: "Desc prodcuto A", stock: 5, img: imgUrl1, category: 'Coolers', price:199, discount:299},
        { id: 2, nombre: "Keyboard", description: "Desc prodcuto B", stock: 9, img: imgUrl2, category: 'Keyboards', price:299, discount:399},
        { id: 3, nombre: "Processor", description: "Desc prodcuto C", stock: 2, img: imgUrl3, category: 'Processor', price:399, discount:499},
        { id: 4, nombre: "Graphic card", description: "Desc prodcuto C", stock: 2, img: imgUrl4, category: 'Graphics Cards', price:499, discount:699},
        { id: 5, nombre: "Graphic card", description: "Desc prodcuto C", stock: 2, img: imgUrl4, category: 'Graphics Cards', price:499, discount:699},
        { id: 6, nombre: "Graphic card", description: "Desc prodcuto C", stock: 2, img: imgUrl4, category: 'Graphics Cards', price:499, discount:699},
      ];

     export const getProductos = () => {
        return new Promise((resolve, reject) => {
          if (productos.length === 0) {
            reject(new Error("No se encontraron productos"));
          }
          setTimeout(() => {
            resolve(productos);
          }, 2000);
        });
      };

      export const getProductosById = (id) => {
        const productDetailFilterId = productos.find((producto) => producto.id === parseInt(id));
        return new Promise((resolve, reject) => {
          if (productos.length === 0) {
            reject(new Error("No se encontraron productos"));
          }
          setTimeout(() => {
            resolve(productDetailFilterId);
          }, 2000);
        });
      };
      
      export const getProductosByCategory = (category) => {
        const productDetailFilterCategory = productos.filter((producto) => producto.category === category);
        return new Promise((resolve, reject) => {
          if (productos.length === 0) {
            reject(new Error("No se encontraron productos"));
          }
          setTimeout(() => {
            resolve(productDetailFilterCategory);
          }, 2000);
        });
      };