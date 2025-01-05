export const HREF_LINK = {
   LOGIN: '/login',
   REGISTER: '/register',
   HILIR: {
      DASHBOARD: '/0/dashboard',
      PRODUCT: {
         HOME: '/0/product',
         CREATE: '/0/product/create',
         DETAIL: (id: number | string) => '/0/product/detail/' + id,
      },
      SUPPLY_CHAIN: {
         CREATE: (idProduct: number | string) => `/0/sc/create/${idProduct}`,
      },
   },
};
